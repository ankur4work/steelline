"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Truck, AlertCircle, MapPin } from "lucide-react";
import { BOOKING_STATUSES } from "@/lib/utils";

interface Driver {
  id: string;
  name: string;
  vehicleNo: string;
  vehicleType: string;
}

interface AdminOrderActionsProps {
  booking: { id: string; status: string; driverId: string | null };
  drivers: Driver[];
  currentDriver: { name: string; phone: string | null; vehicleNo: string } | null;
}

const STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING:         ["CONFIRMED", "CANCELLED"],
  CONFIRMED:       ["DRIVER_ASSIGNED", "CANCELLED"],
  DRIVER_ASSIGNED: ["IN_TRANSIT", "CANCELLED"],
  IN_TRANSIT:      ["DELIVERED"],
  DELIVERED:       [],
  CANCELLED:       [],
};

const inputClass = "w-full px-3 py-2.5 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors";

export default function AdminOrderActions({ booking, drivers, currentDriver }: AdminOrderActionsProps) {
  const router = useRouter();
  const [selectedDriver, setSelectedDriver] = useState(booking.driverId || "");
  const [message, setMessage]       = useState("");
  const [location, setLocation]     = useState("");
  const [billingAmount, setBilling] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  const nextStatuses = STATUS_TRANSITIONS[booking.status] || [];

  async function updateStatus(newStatus: string) {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const body: Record<string, string> = { status: newStatus };
      if (newStatus === "DRIVER_ASSIGNED" && selectedDriver) body.driverId = selectedDriver;
      if (message)       body.message       = message;
      if (location)      body.location      = location;
      if (billingAmount) body.billingAmount = billingAmount;

      const res = await fetch(`/api/admin/orders/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update order");
      }

      setSuccess(`Status updated to ${BOOKING_STATUSES[newStatus as keyof typeof BOOKING_STATUSES]?.label}`);
      setMessage("");
      setLocation("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const cardClass = "bg-[#0f1520] border border-white/6 rounded-2xl p-4";

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" /> {success}
        </div>
      )}

      {/* Current Driver */}
      {currentDriver && (
        <div className={cardClass}>
          <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#4f72f8]" /> Assigned Driver
          </h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4f72f8] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
              {currentDriver.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{currentDriver.name}</p>
              <p className="text-xs text-white/35">{currentDriver.vehicleNo}</p>
              <p className="text-xs text-white/35">📞 {currentDriver.phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions Panel */}
      {nextStatuses.length > 0 && (
        <div className={cardClass}>
          <h4 className="font-bold text-white text-sm mb-4">Update Order Status</h4>

          {(booking.status === "CONFIRMED" || booking.status === "PENDING") && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-white/40 mb-1.5">
                Assign Driver
              </label>
              <select
                value={selectedDriver}
                onChange={e => setSelectedDriver(e.target.value)}
                className={inputClass + " bg-[#141c2b]"}
              >
                <option value="">-- Select available driver --</option>
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} • {d.vehicleNo} ({d.vehicleType.replace(/_/g, " ")})
                  </option>
                ))}
              </select>
              {drivers.length === 0 && (
                <p className="text-xs text-[#4f72f8] mt-1">No available drivers right now.</p>
              )}
            </div>
          )}

          {(booking.status === "IN_TRANSIT" || booking.status === "DRIVER_ASSIGNED") && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-white/40 mb-1.5">
                Current Location (optional)
              </label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g., Nagpur, Maharashtra"
                className={inputClass}
              />
            </div>
          )}

          {/* Billing Amount */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/40 mb-1.5">
              Set Billing Amount (₹) <span className="text-white/20 font-normal">— overrides estimate</span>
            </label>
            <input
              type="number"
              value={billingAmount}
              onChange={e => setBilling(e.target.value)}
              placeholder="e.g. 12500"
              min="0"
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-white/40 mb-1.5">Update Message (optional)</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              placeholder="Custom message for the customer..."
              className={inputClass + " resize-none"}
            />
          </div>

          <div className="space-y-2">
            {nextStatuses.map(ns => {
              const nsInfo = BOOKING_STATUSES[ns as keyof typeof BOOKING_STATUSES];
              const disabled = loading || (ns === "DRIVER_ASSIGNED" && !selectedDriver);

              const btnColors: Record<string, string> = {
                CONFIRMED:       "bg-blue-500 hover:bg-blue-600",
                DRIVER_ASSIGNED: "bg-purple-500 hover:bg-purple-600",
                IN_TRANSIT:      "bg-[#4f72f8] hover:bg-[#3b5bf0]",
                DELIVERED:       "bg-green-500 hover:bg-green-600",
                CANCELLED:       "bg-red-500 hover:bg-red-600",
              };

              return (
                <button
                  key={ns}
                  onClick={() => updateStatus(ns)}
                  disabled={disabled}
                  className={`w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg ${btnColors[ns] || "bg-white/10"}`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    `Mark as ${nsInfo?.label}`
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {nextStatuses.length === 0 && (
        <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-4 text-center text-sm text-white/30">
          This order is {booking.status === "DELIVERED" ? "completed ✓" : "cancelled"}. No further actions needed.
        </div>
      )}
    </div>
  );
}
