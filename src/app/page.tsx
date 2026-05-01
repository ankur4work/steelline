import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Truck, Package, Shield, MapPin, Star, ArrowRight, CheckCircle,
  Phone, ChevronRight, BarChart3, Users, Award, Zap, Target, Heart,
  Clock, Headphones, Navigation
} from "lucide-react";

const IMGS = {
  hero:      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=90",
  highway:   "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  dock:      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  express:   "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80",
  fleet:     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  flatbed:   "https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=800&q=80",
  person1:   "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  person2:   "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
  person3:   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
};

const services = [
  { icon: Truck,     title: "Full Truck Load (FTL)", desc: "Dedicated truck for your entire consignment. Fastest and most secure for large shipments.", img: IMGS.fleet     },
  { icon: Package,   title: "Part Truck Load (PTL)", desc: "Share truck space and pay only for your portion. Cost-effective for smaller loads.",         img: IMGS.warehouse },
  { icon: Zap,       title: "Express Delivery",      desc: "Time-critical shipments delivered within 24–48 hours to all major Indian cities.",            img: IMGS.express   },
  { icon: Shield,    title: "Insured Freight",        desc: "All cargo covered with comprehensive insurance for complete peace of mind.",                  img: IMGS.dock      },
  { icon: MapPin,    title: "Door-to-Door",           desc: "End-to-end pickup and delivery at your doorstep — zero warehouse visits needed.",             img: IMGS.highway   },
  { icon: BarChart3, title: "Live Tracking",          desc: "Real-time GPS monitoring and instant milestone notifications on every shipment.",             img: IMGS.flatbed   },
];

const steps = [
  { step: "01", title: "Book Online",      desc: "Fill shipment details and get an instant price estimate in under 60 seconds." },
  { step: "02", title: "Confirm & Pay",    desc: "Receive booking confirmation and proceed with secure, transparent payment." },
  { step: "03", title: "Pickup Scheduled", desc: "Our professional driver arrives at your location on the scheduled date." },
  { step: "04", title: "Track & Receive",  desc: "Monitor real-time progress until your cargo is safely delivered." },
];

const values = [
  { icon: Target, title: "Precision",   desc: "On-time delivery, every time. We treat every shipment like it is our own." },
  { icon: Shield, title: "Trust",       desc: "Fully insured cargo and transparent pricing — zero hidden charges, ever." },
  { icon: Heart,  title: "Care",        desc: "Professional handling for all cargo types, fragile or heavy." },
  { icon: Zap,    title: "Speed",       desc: "India's fastest freight network covering 200+ cities coast to coast." },
];

const team = [
  { name: "Anil Steelline", role: "Founder & CEO",      img: IMGS.person1, bio: "25+ years in logistics. Built Steelline from a single truck to a pan-India fleet." },
  { name: "Neha Verma",     role: "Head of Operations", img: IMGS.person2, bio: "Ensures every shipment is on time and every customer experience is exceptional." },
  { name: "Rohit Jaiswal",  role: "Fleet Manager",      img: IMGS.person3, bio: "Manages 200+ vehicles with rigorous 30-day safety and maintenance standards." },
];

