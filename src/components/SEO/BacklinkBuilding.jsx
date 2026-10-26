"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Target,
  Cpu,
  FileCode2,
  FileText,
  MapPin,
  Sparkles,
  Crosshair,
  Link2,
  Globe,
  Zap,
  TrendingUp,
  BarChart3,
  Sliders,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Layers,
  SearchCheck,
  Star,
  Check,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

// Comprehensive fallback data matching the exact 14 services from dashboard API
const FALLBACK_SERVICES = [
  {
    id: 17,
    heading: "SEO Audit & Strategy",
    subheading: "Identify Issues. Find Opportunities. Improve.",
    description:
      "<p>Identify technical errors, indexing problems, content gaps, and missed search opportunities with a comprehensive SEO audit. We use the findings to prioritize improvements and build a practical SEO strategy aligned with your business goals.</p><p><br></p><p><a href=\"https://www.digitalnawab.com/service/seo-company-in-lucknow\" rel=\"noopener noreferrer\" target=\"_blank\">Explore Our SEO Services →</a></p>",
    features: [
      "Technical SEO Checks",
      "On-Page SEO Review",
      "Actionable Recommendations",
    ],
    image: "assets/images/seo_service/SEO Audit & Strategy Dashboard.webp",
  },
  {
    id: 18,
    heading: "Technical SEO Optimization",
    subheading: "Find Gaps. Discover Opportunities. Compete Smarter.",
    description:
      "<p>Improve your website's crawlability, indexability, site architecture, XML sitemap, canonical tags, and structured data where appropriate. We identify technical barriers that may affect search engine understanding and help create a stronger foundation for organic visibility.</p><p><br></p><p><a href=\"https://www.digitalnawab.com/service/seo-company-in-lucknow\" rel=\"noopener noreferrer\" target=\"_blank\">Explore Our SEO Services →</a></p>",
    features: [
      "Keyword & Content Gaps",
      "Backlink Profile Review",
      "Actionable SEO Priorities",
    ],
    image: "assets/images/seo_service/technical-seo-optimization.webp",
  },
  {
    id: 19,
    heading: "On-Page SEO Optimization",
    subheading:
      "Optimize Every Page for Better Rankings, More Traffic, and Higher Conversions.",
    description:
      "<p>Optimize page titles, meta descriptions, headings, URLs, internal links, image alt text, and page content. We align each important page with its search intent while making information easier for visitors and search engines to understand.</p>",
    features: ["on-page optimization", "website content optimization"],
    image: "assets/images/seo_service/on-page-seo-optimization.webp",
  },
  {
    id: 20,
    heading: "Keyword Research & Search Intent",
    subheading: "Keyword Research and Content Strategy",
    description:
      "<p>Discover relevant keywords based on what your potential customers search for at different stages of their buying journey. We map primary, supporting, local, and long-tail keywords to the right pages to strengthen relevance and attract more qualified visitors.</p>",
    features: ["Social Signals", "Brand Mentions", "Local Citations"],
    image: "assets/images/seo_service/keyword-research-and-search-intent.webp",
  },
  {
    id: 21,
    heading: "Local SEO & Google Business Profile Optimization",
    subheading:
      "Boost Google Maps rankings, local visibility, and qualified leads with Local SEO services in Lucknow",
    description:
      "<p>Optimize your Google Business Profile and website with local keyword research, Google Maps SEO, local citations, and review management. Improve local search visibility, customer trust, and enquiries with an SEO strategy built for people and AI-powered search.</p>",
    features: [
      "Google Business Profile Optimization",
      "Google Maps SEO & Local Rankings",
      "Local Keyword Research & Competitor Analysis",
    ],
    image:
      "assets/images/seo_service/local-seo-and-google-business-profile-optimization.webp",
  },
  {
    id: 22,
    heading: "Content SEO & Topical Optimization",
    subheading:
      "Improve search rankings, topical authority, and qualified traffic with strategic SEO content optimization.",
    description:
      "<p>Optimize website content around search intent, relevant keywords, and topic clusters. Strengthen on-page SEO, internal linking, semantic relevance, and E-E-A-T to improve organic visibility, answer-engine relevance, and user engagement across search engines and AI-powered platforms.</p>",
    features: [
      "SEO Content Audit & Optimization",
      "Search Intent & Keyword Mapping",
      "Topic Clusters & Topical Authority",
      "Semantic SEO & Internal Linking",
      "AEO/GEO & E-E-A-T Optimization",
    ],
    image:
      "assets/images/seo_service/content-seo-and-topical-optimization.webp",
  },
  {
    id: 23,
    heading: "Competitor SEO Analysis",
    subheading:
      "Discover competitor strategies and SEO opportunities to improve rankings and organic growth.",
    description:
      "<p>Analyze competitor keywords, backlinks, content, and search rankings to identify gaps and build a data-driven SEO strategy that improves visibility and attracts qualified traffic.</p>",
    features: [
      "Competitor Keyword & Ranking Analysis",
      "Backlink Profile & Link Gap Analysis",
      "Content Gap & Topical Analysis",
      "SERP & Competitor Benchmarking",
      "SEO Opportunity & Growth Strategy",
    ],
    image: "assets/images/seo_service/competitor-seo-analysis.webp",
  },
  {
    id: 24,
    heading: "Off-Page SEO & Quality Link Building",
    subheading:
      "Build website authority, earn quality backlinks, and improve search visibility with strategic off-page SEO services.",
    description:
      "<p>Strengthen your website’s authority with strategic off-page SEO and quality link building. We analyze backlink gaps, identify relevant websites, support digital PR and brand mentions, and develop white-hat link acquisition strategies. Our approach focuses on relevant, trustworthy links, natural link profiles, and measurable SEO improvements to support organic rankings, referral traffic, brand credibility, and qualified leads across search engines and AI-powered discovery platforms.</p>",
    features: [
      "High-Quality Backlink Building",
      "Competitor Backlink & Link Gap Analysis",
      "White-Hat Off-Page SEO & Authority Tracking",
    ],
    image:
      "assets/images/seo_service/off-page-seo-and-quality-link-building.webp",
  },
  {
    id: 25,
    heading: "Guest Posting & Digital PR",
    subheading:
      "Earn Quality Backlinks, Boost Brand Authority & Grow Organic Visibility.",
    description:
      "<p>Grow your brand’s online presence with strategic guest posting and digital PR services. We identify relevant publishing opportunities, develop valuable content, and support outreach to industry publications and trusted websites. Our approach prioritizes editorial relevance, genuine brand mentions, and ethical link acquisition to strengthen brand credibility, support SEO performance, attract referral traffic, and generate qualified business enquiries. We focus on useful content and measurable outcomes without promising guaranteed rankings or media placements.</p>",
    features: [
      "Niche-Relevant Guest Posting & Backlinks",
      "Digital PR & Media Outreach",
      "Brand Authority & Online Visibility Growth",
    ],
    image: "assets/images/seo_service/guest-posting-and-digital-pr.webp",
  },
  {
    id: 26,
    heading: "Website Performance & Core Web Vitals",
    subheading:
      "Improve Website Speed, Core Web Vitals & User Experience to Turn More Visitors into Leads.",
    description:
      "<p>Improve website speed, Core Web Vitals, and user experience with performance optimization services from Digital Nawab. We identify slow-loading pages, layout shifts, rendering delays, and technical bottlenecks to help your website load faster and work smoothly across mobile and desktop. Our data-driven approach focuses on Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS), supporting better usability, search performance, engagement, and conversion opportunities.</p>",
    features: [
      "Website Speed & Page Load Optimization",
      "Core Web Vitals & Technical Performance Fixes",
      "Mobile UX & Conversion Rate Optimization",
    ],
    image:
      "assets/images/seo_service/website-performance-and-core-web-vitals.webp",
  },
  {
    id: 27,
    heading: "SEO Conversion Optimization",
    subheading:
      "Turn Organic Traffic into Qualified Leads with SEO-Driven Conversion Optimization.",
    description:
      "<p>Convert more organic visitors into enquiries with SEO conversion optimization services from Digital Nawab. We analyze user intent, landing page content, calls to action, navigation, mobile usability, and conversion barriers to improve the journey from search to enquiry. By combining SEO insights with user experience and conversion rate optimization (CRO), we help businesses create more relevant, trustworthy, and user-friendly pages that support engagement and measurable business growth.</p>",
    features: [
      "Landing Page & Search Intent Optimization",
      "Conversion Rate & User Experience Optimization",
      "CTA, Lead Form & Conversion Funnel Improvements",
    ],
    image: "assets/images/seo_service/seo-conversion-optimization.webp",
  },
  {
    id: 28,
    heading: "SEO Monitoring & Monthly Reporting",
    subheading:
      "Track SEO Performance, Monitor Rankings & Discover Growth Opportunities That Drive More Leads.",
    description:
      "<p>Make informed SEO decisions with ongoing performance monitoring and monthly reporting from Digital Nawab. We track keyword rankings, organic traffic, Google Search Console data, technical issues, landing-page performance, and conversion trends to identify opportunities and measure progress. Our transparent reports highlight key changes, actionable recommendations, and next steps to improve search visibility, user experience, and qualified enquiries across organic and AI-powered search discovery.</p>",
    features: [
      "Keyword Rankings & Organic Traffic Tracking",
      "SEO Performance Reports & Search Console Analysis",
      "Technical Issue Monitoring & Growth Recommendations",
    ],
    image:
      "assets/images/seo_service/seo-monitoring-and-monthly-reporting.webp",
  },
  {
    id: 29,
    heading: "Customized SEO Solutions",
    subheading:
      "Get a Tailored SEO Strategy to Improve Rankings, Grow Organic Traffic & Generate Qualified Leads.",
    description:
      "<p>Grow your business with customized SEO solutions from Digital Nawab. We tailor SEO strategies to your industry, target audience, competition, website performance, and business goals. From technical SEO and keyword research to content optimization, local SEO, and AI search visibility, our approach prioritizes relevant traffic, better user experience, measurable progress, and qualified enquiries. Every strategy is built around your website’s specific opportunities rather than a one-size-fits-all approach.</p>",
    features: [
      "Customized SEO Strategy & Keyword Targeting",
      "Industry-Specific SEO & Competitor Analysis",
      "Performance Tracking & Lead-Focused Optimization",
    ],
    image: "assets/images/seo_service/customized-seo-solutions.webp",
  },
  {
    id: 30,
    heading: "Ecommerce SEO",
    subheading:
      "Boost Product Rankings, Attract High-Intent Shoppers & Grow Ecommerce Sales.",
    description:
      "<p>Grow your online store with ecommerce SEO services from Digital Nawab. We optimize product and category pages, product descriptions, site architecture, internal linking, technical SEO, and structured data to help search engines understand and discover your products. Our strategy targets relevant shopping searches, improves mobile shopping experiences, and identifies opportunities to increase organic traffic, product visibility, and qualified purchases across search engines and AI-powered discovery platforms.</p>",
    features: [
      "Product & Category Page SEO",
      "Ecommerce Technical SEO & Structured Data",
      "Shopping Keyword Research & Conversion Optimization",
    ],
    image: "assets/images/seo_service/ecommerce-seo.webp",
  },
];

