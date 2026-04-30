import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, Users, ArrowRight, TrendingUp } from "lucide-react";
import { BOOKING_STATUSES, formatDate, formatCurrency } from "@/lib/utils";

export default async function AdminDashboard() {
  const [total, pending, confirmed, inTransit, delivered, cancelled, drivers, customers, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "IN_TRANSIT" } }),
    prisma.booking.count({ where: { status: "DELIVERED" } }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.driver.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.booking.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true } },
        driver: { include: { user: { select: { name: true } } } },
      },
    }),
  ]);

  const stats = [
    { label: "Total Orders",   value: total,    icon: Package,     color: "bg-[#4f72f8]/10 text-[#4f72f8]",   change: `${pending} pending` },
    { label: "In Transit",     value: inTransit, icon: Truck,       color: "bg-blue-500/10 text-blue-400",      change: `${confirmed} confirmed` },
    { label: "Delivered",      value: delivered, icon: CheckCircle, color: "bg-green-500/10 text-green-400",    change: "completed" },
    { label: "Pending Review", value: pending,   icon: Clock,       color: "bg-yellow-500/10 text-yellow-400",  change: "need action" },
    { label: "Active Drivers", value: drivers,   icon: Truck,       color: "bg-purple-500/10 text-purple-400",  change: "on platform" },
    { label: "Customers",      value: customers, icon: Users,       color: "bg-teal-500/10 text-teal-400",      change: "registered" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-black text-white">Admin Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of all logistics operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-[#0f1520] border border-white/6 rounded-2xl p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/30 hidden sm:block">{change}</span>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white">{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Status Breakdown */}
      <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-4 lg:p-5 mb-4">
        <h2 className="font-bold text-white mb-4 text-sm">Order Status Breakdown</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Object.entries(BOOKING_STATUSES).map(([key, { label, color }]) => {
            const count = key === "PENDING" ? pending : key === "CONFIRMED" ? confirmed : key === "IN_TRANSIT" ? inTransit : key === "DELIVERED" ? delivered : key === "CANCELLED" ? cancelled : 0;
            return (
              <div key={key} className="text-center">
                <div className="text-xl font-black text-white">{count}</div>
                <div className={`text-xs px-2 py-1 rounded-full mt-1 ${color}`}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#0f1520] border border-white/6 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-white/5">
          <h2 className="font-bold text-white text-sm">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-[#4f72f8] hover:text-[#7b9bff] flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-12 text-white/30">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wider">
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Booking</th>
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Route</th>
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Driver</th>
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-4 lg:px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {recentBookings.map(booking => {
                  const status = BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES];
                  return (
                    <tr key={booking.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-4 lg:px-6 py-3 font-bold text-[#4f72f8] text-xs">{booking.bookingNo}</td>
                      <td className="px-4 lg:px-6 py-3 text-white/70 text-xs">{booking.customer.name}</td>
                      <td className="px-4 lg:px-6 py-3 text-white/40 text-xs whitespace-nowrap">{booking.pickupCity} → {booking.deliveryCity}</td>
                      <td className="px-4 lg:px-6 py-3 text-xs">
                        {booking.driver
                          ? <span className="text-green-400">{booking.driver.user.name}</span>
                          : <span className="text-yellow-500">Unassigned</span>}
                      </td>
                      <td className="px-4 lg:px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${status?.color}`}>{status?.label}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-3">
                        <Link href={`/admin/orders/${booking.id}`} className="text-[#4f72f8] hover:text-[#7b9bff] font-medium text-xs transition-colors">
                          Manage →
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
