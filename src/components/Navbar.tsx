"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Package, LayoutDashboard, LogOut, User, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/services", label: "Services" },
  { href: "/track",    label: "Track"    },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const fn = () => setDropdownOpen(false);
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, [dropdownOpen]);

  const dashboardLink = session?.user?.role === "ADMIN" ? "/admin/dashboard" : "/customer/dashboard";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#080c14]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[88px]">

          {/* Logo */}
          <Link href="/" className="flex items-center h-full overflow-hidden">
            <Image src="/logo.png" alt="SteelLine Logistics" width={88} height={88} className="h-full w-auto object-contain scale-[1.6]" priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#4f72f8] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Auth + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 px-3 py-1.5 rounded-xl text-sm text-white transition-colors"
                >
                  <div className="w-6 h-6 bg-[#4f72f8] rounded-lg flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>{session.user.name?.split(" ")[0]}</span>
                  <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#0f1520] border border-white/8 text-white rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                    <Link href={dashboardLink} className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/5 text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 text-[#4f72f8]" /> Dashboard
                    </Link>
                    {session.user.role === "CUSTOMER" && (
                      <Link href="/customer/book" className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/5 text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                        <Package className="w-4 h-4 text-[#4f72f8]" /> Book a Truck
                      </Link>
                    )}
                    <div className="border-t border-white/8" />
                    <button onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2.5 px-4 py-3 hover:bg-red-500/10 text-sm text-red-400 w-full text-left transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <a href="tel:+919876543210"
                  className="flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#4f72f8]/25">
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-white/70 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0e18]/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href ? "bg-[#4f72f8]/10 text-[#4f72f8]" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}>
                {label}
              </Link>
            ))}
            <div className="border-t border-white/5 mt-2 pt-3 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href={dashboardLink} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-white/70 hover:text-white text-sm">Dashboard</Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left text-red-400 text-sm px-3 py-2">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-white/70 hover:text-white text-sm">Login</Link>
                  <a href="tel:+919876543210" className="bg-[#4f72f8] text-white px-4 py-2.5 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