// Helper to deduce category, icon, and colors dynamically from service title
const getServiceMeta = (heading = "", index = 0) => {
  const title = heading.toLowerCase();

  if (title.includes("audit")) {
    return {
      category: "Audit & Technical",
      icon: SearchCheck,
      gradient: "from-blue-500 to-cyan-500",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  if (title.includes("technical")) {
    return {
      category: "Audit & Technical",
      icon: Cpu,
      gradient: "from-cyan-500 to-teal-500",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    };
  }
  if (
    title.includes("performance") ||
    title.includes("vitals") ||
    title.includes("speed")
  ) {
    return {
      category: "Audit & Technical",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }
  if (title.includes("on-page")) {
    return {
      category: "On-Page & Content",
      icon: FileCode2,
      gradient: "from-blue-600 to-indigo-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  if (title.includes("keyword") || title.includes("search intent")) {
    return {
      category: "On-Page & Content",
      icon: Target,
      gradient: "from-indigo-500 to-purple-500",
      accentBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    };
  }
  if (title.includes("content") || title.includes("topical")) {
    return {
      category: "On-Page & Content",
      icon: Sparkles,
      gradient: "from-sky-500 to-blue-600",
      accentBg: "bg-sky-50 text-sky-700 border-sky-200",
    };
  }
  if (
    title.includes("off-page") ||
    title.includes("backlink") ||
    title.includes("link building")
  ) {
    return {
      category: "Authority & Backlinks",
      icon: Link2,
      gradient: "from-violet-500 to-purple-600",
      accentBg: "bg-violet-50 text-violet-700 border-violet-200",
    };
  }
  if (
    title.includes("guest") ||
    title.includes("digital pr") ||
    title.includes("media")
  ) {
    return {
      category: "Authority & Backlinks",
      icon: Globe,
      gradient: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-50 text-pink-700 border-pink-200",
    };
  }
  if (
    title.includes("local") ||
    title.includes("maps") ||
    title.includes("business profile")
  ) {
    return {
      category: "Local & Growth",
      icon: MapPin,
      gradient: "from-rose-500 to-amber-500",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
    };
  }
  if (title.includes("competitor")) {
    return {
      category: "Local & Growth",
      icon: Crosshair,
      gradient: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    };
  }
  if (title.includes("conversion") || title.includes("cro")) {
    return {
      category: "Local & Growth",
      icon: TrendingUp,
      gradient: "from-cyan-500 to-blue-600",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    };
  }
  if (title.includes("monitoring") || title.includes("reporting")) {
    return {
      category: "Local & Growth",
      icon: BarChart3,
      gradient: "from-blue-600 to-indigo-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  if (title.includes("customized") || title.includes("custom")) {
    return {
      category: "Local & Growth",
      icon: Sliders,
      gradient: "from-blue-600 to-cyan-500",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  if (
    title.includes("ecommerce") ||
    title.includes("store") ||
    title.includes("product")
  ) {
    return {
      category: "Local & Growth",
      icon: ShoppingBag,
      gradient: "from-orange-500 to-red-500",
      accentBg: "bg-orange-50 text-orange-700 border-orange-200",
    };
  }

  const fallbackIcons = [Search, Target, Cpu, FileText, MapPin, Link2];
  return {
    category: "Specialized SEO",
    icon: fallbackIcons[index % fallbackIcons.length],
    gradient: "from-blue-600 to-indigo-600",
    accentBg: "bg-blue-50 text-blue-700 border-blue-200",
  };
};

const formatApiData = (rawList) => {
  return rawList.map((item, index) => {
    const heading = item.heading || `SEO Service ${index + 1}`;
    const meta = getServiceMeta(heading, index);
    const rawImg = item.image || "";
    const image = rawImg.startsWith("http")
      ? rawImg
      : rawImg
      ? `https://dashboard.digitalnawab.com/${encodeURI(rawImg)}`
      : "https://dashboard.digitalnawab.com/assets/images/seo/SEO-Consultation.webp";

    const features = Array.isArray(item.features)
      ? item.features.filter(Boolean)
      : [];

    return {
      id: item.id || index + 1,
      step: String(index + 1).padStart(2, "0"),
      title: heading,
      subtitle: item.subheading || "Tailored SEO Strategy & Growth",
      description: item.description || "",
      features,
      image,
      category: meta.category,
      IconComponent: meta.icon,
      gradient: meta.gradient,
      accentBg: meta.accentBg,
      stats: {
        number: "95%",
        label: "Authority Increase",
      },
    };
  });
};

const CATEGORIES = [
  "All Services",
  "Audit & Technical",
  "On-Page & Content",
  "Authority & Backlinks",
  "Local & Growth",
];

const BacklinkBuilding = () => {
  const [services, setServices] = useState(() =>
    formatApiData(FALLBACK_SERVICES)
  );
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState("showcase"); // 'showcase' or 'grid'

  // Fetch dynamic data from Admin API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://dashboard.digitalnawab.com/api/getseoservice"
        );
        const result = await response.json();
        if (
          result?.data &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          const formatted = formatApiData(result.data);
          setServices(formatted);
        }
      } catch (error) {
        console.error("Error fetching SEO services:", error);
      }
    };

    fetchServices();
  }, []);

  // Filtered services based on category and search
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesCategory =
        selectedCategory === "All Services" ||
        srv.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  // Set default active service ID if not selected or if current selection is filtered out
  const activeService = useMemo(() => {
    if (filteredServices.length === 0) return null;
    const found = filteredServices.find((s) => s.id === selectedId);
    return found || filteredServices[0];
  }, [filteredServices, selectedId]);

  const activeIndex = useMemo(() => {
    if (!activeService) return 0;
    return filteredServices.findIndex((s) => s.id === activeService.id);
  }, [filteredServices, activeService]);

  const handlePrev = () => {
    if (filteredServices.length <= 1) return;
    const prevIdx =
      (activeIndex - 1 + filteredServices.length) % filteredServices.length;
    setSelectedId(filteredServices[prevIdx].id);
  };

  const handleNext = () => {
    if (filteredServices.length <= 1) return;
    const nextIdx = (activeIndex + 1) % filteredServices.length;
    setSelectedId(filteredServices[nextIdx].id);
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/80 to-slate-100/50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-12 left-1/3 w-[550px] h-[350px] bg-blue-100/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>SPECIALIZED SEO SERVICES</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Best SEO Services in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Lucknow
            </span>
          </h2>

          {/* Introductory Descriptions */}
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Search Engine Optimization is a technique for increasing traffic to a
            website through organic searches &amp; its totally different from PPC
            Advertising. By using SEO services from Digital Nawab: well known
            Best SEO Company in Lucknow, India, you will begin to see an increase
            in qualified visitors to your website.
          </p>

          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            You hire a website development company to create your website. After
            that it comes to SEO. We&apos;re professionals at offering search
            engine optimization tailored to your company goals, from link building
            and keyword research to page optimization and technical SEO.
          </p>
        </div>

        {/* ======================================================== */}
        {/* CONTROLS BAR: CATEGORIES, SEARCH & VIEW TOGGLE           */}
        {/* ======================================================== */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs sm:text-sm font-medium">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white font-semibold shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Action: View Toggle & Search */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode("showcase")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "showcase"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Interactive Tabbed Showcase"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Browse All as Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Cards ({services.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: INTERACTIVE SHOWCASE (Compact Master-Detail)     */}
        {/* Solves long scrolling completely! Height is contained!   */}
        {/* ======================================================== */}
        {viewMode === "showcase" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ---------------------------------------------------- */}
            {/* LEFT LIST: Interactive Service Navigation Rail       */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-2">
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Available Services ({filteredServices.length})
                </span>
                <span className="text-xs text-blue-600 font-semibold">
                  Click to explore
                </span>
              </div>

              {/* Scrollable container with stylish scrollbar */}
              <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
                {filteredServices.map((srv) => {
                  const isActive = activeService?.id === srv.id;
                  const Icon = srv.IconComponent;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedId(srv.id)}
                      className={`group p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 relative ${
                        isActive
                          ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20"
                          : "bg-white/70 hover:bg-white border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      {/* Active Left indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-full" />
                      )}

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${srv.gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Title & Category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400">
                            {srv.step}
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-blue-600 px-1.5 py-0.5 rounded bg-blue-50">
                            {srv.category}
                          </span>
                        </div>
                        <h4
                          className={`text-xs sm:text-sm font-bold truncate mt-0.5 ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {srv.title}
                        </h4>
                      </div>

                      {/* Right Chevron */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5"
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}

                {filteredServices.length === 0 && (
                  <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm text-slate-500">
                      No services found for this filter.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All Services");
                        setSearchQuery("");
                      }}
                      className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT STAGE: Detailed Active Service Spotlight       */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-7 xl:col-span-8">
              {activeService && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-7 lg:p-8 relative overflow-hidden"
                  >
                    {/* Top Status & Navigation Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                          SERVICE {activeService.step} OF{" "}
                          {String(filteredServices.length).padStart(2, "0")}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                          {activeService.category}
                        </span>
                      </div>

                      {/* Stat badge & Prev/Next Switcher */}
                      <div className="flex items-center gap-2">
                        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                          <span>95% Authority Increase</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={handlePrev}
                            className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                            title="Previous Service"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                            title="Next Service"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Spotlight Main Content: 2-Column Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                      
                      {/* Left: Text, Description & Features */}
                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {activeService.title}
                          </h3>
                          <p
                            className={`text-sm sm:text-base font-semibold bg-gradient-to-r ${activeService.gradient} bg-clip-text text-transparent mt-1 leading-snug`}
                          >
                            {activeService.subtitle}
                          </p>
                        </div>

                        {/* Rich HTML Description */}
                        <div
                          className="text-slate-600 text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none [&_p]:mb-2.5 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1.5 [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4"
                          dangerouslySetInnerHTML={{
                            __html: activeService.description,
                          }}
                        />

                        {/* Features Tags */}
                        {activeService.features.length > 0 && (
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-2">
                              Key Deliverables &amp; Highlights:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {activeService.features.map((feat, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700"
                                >
                                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  <span className="truncate">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action CTA */}
                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <ContactPopup
                            buttonText={`Enquire for ${activeService.title}`}
                            buttonClassName="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                          />
                          <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                          >
                            <span>Next Service</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Dashboard Preview Image with Floating Stat */}
                      <div className="md:col-span-5 relative">
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-lg bg-slate-50 h-56 sm:h-64 md:h-72 flex items-center justify-center p-3 group">
                          <img
                            src={activeService.image}
                            alt={activeService.title}
                            className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://dashboard.digitalnawab.com/assets/images/seo/SEO-Consultation.webp";
                            }}
                          />

                          {/* Floating Stat Pill on Image */}
                          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-2 shadow-md">
                            <div
                              className={`text-base font-extrabold bg-gradient-to-r ${activeService.gradient} bg-clip-text text-transparent`}
                            >
                              95%
                            </div>
                            <div className="text-[10px] font-medium text-slate-600">
                              Authority Increase
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: COMPACT 3-COLUMN GRID VIEW                       */}
        {/* Allows viewing all 14 services at a glance!              */}
        {/* ======================================================== */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => {
              const Icon = srv.IconComponent;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
                >
                  {/* Top Image Preview */}
                  <div className="relative h-44 bg-slate-50 p-3 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://dashboard.digitalnawab.com/assets/images/seo/SEO-Consultation.webp";
                      }}
                    />

                    {/* Step tag */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      #{srv.step}
                    </div>

                    {/* Category */}
                    <div className="absolute top-3 right-3 bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                      {srv.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-7 h-7 rounded-lg bg-gradient-to-br ${srv.gradient} text-white flex items-center justify-center shadow-xs shrink-0`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {srv.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
                        {srv.subtitle}
                      </p>

                      {/* Top 2 Features */}
                      {srv.features.length > 0 && (
                        <div className="space-y-1.5 mb-4">
                          {srv.features.slice(0, 2).map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 text-[11px] text-slate-600"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedId(srv.id);
                          setViewMode("showcase");
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <span className="text-[11px] font-semibold text-slate-400">
                        95% Authority
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* BOTTOM CALLOUT CONVERSION BANNER                         */}
        {/* ======================================================== */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1c3a] to-slate-950 text-white relative overflow-hidden border border-blue-900/40 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Dominate Search Results?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Get a Tailored SEO Roadmap Built for Your Business
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Identify ranking barriers, uncover high-intent competitor
                keywords, and unlock real ROI with our award-winning SEO
                specialists.
              </p>
            </div>

            <div className="shrink-0">
              <ContactPopup
                buttonText="Claim Your Free SEO Audit"
                buttonClassName="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Global CSS for Custom Sleek Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </section>
  );
};

export default BacklinkBuilding;
