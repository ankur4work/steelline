import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Award, Users, MapPin, Package, Target, Shield, Heart, Zap, CheckCircle } from "lucide-react";

const IMGS = {
  hero:      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=85",
  highway:   "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  dock:      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  person1:   "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  person2:   "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
  person3:   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
};

const milestones = [
  { year: "2009", title: "Founded in Mumbai", desc: "Steelline Logistics started with a single truck and a vision to transform Indian freight." },
  { year: "2012", title: "Pan-India Expansion", desc: "Grew to 50+ trucks and established depot network across 10 major cities." },
  { year: "2016", title: "Technology Platform", desc: "Launched digital booking and real-time GPS tracking — first in our segment." },
  { year: "2019", title: "50,000 Deliveries", desc: "Hit a major milestone serving over 5,000 clients across manufacturing and retail." },
  { year: "2022", title: "200+ City Network", desc: "Expanded to cover 200+ cities with a dedicated fleet of 500+ vehicles." },
  { year: "2024", title: "Full Digital Suite", desc: "Launched end-to-end digital logistics management with customer self-service portal." },
];

const team = [
  { name: "Rajesh Mehta", role: "Founder & CEO", img: IMGS.person1, bio: "25 years in logistics. Built Steelline from a single-truck operation to a pan-India network." },
  { name: "Priya Sharma", role: "COO & Co-Founder", img: IMGS.person2, bio: "Former supply chain head at a Fortune 500. Drives operational excellence and client satisfaction." },
  { name: "Vikram Patel", role: "Chief Technology Officer", img: IMGS.person3, bio: "IIT-B graduate who built our tracking platform and digital booking infrastructure from scratch." },
];

const values = [
  { icon: Target,  title: "Precision",    desc: "On-time delivery with zero excuses. Every shipment is tracked, monitored, and delivered as promised." },
  { icon: Shield,  title: "Trust",        desc: "Full cargo insurance, transparent pricing, and honest communication at every step." },
  { icon: Heart,   title: "Care",         desc: "We treat every shipment like it belongs to us — with attention, respect, and urgency." },
  { icon: Zap,     title: "Innovation",   desc: "Technology that makes logistics simple: instant quotes, live tracking, digital documents." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#080c14]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <Image src={IMGS.highway} alt="Highway" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/95 via-[#080c14]/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            Moving India<br />
            <span className="text-[#4f72f8]">Forward</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            From a single truck in 2009 to a network spanning 200+ cities — the story of Steelline Logistics is one of relentless commitment to India&apos;s supply chain.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0d1117] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Shipments Delivered", value: "50,000+", icon: Package },
              { label: "Happy Clients",        value: "5,000+",  icon: Users   },
              { label: "Cities Covered",       value: "200+",    icon: MapPin  },
              { label: "Years Experience",     value: "15+",     icon: Award   },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-[#4f72f8]/10 border border-[#4f72f8]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#4f72f8]" />
                </div>
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-sm text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                Connecting India&apos;s businesses through reliable freight
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                We started Steelline Logistics because Indian businesses deserved better — better reliability, better transparency, better technology, and better service.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                For 15 years, we have been the backbone of supply chains for manufacturers, traders, and e-commerce companies. Every truck that leaves our depot carries not just cargo, but the promise of on-time delivery and complete safety.
              </p>
              <ul className="space-y-3">
                {["ISO 9001:2015 Certified Operations", "GPS tracking on every vehicle", "24/7 customer support", "Cargo insurance on all shipments"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/60">
                    <CheckCircle className="w-5 h-5 text-[#4f72f8] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image src={IMGS.warehouse} alt="Warehouse" fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image src={IMGS.dock} alt="Dock" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">What Drives Us</p>
            <h2 className="text-4xl font-black text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0f1520] border border-white/6 rounded-2xl p-7 hover:border-[#4f72f8]/20 transition-colors">
                <div className="w-12 h-12 bg-[#4f72f8]/10 border border-[#4f72f8]/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#4f72f8]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#080c14]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-4xl font-black text-white">15 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/8" />
            <div className="space-y-10">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className="relative flex gap-8 pl-20">
                  <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-[#4f72f8] border-4 border-[#080c14] shadow-md flex items-center justify-center" />
                  <div>
                    <span className="text-xs font-bold text-[#4f72f8] bg-[#4f72f8]/10 border border-[#4f72f8]/20 px-2 py-1 rounded-full">{year}</span>
                    <h3 className="text-white font-bold text-lg mt-2">{title}</h3>
                    <p className="text-white/45 text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
            <h2 className="text-4xl font-black text-white">The Team Behind Steelline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, img, bio }) => (
              <div key={name} className="bg-[#0f1520] border border-white/6 rounded-2xl overflow-hidden hover:border-[#4f72f8]/20 transition-shadow">
                <div className="relative h-64">
                  <Image src={img} alt={name} fill className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1520]/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="text-[#4f72f8] text-sm">{role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/45 text-sm leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080c14] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-black text-white mb-4">Ready to ship with us?</h2>
          <p className="text-white/45 mb-8">Join 5,000+ businesses that trust Steelline for reliable, on-time freight delivery across India.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#4f72f8]/20 flex items-center justify-center gap-2 transition-colors">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="border border-[#4f72f8]/40 text-[#7b9bff] hover:bg-[#4f72f8]/10 px-8 py-3 rounded-xl font-bold transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
