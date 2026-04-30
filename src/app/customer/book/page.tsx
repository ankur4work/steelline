"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Package, Truck, Calendar, FileText, ArrowRight, AlertCircle, CheckCircle, IndianRupee } from "lucide-react";
import { TRUCK_TYPES, CARGO_TYPES, estimatePrice, formatCurrency } from "@/lib/utils";

const inputClass = "w-full px-3 py-2.5 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors";
const selectClass = inputClass + " bg-[#141c2b]";

export default function BookTruckPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    pickupAddress: "", pickupCity: "",
    deliveryAddress: "", deliveryCity: "",
    cargoType: "", cargoWeight: "", truckType: "",
    scheduledDate: "", notes: "",
  });

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const estimatedPrice = form.truckType && form.cargoWeight
    ? estimatePrice(form.truckType, parseFloat(form.cargoWeight))
    : null;

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }
      const booking = await res.json();
      router.push(`/customer/orders/${booking.id}?success=true`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const steps = [
    { label: "Route",   icon: MapPin    },
    { label: "Cargo",   icon: Package   },
    { label: "Confirm", icon: CheckCircle },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-black text-white">Book a Truck</h1>
        <p className="text-white/40 text-sm mt-1">Fill in the details below to schedule your shipment.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-6">
        {steps.map(({ label, icon: Icon }, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step > i + 1  ? "bg-green-500 border-green-500 text-white" :
                step === i + 1 ? "bg-[#4f72f8] border-[#4f72f8] text-white shadow-lg shadow-[#4f72f8]/30" :
                "border-white/10 text-white/20 bg-white/3"
              }`}>
                {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs mt-1.5 hidden sm:block font-medium ${
                step === i + 1 ? "text-[#4f72f8]" : step > i + 1 ? "text-white/50" : "text-white/20"
              }`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${step > i + 1 ? "bg-green-500" : "bg-white/8"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-5 lg:p-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-5 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Step 1: Route */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-black text-white text-lg flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#4f72f8]" /> Route Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-white/40 mb-1.5">Pickup Address *</label>
                <input value={form.pickupAddress} onChange={e => update("pickupAddress", e.target.value)} placeholder="Full pickup address" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5">Pickup City *</label>
                <input value={form.pickupCity} onChange={e => update("pickupCity", e.target.value)} placeholder="e.g., Mumbai" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-white/40 mb-1.5">Delivery Address *</label>
                <input value={form.deliveryAddress} onChange={e => update("deliveryAddress", e.target.value)} placeholder="Full delivery address" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5">Delivery City *</label>
                <input value={form.deliveryCity} onChange={e => update("deliveryCity", e.target.value)} placeholder="e.g., Delhi" className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Cargo */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-black text-white text-lg flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[#4f72f8]" /> Cargo Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5">Cargo Type *</label>
                <select value={form.cargoType} onChange={e => update("cargoType", e.target.value)} className={selectClass}>
                  <option value="">Select cargo type</option>
                  {CARGO_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5">Weight (kg) *</label>
                <input type="number" value={form.cargoWeight} onChange={e => update("cargoWeight", e.target.value)}
                  placeholder="e.g., 500" min="1" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2">Truck Type *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRUCK_TYPES.map(t => (
                  <label key={t.value}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      form.truckType === t.value
                        ? "border-[#4f72f8] bg-[#4f72f8]/8"
                        : "border-white/6 hover:border-white/15 bg-[#141c2b]"
                    }`}
                  >
                    <input type="radio" name="truckType" value={t.value} checked={form.truckType === t.value}
                      onChange={() => update("truckType", t.value)} className="accent-[#4f72f8]" />
                    <div>
                      <div className="text-sm font-medium text-white">{t.label}</div>
                      <div className="text-xs text-white/30">Max: {t.capacity}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {estimatedPrice && (
              <div className="bg-[#4f72f8]/8 border border-[#4f72f8]/20 rounded-xl p-3 flex items-center gap-2 text-[#7b9bff] text-sm">
                <IndianRupee className="w-4 h-4 flex-shrink-0" />
                Estimated price: <strong>{formatCurrency(estimatedPrice)}</strong>
                <span className="text-white/25 text-xs ml-1">(admin will confirm final amount)</span>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Schedule & Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-black text-white text-lg flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#4f72f8]" /> Schedule & Confirm
            </h2>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Pickup Date *</label>
              <input type="date" value={form.scheduledDate} onChange={e => update("scheduledDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Additional Notes</label>
              <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={3}
                placeholder="Special instructions, fragile items, access hours, etc."
                className={inputClass + " resize-none"} />
            </div>

            {/* Summary */}
            <div className="bg-[#141c2b] border border-white/6 rounded-xl p-4 space-y-2">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#4f72f8]" /> Booking Summary
              </h3>
              {[
                ["Route",     `${form.pickupCity} → ${form.deliveryCity}`],
                ["Cargo",     `${form.cargoType} (${form.cargoWeight} kg)`],
                ["Truck",     TRUCK_TYPES.find(t => t.value === form.truckType)?.label],
                ["Date",      form.scheduledDate],
                ["Est. Price",estimatedPrice ? formatCurrency(estimatedPrice) : "TBD by admin"],
              ].map(([key, val]) => (
                <div key={key as string} className="flex justify-between text-sm">
                  <span className="text-white/35">{key}</span>
                  <span className="font-medium text-white/70">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)}
              className="flex-1 border border-white/8 text-white/50 hover:text-white hover:border-white/15 py-2.5 rounded-xl font-medium transition-colors text-sm">
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => {
                if (step === 1 && (!form.pickupAddress || !form.pickupCity || !form.deliveryAddress || !form.deliveryCity)) {
                  setError("Please fill in all route details."); return;
                }
                if (step === 2 && (!form.cargoType || !form.cargoWeight || !form.truckType)) {
                  setError("Please fill in all cargo details."); return;
                }
                setError("");
                setStep(step + 1);
              }}
              className="flex-1 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white py-2.5 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#4f72f8]/20"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading || !form.scheduledDate}
              className="flex-1 bg-[#4f72f8] hover:bg-[#3b5bf0] disabled:opacity-40 text-white py-2.5 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#4f72f8]/20">
              {loading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><CheckCircle className="w-4 h-4" /> Confirm Booking</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
