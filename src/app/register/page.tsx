"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle, CheckCircle, Shield } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { identifier: form.email, password: form.password, redirect: false });
    router.push("/customer/dashboard");
  }

  const inputClass = "w-full pl-10 pr-4 py-3 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors";

  return (
    <div className="min-h-screen flex bg-[#080c14]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#4f72f8]/10 rounded-full blur-[100px] pointer-events-none" />

        <Link href="/" className="relative z-10">
          <Image src="/logo.png" alt="SteelLine Logistics" width={150} height={60} className="h-12 w-auto object-contain" />
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#4f72f8]/10 border border-[#4f72f8]/25 text-[#7b9bff] text-sm px-4 py-2 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5" /> Free forever · No credit card
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Start shipping<br />
            <span className="text-[#4f72f8]">smarter today</span>
          </h1>
          <p className="text-white/45 text-lg mb-8">
            Create your free account and get access to India&apos;s most reliable logistics platform.
          </p>
          <div className="space-y-3">
            {[
              "Book trucks in minutes",
              "Real-time GPS tracking on every shipment",
              "Manage all orders from one dashboard",
              "24/7 dedicated customer support",
            ].map(f => (
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
          <Link href="/" className="lg:hidden flex justify-center mb-8">
            <Image src="/logo.png" alt="SteelLine Logistics" width={150} height={60} className="h-12 w-auto object-contain" />
          </Link>

          <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-8 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-black text-white mb-1">Create your account</h2>
            <p className="text-white/40 text-sm mb-6">Free forever. No credit card required.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-5 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input type="text" value={form.name} onChange={e => update("name", e.target.value)} required placeholder="Your full name" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required placeholder="you@example.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input type="password" value={form.password} onChange={e => update("password", e.target.value)} required placeholder="Min 6 chars" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input type="password" value={form.confirm} onChange={e => update("confirm", e.target.value)} required placeholder="Re-enter" className={inputClass} />
                  </div>
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
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <p className="text-sm text-white/35">
                Already have an account?{" "}
                <Link href="/login" className="text-[#4f72f8] font-semibold hover:text-[#7b9bff] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
