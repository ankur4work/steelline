import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatDateTime, formatCurrency, TRUCK_TYPES } from "@/lib/utils";
import AdminOrderActions from "@/components/admin/AdminOrderActions";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [booking, drivers] = await Promise.all([
    prisma.booking.findUnique({
      where: { id },
      include: {
        customer: { select: { name: true, email: true, phone: true } },
        driver: { include: { user: { select: { name: true, phone: true } } } },
        statusUpdates: { orderBy: { createdAt: "asc" } },
      },
    }),
    prisma.driver.findMany({
      where: { isAvailable: true },
      include: { user: { select: { name: true, phone: true } } },
    }),
  ]);

  if (!booking) notFound();

  const status = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
  const truckLabel = TRUCK_TYPES.find(t => t.value === booking.truckType)?.label || booking.truckType;

  const cardClass = "bg-[#0f1520] border border-white/6 rounded-2xl p-4 lg:p-5";
  const labelClass = "text-xs text-white/35 uppercase tracking-wider";
  const valueClass = "font-medium text-white text-sm mt-0.5";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/admin/orders" className="text-white/30 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg lg:text-xl font-black text-white truncate">Order #{booking.bookingNo}</h1>
          <p className="text-white/35 text-xs">Received on {formatDate(booking.createdAt)}</p>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium flex-shrink-0 ${status?.color}`}>
          {status?.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Customer */}
          <div className={cardClass}>
            <h3 className="font-bold text-white mb-3 text-sm">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                ["Name",  booking.customer.name],
                ["Email", booking.customer.email],
                ["Phone", booking.customer.phone || "—"],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <p className={labelClass}>{k}</p>
                  <p className={valueClass}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment */}
          <div className={cardClass}>
            <h3 className="font-bold text-white mb-3 text-sm">Shipment Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                ["Pickup",       booking.pickupAddress],
                ["Pickup City",  booking.pickupCity],
                ["Delivery",     booking.deliveryAddress],
                ["Delivery City",booking.deliveryCity],
                ["Cargo Type",   booking.cargoType],
                ["Weight",       `${booking.cargoWeight} kg`],
                ["Truck Type",   truckLabel],
                ["Scheduled",    formatDate(booking.scheduledDate)],
                ["Est. Price",   booking.estimatedPrice ? formatCurrency(booking.estimatedPrice) : "TBD"],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <p className={labelClass}>{k}</p>
                  <p className={valueClass}>{v}</p>
                </div>
              ))}
            </div>
            {booking.notes && (
              <div className="mt-3 p-3 bg-yellow-500/8 border border-yellow-500/15 rounded-xl text-sm text-yellow-300">
                <strong>Notes:</strong> {booking.notes}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className={cardClass}>
            <h3 className="font-bold text-white mb-4 text-sm">Status Timeline</h3>
            <div className="space-y-4">
              {booking.statusUpdates.map((update, i) => {
                const s = BOOKING_STATUSES[update.status as keyof typeof BOOKING_STATUSES];
                return (
                  <div key={update.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${i === booking.statusUpdates.length - 1 ? "bg-[#4f72f8]" : "bg-white/15"}`} />
                      {i < booking.statusUpdates.length - 1 && <div className="w-0.5 flex-1 bg-white/5 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s?.color}`}>{s?.label}</span>
                        {update.location && <span className="text-xs text-white/30">📍 {update.location}</span>}
                        {update.updatedBy && <span className="text-xs text-white/25">by {update.updatedBy}</span>}
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

        {/* Right: Actions */}
        <div>
          <AdminOrderActions
            booking={{ id: booking.id, status: booking.status, driverId: booking.driverId }}
            drivers={drivers.map(d => ({ id: d.id, name: d.user.name, vehicleNo: d.vehicleNo, vehicleType: d.vehicleType }))}
            currentDriver={booking.driver ? { name: booking.driver.user.name, phone: booking.driver.user.phone, vehicleNo: booking.driver.vehicleNo } : null}
          />
        </div>
      </div>
    </div>
  );
}
