import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Users } from "lucide-react";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: { select: { bookings: true } },
      bookings: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl lg:text-2xl font-black text-white">Customers</h1>
        <p className="text-white/40 text-sm mt-0.5">{customers.length} registered customers</p>
      </div>

      <div className="bg-[#0f1520] border border-white/6 rounded-2xl overflow-hidden">
        {customers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/30">No customers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wider">
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden sm:table-cell">Phone</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium">Orders</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden md:table-cell">Last Booking</th>
                  <th className="px-4 lg:px-5 py-3 text-left font-medium hidden lg:table-cell">Member Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {customers.map((customer: (typeof customers)[number]) => (
                  <tr key={customer.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 lg:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#4f72f8] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{customer.name}</div>
                          <div className="text-white/30 text-xs truncate">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3 text-white/45 text-xs hidden sm:table-cell">{customer.phone || "—"}</td>
                    <td className="px-4 lg:px-5 py-3">
                      <span className="font-black text-[#4f72f8]">{customer._count.bookings}</span>
                    </td>
                    <td className="px-4 lg:px-5 py-3 text-white/35 text-xs hidden md:table-cell">
                      {customer.bookings[0] ? formatDate(customer.bookings[0].createdAt) : "Never"}
                    </td>
                    <td className="px-4 lg:px-5 py-3 text-white/35 text-xs hidden lg:table-cell">{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
