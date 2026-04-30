import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { UserCheck } from "lucide-react";
import AddDriverModal from "@/components/admin/AddDriverModal";

export default async function AdminDriversPage() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: { select: { name: true, email: true, phone: true } },
      bookings: { where: { status: { in: ["IN_TRANSIT", "DRIVER_ASSIGNED"] } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white">Drivers</h1>
          <p className="text-white/40 text-sm mt-0.5">{drivers.length} registered drivers</p>
        </div>
        <AddDriverModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map(driver => (
          <div key={driver.id} className="bg-[#0f1520] border border-white/6 rounded-2xl p-5 hover:border-[#4f72f8]/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-[#4f72f8] rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {driver.user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate">{driver.user.name}</p>
                <p className="text-xs text-white/35 truncate">{driver.user.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                driver.isAvailable ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
              }`}>
                {driver.isAvailable ? "Available" : "On Trip"}
              </span>
            </div>

            <div className="space-y-2 text-sm border-t border-white/5 pt-3">
              {[
                ["📱 Phone",       driver.user.phone || "—"],
                ["🪪 License",     driver.licenseNo],
                ["🚛 Vehicle",     `${driver.vehicleNo} (${driver.vehicleType.replace(/_/g, " ")})`],
                ["📅 Joined",      formatDate(driver.createdAt)],
                ["📦 Active Trips",driver.bookings.length],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-2">
                  <span className="text-white/35 text-xs">{k}</span>
                  <span className="font-medium text-white/70 text-xs text-right truncate">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {drivers.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-16 bg-[#0f1520] border border-white/6 rounded-2xl">
            <UserCheck className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 font-medium">No drivers yet</p>
            <p className="text-white/20 text-sm">Add your first driver to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
