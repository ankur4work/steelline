import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, Truck, ArrowRight, Plus } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatCurrency } from "@/lib/utils";

export default async function CustomerOrdersPage() {
  const session = await auth();

  const bookings = await prisma.booking.findMany({
    where: { customerId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { driver: { include: { user: { select: { name: true } } } } },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white">My Shipments</h1>
          <p className="text-white/40 text-sm mt-1">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/customer/book"
          className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#4f72f8]/20">
          <Plus className="w-4 h-4" /> New Booking
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#0f1520] border border-white/6 rounded-2xl text-center py-16">
          <Package className="w-16 h-16 text-white/8 mx-auto mb-4" />
          <h3 className="font-black text-white/50 text-lg">No shipments found</h3>
          <p className="text-white/25 text-sm mt-2">Book your first truck to get started.</p>
          <Link href="/customer/book"
            className="inline-flex items-center gap-2 mt-5 bg-[#4f72f8] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#3b5bf0] transition-colors shadow-lg shadow-[#4f72f8]/20">
            <Plus className="w-4 h-4" /> Book a Truck
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map(booking => {
            const status = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
            return (
              <Link
                key={booking.id}
                href={`/customer/orders/${booking.id}`}
                className="block bg-[#0f1520] border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#4f72f8]/12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-[#4f72f8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-black text-white">{booking.bookingNo}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status?.color}`}>
                        {status?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/40">
                      <span>📍 {booking.pickupCity} → {booking.deliveryCity}</span>
                      <span>🚛 {booking.truckType.replace(/_/g, " ")}</span>
                      <span>⚖️ {booking.cargoWeight} kg</span>
                    </div>
                    {booking.driver && (
                      <p className="text-xs text-green-400/70 mt-1.5 font-medium">
                        Driver: {booking.driver.user.name} • {booking.driver.vehicleNo}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                    <span className="font-black text-white">
                      {booking.estimatedPrice ? formatCurrency(booking.estimatedPrice) : "—"}
                    </span>
                    <span className="text-xs text-white/30">{formatDate(booking.createdAt)}</span>
                    <ArrowRight className="w-4 h-4 text-white/20 mt-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
