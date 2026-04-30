"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { LayoutDashboard, Package, Users, UserCheck, Home, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard"  },
  { href: "/admin/orders",    icon: Package,         label: "All Orders" },
  { href: "/admin/drivers",   icon: UserCheck,       label: "Drivers"    },
  { href: "/admin/customers", icon: Users,           label: "Customers"  },
];

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.jpeg" alt="SteelLine Logistics" width={120} height={48} className="h-9 w-auto object-contain" />
        </Link>
        <button className="lg:hidden text-white/40 hover:text-white" onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 bg-white/5 border border-white/6 rounded-xl p-3">
          <div className="w-9 h-9 bg-[#4f72f8] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.name?.charAt(0) || "A"}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white text-sm truncate">{user.name}</div>
            <div className="text-xs text-white/35">Administrator</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        <p className="text-white/25 text-xs font-semibold uppercase px-3 mb-2 tracking-wider">Main Menu</p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#4f72f8] text-white shadow-lg shadow-[#4f72f8]/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/5 space-y-0.5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/5 hover:text-white transition-all">
          <Home className="w-4 h-4" /> View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-60 flex-col z-40 bg-[#080c14] border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-[#080c14]/95 backdrop-blur-xl border-b border-white/5 flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center text-white"
        >
          <Menu className="w-4.5 h-4.5" />
        </button>
        <Link href="/">
          <Image src="/logo.jpeg" alt="SteelLine Logistics" width={100} height={40} className="h-8 w-auto object-contain" />
        </Link>
        <span className="ml-auto text-xs text-white/30 bg-white/5 border border-white/8 px-2 py-1 rounded-lg">Admin</span>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex flex-col bg-[#080c14] border-r border-white/5 shadow-2xl shadow-black/60">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
