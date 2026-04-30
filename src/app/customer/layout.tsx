import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CustomerSidebar from "@/components/customer/CustomerSidebar";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin/dashboard");

  return (
    <div className="flex min-h-screen bg-[#080c14]">
      <CustomerSidebar user={session.user} />
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 p-4 lg:p-6 min-w-0">
        {children}
      </main>
    </div>
  );
}
