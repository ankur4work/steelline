import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Package, Zap, Shield, MapPin, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

const IMGS = {
  hero:      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=85",
  fleet:     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  express:   "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80",
  dock:      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  highway:   "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
  flatbed:   "https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=800&q=80",
};

const services = [
  {
    icon: Truck,
    title: "Full Truck Load (FTL)",
    tagline: "Dedicated truck, zero sharing",
    img: IMGS.fleet,
    desc: "Your cargo gets the entire truck. Ideal for large-volume shipments requiring speed, security, and direct delivery without transit stops.",
    features: ["Direct pickup to delivery", "No transit stops", "Faster delivery timelines", "Best for 5+ ton loads"],
    price: "From ₹8,000",
  },
  {
    icon: Package,
    title: "Part Truck Load (PTL)",
    tagline: "Pay only for what you use",
    img: IMGS.warehouse,
    desc: "Share truck capacity with other consignments and pay only for the space you occupy. The smart choice for small and mid-size businesses.",
    features: ["Cost-effective per kg pricing", "Pan-India network", "Consolidated loads", "Best for under 5 tons"],
    price: "From ₹2,500",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    tagline: "24–48 hour city-to-city",
    img: IMGS.express,
    desc: "For time-critical cargo, our Express service guarantees delivery within 24–48 hours to all major metro and tier-1 cities.",
    features: ["Priority handling", "Dedicated express lanes", "Real-time SMS updates", "Late-delivery guarantee"],
    price: "From ₹4,500",
  },
  {
    icon: Shield,
    title: "Insured Freight",
    tagline: "Complete cargo protection",
    img: IMGS.dock,
    desc: "Every shipment under our Insured Freight plan is covered with comprehensive cargo insurance — protecting your goods against damage, theft, and loss.",
    features: ["End-to-end coverage", "Fast claim settlement", "No hidden exclusions", "Digital policy documents"],
    price: "Add-on from 0.5%",
  },
  {
    icon: MapPin,
    title: "Door-to-Door Service",
    tagline: "Pickup & delivery, zero hassle",
    img: IMGS.highway,
    desc: "We handle everything — pickup from your premises, transit, and final delivery at the destination doorstep. No warehouse visits needed.",
    features: ["Scheduled pickup slots", "Proof of delivery (POD)", "White-glove handling", "Packaging assistance"],
    price: "From ₹3,000",
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    tagline: "Live GPS on every shipment",
    img: IMGS.flatbed,
    desc: "Know exactly where your cargo is, at all times. Our tracking platform provides live GPS data, milestone notifications, and ETA updates.",
    features: ["Live GPS map view", "Milestone notifications", "Shareable tracking link", "Delivery confirmation"],
    price: "Included free",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#080c14]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center">
        <Image src={IMGS.hero} alt="Logistics" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/95 via-[#080c14]/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-[#4f72f8] text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            Logistics Solutions<br />
            <span className="text-[#4f72f8]">Built for India</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            From small parcels to heavy freight — we have a service for every shipment size, urgency, and budget.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, tagline, img, desc, features, price }) => (
              <div key={title} className="bg-[#0f1520] rounded-2xl overflow-hidden border border-white/6 hover:border-[#4f72f8]/25 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-48">
                  <Image src={img} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d5c]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-[#4f72f8] rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#080c14]/80 backdrop-blur-sm text-white border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
                    {price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[#4f72f8] text-xs font-bold uppercase tracking-wider mb-1">{tagline}</p>
                  <h3 className="text-white font-black text-xl mb-3">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle className="w-4 h-4 text-[#4f72f8] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="mt-auto bg-[#4f72f8] hover:bg-[#3b5bf0] text-white text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#4f72f8]/20">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-[#0d1117] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Why 5,000+ businesses choose Steelline</h2>
            <p className="text-white/45">Trusted freight partner across manufacturing, retail, and e-commerce.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "On-time delivery", value: "98.5%" },
              { label: "Cities served",   value: "200+"   },
              { label: "Fleet size",      value: "500+"   },
              { label: "Years in business", value: "15+"  },
            ].map(({ label, value }) => (
              <div key={label} className="text-center bg-[#0f1520] border border-white/8 rounded-2xl p-6">
                <div className="text-4xl font-black text-[#4f72f8] mb-2">{value}</div>
                <div className="text-white/45 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080c14] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-black text-white mb-4">Get an instant quote</h2>
          <p className="text-white/45 mb-8">Fill in your shipment details and receive a price estimate in under 60 seconds.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-[#4f72f8] hover:bg-[#3b5bf0] text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-[#4f72f8]/20">
            Start Booking <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
