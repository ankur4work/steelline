"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, MapPin, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatDateTime, formatCurrency, TRUCK_TYPES } from "@/lib/utils";

interface Booking {
  id: string;
  bookingNo: string;
  status: string;
  pickupCity: string;
  deliveryCity: string;
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  cargoWeight: number;
  truckType: string;
  scheduledDate: string;
  estimatedPrice: number | null;
  customer: { name: string };
  driver: { user: { name: string; phone: string | null }; vehicleNo: string; vehicleType: string } | null;
  statusUpdates: { id: string; status: string; message: string; location: string | null; createdAt: string }[];
}

const statusOrder = ["PENDING", "CONFIRMED", "DRIVER_ASSIGNED", "IN_TRANSIT", "DELIVERED"];

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooking(null);

    const res = await fetch(`/api/track?q=${encodeURIComponent(query.trim())}`);
    setLoading(false);

    if (!res.ok) {
      setError("Booking not found. Please check your booking number and try again.");
      return;
    }

    const data = await res.json();
    setBooking(data);
  }

  const currentStep = booking ? statusOrder.indexOf(booking.status) : -1;
  const truckLabel = booking ? TRUCK_TYPES.find(t => t.value === booking.truckType)?.label || booking.truckType : "";

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14]">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-14 bg-[#0a0e18] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4f72f8]/8 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Live Tracking</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Track Your Shipment</h1>
          <p className="text-white/40 mb-8">Enter your booking number to get real-time status updates.</p>

          <form onSubmit={handleSearch} className="flex gap-2 bg-[#0f1520] border border-white/8 rounded-2xl p-2 shadow-2xl shadow-black/40">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-5 h-5 text-white/25 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter booking number (e.g., SLL-123456-789)"
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/20 min-w-0"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex-shrink-0 shadow-lg shadow-[#4f72f8]/20"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Track"}
            </button>
          </form>
        </div>
      </section>

      <section className="flex-1 py-10 bg-[#080c14]">
        <div className="max-w-3xl mx-auto px-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 flex items-center gap-3 mb-5">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          {booking && (
            <div className="space-y-4">
              {/* Header */}
              <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-5 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-black text-white">{booking.bookingNo}</h2>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES]?.color}`}>
                      {BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES]?.label}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm mt-1">{booking.pickupCity} → {booking.deliveryCity}</p>
                </div>
                {booking.estimatedPrice && (
                  <div className="text-right">
                    <div className="text-xs text-white/35">Estimated Price</div>
                    <div className="font-black text-[#4f72f8] text-lg">{formatCurrency(booking.estimatedPrice)}</div>
                  </div>
                )}
              </div>

              {/* Progress */}
              {booking.status !== "CANCELLED" && (
                <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-6">Live Progress</h3>
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-white/5 rounded-full" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-[#4f72f8] rounded-full transition-all duration-500 shadow-lg shadow-[#4f72f8]/30"
                      style={{ width: `${Math.max(0, (currentStep / (statusOrder.length - 1)) * 100)}%` }}
                    />
                    <div className="relative flex justify-between">
                      {statusOrder.map((s, i) => {
                        const sInfo = BOOKING_STATUSES[s as keyof typeof BOOKING_STATUSES];
                        const done = i <= currentStep;
                        return (
                          <div key={s} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                              done
                                ? "bg-[#4f72f8] border-[#4f72f8] text-white shadow-lg shadow-[#4f72f8]/30"
                                : "bg-[#0f1520] border-white/10 text-white/30"
                            }`}>
                              {done && i < currentStep ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            <span className={`text-xs mt-2 hidden sm:block text-center max-w-14 leading-tight ${done ? "text-[#4f72f8] font-medium" : "text-white/25"}`}>
                              {sInfo?.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cargo Details */}
                <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-5">
                  <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#4f72f8]" /> Cargo Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Cargo", booking.cargoType],
                      ["Weight", `${booking.cargoWeight} kg`],
                      ["Truck", truckLabel],
                      ["Scheduled", formatDate(booking.scheduledDate)],
                    ].map(([k, v]) => (
                      <div key={k as string} className="flex justify-between">
                        <span className="text-white/35">{k}</span>
                        <span className="font-medium text-white/70">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Driver */}
                {booking.driver ? (
                  <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-5">
                    <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#4f72f8]" /> Your Driver
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#4f72f8] rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {booking.driver.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{booking.driver.user.name}</p>
                        <p className="text-sm text-white/40">📞 {booking.driver.user.phone}</p>
                        <p className="text-sm text-white/40">🚛 {booking.driver.vehicleNo}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#4f72f8]/8 border border-[#4f72f8]/15 rounded-2xl p-5 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-[#4f72f8]" />
                    <div>
                      <p className="font-bold text-white">Driver Being Assigned</p>
                      <p className="text-sm text-white/40">A driver will be assigned shortly.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#4f72f8]" /> Status History
                </h3>
                <div className="space-y-4">
                  {[...booking.statusUpdates].reverse().map((update, i) => {
                    const s = BOOKING_STATUSES[update.status as keyof typeof BOOKING_STATUSES];
                    return (
                      <div key={update.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${i === 0 ? "bg-[#4f72f8]" : "bg-white/15"}`} />
                          {i < booking.statusUpdates.length - 1 && <div className="w-0.5 flex-1 bg-white/5 mt-1" />}
                        </div>
                        <div className="pb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s?.color}`}>{s?.label}</span>
                            {update.location && <span className="text-xs text-white/30">📍 {update.location}</span>}
                          </div>
                          <p className="text-sm text-white/60 mt-1">{update.message}</p>
                          <p className="text-xs text-white/25 mt-0.5">{formatDateTime(update.createdAt)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!booking && !error && !loading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#4f72f8]/10 border border-[#4f72f8]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-9 h-9 text-[#4f72f8]" />
              </div>
              <h3 className="font-bold text-white text-lg">Enter your booking number</h3>
              <p className="text-white/35 text-sm mt-2">You can find it in your booking confirmation email or SMS.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
