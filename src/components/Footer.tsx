import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060a11] text-white border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="SteelLine Logistics" width={140} height={56} className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              India&apos;s trusted freight and logistics partner. Delivering reliability, efficiency, and safety across the nation since 2008.
            </p>
            <div className="flex gap-2">
              {["IN", "TW", "FB", "YT"].map(s => (
                <div key={s} className="w-8 h-8 bg-white/5 border border-white/8 rounded-lg flex items-center justify-center hover:bg-[#4f72f8] hover:border-[#4f72f8] transition-colors cursor-pointer text-xs font-bold text-white/40 hover:text-white">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2.5 text-white/40 text-sm">
              {["Full Truck Load (FTL)", "Part Truck Load (PTL)", "Express Delivery", "Door-to-Door Service", "Industrial Shifting", "Project Cargo"].map(s => (
                <li key={s}>
                  <Link href="/services" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-white/40 text-sm">
              {[
                { href: "/",         label: "Home"           },
                { href: "/about",    label: "About Us"       },
                { href: "/track",    label: "Track Shipment" },
                { href: "/contact",  label: "Contact Us"     },
                { href: "/register", label: "Create Account" },
                { href: "/login",    label: "Login"          },
              ].map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-3 text-white/40 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4f72f8] mt-0.5 flex-shrink-0" />
                <span>Shop 6, Daulatsinghpura, Neemrana, Rajasthan – 301705</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                <a href="mailto:support@steellinelogistics.in" className="hover:text-white transition-colors">support@steellinelogistics.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>&copy; {new Date().getFullYear()} SteelLine Logistics Pvt. Ltd. All rights reserved. · steellinelogistics.in</p>
          <div className="flex gap-5">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
