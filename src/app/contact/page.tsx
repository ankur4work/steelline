import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";

const offices = [
  {
    city: "Neemrana (HQ)",
    address: "Shop 6, Daulatsinghpura, Neemrana, Rajasthan – 301705",
    phone: "+91 98765 43210",
    email: "support@steellinelogistics.in",
  },
  {
    city: "Delhi",
    address: "Sector 63, NH-58 Industrial Zone, Gurugram, Haryana – 122002",
    phone: "+91 98765 43211",
    email: "delhi@steelline.in",
  },
  {
    city: "Bangalore",
    address: "Peenya Industrial Area, Phase 2, Bangalore – 560058",
    phone: "+91 98765 43212",
    email: "bangalore@steelline.in",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-[#080c14] border-b border-white/5 pt-36 pb-20 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Have a shipment query, want a custom quote, or need support? Our team is available 24/7.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-[#0d1117] py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: "Call Us", detail: "+91 98765 43210", sub: "Mon–Sat, 8 AM – 8 PM", href: "tel:+919876543210", cta: "Call now" },
              { icon: Mail,  title: "Email",   detail: "hello@steelline.in", sub: "We reply within 2 hours", href: "mailto:hello@steelline.in", cta: "Send email" },
              { icon: MessageSquare, title: "WhatsApp", detail: "+91 98765 43210", sub: "Quickest response", href: "https://wa.me/919876543210", cta: "Chat now" },
            ].map(({ icon: Icon, title, detail, sub, href, cta }) => (
              <a key={title} href={href} className="block bg-[#0f1520] hover:bg-[#141c2b] border border-white/6 hover:border-[#4f72f8]/25 rounded-2xl p-6 transition-all group">
                <div className="w-12 h-12 bg-[#4f72f8] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-white text-lg">{title}</p>
                <p className="text-white/70 font-medium mt-1">{detail}</p>
                <p className="text-white/35 text-sm mt-0.5 mb-4">{sub}</p>
                <span className="text-[#4f72f8] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-[#0f1520] border border-white/6 rounded-2xl p-8">
              <h2 className="text-2xl font-black text-white mb-2">Send us a message</h2>
              <p className="text-white/45 text-sm mb-6">We&apos;ll get back to you within 2 business hours.</p>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-1.5">Full Name</label>
                    <input type="text" placeholder="Rajesh Kumar" className="w-full bg-[#141c2b] border border-white/8 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:border-[#4f72f8] outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-1.5">Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-[#141c2b] border border-white/8 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:border-[#4f72f8] outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full bg-[#141c2b] border border-white/8 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:border-[#4f72f8] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Subject</label>
                  <select className="w-full bg-[#141c2b] border border-white/8 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:border-[#4f72f8] outline-none transition-colors">
                    <option value="">Select a topic…</option>
                    <option>Shipment Quote</option>
                    <option>Tracking Support</option>
                    <option>Billing Query</option>
                    <option>Partnership / Business</option>
                    <option>Feedback / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-1.5">Message</label>
                  <textarea rows={5} placeholder="Describe your shipment or query..." className="w-full bg-[#141c2b] border border-white/8 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:border-[#4f72f8] outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#4f72f8] hover:bg-[#3b5bf0] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#4f72f8]/20">
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Our Offices</h2>
                <p className="text-white/50 text-sm">Visit any of our regional depots or reach out to the nearest office.</p>
              </div>
              {offices.map(({ city, address, phone, email }) => (
                <div key={city} className="bg-[#0f1520] border border-white/6 rounded-2xl p-6">
                  <h3 className="font-bold text-white text-lg mb-3">{city}</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-[#4f72f8] flex-shrink-0 mt-0.5" />
                      <span className="text-white/50">{address}</span>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-white/50 hover:text-[#4f72f8] transition-colors">{phone}</a>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                      <a href={`mailto:${email}`} className="text-white/50 hover:text-[#4f72f8] transition-colors">{email}</a>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-[#4f72f8]/8 border border-[#4f72f8]/15 rounded-2xl p-6">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#4f72f8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white mb-1">Business Hours</p>
                    <p className="text-white/50 text-sm">Monday – Saturday: 8:00 AM – 8:00 PM</p>
                    <p className="text-white/50 text-sm">Sunday: 10:00 AM – 4:00 PM</p>
                    <p className="text-[#4f72f8] text-sm font-medium mt-2">Emergency / Tracking Support: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
