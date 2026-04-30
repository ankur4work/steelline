"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, AlertCircle } from "lucide-react";

const VEHICLE_TYPES = ["MINI_TRUCK", "PICKUP", "MEDIUM_TRUCK", "LARGE_TRUCK", "TRAILER", "FLATBED"];

const inputClass = "w-full px-3 py-2.5 bg-[#141c2b] border border-white/8 text-white placeholder:text-white/20 rounded-xl text-sm focus:border-[#4f72f8] outline-none transition-colors";

export default function AddDriverModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", licenseNo: "", vehicleType: "", vehicleNo: ""
  });

  function update(f: string, v: string) {
    setForm(prev => ({ ...prev, [f]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to add driver");
      return;
    }

    setOpen(false);
    setForm({ name: "", email: "", phone: "", password: "", licenseNo: "", vehicleType: "", vehicleNo: "" });
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#4f72f8]/20"
      >
        <Plus className="w-4 h-4" /> Add Driver
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1520] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/6">
          <h2 className="font-black text-white text-lg">Add New Driver</h2>
          <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Full Name *</label>
              <input value={form.name} onChange={e => update("name", e.target.value)} required placeholder="Driver name" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Phone *</label>
              <input value={form.phone} onChange={e => update("phone", e.target.value)} required placeholder="+91 98765 43210" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Email *</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required placeholder="driver@example.com" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Password *</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)} required placeholder="Account password" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">License No. *</label>
              <input value={form.licenseNo} onChange={e => update("licenseNo", e.target.value)} required placeholder="DL-XXXXX" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Vehicle No. *</label>
              <input value={form.vehicleNo} onChange={e => update("vehicleNo", e.target.value)} required placeholder="MH-01-AB-1234" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Vehicle Type *</label>
            <select value={form.vehicleType} onChange={e => update("vehicleType", e.target.value)} required className={inputClass + " bg-[#141c2b]"}>
              <option value="">Select type</option>
              {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setOpen(false)}
              className="flex-1 border border-white/8 text-white/50 hover:text-white hover:border-white/15 py-2.5 rounded-xl font-medium text-sm transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#4f72f8]/20">
              {loading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Plus className="w-4 h-4" /> Add Driver</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