const testimonials = [
  { name: "Rajesh Kumar",  role: "Factory Owner, Pune",           text: "Steelline has been our logistics partner for 3 years. Reliability and professionalism unmatched.", rating: 5, avatar: "RK" },
  { name: "Priya Sharma",  role: "E-commerce Seller, Delhi",      text: "Goods always arrive on time and in perfect condition. Real-time tracking is a game changer.",   rating: 5, avatar: "PS" },
  { name: "Mohammed Ali",  role: "Steel Manufacturer, Hyderabad", text: "Best logistics company for heavy industrial cargo. Competitive pricing and great platform.",       rating: 5, avatar: "MA" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080c14]">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4f72f8]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#4f72f8]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#4f72f8]/10 border border-[#4f72f8]/25 text-[#7b9bff] text-sm px-4 py-2 rounded-full mb-8">
                <Shield className="w-3.5 h-3.5" />
                Premium Logistics Partner
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                Reliable Logistics<br />
                <span className="text-[#4f72f8]">Across India</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
                Fast, secure, and cost-effective transportation services for businesses of all sizes. Experience the future of supply chain management.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/register"
                  className="flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all shadow-xl shadow-[#4f72f8]/25 hover:shadow-[#4f72f8]/40 hover:-translate-y-0.5">
                  Get Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/customer/book"
                  className="flex items-center gap-2 border border-[#4f72f8]/40 text-[#7b9bff] hover:bg-[#4f72f8]/10 px-7 py-3.5 rounded-xl font-bold text-base transition-all">
                  Book a Truck
                </Link>
              </div>

              {/* Feature pills */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Headphones, label: "24/7 Support"      },
                  { icon: MapPin,     label: "PAN India"          },
                  { icon: Navigation, label: "GPS Enabled"        },
                  { icon: Clock,      label: "On Time Delivery"   },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-white/55 text-sm">
                    <Icon className="w-4 h-4 text-[#4f72f8]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Image Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60 group cursor-pointer">
                <div className="relative h-[480px] md:h-[520px]">
                  <Image src={IMGS.hero} alt="Steelline fleet" fill className="object-cover transition-transform duration-700 group-hover:scale-110" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-700" />
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-5 right-5 bg-[#0f1520]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#4f72f8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">Premium Fleet</p>
                    <p className="text-white/45 text-xs mt-0.5">Verified &amp; Secure</p>
                  </div>
                </div>
              </div>

              {/* Stats pill floating left */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-[#0f1520]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-4 hidden lg:block">
                <div className="text-2xl font-black text-white">50K+</div>
                <div className="text-white/45 text-xs mt-0.5">Deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────── */}
      <section className="border-y border-white/5 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Shipments Delivered", value: "50,000+", icon: Package },
              { label: "Happy Clients",        value: "5,000+",  icon: Users   },
              { label: "Cities Covered",       value: "200+",    icon: MapPin  },
              { label: "Years Experience",     value: "15+",     icon: Award   },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4f72f8]/10 border border-[#4f72f8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#4f72f8]" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-white/35 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ─────────────────────────────────── */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo collage */}
            <div className="relative h-[500px]">
              <div className="absolute top-0 left-0 w-[60%] h-[52%] rounded-2xl overflow-hidden border border-white/8 shadow-xl">
                <Image src={IMGS.highway} alt="Truck on highway" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-[44%] h-[45%] rounded-2xl overflow-hidden border-2 border-[#080c14] shadow-xl">
                <Image src={IMGS.warehouse} alt="Warehouse" fill className="object-cover" />
              </div>
              <div className="absolute top-[10%] right-0 w-[43%] h-[74%] rounded-2xl overflow-hidden border-2 border-[#080c14] shadow-xl">
                <Image src={IMGS.dock} alt="Loading dock" fill className="object-cover" />
              </div>
              <div className="absolute bottom-[4%] right-[2%] bg-[#0f1520] border border-white/10 text-white rounded-xl px-4 py-3 text-center z-10 shadow-xl">
                <div className="text-2xl font-black text-[#4f72f8]">15+</div>
                <div className="text-xs text-white/45">Years of Trust</div>
              </div>
            </div>

            {/* Story text */}
            <div>
              <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5 leading-tight">
                Built on the Road.<br />Driven by Purpose.
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                Steelline Logistics was founded in 2008 with a single truck and a simple promise — to deliver cargo reliably, honestly, and on time. Starting from Mumbai&apos;s industrial belt, we grew organically, one satisfied client at a time.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Today, with 200+ vehicles, a network spanning 200+ cities, and a team of 500+ professionals, we are one of India&apos;s most trusted freight partners.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { value: "200+",  label: "Trucks in Fleet"  },
                  { value: "500+",  label: "Team Members"     },
                  { value: "99.2%", label: "On-time Delivery" },
                  { value: "₹0",    label: "Hidden Charges"   },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-[#0f1520] border border-white/6 rounded-xl p-4">
                    <div className="text-xl font-black text-[#4f72f8]">{value}</div>
                    <div className="text-sm text-white/40 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/about"
                className="inline-flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#4f72f8]/20">
                Read Our Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">Our Logistics Services</h2>
            <p className="text-white/40 mt-3 max-w-2xl mx-auto">
              End-to-end freight solutions designed for businesses of all sizes across India.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc, img }) => (
              <div key={title} className="bg-[#0f1520] border border-white/6 rounded-2xl overflow-hidden hover:border-[#4f72f8]/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1520] via-[#0f1520]/40 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[#4f72f8] rounded-xl flex items-center justify-center shadow-lg shadow-[#4f72f8]/30">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                  <Link href="/services" className="inline-flex items-center gap-1 text-[#4f72f8] text-sm font-semibold mt-4 hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────── */}
      <section className="py-20 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0f1520] border border-white/6 hover:border-[#4f72f8]/25 rounded-2xl p-6 transition-all hover:-translate-y-0.5 group">
                <div className="w-12 h-12 bg-[#4f72f8]/10 border border-[#4f72f8]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#4f72f8] transition-colors">
                  <Icon className="w-6 h-6 text-[#4f72f8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">Book in 4 Easy Steps</h2>
            <p className="text-white/40 mt-3">From quote to delivery — completely hassle-free.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center group">
                <div className="w-20 h-20 bg-[#0f1520] border border-white/8 group-hover:border-[#4f72f8]/40 shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
                  <span className="text-3xl font-black text-[#4f72f8]">{step}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-[#4f72f8]/25">
              Start Booking Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLEET SHOWCASE ──────────────────────────────── */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">Our Fleet</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5 leading-tight">
                A Modern Fleet for<br />Every Cargo Need
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                From lightweight pickups to heavy-duty trailers, our GPS-equipped fleet handles every cargo type with precision. All vehicles undergo mandatory safety checks every 30 days.
              </p>
              <div className="space-y-2.5 mb-8">
                {[
                  ["Mini Trucks (up to 1 ton)",  "Small & local deliveries"],
                  ["Medium Trucks (3–5 tons)",    "Mid-size business shipments"],
                  ["Large Trucks (8–10 tons)",    "Bulk industrial & commercial loads"],
                  ["Heavy Trailers (15–20 tons)", "Oversized & project cargo"],
                  ["Flatbed Trucks",              "Steel, machinery & construction material"],
                ].map(([type, use]) => (
                  <div key={type} className="flex items-center gap-3 p-3 bg-[#0f1520] border border-white/6 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                    <span className="font-medium text-white text-sm">{type}</span>
                    <span className="text-white/30 text-sm">— {use}</span>
                  </div>
                ))}
              </div>
              <Link href="/register"
                className="inline-flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#4f72f8]/20">
                Book a Truck <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/8">
                  <Image src={IMGS.fleet} alt="Heavy truck fleet" fill className="object-cover brightness-90" />
                </div>
                <div className="relative h-36 rounded-2xl overflow-hidden border border-white/8">
                  <Image src={IMGS.express} alt="Express delivery" fill className="object-cover brightness-90" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-36 rounded-2xl overflow-hidden border border-white/8">
                  <Image src={IMGS.dock} alt="Loading dock" fill className="object-cover brightness-90" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/8">
                  <Image src={IMGS.flatbed} alt="Flatbed truck" fill className="object-cover brightness-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ──────────────────────────────────── */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">The People Behind Steelline</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">Meet Our Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map(({ name, role, img, bio }) => (
              <div key={name} className="group text-center">
                <div className="relative w-36 h-36 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-white/8 group-hover:border-[#4f72f8]/40 transition-colors shadow-xl">
                  <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-white text-lg">{name}</h3>
                <p className="text-[#4f72f8] text-sm font-semibold mb-2">{role}</p>
                <p className="text-white/40 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section className="py-24 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#4f72f8] font-semibold text-sm uppercase tracking-widest">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="bg-[#0f1520] rounded-2xl p-6 border border-white/6 hover:border-[#4f72f8]/20 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#4f72f8] text-[#4f72f8]" />
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 bg-[#4f72f8] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{name}</div>
                    <div className="text-white/35 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4f72f8]/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#4f72f8]/10 border border-[#4f72f8]/20 text-[#7b9bff] text-sm px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-3.5 h-3.5" /> Free registration · No commitment
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ready to Ship<br />Your Cargo?
          </h2>
          <p className="text-white/45 mb-10 text-lg leading-relaxed">
            Join 5,000+ businesses that rely on Steelline Logistics for reliable, affordable freight services across India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register"
              className="bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-2xl shadow-[#4f72f8]/25 hover:-translate-y-0.5">
              Book Your Truck Today
            </Link>
            <a href="tel:+919876543210"
              className="border border-white/12 bg-white/5 hover:bg-white/8 text-white px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
