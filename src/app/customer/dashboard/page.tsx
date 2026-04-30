import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, ArrowRight, Plus } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatCurrency } from "@/lib/utils";

export default async function CustomerDashboard() {
  const session = await auth();

  const [bookings, counts] = await Promise.all([
    prisma.booking.findMany({
      where: { customerId: session!.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { driver: { include: { user: { select: { name: true } } } } },
    }),
    prisma.booking.groupBy({
      by: ["status"],
      where: { customerId: session!.user.id },
      _count: true,
    }),
  ]);

  const total = bookings.length > 0 ? await prisma.booking.count({ where: { customerId: session!.user.id } }) : 0;
  const active = counts.find((c: (typeof counts)[number]) => c.status === "IN_TRANSIT")?._count || 0;
  const delivered = counts.find((c: (typeof counts)[number]) => c.status === "DELIVERED")?._count || 0;
  const pending = counts.find((c: (typeof counts)[number]) => c.status === "PENDING")?._count || 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white">
            Welcome back, {session!.user.name?.split(" ")[0]}!
          </h1>
          <p className="text-white/40 text-sm mt-1">Here&apos;s an overview of your shipments.</p>
        </div>
        <Link href="/customer/book"
          className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#4f72f8]/20">
          <Plus className="w-4 h-4" /> Book Truck
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Bookings",   value: total,     icon: Package,     accent: "text-[#4f72f8]", bg: "bg-[#4f72f8]/10" },
          { label: "Active Shipments", value: active,    icon: Truck,       accent: "text-blue-400",  bg: "bg-blue-400/10"  },
          { label: "Delivered",        value: delivered, icon: CheckCircle, accent: "text-green-400", bg: "bg-green-400/10" },
          { label: "Pending",          value: pending,   icon: Clock,       accent: "text-yellow-400",bg: "bg-yellow-400/10"},
        ].map(({ label, value, icon: Icon, accent, bg }) => (
          <div key={label} className="bg-[#0f1520] border border-white/6 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
              <Icon className={`w-4.5 h-4.5 ${accent}`} />
            </div>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-white/35 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#0f1520] border border-white/6 rounded-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="font-black text-white text-sm">Recent Shipments</h2>
          <Link href="/customer/orders" className="text-sm text-[#4f72f8] hover:text-[#7b9bff] flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/40 font-medium">No shipments yet</p>
            <p className="text-white/25 text-sm mt-1">Book your first truck to get started</p>
            <Link href="/customer/book"
              className="inline-flex items-center gap-2 mt-4 bg-[#4f72f8] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#3b5bf0] transition-colors">
              <Plus className="w-4 h-4" /> Book Now
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/4">
            {bookings.map((booking: (typeof bookings)[number]) => {
              const status = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
              return (
                <Link
                  key={booking.id}
                  href={`/customer/orders/${booking.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors"
                >
                  <div className="w-9 h-9 bg-[#4f72f8]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-[#4f72f8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-white text-sm">{booking.bookingNo}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status?.color}`}>
                        {status?.label}
                      </span>
                    </div>
                    <p className="text-white/35 text-xs truncate">
                      {booking.pickupCity} → {booking.deliveryCity} • {booking.truckType.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-white">
                      {booking.estimatedPrice ? formatCurrency(booking.estimatedPrice) : "—"}
                    </div>
                    <div className="text-xs text-white/30">{formatDate(booking.createdAt)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
