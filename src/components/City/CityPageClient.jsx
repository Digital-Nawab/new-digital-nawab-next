"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  Headphones,
  BarChart3,
  CheckCircle,
  ChevronDown,
  Globe,
  Layers,
  Search,
  Target,
  Palette,
  Smartphone,
  Share2,
  MailCheck,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";

export default function CityPageClient({ city, allCities, slug }) {
  const [openFaq, setOpenFaq] = useState(null);

  // Fallback if city not found
  if (!city) {
    return (
      <div className="min-h-screen bg-black text-white pt-36 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto bg-[#191b24] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <MapPin className="w-16 h-16 text-lime-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold mb-3">City Not Found</h1>
          <p className="text-gray-400 mb-6">
            We couldn't find details for &quot;{slug}&quot;. Explore our services or select one of our active cities below.
          </p>
          {allCities && allCities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm uppercase text-gray-500 font-semibold mb-3">
                Active Cities
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {allCities.map((c) => (
                  <Link
                    key={c.id}
                    href={`/city/${c.slug}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-lime-400 hover:text-black rounded-full text-sm font-medium transition-all"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-lime-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-lime-500 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format market areas (can be array or comma string)
  let areas = [];
  if (Array.isArray(city.market_areas)) {
    areas = city.market_areas;
  } else if (typeof city.market_areas === "string") {
    try {
      const parsed = JSON.parse(city.market_areas);
      if (Array.isArray(parsed)) areas = parsed;
    } catch {
      areas = city.market_areas.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const cityName = city.name || "Your City";
  const badgeText = city.badge_text || `Top Rated Agency in ${cityName}`;
  const headingPrefix = city.heading_prefix || "Grow Your";
  const headingSuffix = city.heading_suffix || "Business with Digital Nawab";
  const description =
    city.description ||
    `Empowering brands and local enterprises in ${cityName} with customized, high-converting digital marketing solutions that deliver guaranteed measurable ROI.`;

  const phoneNum = city.phone_number || "9335621987";
  const whatsappNum = city.whatsapp_number || "9335621987";

  const stats = [
    {
      value: city.stat_years_value || "6+",
      label: "Years of Industry Excellence",
      icon: Award,
    },
    {
      value: city.stat_campaigns_value || "1000+",
      label: "Successful Digital Campaigns",
      icon: TrendingUp,
    },
    {
      value: city.stat_clients_value || "250+",
      label: "Satisfied Business Clients",
      icon: Users,
    },
    {
      value: city.stat_retention_value || "98%",
      label: "Client Retention Rate",
      icon: ShieldCheck,
    },
    {
      value: city.stat_support_value || "24/7",
      label: "Dedicated Support Team",
      icon: Headphones,
    },
    {
      value: city.stat_reporting_value || "100%",
      label: "Transparent ROI & Live Tracking",
      icon: BarChart3,
    },
  ];

  const cityServices = [
    {
      title: `Search Engine Optimization (SEO)`,
      desc: `Rank #1 on Google for high-intent searches in ${cityName}. Boost organic footfall, phone calls, and local customers.`,
      icon: Search,
      href: "/service/seo-company-in-lucknow",
      badge: "Organic Growth",
    },
    {
      title: `Google Ads & PPC Campaigns`,
      desc: `Instant targeted leads in ${cityName} with optimized ad spend, laser-sharp demographic targeting, and maximum conversions.`,
      icon: Target,
      href: "/service/pay-per-click-services",
      badge: "Fast Results",
    },
    {
      title: `Social Media Marketing (SMM)`,
      desc: `Build a loyal community in ${cityName} on Instagram, Facebook & LinkedIn with viral creatives, reels, and lead ads.`,
      icon: Share2,
      href: "/service/social-media-marketing",
      badge: "Brand Authority",
    },
    {
      title: `Website Design & Development`,
      desc: `Ultra-fast, mobile-friendly websites engineered to turn casual visitors into paying customers for ${cityName} businesses.`,
      icon: Globe,
      href: "/service/website-design-and-development",
      badge: "High Conversion",
    },
    {
      title: `Mobile App Development`,
      desc: `Scalable Android & iOS mobile applications crafted with modern tech stack to scale your operations in ${cityName}.`,
      icon: Smartphone,
      href: "/service/mobile-application-development",
      badge: "Next-Gen Tech",
    },
    {
      title: `Graphic Design & Branding`,
      desc: `Premium brand identity, logos, packaging, and digital ad designs that make your ${cityName} business stand out.`,
      icon: Palette,
      href: "/service/graphic-designing-services",
      badge: "Creative Impact",
    },
    {
      title: `E-Commerce Marketing`,
      desc: `End-to-end e-commerce store development, catalog marketing, and sales funnels to scale your online retail brand.`,
      icon: Layers,
      href: "/service/ecommerce-marketing",
      badge: "E-Commerce",
    },
    {
      title: `Direct Marketing Solutions`,
      desc: `Targeted WhatsApp campaigns, email marketing, and influencer partnerships tailored specifically for ${cityName}.`,
      icon: MailCheck,
      href: "/service/direct-marketing",
      badge: "Direct Reach",
    },
  ];

  const faqs = [
    {
      q: `Why should my business in ${cityName} invest in digital marketing?`,
      a: `Over 85% of consumers in ${cityName} search online before purchasing products or booking local services. With Digital Nawab's targeted campaigns, your business ranks right in front of active buyers, generating reliable daily inquiries and higher revenue.`,
    },
    {
      q: `How long does it take to see results in ${cityName}?`,
      a: `Paid campaigns like Google Ads and Meta Ads start generating qualified leads within 24 to 48 hours. Comprehensive Local SEO rankings in ${cityName} typically gain strong organic momentum within 60 to 90 days.`,
    },
    {
      q: `Do you provide customized packages for local businesses in ${cityName}?`,
      a: `Yes! Every package is tailored according to your industry, competition in ${cityName}, and monthly targets. We provide clear deliverables with zero hidden costs.`,
    },
    {
      q: `How will I track my campaign performance and return on investment?`,
      a: `You get access to transparent weekly and monthly performance dashboards tracking calls, form submissions, keyword rankings, and cost per acquisition.`,
    },
  ];

  return (
    <main className="bg-[#050507] text-white min-h-screen selection:bg-lime-400 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-4 sm:px-6 max-w-7xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-lime-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-500">City</span>
            <span>/</span>
            <span className="text-lime-400 font-semibold">{cityName}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-lime-400/20 via-purple-500/20 to-lime-400/20 border border-lime-400/40 text-lime-300 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
            <span>{badgeText}</span>
          </div>

          {/* Dynamic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto">
            <span className="text-white">{headingPrefix} </span>
            <span className="relative inline-block mx-2 text-black bg-lime-400 px-4 py-1 rounded-xl shadow-[0_0_35px_rgba(163,230,53,0.55)]">
              {cityName}
            </span>
            <span className="text-white block sm:inline mt-2 sm:mt-0">
              {" "}
              {headingSuffix}
            </span>
          </h1>

          {/* Dynamic Description */}
          <p className="mt-8 text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <ContactPopup
              buttonText="Get Free Consultation"
              buttonClassName="bg-lime-400 hover:bg-lime-500 text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-[0_0_25px_rgba(163,230,53,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] cursor-pointer"
            />

            {phoneNum && (
              <a
                href={`tel:${phoneNum}`}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 text-lime-400" />
                <span>Call {phoneNum}</span>
              </a>
            )}

            {whatsappNum && (
              <a
                href={`https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}?text=Hi%20Digital%20Nawab%2C%20I%20am%20looking%20for%20digital%20marketing%20services%20in%20${encodeURIComponent(
                  cityName
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium text-base border border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            )}
          </div>
        </section>

        {/* ================= STATS COUNTER SECTION ================= */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-[#13151f]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center mx-auto mb-3 text-lime-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= MARKET HUBS & LOCAL COVERAGE ================= */}
        {(city.market_description || areas.length > 0) && (
          <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#171924] via-[#1b1e2c] to-[#171924] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Local Presence</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                  Targeting High-Growth Hubs in{" "}
                  <span className="text-lime-400">{cityName}</span>
                </h2>
                {city.market_description && (
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                    {city.market_description}
                  </p>
                )}

                {areas.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase text-gray-400 font-semibold mb-3">
                      Key Target Areas & Localities:
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {areas.map((area, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-4 py-2 bg-black/40 hover:bg-lime-400 hover:text-black border border-white/10 hover:border-lime-400 rounded-full text-sm font-medium transition-all duration-300 text-gray-200"
                        >
                          <MapPin className="w-3.5 h-3.5 text-lime-400 group-hover:text-black" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ================= CORE SERVICES IN CITY ================= */}
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Digital Marketing Solutions in{" "}
              <span className="text-lime-400">{cityName}</span>
            </h2>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Everything your business needs to outperform local competitors, attract qualified buyers, and scale revenues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-[#13151f] p-6 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-2 text-lime-400 text-sm font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= WHY CHOOSE SECTION ================= */}
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-gradient-to-b from-transparent via-[#11131b] to-transparent rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>The Digital Nawab Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Why Top Brands in{" "}
                <span className="text-lime-400">{cityName}</span> Choose Us
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                We combine deep localized consumer insights in {cityName} with world-class digital growth frameworks. No cookie-cutter packages — only tailor-made execution.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: `Hyper-Local Targeting in ${cityName}`,
                    desc: "Pinpoint ad campaigns that target high-intent buyers in specific neighborhoods and business corridors.",
                  },
                  {
                    title: "Dedicated Account Strategist",
                    desc: "A single point of contact who understands your business goals and delivers regular strategy briefings.",
                  },
                  {
                    title: "ROI-Focused Metric Tracking",
                    desc: "We focus on actual revenue, customer acquisition cost (CAC), and lead quality, not just vanity metrics.",
                  },
                  {
                    title: "Transparent Pricing & Rapid Turnaround",
                    desc: "Clear deliverable milestones, no lock-in traps, and lightning-fast creative deployment.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-lime-400/30 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-[#191b24] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-2">
                  Ready to Grow?
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Request a Free Competitor & SEO Audit in {cityName}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Discover untapped ranking opportunities and leakages in your current marketing strategy. Speak with our lead strategist today.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Call Directly</div>
                      <div className="text-white font-bold">{phoneNum}</div>
                    </div>
                    <a
                      href={`tel:${phoneNum}`}
                      className="px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg text-sm hover:bg-lime-500 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Instant Chat</div>
                      <div className="text-white font-bold">WhatsApp Support</div>
                    </div>
                    <a
                      href={`https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                    >
                      Chat
                    </a>
                  </div>

                  <div className="pt-2">
                    <ContactPopup
                      buttonText={`Book Free Consultation for ${cityName}`}
                      buttonClassName="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold py-3.5 px-6 rounded-xl hover:opacity-95 transition-all text-center cursor-pointer shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQS SECTION ================= */}
        <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Frequently Asked Questions in{" "}
              <span className="text-lime-400">{cityName}</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Everything you need to know about partnering with Digital Nawab.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/10 rounded-2xl bg-[#141620] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-white hover:text-lime-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 text-gray-400 ${
                        isOpen ? "rotate-180 text-lime-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= FINAL CTA BANNER ================= */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-lime-950/40 border border-white/15 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-lime-400/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="px-3 py-1 bg-lime-400/20 text-lime-400 text-xs font-bold rounded-full uppercase tracking-wider inline-block mb-4 border border-lime-400/30">
                Let&apos;s Accelerate Your Growth
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
                Ready to Dominate Your Market in{" "}
                <span className="text-lime-400">{cityName}</span>?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Connect with our expert digital strategists today and start capturing profitable leads for your business.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <ContactPopup
                  buttonText="Get In Touch With Us"
                  buttonClassName="bg-lime-400 hover:bg-lime-500 text-black font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-[0_0_25px_rgba(163,230,53,0.5)] cursor-pointer"
                />
                <Link
                  href="/contact-us"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/10 transition-all backdrop-blur-sm"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
