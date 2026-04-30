import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, Truck, Calendar, User, CheckCircle, Clock } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatDateTime, formatCurrency, TRUCK_TYPES } from "@/lib/utils";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id, customerId: session!.user.id },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      driver: { include: { user: { select: { name: true, phone: true } } } },
      statusUpdates: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!booking) notFound();

  const status = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
  const truckLabel = TRUCK_TYPES.find(t => t.value === booking.truckType)?.label || booking.truckType;

  const statusOrder = ["PENDING", "CONFIRMED", "DRIVER_ASSIGNED", "IN_TRANSIT", "DELIVERED"];
  const currentStep = statusOrder.indexOf(booking.status);

  const cardClass = "bg-[#0f1520] border border-white/6 rounded-2xl p-5";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customer/orders" className="text-white/30 hover:text-white/70 transition-colors p-1">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-black text-white">Shipment #{booking.bookingNo}</h1>
          <p className="text-white/35 text-xs">Booked on {formatDate(booking.createdAt)}</p>
        </div>
        <span className={`ml-auto text-xs px-3 py-1.5 rounded-full font-medium ${status?.color}`}>
          {status?.label}
        </span>
      </div>

      {/* Progress Tracker */}
      {booking.status !== "CANCELLED" && (
        <div className={`${cardClass} mb-4`}>
          <h2 className="font-black text-white text-sm mb-5">Shipment Progress</h2>
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/8 rounded-full" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-[#4f72f8] rounded-full transition-all"
              style={{ width: `${(currentStep / (statusOrder.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {statusOrder.map((s, i) => {
                const sInfo = BOOKING_STATUSES[s as keyof typeof BOOKING_STATUSES];
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${
                      done ? "bg-[#4f72f8] text-white" : "bg-white/5 text-white/20"
                    } ${active ? "ring-4 ring-[#4f72f8]/20 shadow-lg shadow-[#4f72f8]/30" : ""}`}>
                      {done && i < currentStep ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs mt-2 text-center max-w-16 leading-tight ${
                      active ? "text-[#4f72f8] font-semibold" : done ? "text-white/50" : "text-white/20"
                    }`}>
                      {sInfo?.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Route */}
        <div className={cardClass}>
          <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#4f72f8]" /> Route Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-white/30 uppercase tracking-wider">From</span>
              <p className="text-sm font-medium text-white/80 mt-0.5">{booking.pickupAddress}</p>
              <p className="text-xs text-white/35">{booking.pickupCity}</p>
            </div>
            <div className="border-l-2 border-dashed border-[#4f72f8]/30 ml-2 pl-3 py-1">
              <span className="text-xs text-[#4f72f8]/60">In Transit</span>
            </div>
            <div>
              <span className="text-xs text-white/30 uppercase tracking-wider">To</span>
              <p className="text-sm font-medium text-white/80 mt-0.5">{booking.deliveryAddress}</p>
              <p className="text-xs text-white/35">{booking.deliveryCity}</p>
            </div>
          </div>
        </div>

        {/* Cargo */}
        <div className={cardClass}>
          <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#4f72f8]" /> Cargo Details
          </h3>
          <div className="space-y-2 text-sm">
            {[
              ["Cargo Type",  booking.cargoType],
              ["Weight",      `${booking.cargoWeight} kg`],
              ["Truck",       truckLabel],
              ["Scheduled",   formatDate(booking.scheduledDate)],
              ["Amount",      booking.estimatedPrice ? formatCurrency(booking.estimatedPrice) : "TBD by admin"],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between">
                <span className="text-white/35">{k}</span>
                <span className="font-medium text-white/70">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver Info */}
      {booking.driver && (
        <div className={`${cardClass} mb-4`}>
          <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#4f72f8]" /> Assigned Driver
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4f72f8] rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {booking.driver.user.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-white">{booking.driver.user.name}</p>
              <p className="text-sm text-white/40">📞 {booking.driver.user.phone}</p>
              <p className="text-sm text-white/40">🚛 {booking.driver.vehicleNo} • {booking.driver.vehicleType.replace(/_/g, " ")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Status Timeline */}
      <div className={cardClass}>
        <h3 className="font-black text-white text-sm mb-5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4f72f8]" /> Status Timeline
        </h3>
        <div className="space-y-4">
          {booking.statusUpdates.map((update, i) => {
            const s = BOOKING_STATUSES[update.status as keyof typeof BOOKING_STATUSES];
            const isLatest = i === booking.statusUpdates.length - 1;
            return (
              <div key={update.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${isLatest ? "bg-[#4f72f8]" : "bg-white/15"}`} />
                  {!isLatest && <div className="w-0.5 flex-1 bg-white/5 mt-1" />}
                </div>
                <div className="pb-4">
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

      {booking.notes && (
        <div className="mt-4 bg-[#4f72f8]/8 border border-[#4f72f8]/15 rounded-xl p-4">
          <p className="text-sm text-[#7b9bff]"><strong>Notes:</strong> {booking.notes}</p>
        </div>
      )}
    </div>
  );
}
