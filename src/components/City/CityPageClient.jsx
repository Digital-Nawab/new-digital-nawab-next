"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, ArrowRight } from "lucide-react";
import ContactPopup from "@/components/ContactPopup";
import WavyPattern from "@/components/WaveyPattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const API_BASE = "https://dashboard.digitalnawab.com/api";
const IMAGE_BASE = "https://dashboard.digitalnawab.com";

const getImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `${IMAGE_BASE}/${img.replace(/^\//, "")}`;
};

const SectionBadge = ({ children }) => (
  <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 rounded-full">
    {children}
  </span>
);

const CheckmarkIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.35Z" />
  </svg>
);

const StrategicIcon = ({ type, className = "" }) => {
  const icons = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M20 20l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M3 17.5l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
    trending: (
      <>
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M15 7h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      {icons[type?.toLowerCase()] || icons.search}
    </svg>
  );
};

const PackageIllustration = ({ pkgKey, accent }) => {
  const illustrations = {
    web: (
      <>
        <rect x="66" y="38" width="70" height="46" rx="4" fill="#14161d" stroke={accent} strokeWidth="2" />
        <rect x="74" y="46" width="54" height="6" rx="2" fill={accent} opacity="0.55" />
        <rect x="74" y="56" width="34" height="5" rx="2" fill="#fff" opacity="0.6" />
        <rect x="74" y="65" width="44" height="5" rx="2" fill="#fff" opacity="0.35" />
        <rect x="96" y="84" width="10" height="6" fill="#3a3d45" />
        <rect x="84" y="90" width="34" height="4" rx="2" fill="#3a3d45" />
      </>
    ),
    ads: (
      <>
        <circle cx="101" cy="60" r="34" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
        <circle cx="101" cy="60" r="22" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
        <circle cx="101" cy="60" r="10" fill={accent} />
        <path d="M74 33 62 21" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M128 33 140 21" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    smm: (
      <>
        <rect x="70" y="34" width="30" height="30" rx="8" fill="#14161d" stroke={accent} strokeWidth="2" />
        <path d="M85 42v18M78 51h14" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="104" y="52" width="30" height="30" rx="8" fill="#14161d" stroke={accent} strokeWidth="2" />
        <circle cx="119" cy="61" r="5" fill={accent} />
        <path d="M112 74q7-6 14 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </>
    ),
    listing: (
      <>
        <path
          d="M101 26c-14 0-25 11-25 25 0 19 25 39 25 39s25-20 25-39c0-14-11-25-25-25Z"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
        />
        <circle cx="101" cy="51" r="10" fill={accent} />
      </>
    ),
    seo: (
      <>
        <circle cx="94" cy="52" r="22" fill="none" stroke={accent} strokeWidth="3" />
        <path d="M110 68l16 16" stroke={accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M86 52h16M94 44v16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <div className="relative h-32 sm:h-36 flex items-center justify-center rounded-xl bg-gradient-to-b from-black/40 to-black/10 border border-white/5 overflow-hidden">
      <div
        className="absolute w-28 h-28 rounded-full blur-2xl opacity-40"
        style={{ backgroundColor: accent }}
      />
      <svg viewBox="0 0 202 120" className="relative w-full h-full">
        {illustrations[pkgKey] || illustrations.web}
      </svg>
    </div>
  );
};

export default function CityPageClient({
  city: initialCity,
  allCities = [],
  slug,
  approaches: initialApproaches,
  strategic: initialStrategic,
  services: initialServices,
  pricing: initialPricing,
  howWeWork: initialHowWeWork,
  projects: initialProjects,
  whyChooseUs: initialWhyChooseUs,
  faqs: initialFaqs,
  testimonials: initialTestimonials,
}) {
  const [city, setCity] = useState(initialCity || null);
  const [approaches, setApproaches] = useState(
    Array.isArray(initialApproaches) ? initialApproaches[0] : initialApproaches || null
  );
  const [strategic, setStrategic] = useState(
    Array.isArray(initialStrategic) ? initialStrategic[0] : initialStrategic || null
  );
  const [services, setServices] = useState(
    Array.isArray(initialServices) ? initialServices[0] : initialServices || null
  );
  const [pricing, setPricing] = useState(
    Array.isArray(initialPricing) ? initialPricing[0] : initialPricing || null
  );
  const [howWeWork, setHowWeWork] = useState(
    Array.isArray(initialHowWeWork) ? initialHowWeWork[0] : initialHowWeWork || null
  );
  const [projects, setProjects] = useState(
    Array.isArray(initialProjects) ? initialProjects : []
  );
  const [whyChooseUs, setWhyChooseUs] = useState(
    Array.isArray(initialWhyChooseUs) ? initialWhyChooseUs[0] : initialWhyChooseUs || null
  );
  const [faqs, setFaqs] = useState(
    Array.isArray(initialFaqs) ? initialFaqs[0] : initialFaqs || null
  );
  const [testimonials, setTestimonials] = useState(
    Array.isArray(initialTestimonials) ? initialTestimonials : []
  );
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(!initialCity);

  // Client-side fallback fetch if not provided via server
  useEffect(() => {
    if (initialCity && initialApproaches && initialServices) return;

    async function loadData() {
      try {
        setLoading(true);
        const citySlug = slug || "agra";

        const [
          cRes,
          appRes,
          strRes,
          srvRes,
          prcRes,
          wrkRes,
          prjRes,
          whyRes,
          faqRes,
          tstRes,
        ] = await Promise.allSettled([
          fetch(`${API_BASE}/cities`).then((r) => r.json()),
          fetch(`${API_BASE}/approaches?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/strategic-approaches?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/city-services-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/pricing-sections-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/how-we-works-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/city-projects-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/why-choose-us-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/city-faqs-list?city_slug=${citySlug}`).then((r) => r.json()),
          fetch(`${API_BASE}/city-testimonials-list?city_slug=${citySlug}`).then((r) => r.json()),
        ]);

        if (cRes.status === "fulfilled" && cRes.value?.status && Array.isArray(cRes.value.data)) {
          const matched = cRes.value.data.find(
            (c) =>
              c.slug?.toLowerCase() === citySlug.toLowerCase() ||
              c.name?.toLowerCase() === citySlug.toLowerCase()
          );
          setCity(matched || cRes.value.data[0]);
        }
        if (appRes.status === "fulfilled" && appRes.value?.data) {
          setApproaches(Array.isArray(appRes.value.data) ? appRes.value.data[0] : appRes.value.data);
        }
        if (strRes.status === "fulfilled" && strRes.value?.data) {
          setStrategic(Array.isArray(strRes.value.data) ? strRes.value.data[0] : strRes.value.data);
        }
        if (srvRes.status === "fulfilled" && srvRes.value?.data) {
          setServices(Array.isArray(srvRes.value.data) ? srvRes.value.data[0] : srvRes.value.data);
        }
        if (prcRes.status === "fulfilled" && prcRes.value?.data) {
          setPricing(Array.isArray(prcRes.value.data) ? prcRes.value.data[0] : prcRes.value.data);
        }
        if (wrkRes.status === "fulfilled" && wrkRes.value?.data) {
          setHowWeWork(Array.isArray(wrkRes.value.data) ? wrkRes.value.data[0] : wrkRes.value.data);
        }
        if (prjRes.status === "fulfilled" && Array.isArray(prjRes.value?.data)) {
          setProjects(prjRes.value.data);
        }
        if (whyRes.status === "fulfilled" && whyRes.value?.data) {
          setWhyChooseUs(Array.isArray(whyRes.value.data) ? whyRes.value.data[0] : whyRes.value.data);
        }
        if (faqRes.status === "fulfilled" && faqRes.value?.data) {
          setFaqs(Array.isArray(faqRes.value.data) ? faqRes.value.data[0] : faqRes.value.data);
        }
        if (tstRes.status === "fulfilled" && Array.isArray(tstRes.value?.data)) {
          setTestimonials(tstRes.value.data);
        }
      } catch (err) {
        console.error("Client loadData error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug, initialCity, initialApproaches, initialServices]);

  if (loading && !city) {
    return (
      <main className="bg-[#060608] min-h-screen text-white flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading city page details...</p>
        </div>
      </main>
    );
  }

  if (!city) {
    return (
      <main className="bg-[#060608] min-h-screen text-white pt-36 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto bg-[#141620] p-8 rounded-3xl border border-gray-800 shadow-2xl">
          <MapPin className="w-14 h-14 text-lime-400 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-3">City Not Found</h1>
          <p className="text-gray-400 mb-6">
            We couldn&apos;t find details for &quot;{slug}&quot;. Explore our active cities below.
          </p>
          {allCities.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {allCities.map((c) => (
                <Link
                  key={c.id}
                  href={`/city/${c.slug}`}
                  className="px-4 py-2 bg-gray-800 hover:bg-lime-400 hover:text-black rounded-full text-sm font-semibold transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-bold px-6 py-3 rounded-full"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // Parse market areas
  let marketAreas = [];
  if (Array.isArray(city.market_areas)) {
    marketAreas = city.market_areas;
  } else if (typeof city.market_areas === "string") {
    try {
      const parsed = JSON.parse(city.market_areas);
      if (Array.isArray(parsed)) marketAreas = parsed;
    } catch {
      marketAreas = city.market_areas.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const cityName = city.name || "Agra";
  const badgeText = city.badge_text || `Top Rated Agency in ${cityName}`;
  const phoneNum = city.phone_number || "9335621987";
  const cleanPhone = phoneNum.replace(/[^0-9]/g, "");
  const whatsappNum = city.whatsapp_number || phoneNum;
  const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, "");

  const stats = [
    { value: city.stat_years_value || "6+", label: "Years in Industry" },
    { value: city.stat_campaigns_value || "1000+", label: "Campaigns Delivered" },
    { value: city.stat_clients_value || "250+", label: "Happy Clients" },
    { value: city.stat_retention_value || "98%", label: "Client Retention" },
    { value: city.stat_support_value || "24/7", label: "Support" },
    { value: city.stat_reporting_value || "100%", label: "Transparent Reporting" },
  ];

  // Testimonials formatted for AnimatedTestimonials component
  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.quote || "",
    name: t.name || "",
    designation: t.designation || "",
    src: getImageUrl(t.image),
  }));

  return (
    <main className="bg-[#060608] text-white relative overflow-x-hidden selection:bg-[#C73673] selection:text-white">
      {/* Subtle Dot Grid Background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 px-4">
        {/* Glow Spheres */}
        <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[36rem] h-[24rem] bg-[#C73673]/25 blur-[100px] rounded-full" />
        <div className="pointer-events-none absolute top-40 right-0 w-72 h-72 bg-[#8F5AFF]/20 blur-[90px] rounded-full" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/10 blur-[100px] rounded-full" />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#C73673]/15 border border-[#C73673]/30 text-[#FF8FC0] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C73673] animate-pulse" />
            {badgeText}
          </span>

          {/* Heading */}
          <h1 className="text-[2.1rem] leading-[1.15] sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 lg:leading-tight max-w-5xl mx-auto">
            {city.heading_prefix || "Grow Your"}{" "}
            <span className="text-white">{cityName}</span>{" "}
            {city.heading_suffix || "Business with"}{" "}
            <span className="bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] bg-clip-text text-transparent block sm:inline">
              Digital Marketing That Works
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-[15px] sm:text-lg mt-6 max-w-3xl mx-auto leading-7">
            {city.description ||
              `Empowering brands and local enterprises in ${cityName} with customized, high-converting digital marketing solutions that deliver guaranteed measurable ROI.`}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <ContactPopup
              buttonText="Get a Free Consultation"
              buttonClassName="w-full sm:w-auto text-center bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold px-8 py-3.5 rounded-full transition-transform hover:scale-[1.03] shadow-lg shadow-[#C73673]/30 cursor-pointer"
            />
            {phoneNum && (
              <a
                href={`tel:${phoneNum}`}
                className="w-full sm:w-auto text-center border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
              >
                Call Us Now
              </a>
            )}
            {whatsappNum && (
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  `Hi Digital Nawab, I am interested in digital marketing services for my ${cityName} business.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-emerald-600/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold px-6 py-3.5 rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>

          {/* Rating */}
          <p className="mt-6 text-xs sm:text-sm text-gray-400">
            <span className="text-[#D4AF37]">★★★★★</span> Rated 4.9/5 by 250+ businesses across India
          </p>

          {/* Stats Bar */}
          <div className="mt-12 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto rounded-3xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm p-5 sm:p-8">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className={idx % 2 === 0 ? "text-center" : "text-center sm:border-l border-gray-800 sm:pl-3"}
              >
                <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] bg-clip-text text-transparent">
                  {s.value || "—"}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-gray-400 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Built for City Market */}
          {(city.market_description || marketAreas.length > 0) && (
            <div className="mt-14 sm:mt-16 pt-14 sm:pt-16 border-t border-gray-800 text-left max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Built for {cityName}&apos;s Market
              </h2>
              {city.market_description && (
                <p className="text-[15px] sm:text-lg text-gray-300 leading-7 sm:leading-8">
                  {city.market_description}
                </p>
              )}
              {marketAreas.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {marketAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="bg-[#C73673]/10 border border-[#C73673]/30 text-[#FF8FC0] text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= 2. APPROACH SECTION ================= */}
      {approaches && approaches.items && approaches.items.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionBadge>Our Approach</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
              {approaches.heading || `Why Businesses in ${cityName} Work With Us`}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {approaches.items.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-[#D4AF37]/40 transition-colors"
              >
                <span className="text-3xl font-extrabold text-gray-800">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base sm:text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 3. CREDENTIALS / PARTNERS ================= */}
      <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionBadge>Credentials</SectionBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
            Certified &amp; Trusted Partners
          </h2>
          <p className="mt-3 text-[15px] sm:text-lg text-gray-300 leading-7">
            Recognized by the platforms we run your campaigns on.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {[
            {
              title: "Google Partner",
              svg: (
                <path d="M21.6 12.23c0-.7-.06-1.37-.18-2H12v3.78h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.32 3-7.3Z" />
              ),
            },
            {
              title: "Meta Business Partner",
              svg: (
                <path d="M4 12.5c0-4.7 2.6-8 6.3-8 2 0 3.5 1.1 4.7 2.9 1.2-1.8 2.7-2.9 4.7-2.9 3.7 0 6.3 3.3 6.3 8s-2.6 8-6.3 8c-2 0-3.5-1.1-4.7-2.9-1.2 1.8-2.7 2.9-4.7 2.9-3.7 0-6.3-3.3-6.3-8Z" />
              ),
            },
            {
              title: "HubSpot Certified",
              svg: (
                <>
                  <circle cx="12" cy="12" r="3.2" />
                  <circle cx="19" cy="7" r="2.2" />
                </>
              ),
            },
            {
              title: "SEMrush Certified",
              svg: <path d="M4 18V9h3v9H4Zm6.5 0V5h3v13h-3ZM17 18v-6h3v6h-3Z" />,
            },
            {
              title: "Bing Ads Certified",
              svg: (
                <path d="M6 3v15.2l4.6 2.6L20 15.3l-3.7-2.2 2-1.1-8.2-4.7V3H6Z" />
              ),
            },
          ].map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-gray-800 bg-gray-900/50 px-3 py-6 sm:p-6 hover:border-[#D4AF37]/40 transition-colors"
            >
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
                  {partner.svg}
                </svg>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200 leading-tight">
                {partner.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. STRATEGIC APPROACH ================= */}
      {strategic && strategic.items && strategic.items.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionBadge>{strategic.badge_text || "Methodology"}</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
              {strategic.heading || "Strategic Framework"}
            </h2>
            {strategic.subheading && (
              <p className="mt-3 text-[15px] sm:text-lg text-gray-300 leading-7">
                {strategic.subheading}
              </p>
            )}
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {strategic.items.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-5">
                    <StrategicIcon
                      type={item.icon || "search"}
                      className="w-7 h-7 text-[#D4AF37]"
                    />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 5. CITY SERVICES ================= */}
      {services && services.items && services.items.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="mb-8 sm:mb-10">
            {services.badge_text && <SectionBadge>{services.badge_text}</SectionBadge>}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-2">
              {services.heading || `Our Services in ${cityName}`}
            </h2>
            {services.subheading && (
              <p className="text-[15px] sm:text-lg text-gray-300 leading-7 sm:leading-8">
                {services.subheading}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {services.items.map((srv, idx) => {
              const letter = (srv.title || "?").trim().charAt(0).toUpperCase();
              return (
                <div
                  key={idx}
                  className="group bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-[#C73673]/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] flex items-center justify-center text-white font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                    {letter}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-6">
                    {srv.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= 6. PRICING SECTION ================= */}
      {pricing && pricing.packages && pricing.packages.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionBadge>{pricing.badge_text || "Affordable Packages"}</SectionBadge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4">
              {pricing.heading || "Tailored Pricing Packages"}
            </h2>
            {pricing.subheading && (
              <p className="mt-3 text-[15px] sm:text-lg text-gray-300 leading-7">
                {pricing.subheading}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {pricing.packages.map((pkg, idx) => {
              const colorMap = {
                pink: "#C73673",
                purple: "#8F5AFF",
                gold: "#D4AF37",
                yellow: "#D4AF37",
                teal: "#3AA6A0",
                green: "#3AA6A0",
              };
              const accent = colorMap[(pkg.color || "").toLowerCase()] || "#C73673";
              const iconKeyMap = {
                monitor: "web",
                mousepointerclick: "ads",
                users: "smm",
                mappin: "listing",
                search: "seo",
              };
              const pkgKey = iconKeyMap[(pkg.icon || "").toLowerCase()] || "web";

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col rounded-3xl bg-gray-900/70 border border-gray-800 backdrop-blur-sm p-6 sm:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-gray-700 ${
                    pkg.is_popular ? "lg:-translate-y-3 ring-2 ring-[#D4AF37]" : ""
                  }`}
                >
                  {pkg.is_popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase text-black bg-[#D4AF37] px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg sm:text-xl font-extrabold text-white text-center">
                    {pkg.title}
                  </h3>

                  <div className="mt-5">
                    <PackageIllustration pkgKey={pkgKey} accent={accent} />
                  </div>

                  <div className="mt-5 text-center">
                    <span
                      className="inline-block text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow"
                      style={{ backgroundColor: accent }}
                    >
                      {pkg.badge_label || "Package"}
                    </span>
                  </div>

                  <p className="mt-5 text-center text-base sm:text-lg font-extrabold text-white">
                    Start From ~ ₹{pkg.price}{" "}
                    <span className="text-gray-400 font-medium text-sm">
                      {pkg.price_suffix || "/Month"}
                    </span>
                  </p>

                  <ul className="mt-5 space-y-3 flex-1">
                    {(pkg.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-white"
                          style={{ backgroundColor: accent }}
                        >
                          <CheckmarkIcon className="w-3 h-3" />
                        </span>
                        <span className="text-sm text-gray-300 leading-5">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col min-[380px]:flex-row items-stretch gap-3">
                    <Link
                      href={pkg.view_package_url || "/package"}
                      className="flex-1 text-center text-white font-bold text-sm px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-[1.03] whitespace-nowrap"
                      style={{ backgroundColor: accent }}
                    >
                      View Package
                    </Link>
                    <a
                      href={`https://wa.me/${(pkg.whatsapp_number || cleanWhatsapp).replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(
                        `Hi, I'm interested in the ${pkg.title} for my ${cityName} business.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-center bg-[#25D366] text-white font-bold text-sm px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-[1.03] whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-500 mt-8">
            *Prices are indicative starting points. Final pricing depends on scope — talk to us for a custom quote.
          </p>
        </section>
      )}

      {/* ================= 7. HOW WE WORK ================= */}
      {howWeWork && howWeWork.steps && howWeWork.steps.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {howWeWork.heading || "How We Work"}
            </h2>
            {howWeWork.subheading && (
              <p className="text-[15px] sm:text-lg text-gray-300 leading-7 sm:leading-8">
                {howWeWork.subheading}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.steps.map((step, idx) => (
              <div key={idx} className="relative rounded-2xl bg-gray-900/40 border border-gray-800 p-6">
                <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] bg-clip-text text-transparent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base sm:text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-6">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 8. CITY PROJECTS ================= */}
      {projects && projects.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionBadge>Our Projects</SectionBadge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4">
              Projects We Developed In Past
            </h2>
            <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 sm:h-52 border-b border-gray-800 bg-black/40">
                    <img
                      src={getImageUrl(proj.image)}
                      alt={proj.heading}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {proj.heading}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-6">
                      {proj.sub_heading}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href={proj.button_url || "/portfolio"}
                    className="inline-block w-full text-center text-white font-bold text-sm px-5 py-3 rounded-full transition-transform hover:scale-[1.03]"
                    style={{ backgroundColor: proj.color || "#C73673" }}
                  >
                    {proj.button_text || "View Project"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 9. WHY CHOOSE US ================= */}
      {whyChooseUs && whyChooseUs.reasons && whyChooseUs.reasons.length > 0 && (
        <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4">
          <div className="rounded-3xl bg-gray-900/60 border border-gray-800 p-6 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              {whyChooseUs.heading || `Why Choose Digital Nawab in ${cityName}?`}
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {whyChooseUs.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-gradient-to-br from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] flex items-center justify-center text-white">
                    <CheckmarkIcon className="w-3 h-3" />
                  </span>
                  <span className="text-sm sm:text-base text-gray-200">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 10. FAQS ================= */}
      {faqs && faqs.faqs && faqs.faqs.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-gray-800 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            {faqs.heading || "Frequently Asked Questions"}
          </h2>
          <div className="divide-y divide-gray-800">
            {faqs.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 first:pt-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-xl text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#D4AF37]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-gray-400 leading-6 sm:leading-7 animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= 11. TESTIMONIALS ================= */}
      {formattedTestimonials.length > 0 && (
        <section className="border-t border-gray-800 overflow-hidden">
          <WavyPattern waveColor="#000" backgroundColor="#060608" />
          <HeroHighlight>
            <div className="mb-2 text-center pt-10 md:pt-16">
              <p className="text-[#C73673] text-sm font-semibold tracking-wider uppercase mb-3">
                WHAT WE RECEIVE
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Our Client&apos;s Voice
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 text-sm sm:text-base">
                We provide end-to-end solutions in Digital Marketing, SEO, and Development to help your business thrive in {cityName}.
              </p>
            </div>
            <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
          </HeroHighlight>
          <WavyPattern waveColor="#060608" backgroundColor="#000" />
        </section>
      )}

      {/* ================= 12. FINAL CTA ================= */}
      <section className="py-16 sm:py-20 border-t border-gray-800 bg-gradient-to-b from-transparent via-[#11131c] to-transparent">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Let&apos;s Grow Your Business in{" "}
            <span className="bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] bg-clip-text text-transparent">
              {cityName}
            </span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg text-gray-300 leading-7 sm:leading-8">
            Whether you&apos;re launching a new venture or scaling an established brand, Digital Nawab is your proven growth partner in {cityName}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ContactPopup
              buttonText="Talk to Us Today"
              buttonClassName="bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold px-9 py-3.5 rounded-full transition-transform hover:scale-[1.03] shadow-lg shadow-[#C73673]/30 cursor-pointer"
            />
            <Link
              href="/contact-us"
              className="border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 13. EXPLORE OTHER CITIES ================= */}
      {allCities && allCities.length > 1 && (
        <section className="py-12 border-t border-gray-900 max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Explore Our Other Locations
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {allCities.map((c) => (
              <Link
                key={c.id}
                href={`/city/${c.slug}`}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  c.slug?.toLowerCase() === (city.slug || "").toLowerCase()
                    ? "bg-[#C73673] text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
