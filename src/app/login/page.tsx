"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, ArrowRight, AlertCircle, CheckCircle, Shield, UserCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", { identifier, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/customer/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex bg-[#080c14]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#4f72f8]/10 rounded-full blur-[100px] pointer-events-none" />

        <Link href="/" className="relative z-10">
          <Image src="/logo.png" alt="SteelLine Logistics" width={150} height={60} className="h-12 w-auto object-contain" />
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#4f72f8]/10 border border-[#4f72f8]/25 text-[#7b9bff] text-sm px-4 py-2 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5" /> Trusted by 5,000+ businesses
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Welcome back to<br />
            <span className="text-[#4f72f8]">Steelline Logistics</span>
          </h1>
          <p className="text-white/45 text-lg mb-8">
            Manage your shipments, track deliveries, and book trucks — all in one place.
          </p>
          <div className="space-y-3">
            {["Real-time shipment tracking", "Instant price estimates", "24/7 customer support", "Insured freight options"].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/55">
                <CheckCircle className="w-4.5 h-4.5 text-[#4f72f8] flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-sm relative z-10">© 2026 SteelLine Logistics Pvt. Ltd. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0a0e18]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex justify-center mb-8">
            <Image src="/logo.png" alt="SteelLine Logistics" width={150} height={60} className="h-12 w-auto object-contain" />
          </Link>

          <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-8 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-black text-white mb-1">Sign in to your account</h2>
            <p className="text-white/40 text-sm mb-6">Enter your credentials to access your dashboard</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-5 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Email or Phone Number</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    required
                    placeholder="you@example.com or +91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4f72f8] hover:bg-[#3b5bf0] disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#4f72f8]/20 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <p className="text-sm text-white/35">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#4f72f8] font-semibold hover:text-[#7b9bff] transition-colors">
                  Create one free
                </Link>
              </p>
            </div>

            <div className="mt-4 p-3 bg-[#4f72f8]/8 border border-[#4f72f8]/15 rounded-xl text-xs text-[#7b9bff]">
              <strong>Demo:</strong> Register a new account or seed via <code className="bg-[#4f72f8]/15 px-1 rounded">npm run seed</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
