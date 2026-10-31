"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Target,
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Compass,
  BarChart3,
  Clock,
  Laptop,
  Globe,
  Users,
  Building2,
  Calendar,
  HelpCircle,
  BadgeCheck,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";
import WavyPattern from "@/components/WaveyPattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const API_BASE = "https://dashboard.digitalnawab.com/api";
const IMAGE_BASE = "https://dashboard.digitalnawab.com";

const getImageUrl = (img) => {
  if (!img) return "/assets/images/about/team-office.jpg";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return img;
  return `${IMAGE_BASE}/${img.replace(/^\//, "")}`;
};

// Check if string is a placeholder/test string
const isGarbageText = (str) => {
  if (!str || typeof str !== "string") return true;
  const s = str.trim().toLowerCase();
  return (
    s === "desccccccc" ||
    s === "descccccccc" ||
    s === "desc" ||
    s === "asasadzdsd" ||
    s === "asasadzsd" ||
    s === "asasadsdsd" ||
    s === "this is desc" ||
    s === "test" ||
    s === "sdsads" ||
    s === "php artisan migrate" ||
    s.length < 3
  );
};

// Deduplicate array of strings
const deduplicateStrings = (arr) => {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (typeof item === "string" && item.trim()) {
      const clean = item.trim();
      const lower = clean.toLowerCase();
      if (!seen.has(lower) && !isGarbageText(clean)) {
        seen.add(lower);
        result.push(clean);
      }
    }
  }
  return result;
};

