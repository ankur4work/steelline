"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, Package, PlusCircle, Home, LogOut, Menu, X
} from "lucide-react";

const navItems = [
  { href: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/customer/book", icon: PlusCircle, label: "Book a Truck" },
  { href: "/customer/orders", icon: Package, label: "My Shipments" },
];

interface CustomerSidebarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

export default function CustomerSidebar({ user }: CustomerSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/">
          <Image src="/logo.png" alt="SteelLine Logistics" width={120} height={48} className="h-9 w-auto object-contain" />
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 mx-3 mt-3 bg-[#4f72f8]/8 border border-[#4f72f8]/15 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#4f72f8] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white text-sm truncate">{user.name}</div>
            <div className="text-xs text-white/35 truncate">{user.email}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 mt-2 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/customer/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#4f72f8] text-white shadow-lg shadow-[#4f72f8]/20"
                  : "text-white/45 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/5 space-y-0.5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/5 hover:text-white/70 transition-all">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:bg-red-500/8 hover:text-red-400 transition-all w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-[#080c14] border-r border-white/5 flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#080c14]/95 backdrop-blur-xl border-b border-white/5 flex items-center px-4 z-40">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href="/" className="ml-3">
          <Image src="/logo.png" alt="SteelLine Logistics" width={100} height={40} className="h-7 w-auto object-contain" />
        </Link>
        <div className="ml-auto text-xs text-white/30">{user.name?.split(" ")[0]}</div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 bg-[#080c14] border-r border-white/5 flex flex-col shadow-2xl">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
