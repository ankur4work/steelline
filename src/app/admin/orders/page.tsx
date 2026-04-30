import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatCurrency } from "@/lib/utils";

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status, q } = await searchParams;

  const bookings = await prisma.booking.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q ? {
        OR: [
          { bookingNo: { contains: q } },
          { pickupCity: { contains: q } },
          { deliveryCity: { contains: q } },
          { customer: { name: { contains: q } } },
        ],
      } : {}),
    },
    include: {
      customer: { select: { name: true, email: true } },
      driver: { include: { user: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white">All Orders</h1>
          <p className="text-white/40 text-sm mt-0.5">{bookings.length} orders found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <form className="relative flex-1 min-w-0">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search booking, customer, city..."
              className="w-full pl-4 pr-4 py-2.5 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors"
            />
          </form>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "All", value: "" },
              ...Object.entries(BOOKING_STATUSES).map(([k, v]) => ({ label: v.label, value: k })),
            ].map(({ label, value }) => (
              <Link
                key={value}
                href={`/admin/orders?${value ? `status=${value}` : ""}${q ? `&q=${q}` : ""}`}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-colors whitespace-nowrap ${
                  (status || "") === value
                    ? "bg-[#4f72f8] text-white border-[#4f72f8] shadow-lg shadow-[#4f72f8]/20"
                    : "border-white/8 text-white/40 hover:border-[#4f72f8]/40 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1520] border border-white/6 rounded-2xl overflow-hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 font-medium">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wider">
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Booking ID</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Route</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden md:table-cell">Truck</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Driver</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden sm:table-cell">Amount</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden lg:table-cell">Date</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {bookings.map((booking: (typeof bookings)[number]) => {
                  const st = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
                  return (
                    <tr key={booking.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-4 lg:px-5 py-3 font-bold text-[#4f72f8] text-xs whitespace-nowrap">{booking.bookingNo}</td>
                      <td className="px-4 lg:px-5 py-3">
                        <div className="font-medium text-white text-xs">{booking.customer.name}</div>
                        <div className="text-white/30 text-xs hidden sm:block">{booking.customer.email}</div>
                      </td>
                      <td className="px-4 lg:px-5 py-3 text-white/45 text-xs whitespace-nowrap">{booking.pickupCity} → {booking.deliveryCity}</td>
                      <td className="px-4 lg:px-5 py-3 text-white/40 text-xs hidden md:table-cell">{booking.truckType.replace(/_/g, " ")}</td>
                      <td className="px-4 lg:px-5 py-3 text-xs">
                        {booking.driver
                          ? <span className="text-green-400 font-medium">{booking.driver.user.name}</span>
                          : <span className="text-yellow-500">Unassigned</span>}
                      </td>
                      <td className="px-4 lg:px-5 py-3 font-bold text-white hidden sm:table-cell text-xs">
                        {booking.estimatedPrice ? formatCurrency(booking.estimatedPrice) : "—"}
                      </td>
                      <td className="px-4 lg:px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${st?.color}`}>{st?.label}</span>
                      </td>
                      <td className="px-4 lg:px-5 py-3 text-white/30 text-xs hidden lg:table-cell whitespace-nowrap">{formatDate(booking.createdAt)}</td>
                      <td className="px-4 lg:px-5 py-3">
                        <Link href={`/admin/orders/${booking.id}`}
                          className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white text-xs px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