const SectionBadge = ({ children, variant = "gold" }) => {
  const styles = {
    gold: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    purple: "text-purple-300 border-purple-500/30 bg-purple-500/10",
    pink: "text-pink-300 border-pink-500/30 bg-pink-500/10",
    emerald: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-widest uppercase border px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm ${
        styles[variant] || styles.gold
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
};

const CheckmarkIcon = ({ className = "w-4 h-4 text-emerald-400" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.35Z" />
  </svg>
);

const StrategicIcon = ({ type, className = "w-6 h-6" }) => {
  const icons = {
    search: <Search className={className} />,
    target: <Target className={className} />,
    layers: <Layers className={className} />,
    trending: <TrendingUp className={className} />,
    award: <Award className={className} />,
    shield: <ShieldCheck className={className} />,
    zap: <Zap className={className} />,
  };
  return icons[type?.toLowerCase()] || <Search className={className} />;
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
  const [openFaq, setOpenFaq] = useState(0);
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
      <main className="bg-black min-h-screen text-white flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 text-sm">Loading city details &amp; campaigns...</p>
        </div>
      </main>
    );
  }

  if (!city) {
    return (
      <main className="bg-black min-h-screen text-white pt-36 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-2xl">
          <MapPin className="w-14 h-14 text-pink-400 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-3">City Not Found</h1>
          <p className="text-zinc-400 mb-6">
            We couldn&apos;t find details for &quot;{slug}&quot;. Explore our active locations below.
          </p>
          {allCities.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {allCities.map((c) => (
                <Link
                  key={c.id}
                  href={`/city/${c.slug}`}
                  className="px-4 py-2 bg-zinc-800 hover:bg-purple-600 hover:text-white rounded-full text-xs font-semibold transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const cityName = city.name || "Agra";

  // Parse market areas
  let marketAreas = [];
  if (Array.isArray(city.market_areas)) {
    marketAreas = deduplicateStrings(city.market_areas);
  } else if (typeof city.market_areas === "string") {
    try {
      const parsed = JSON.parse(city.market_areas);
      if (Array.isArray(parsed)) marketAreas = deduplicateStrings(parsed);
    } catch {
      marketAreas = deduplicateStrings(city.market_areas.split(","));
    }
  }

  if (marketAreas.length === 0) {
    marketAreas = [
      "Sadar Bazar",
      "Sanjay Place",
      "Tajganj",
      "Kamla Nagar",
      "Dayalbagh",
      "Fatehabad Road",
      "Bodla",
      "Raja Ki Mandi",
    ];
  }

  // Fallback / Clean Badge
  const badgeText =
    city.badge_text && !isGarbageText(city.badge_text)
      ? city.badge_text
      : `${cityName}'s #1 Performance Digital Agency • Google & Meta Certified`;

  // Fallback / Clean Description
  const cityDescription =
    city.description && !isGarbageText(city.description)
      ? city.description
      : `Accelerate your brand in ${cityName} with high-ROAS Meta & Google ad campaigns, aggressive local & national SEO domination, and custom high-converting web applications tailored for local retail, hospitality, footwear manufacturing, and export enterprises.`;

  // Fallback / Clean Market Description
  const marketDescription =
    city.market_description && !isGarbageText(city.market_description)
      ? city.market_description
      : `${cityName} is one of North India's most vibrant commercial and tourist hubs. From high-density retail corridors in Sanjay Place and Sadar Bazar to global export networks, Digital Nawab crafts hyper-targeted digital growth engines that turn local searchers into loyal, paying customers.`;

  const phoneNum = city.phone_number || "+91 93356 21987";
  const cleanPhone = phoneNum.replace(/[^0-9]/g, "");
  const whatsappNum = city.whatsapp_number || phoneNum;
  const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, "");

  const stats = [
    { value: city.stat_years_value || "6+", label: "Years in Industry", icon: Clock },
    { value: city.stat_campaigns_value || "1000+", label: "Campaigns Delivered", icon: Zap },
    { value: city.stat_clients_value || "250+", label: "Happy Clients", icon: Users },
    { value: city.stat_retention_value || "98%", label: "Client Retention", icon: TrendingUp },
    { value: city.stat_support_value || "24/7", label: "Priority Support", icon: ShieldCheck },
    { value: city.stat_reporting_value || "100%", label: "Transparent ROI", icon: BarChart3 },
  ];

  // Parse & Deduplicate Why Choose Us Reasons
  let parsedReasons = [];
  if (whyChooseUs) {
    if (Array.isArray(whyChooseUs.reasons)) {
      parsedReasons = deduplicateStrings(whyChooseUs.reasons);
    } else if (typeof whyChooseUs.reasons === "string") {
      try {
        const parsed = JSON.parse(whyChooseUs.reasons);
        if (Array.isArray(parsed)) parsedReasons = deduplicateStrings(parsed);
      } catch {
        parsedReasons = deduplicateStrings(whyChooseUs.reasons.split(","));
      }
    }
  }

  // High-value points fallback if empty or deduplicated down to < 4 items
  const defaultWhyReasons = [
    "250+ Happy Clients Across India & Global Export Markets",
    `Customized Growth Playbooks Engineered Specifically for ${cityName} Businesses`,
    "Certified Google & Meta Premier Agency with Proven High-ROAS Record",
    "Guaranteed Page-1 Google Rankings via Aggressive Local & Technical SEO",
    "100% Transparent Weekly Performance & Lead Analytics Dashboard",
    "Dedicated Senior Strategist with Instant WhatsApp & Direct Call Access",
  ];

  const finalReasons = parsedReasons.length >= 4 ? parsedReasons : defaultWhyReasons;

  // Rich metadata & descriptions for Why Choose Us points
  const reasonsDetailed = [
    {
      title: "250+ Happy Clients Across India & Global Export Markets",
      desc: `From local ${cityName} retail hubs to high-volume footwear and handicraft exporters, our campaigns have generated over 10,000+ qualified leads across India.`,
      tag: "Proven Scale",
      metric: "₹50Cr+ Impact",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: `Customized Growth Playbooks Engineered Specifically for ${cityName} Businesses`,
      desc: `No cookie-cutter templates. We engineer hyper-local search funnels and high-conversion ad creative tailored specifically to ${cityName}'s commercial ecosystem.`,
      tag: "Hyper-Local Focus",
      metric: "100% Bespoke",
      icon: Target,
      color: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
      title: "Certified Google & Meta Premier Agency with Proven High-ROAS Record",
      desc: "Direct access to Google & Meta platform reps, advanced algorithmic bidding, and priority ad approval with zero ad fatigue or wasted spend.",
      tag: "Official Partner",
      metric: "Premier Agency",
      icon: Award,
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Guaranteed Page-1 Google Rankings via Aggressive Local & Technical SEO",
      desc: "Aggressive local SEO that secures top-3 Google Maps placement, capturing high-intent customers right when they are ready to call or visit.",
      tag: "Search Domination",
      metric: "Top-3 Maps Rank",
      icon: Zap,
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "100% Transparent Weekly Performance & Lead Analytics Dashboard",
      desc: "Live 24/7 analytics tracking every rupee spent, cost per lead (CPL), incoming phone calls, and revenue return. Zero vanity metrics.",
      tag: "Live Analytics",
      metric: "100% Transparent",
      icon: BarChart3,
      color: "from-cyan-500 to-blue-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Dedicated Senior Strategist with Instant WhatsApp & Direct Call Access",
      desc: "Skip junior coordinators and slow email queues. You get direct WhatsApp and telephone access to senior campaign directors.",
      tag: "Direct Support",
      metric: "Instant Access",
      icon: ShieldCheck,
      color: "from-rose-500 to-purple-600",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  // Parse FAQs
  let parsedFaqs = [];
  if (faqs) {
    if (Array.isArray(faqs.faqs)) {
      parsedFaqs = faqs.faqs;
    } else if (typeof faqs.faqs === "string") {
      try {
        const p = JSON.parse(faqs.faqs);
        if (Array.isArray(p)) parsedFaqs = p;
      } catch {}
    }
  }

  // Deduplicate FAQs by question
  const seenQ = new Set();
  const cleanFaqs = [];
  for (const f of parsedFaqs) {
    if (f && f.question && !isGarbageText(f.question)) {
      const qLower = f.question.trim().toLowerCase();
      if (!seenQ.has(qLower)) {
        seenQ.add(qLower);
        cleanFaqs.push(f);
      }
    }
  }

  const defaultFaqs = [
    {
      question: `Which is the best digital marketing agency for businesses in ${cityName}?`,
      answer: `Digital Nawab is a premier performance marketing agency trusted by 250+ clients across India. We deliver laser-focused local SEO, high-ROAS Google and Meta ad campaigns, and conversion-optimized websites designed to generate high-quality sales leads in ${cityName} and nationwide.`,
    },
    {
      question: `How quickly can my ${cityName} business see results from SEO and paid ads?`,
      answer: `Paid campaigns on Google and Meta begin delivering qualified leads within 48 to 72 hours of campaign launch. For organic SEO and Google Maps rankings, businesses typically experience significant organic traffic growth and top-3 rankings within 60 to 90 days.`,
    },
    {
      question: `Can you target specific commercial zones in ${cityName} like Sadar Bazar or Sanjay Place?`,
      answer: `Yes! We run hyper-local radius campaigns down to specific postal codes and neighborhoods, capturing high-intent shoppers and corporate clients visiting areas like Sanjay Place, Tajganj, Kamla Nagar, or Dayalbagh.`,
    },
    {
      question: "What transparency and reporting do you provide to clients?",
      answer: "We provide a live 24/7 analytics dashboard showing exact ad spends, impressions, phone calls, cost per lead (CPL), and return on ad spend (ROAS). You also receive weekly strategy reviews with your dedicated campaign lead.",
    },
    {
      question: `Do you also work with ${cityName} footwear manufacturers and export businesses?`,
      answer: "Absolutely. We specialize in B2B digital marketing for manufacturers and exporters, running high-intent Google Search campaigns, B2B international SEO, and LinkedIn performance funnels that reach buyers across global markets.",
    },
    {
      question: "What is the typical budget required to get started?",
      answer: "We have flexible packages starting from ₹9,999/month for local Google Maps & SEO optimization up to comprehensive performance ad retainers tailored to your expected lead volumes and market aggressive goals.",
    },
  ];

  const finalFaqs = cleanFaqs.length >= 2 ? cleanFaqs : defaultFaqs;

  // Parse Services
  let parsedServices = [];
  if (services) {
    if (Array.isArray(services.items)) {
      parsedServices = services.items;
    } else if (typeof services.items === "string") {
      try {
        const p = JSON.parse(services.items);
        if (Array.isArray(p)) parsedServices = p;
      } catch {}
    }
  }

  const defaultServices = [
    {
      title: "Local SEO & Google Maps Domination",
      description: `Capture high-intent ${cityName} shoppers and commercial clients searching for your products with guaranteed top-3 Google Maps rankings.`,
    },
    {
      title: "High-ROAS Google Ads (Search & PMax)",
      description: "Laser-targeted Google Search, Display, and YouTube campaigns configured to generate qualified phone inquiries and booked orders.",
    },
    {
      title: "Social Media & Meta Ads (Insta & FB)",
      description: "Visually compelling creative campaigns that build brand stature, drive foot traffic, and capture direct WhatsApp inquiries.",
    },
    {
      title: "High-Speed Web Design & Development",
      description: "Custom, blazing-fast Next.js and WordPress platforms engineered for flawless mobile UX and maximum lead conversions.",
    },
  ];

  const finalServices = parsedServices.length > 0 ? parsedServices : defaultServices;

  // Parse Pricing Packages
  let parsedPackages = [];
  if (pricing) {
    if (Array.isArray(pricing.packages)) {
      parsedPackages = pricing.packages;
    } else if (typeof pricing.packages === "string") {
      try {
        const p = JSON.parse(pricing.packages);
        if (Array.isArray(p)) parsedPackages = p;
      } catch {}
    }
  }

  const defaultPackages = [
    {
      icon: "Search",
      color: "pink",
      badge_label: "Local Domination",
      title: "Local SEO & Google Maps",
      price: "9,999",
      price_suffix: "/Month",
      is_popular: false,
      view_package_url: "/package",
      whatsapp_number: cleanWhatsapp,
      features: [
        "Google Business Profile Optimization & Audit",
        "Local Keyword Research & Tracking (15 Keywords)",
        "Citation Building across Top Local Directories",
        "Review Generation & Reputation Strategy",
        "Monthly Ranking & Footfall Analytics Report",
      ],
    },
    {
      icon: "Target",
      color: "purple",
      badge_label: "High Conversion",
      title: "Performance Ads & Lead Gen",
      price: "18,500",
      price_suffix: "/Month",
      is_popular: true,
      view_package_url: "/package",
      whatsapp_number: cleanWhatsapp,
      features: [
        "Google Search & Performance Max Campaigns",
        "High-ROAS Meta Ads (Instagram & Facebook)",
        "Custom High-Converting Landing Page Design",
        "GTM, Meta Pixel & WhatsApp Lead Tracking",
        "Weekly Budget Optimization & A/B Testing",
      ],
    },
    {
      icon: "Laptop",
      color: "gold",
      badge_label: "Complete Scale",
      title: "Full-Stack Brand Expansion",
      price: "34,999",
      price_suffix: "/Month",
      is_popular: false,
      view_package_url: "/package",
      whatsapp_number: cleanWhatsapp,
      features: [
        "Complete Web App Development / Modern Redesign",
        "Omnichannel Ads (Google + Meta + YouTube)",
        "Aggressive National & International SEO",
        "High-Quality Ad Creatives & Video Production",
        "Dedicated Senior Account Director & 24/7 Support",
      ],
    },
  ];

  const finalPackages = parsedPackages.length > 0 ? parsedPackages : defaultPackages;

  // Parse Strategic Framework Steps
  let parsedStrategic = [];
  if (strategic) {
    if (Array.isArray(strategic.items)) {
      parsedStrategic = strategic.items;
    } else if (typeof strategic.items === "string") {
      try {
        const p = JSON.parse(strategic.items);
        if (Array.isArray(p)) parsedStrategic = p;
      } catch {}
    }
  }

  const defaultStrategic = [
    {
      icon: "search",
      title: "Deep Market & Competitor Audit",
      description: `We analyze your ${cityName} competitors, customer search patterns, and demand gaps before deploying a single rupee.`,
    },
    {
      icon: "target",
      title: "Precision Audience Targeting",
      description: "Laser-target active buyers across Google Search, Instagram, and local maps with high-intent commercial keywords.",
    },
    {
      icon: "layers",
      title: "High-Converting Funnels",
      description: "Build high-speed landing pages, compelling bilingual ad copies, and friction-free WhatsApp inquiry flows.",
    },
    {
      icon: "trending",
      title: "Continuous Scaling & ROI",
      description: "Daily negative keyword pruning, bid adjustments, and A/B creative testing to slash acquisition costs.",
    },
  ];

  const finalStrategic = parsedStrategic.length > 0 ? parsedStrategic : defaultStrategic;

  // Testimonials formatted
  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.quote || "",
    name: t.name || "",
    designation: t.designation || "",
    src: getImageUrl(t.image),
  }));

  return (
    <main className="w-full relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-36 pb-20 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950 to-black text-white border-b border-white/10">
        {/* Ambient Glowing Blobs */}
        <div className="pointer-events-none absolute top-12 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[130px] rounded-full animate-pulse" />
        <div className="pointer-events-none absolute top-1/3 right-10 w-[450px] h-[450px] bg-pink-600/15 blur-[120px] rounded-full animate-pulse delay-1000" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/15 blur-[110px] rounded-full" />

        {/* Subtle Mesh Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 0.5px, transparent 0.5px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/city/agra" className="hover:text-white transition-colors">
              Locations
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              {cityName}
            </span>
          </nav>

          {/* 2-Column Hero Grid */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 cols): Content & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-950/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                  {badgeText}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  {city.heading_prefix || "Grow Your"}{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    {cityName}
                  </span>{" "}
                  {city.heading_suffix || "Business with"}{" "}
                  <span className="block text-white">Digital Marketing That Works</span>
                </h1>
                <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed pt-2 max-w-2xl">
                  {cityDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <ContactPopup
                  buttonText="Get Free Consultation"
                  buttonClassName="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                />

                <a
                  href={`tel:${cleanPhone}`}
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/15 font-semibold text-sm backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>Call {phoneNum}</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    `Hello Digital Nawab Team, I am interested in growing my business in ${cityName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-sm backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Rating Review Chip */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                  <span className="text-white font-bold">4.9 / 5.0</span> Rating across 250+ clients in India &amp; UP
                </p>
              </div>
            </div>

            {/* Right Column (5 cols): High-Impact Visual Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-indigo-600/30 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Performance Hub
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {cityName} Region
                  </span>
                </div>

                {/* Performance Stat Cards */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-400">Monthly High-Intent Leads</p>
                      <h4 className="text-2xl font-black text-white">4,850+ Leads</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-400">Average ROAS Delivered</p>
                      <h4 className="text-2xl font-black text-emerald-400">4.8x - 6.2x</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-400">Google Top 3 Pack Ranking</p>
                      <h4 className="text-2xl font-black text-pink-400">&gt; 94% Retention</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Instant Action Prompt */}
                <div className="pt-2">
                  <ContactPopup
                    buttonText={`Audit My ${cityName} Business`}
                    buttonClassName="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors cursor-pointer text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar (6 Metrics) */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            {stats.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div
                  key={idx}
                  className="p-3 text-center rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors"
                >
                  <IconComp className="w-4 h-4 text-purple-400 mx-auto mb-1.5 opacity-80" />
                  <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: BUILT FOR CITY'S MARKET (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" /> Regional Market Focus
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              Engineered Specifically for {cityName}&apos;s Market
            </h2>
            <p className="text-zinc-600 text-base md:text-lg mt-3 leading-relaxed">
              {marketDescription}
            </p>
          </div>

          {/* Active Commercial Zones */}
          {marketAreas.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm mb-12 text-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                Key High-Density Commercial Corridors We Target in {cityName}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {marketAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-purple-100 hover:text-purple-800 text-zinc-800 text-xs font-semibold border border-zinc-200 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-purple-600" />
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3 Pillars of Local Market Dominance */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Hyper-Local Radius Ads</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Pinpoint high-income neighborhoods and commercial zones across {cityName} to capture consumers exactly when they are looking to buy.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Google Maps Top-3 Domination</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Rank your local business profile in the prestigious Google 3-Pack, driving consistent phone calls, foot traffic, and website clicks.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">B2B &amp; Export Expansion</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                For {cityName}&apos;s manufacturers and exporters, we build national and international lead funnels that attract wholesale buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SPECIALIZED SERVICES (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative bg-zinc-950 text-white py-20 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              {services?.heading || `Specialized Growth Services in ${cityName}`}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mt-3">
              {services?.subheading ||
                `End-to-end digital solutions tailored to the unique economic dynamics of ${cityName} businesses.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalServices.map((srv, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-950/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-5 shadow-lg group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-white text-base">
                      0{idx + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <ContactPopup
                    buttonText="Inquire For This Service"
                    buttonClassName="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer text-center block"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHY CHOOSE US (LIGHT BACKGROUND) - DEDICATED POINT-BY-POINT GRID */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SECTION 4: WHY CHOOSE US - EXACT STRUCTURE FROM USER REFERENCE (WHITE BG) */}
      {/* ========================================================================= */}
      <section className="bg-white text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid: Left Points (3 cols x 2 rows) + Right Glowing Laptop */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT SIDE (8 cols): Header + 6 Points in 3 cols x 2 rows */}
            <div className="lg:col-span-8 space-y-8">
              {/* Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 block mb-2">
                  WHY CHOOSE US
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Digital Nawab
                  </span>
                  {cityName ? ` in ${cityName}` : ""}
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                  We combine strategy, creativity and technology to deliver digital marketing solutions that actually work.
                </p>
              </div>

              {/* 6 Feature Points in 3 Columns x 2 Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 pt-2">
                {/* Point 1: Customized Strategies */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-md shadow-purple-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-purple-600 transition-colors">
                      Customized Strategies
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Every business is unique, so are our strategies tailored.
                    </p>
                  </div>
                </div>

                {/* Point 2: Experienced Team */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-0.5 shadow-md shadow-pink-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Users className="w-5 h-5 text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-pink-600 transition-colors">
                      Experienced Team
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Skilled professionals with deep multi-industry expertise.
                    </p>
                  </div>
                </div>

                {/* Point 3: Transparent Communication */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-0.5 shadow-md shadow-indigo-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                      Transparent Communication
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Stay updated at every step of your journey, always.
                    </p>
                  </div>
                </div>

                {/* Point 4: Latest Tools & Technology */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 p-0.5 shadow-md shadow-cyan-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-teal-600 transition-colors">
                      Latest Tools &amp; Technology
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Advanced AI tools for better performance and insights.
                    </p>
                  </div>
                </div>

                {/* Point 5: Focus on ROI */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-0.5 shadow-md shadow-emerald-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                      Focus on ROI
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      We work towards measurable growth and long-term success.
                    </p>
                  </div>
                </div>

                {/* Point 6: Local Market Understanding */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-md shadow-amber-600/20 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                      Local Market Understanding
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Deep knowledge of {cityName}&apos;s business environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (4 cols): Laptop with Neon Wave Graph */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Glowing neon purple/pink ambient shadow behind laptop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-pink-600/25 to-indigo-600/25 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

                {/* Laptop Card Mockup */}
                <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-3 sm:p-4 shadow-2xl text-white">
                  {/* Laptop Screen Display */}
                  <div className="rounded-xl bg-black border border-zinc-800/80 p-4 sm:p-5 overflow-hidden relative">
                    {/* Screen Header Controls */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                        ANALYTICS • {cityName.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live
                      </span>
                    </div>

                    {/* Metric Headline */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <div className="text-[11px] text-zinc-400">Total Revenue Attributed</div>
                        <div className="text-2xl font-black text-white tracking-tight">
                          ₹48,50,000+
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        +284% ROI
                      </span>
                    </div>

                    {/* Neon Magenta/Purple Glowing Wave Chart (Exact Match to User Reference) */}
                    <div className="relative h-28 sm:h-32 w-full pt-2">
                      <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="neonWaveGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="neonWaveLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="35%" stopColor="#ec4899" />
                            <stop offset="70%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                          <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* Wave Area Fill */}
                        <path
                          d="M 0,90 Q 30,30 70,60 T 140,25 T 210,70 T 280,20 T 350,15 L 400,10 L 400,120 L 0,120 Z"
                          fill="url(#neonWaveGlow)"
                        />
                        {/* Glowing Neon Line */}
                        <path
                          d="M 0,90 Q 30,30 70,60 T 140,25 T 210,70 T 280,20 T 350,15 L 400,10"
                          fill="none"
                          stroke="url(#neonWaveLine)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          filter="url(#neonGlowEffect)"
                        />
                      </svg>
                    </div>

                    {/* Bottom Micro Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-zinc-800/60 text-center">
                      <div>
                        <div className="text-[10px] text-zinc-500">Avg ROAS</div>
                        <div className="text-xs font-bold text-white">4.8x</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500">Maps Rank</div>
                        <div className="text-xs font-bold text-emerald-400">Top 3</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500">Leads/Mo</div>
                        <div className="text-xs font-bold text-pink-400">4,850+</div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Base Opening Notch */}
                  <div className="mt-2.5 flex items-center justify-center">
                    <div className="w-16 h-1 rounded-full bg-zinc-700/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CERTIFIED PARTNERS (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-900 text-white py-16 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionBadge variant="purple">Credentials &amp; Trust</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Official Platform Certifications
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Recognized and certified by the platforms we manage your ad budgets on.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Google Partner", desc: "Search & PMax Certified" },
              { title: "Meta Business Partner", desc: "Insta & FB Performance" },
              { title: "HubSpot Certified", desc: "Inbound CRM Tracking" },
              { title: "SEMrush Certified", desc: "Advanced Technical SEO" },
              { title: "Microsoft Advertising", desc: "Bing Search Certified" },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 text-center hover:border-purple-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-3 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">{partner.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-1">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: STRATEGIC METHODOLOGY FRAMEWORK (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" /> 4-Pillar Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              {strategic?.heading || "Our Proven 4-Pillar Growth Framework"}
            </h2>
            <p className="text-zinc-600 text-base md:text-lg mt-3">
              {strategic?.subheading ||
                "A battle-tested process designed to turn local searchers into verified revenue."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalStrategic.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <StrategicIcon type={item.icon || "search"} className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Pillar 0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: ROI-DRIVEN PRICING PACKAGES (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-black text-white py-20 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Transparent Investment
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              {pricing?.heading || `Affordable Growth Packages for ${cityName} Businesses`}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mt-3">
              {pricing?.subheading ||
                "Transparent monthly retainers engineered for measurable lead generation and revenue expansion."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {finalPackages.map((pkg, idx) => {
              const isPopular = pkg.is_popular;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular
                      ? "bg-gradient-to-b from-purple-950/60 via-zinc-900 to-black border-2 border-purple-500 shadow-2xl shadow-purple-950/50 md:-translate-y-2"
                      : "bg-zinc-950/80 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      {pkg.badge_label || "Growth Tier"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {pkg.title}
                    </h3>

                    {/* Price */}
                    <div className="mt-5 pb-5 border-b border-white/10">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-zinc-400 ml-1.5 font-medium">
                        {pkg.price_suffix || "/Month"}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="mt-6 space-y-3">
                      {(pkg.features || []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
                    <Link
                      href={pkg.view_package_url || "/package"}
                      className={`block w-full py-3 rounded-xl font-bold text-xs text-center transition-all ${
                        isPopular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg"
                          : "bg-white/10 hover:bg-white/15 text-white"
                      }`}
                    >
                      View Full Details
                    </Link>

                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                        `Hi Digital Nawab, I am interested in the ${pkg.title} (₹${pkg.price}) for my business in ${cityName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: HOW WE WORK (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      {howWeWork && (
        <section className="bg-white text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Clock className="w-3.5 h-3.5" /> Execution Journey
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                {howWeWork.heading || "How We Work With You"}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg mt-3">
                {howWeWork.subheading ||
                  "A seamless, transparent journey from initial discovery to measurable market leadership."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(howWeWork.steps && howWeWork.steps.length > 0
                ? howWeWork.steps
                : [
                    {
                      title: "Discovery & Goal Setting",
                      description: "We audit your existing digital footprint and agree on target cost-per-lead benchmarks.",
                    },
                    {
                      title: "Campaign Architecture & Build",
                      description: "Our design and copy teams craft bespoke ad creatives, high-converting landing pages, and tracking scripts.",
                    },
                    {
                      title: "Execution & Multi-Channel Launch",
                      description: "We deploy search, social, and local campaigns simultaneously, ensuring immediate market penetration.",
                    },
                    {
                      title: "Weekly Optimization & Scaling",
                      description: "We double down on top-performing keywords and ad sets while keeping your acquisition costs consistently low.",
                    },
                  ]
              ).map((step, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 9: CITY PROJECTS / CASE STUDIES (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      {projects && projects.length > 0 && (
        <section className="bg-zinc-950 text-white py-20 px-4 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Laptop className="w-3.5 h-3.5" /> Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                Projects We Developed &amp; Scaled
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-2">
                A glimpse of custom platforms and lead-generation campaigns built for clients across sectors.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group rounded-3xl bg-zinc-900/60 border border-white/10 overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
                      <img
                        src={getImageUrl(proj.image)}
                        alt={proj.heading}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {proj.heading}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {proj.sub_heading}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={proj.button_url || "/portfolio"}
                      className="block w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center transition-colors shadow-md"
                    >
                      {proj.button_text || "View Case Study"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS (LIGHT BACKGROUND) - 2 COLUMNS */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Answers &amp; Guidance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              {faqs?.heading || `Frequently Asked Questions for ${cityName} Businesses`}
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              Everything you need to know about our localized digital marketing campaigns, ROI metrics, and turnaround timelines.
            </p>
          </div>

          {/* 2-Column Accordion */}
          <div className="grid md:grid-cols-2 gap-4 items-start">
            {finalFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-zinc-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-zinc-50/50"
                  >
                    <span className="font-bold text-sm sm:text-base text-zinc-900 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-600 shrink-0 transition-transform duration-300 mt-0.5 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/30">
                      <p className="pl-9">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt banner */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="text-base font-bold text-zinc-900">
                Have a specific question about your {cityName} business?
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Our senior marketing strategists provide instant, free telephone &amp; WhatsApp audits.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call {phoneNum}
              </a>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  `Hi, I have a query about digital marketing in ${cityName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: TESTIMONIALS / CLIENT VOICE (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      {formattedTestimonials.length > 0 && (
        <section className="w-full bg-[#060608] border-b border-gray-800 overflow-hidden text-white">
          <WavyPattern waveColor="#000" backgroundColor="#060608" />
          <HeroHighlight>
            <div className="mb-2 text-center pt-10 md:pt-16">
              <p className="text-pink-400 text-xs font-semibold tracking-wider uppercase mb-3">
                CLIENT SUCCESS STORIES
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                What Business Leaders Say
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4 text-xs sm:text-sm">
                Hear from companies who transformed their local presence and customer acquisition with Digital Nawab.
              </p>
            </div>
            <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
          </HeroHighlight>
          <WavyPattern waveColor="#060608" backgroundColor="#000" />
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 12: FINAL CONVERSION CTA (RADIANT DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-zinc-950 via-black to-black text-white py-24 px-4 md:px-8 border-b border-white/5 overflow-hidden text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-gradient-to-r from-purple-600/30 via-pink-600/25 to-rose-600/30 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Take The Lead
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready to Dominate Your <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Market in {cityName}?
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Stop losing high-intent customers to competitors. Partner with {cityName}&apos;s leading performance agency and unlock guaranteed, measurable growth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <ContactPopup
              buttonText="Claim Free Strategy Call"
              buttonClassName="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-purple-600/40 transform hover:-translate-y-1 transition-all cursor-pointer"
            />

            <a
              href={`tel:${cleanPhone}`}
              className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-md transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              <span>Call {phoneNum}</span>
            </a>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                `Hello Digital Nawab, I would like to schedule a strategy session for my ${cityName} business.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>WhatsApp Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13: EXPLORE OTHER CITIES (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      {allCities && allCities.length > 1 && (
        <section className="bg-zinc-950 text-white py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
              Explore Our Other Active Operating Locations
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allCities.map((c) => (
                <Link
                  key={c.id}
                  href={`/city/${c.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    c.slug?.toLowerCase() === (city.slug || "").toLowerCase()
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
