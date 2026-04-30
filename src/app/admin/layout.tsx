import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/customer/dashboard");

  return (
    <div className="flex min-h-screen bg-[#080c14]">
      <AdminSidebar user={session.user} />
      {/* pt-14 on mobile for the fixed top bar, lg:ml-60 for desktop sidebar */}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 p-4 lg:p-6 min-w-0">
        {children}
      </main>
    </div>
  );
}
