"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Star,
  Zap,
  Target,
  Crown,
  Rocket,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  TrendingUp,
  Award,
  Layers,
  Search,
  MousePointerClick,
  Store,
  DollarSign,
  Flame,
  CheckCircle2,
  Globe,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";

export default function PackagesPage() {
  const [currency, setCurrency] = useState("INR"); // 'INR' or 'USD'
  const [activeCategory, setActiveCategory] = useState("seo"); // 'seo', 'paid-ads', 'combos'
  const [activeFaq, setActiveFaq] = useState(0);

  // SEO Packages (from verified source: https://www.digitalnawab.com/packages)
  const seoPackages = [
    {
      id: "local-starter",
      title: "Local Starter",
      popular: false,
      icon: Target,
      tagline: "Neighborhood & Local Visibility",
      description: "Perfect for local service providers, clinics, and restaurants looking to dominate their local catchment area.",
      price: {
        INR: "₹10,000",
        USD: "$120",
      },
      period: "/month",
      targetAudience: "Local Service Providers, Clinics, Restaurants",
      features: [
        { label: "Target Locations", value: "1–2 Cities" },
        { label: "Website Pages Optimized", value: "Up to 10 Pages" },
        { label: "Keyword Research", value: "Local Keyword Focus" },
        { label: "On-Page SEO", value: "Meta, H1, URL & Alt Tags" },
        { label: "Technical SEO", value: "Basic Audit & Fixes" },
        { label: "Local Business Listings", value: "GMB + 3 Citations" },
      ],
      deliverables: [
        "Monthly Ranking & Traffic Report",
        "Google Business Profile Audit",
        "Core On-Page Keyword Alignment",
      ],
    },
    {
      id: "standard-growth",
      title: "Standard Growth",
      popular: true, // Most Popular in source
      icon: TrendingUp,
      tagline: "National Reach & Competitive Rankings",
      description: "Accelerate your search visibility with comprehensive SEO strategies built for expanding regional & national brands.",
      price: {
        INR: "₹20,000",
        USD: "$240",
      },
      period: "/month",
      targetAudience: "National SMEs, B2B Corporates, Scaling Brands",
      features: [
        { label: "Target Locations", value: "Country-Wide" },
        { label: "Website Pages Optimized", value: "Up to 20 Pages" },
        { label: "Keyword Research", value: "Competitive & Industry Research" },
        { label: "On-Page SEO", value: "Advanced Tags + Internal Linking" },
        { label: "Technical SEO", value: "Full Audit + Speed & Crawl Fixes" },
        { label: "Local Listings", value: "GMB + 10+ Citations" },
      ],
      deliverables: [
        "Bi-Weekly Keyword Movement Tracking",
        "Technical Speed & Core Web Vitals Optimization",
        "High-Authority Backlink Acquisition",
        "Dedicated SEO Account Strategist",
      ],
    },
    {
      id: "ecommerce-seo",
      title: "E-Commerce SEO",
      popular: false,
      icon: Store,
      tagline: "Product & Category Ranking Engine",
      description: "Specialized search engine optimization engineered specifically for Shopify, WooCommerce, and Magento stores.",
      price: {
        INR: "₹35,000",
        USD: "$420",
      },
      period: "/month",
      targetAudience: "Online Stores (Shopify, WooCommerce, Magento)",
      features: [
        { label: "Target Locations", value: "Country + Targeted Regions" },
        { label: "Website Pages Optimized", value: "Up to 50 Product/Category Pages" },
        { label: "Keyword Research", value: "Product-Based + Category Targeting" },
        { label: "On-Page SEO", value: "Product Schema Markup + PDP Optimization" },
        { label: "Technical SEO", value: "Mobile UX + Structured Data" },
        { label: "Local & Rich Snippets", value: "GMB + Product Rich Snippets" },
      ],
      deliverables: [
        "Merchant Center Feed Review",
        "Collection Architecture & Internal Page PR Sculpting",
        "Product Schema & Review Aggregation Setup",
        "Conversion Funnel Search Optimization",
      ],
    },
    {
      id: "global-seo",
      title: "Global SEO",
      popular: false,
      icon: Globe,
      tagline: "Enterprise & International Expansion",
      description: "Enterprise-grade SEO architecture for global brands, SaaS platforms, and multilingual multi-domain web applications.",
      price: {
        INR: "₹50,000",
        USD: "$600",
      },
      period: "+/month",
      targetAudience: "SaaS, Global Brands, Multilingual Sites",
      features: [
        { label: "Target Locations", value: "Multi-Country & Multi-Language" },
        { label: "Website Pages Optimized", value: "50+ Enterprise Pages" },
        { label: "Keyword Research", value: "Multilingual & Geo-Based Research" },
        { label: "On-Page SEO", value: "Region-Specific Hreflang & Tags" },
        { label: "Technical SEO", value: "Multi-Domain/Subfolder Architecture" },
        { label: "Directory Submissions", value: "Global Authoritative Directories" },
      ],
      deliverables: [
        "International Hreflang Implementation",
        "Global Server Response & CDN Tuning",
        "International PR & Entity Link Building",
        "Direct C-Level Performance Dashboard",
      ],
    },
  ];

  // Paid Advertising Packages (from verified source: https://www.digitalnawab.com/packages)
  const paidPackages = [
    {
      id: "launch",
      title: "Launch",
      popular: false,
      icon: Rocket,
      tagline: "Kickstart Paid Customer Acquisition",
      description: "The ideal start for emerging businesses entering paid advertising with disciplined budget management.",
      price: {
        INR: "₹8,000",
        USD: "$95",
      },
      period: "/month",
      adSpendCondition: "Management Fee + Ad Spend",
      recommendedAdSpend: {
        INR: "₹10,000 – ₹20,000",
        USD: "$120 – $250",
      },
      targetAudience: "Businesses new to paid advertising",
      campaignFocus: "Brand Awareness & Qualified Traffic",
      adPlatforms: "Meta (Facebook & Instagram)",
      features: [
        { label: "Ad Creatives (Design)", value: "Up to 5 Static Ads", included: true },
        { label: "Ad Copywriting", value: "2 Tested Variations", included: true },
        { label: "Audience Targeting", value: "Core Interest-Based", included: true },
        { label: "Campaign Management", value: "Basic Daily Checks & Pacing", included: true },
        { label: "Pixel & Conversion Setup", value: "Standard Baseline", included: false },
        { label: "Landing Page Suggestions", value: "Consultative", included: false },
      ],
      whatsIncluded: [
        "Up to 5 Static Ads Designed",
        "2 Copywriting Variations",
        "Monthly Performance & Spend Summary",
      ],
    },
    {
      id: "accelerate",
      title: "Accelerate",
      popular: true, // Most Popular in source
      icon: Zap,
      tagline: "Scale Lead Generation & Conversions",
      description: "Scale your revenue pipeline with advanced interest targeting, creative variety, and conversion-focused A/B testing.",
      price: {
        INR: "₹20,000",
        USD: "$240",
      },
      period: "/month",
      adSpendCondition: "Management Fee + Ad Spend",
      recommendedAdSpend: {
        INR: "₹20,000 – ₹50,000",
        USD: "$250 – $600",
      },
      targetAudience: "Growth-stage companies ready to scale customer volume",
      campaignFocus: "Engagement & High-Intent Leads",
      adPlatforms: "Meta (FB & IG), LinkedIn Ads",
      features: [
        { label: "Ad Creatives (Design)", value: "10 Ads (Static + Carousel)", included: true },
        { label: "Ad Copywriting", value: "6 Strategic Variations", included: true },
        { label: "Audience Targeting", value: "Interest + Custom Lookalike", included: true },
        { label: "Pixel & Conversion Setup", value: "Standard Pixel & Event Tracking", included: true },
        { label: "Landing Page Suggestions", value: "Actionable Conversion Audit", included: true },
        { label: "Campaign Management", value: "Daily Bidding & A/B Testing", included: true },
      ],
      whatsIncluded: [
        "10 Static & Carousel Creatives",
        "6 High-Converting Ad Copy Sets",
        "ROAS & Cost-Per-Lead (CPL) Metrics",
      ],
    },
    {
      id: "scale",
      title: "Scale",
      popular: false,
      icon: Flame,
      tagline: "Multi-Platform Sales Domination",
      description: "Maximum acquisition velocity with comprehensive multi-channel video, stories, and deep algorithmic retargeting.",
      price: {
        INR: "₹35,000",
        USD: "$420",
      },
      period: "/month",
      adSpendCondition: "Management Fee + Ad Spend",
      recommendedAdSpend: {
        INR: "₹50,000 – ₹1,00,000",
        USD: "$600 – $1,200",
      },
      targetAudience: "Established stores & brands scaling multi-platform ROAS",
      campaignFocus: "Purchases, Conversions & Video Views",
      adPlatforms: "Meta, LinkedIn, YouTube, X (Twitter)",
      features: [
        { label: "Ad Creatives (Design)", value: "20 Mixed (Images, Video Hooks, Reels)", included: true },
        { label: "Ad Copywriting", value: "9 Strategic A/B Variants", included: true },
        { label: "Audience Targeting", value: "Custom + Omnichannel Retargeting", included: true },
        { label: "Pixel & Conversion Setup", value: "Full-Funnel CAPI & Event Tracking", included: true },
        { label: "Landing Page Suggestions", value: "In-depth CRO Wireframe Suggestions", included: true },
        { label: "Campaign Management", value: "Real-Time Bidding & Day-parting", included: true },
      ],
      whatsIncluded: [
        "20 Mixed Creatives (Images, Reels, Stories)",
        "9 A/B Copy Variations",
        "Deep Analytics (CPC, CTR, CPL & ROAS)",
      ],
    },
    {
      id: "dominate",
      title: "Dominate",
      popular: false,
      icon: Crown,
      tagline: "Enterprise Omni-Funnel Dominance",
      description: "Full-funnel brand-to-sale domination across every major advertising platform with dedicated senior account management.",
      price: {
        INR: "₹50,000",
        USD: "$600",
      },
      period: "+/month",
      adSpendCondition: "Management Fee + Ad Spend",
      recommendedAdSpend: {
        INR: "₹1,00,000+",
        USD: "$1,200+",
      },
      targetAudience: "Market leaders & enterprise brands with aggressive scaling targets",
      campaignFocus: "Full-Funnel Brand Awareness to Closed Revenue",
      adPlatforms: "All Platforms (Meta, LinkedIn, YouTube, Snapchat, Pinterest)",
      features: [
        { label: "Ad Creatives (Design)", value: "Unlimited Creative Iterations", included: true },
        { label: "Ad Copywriting", value: "Full-Funnel Angle & Copy Suites", included: true },
        { label: "Audience Targeting", value: "Advanced Funnel Mapping & Cohort Slicing", included: true },
        { label: "Pixel & Conversion Setup", value: "Server-Side CAPI & Offline Event Import", included: true },
        { label: "Landing Page Optimization", value: "Dedicated Landing Page CRO Guidance", included: true },
        { label: "Campaign Management", value: "Dedicated Senior Account Manager", included: true },
      ],
      whatsIncluded: [
        "Unlimited Creative Iterations",
        "Full Funnel Copywriting Sets",
        "Custom Executive BI Dashboard + Weekly Strategy Calls",
      ],
    },
  ];

  // Full-Stack Growth Combos (from ComboPackages.jsx)
  const comboPackages = [
    {
      id: "startup-launch",
      title: "Startup Launch",
      popular: false,
      icon: Rocket,
      tagline: "Complete Digital Foundation for New Ventures",
      description: "Everything a new business needs to build a modern web presence and generate immediate digital visibility.",
      price: {
        INR: "₹45,000",
        USD: "$550",
      },
      originalPrice: {
        INR: "₹65,000",
        USD: "$800",
      },
      duration: "4–6 Weeks Turnaround",
      targetAudience: "New Startups, Local Practices & Professionals",
      services: [
        "Responsive Website Development (5–8 Pages)",
        "On-Page Technical SEO Setup & Indexing",
        "Social Media Profile Setup (3 Platforms)",
        "Google Business Profile Optimization",
        "Brand Identity & Logo Design Guidelines",
        "Content Creation (10 Social Media Graphics)",
        "1-Year Domain & High-Speed Hosting Setup",
        "Full SSL Security Certificate & Backups",
      ],
    },
    {
      id: "growth-catalyst",
      title: "Growth Catalyst",
      popular: true, // Most Popular in combo package source
      icon: Target,
      tagline: "End-to-End Scale for Emerging Enterprises",
      description: "Comprehensive multi-channel expansion package uniting custom web development, SEO, and paid performance advertising.",
      price: {
        INR: "₹85,000",
        USD: "$1,050",
      },
      originalPrice: {
        INR: "₹1,25,000",
        USD: "$1,550",
      },
      duration: "6–8 Weeks Turnaround",
      targetAudience: "Established Businesses & Growing Regional Brands",
      services: [
        "Custom Interactive Website (10–15 Pages + Blog)",
        "Complete SEO Engine (50 Keywords + Backlinks)",
        "Social Media Management & Strategy (6 Months)",
        "Google Ads & Meta Advertising Campaign Setup",
        "Full Brand Identity Guidelines & Marketing Collateral",
        "Comprehensive Content Marketing & Blog Copy",
        "Automated Email Marketing & Flow Setup",
        "WhatsApp Business API & CRM Integration",
      ],
    },
    {
      id: "digital-domination",
      title: "Digital Domination",
      popular: false,
      icon: Crown,
      tagline: "The Ultimate Enterprise Growth Retainer",
      description: "Our flagship end-to-end package combining custom web + mobile application development with aggressive multi-channel marketing.",
      price: {
        INR: "₹1,50,000",
        USD: "$1,850",
      },
      originalPrice: {
        INR: "₹2,25,000",
        USD: "$2,800",
      },
      duration: "8–12 Weeks Turnaround",
      targetAudience: "Enterprises, Large Retailers & Established Disruptors",
      services: [
        "Custom High-Speed Website + Mobile App (iOS & Android)",
        "Advanced National & Local SEO Domination",
        "Multi-Platform Paid Advertising Management",
        "Comprehensive Brand Identity & Visual Assets Overhaul",
        "Video Marketing & Short-Form Video Production",
        "Full CRM Pipeline & Conversion Tracking Integration",
        "Dedicated Growth Strategist & 24/7 SLA Support",
      ],
    },
  ];

  const faqs = [
    {
      q: "How does currency switching work on your pricing?",
      a: "Our currency switcher allows international and domestic clients to view verified, transparent pricing in both Indian Rupees (INR) and US Dollars (USD). The displayed values correspond exactly to our standardized rate card for both domestic and overseas projects.",
    },
    {
      q: "How is the advertising spend handled for paid ad packages?",
      a: "For Paid Advertising plans, the listed price represents Digital Nawab's expert management fee (strategy, creative production, ad copywriting, audience testing, and daily campaign optimization). The recommended ad spend is paid directly by you to the advertising platforms (Google, Meta, LinkedIn) through your own secure payment method, giving you 100% financial transparency.",
    },
    {
      q: "Are there any long-term contract lock-ins?",
      a: "No. Our SEO and Paid Advertising packages operate on a flexible monthly retainer model. While organic SEO generates compounding returns over 3 to 6 months, you are never trapped in a multi-year lock-in. You can upgrade, adjust, or pause services with standard 30-day notice.",
    },
    {
      q: "Can I customize a hybrid package combining SEO, Ads, and Web Development?",
      a: "Absolutely. Many of our clients opt for tailored combinations that fit their specific stage of growth. Review our All-in-One Digital Growth Combos above, or contact our team directly for a bespoke proposal engineered around your goals.",
    },
    {
      q: "How quickly do we begin once a package is selected?",
      a: "Onboarding begins immediately upon agreement. Within 48 business hours, you will meet your dedicated account manager, complete the asset and access checklist, and receive our initial 30-day execution roadmap.",
    },
  ];

  return (
    <div className="bg-[#07090e] text-white min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/20 to-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Transparent, Result-Oriented Retainers</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
            Predictable Pricing Designed for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Scalable Business Growth
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose the package engineered for your current growth trajectory. No ambiguous promises or hidden surprises — just disciplined execution, transparent reporting, and verifiable ROI.
          </p>

          {/* Currency Switcher Toggle */}
          <div className="pt-4 flex flex-col items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Select Currency:</span>
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>INR (₹)</span>
                {currency === "INR" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>USD ($)</span>
                {currency === "USD" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY TABS
      ========================================================= */}
      <section className="py-8 bg-[#090c14] border-b border-white/5 sticky top-[80px] z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center overflow-x-auto py-1">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-1 sm:gap-2">
              <button
                onClick={() => setActiveCategory("seo")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === "seo"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>SEO Services</span>
              </button>
              <button
                onClick={() => setActiveCategory("paid-ads")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === "paid-ads"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MousePointerClick className="w-4 h-4" />
                <span>Paid Advertising</span>
              </button>
              <button
                onClick={() => setActiveCategory("combos")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === "combos"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>All-in-One Combos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PACKAGES DISPLAY SECTION
      ========================================================= */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: SEO SERVICES PACKAGES */}
          {activeCategory === "seo" && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  Organic Visibility Retainers
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Search Engine Optimization (SEO) Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Dominate your niche with comprehensive SEO packages designed to boost rankings, earn backlinks, and drive organic traffic.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {seoPackages.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-white/[0.05] to-transparent border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs shadow-md tracking-wider uppercase">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono">
                            Monthly retainer • No lock-in
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Target Audience:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <ContactPopup
                          buttonText={`Get Started with ${plan.title}`}
                          buttonClassName={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PAID ADVERTISING PACKAGES */}
          {activeCategory === "paid-ads" && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
                  Performance Marketing Retainers
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Paid Advertising (PPC & Meta Ads) Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Performance-driven paid campaigns for maximum ROI with tailored strategies for awareness, lead generation, and ROAS optimization.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {paidPackages.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-white/[0.05] to-transparent border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-indigo-400 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold text-xs shadow-md tracking-wider uppercase">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price & Ad Spend Condition */}
                        <div className="py-3 border-y border-white/10 space-y-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <p className="text-[11px] text-indigo-300 font-mono">
                            {plan.adSpendCondition}
                          </p>
                        </div>

                        {/* Recommended Ad Spend Box */}
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                            Recommended Ad Spend:
                          </span>
                          <p className="text-xs text-red-200 font-bold">
                            {plan.recommendedAdSpend[currency]}
                          </p>
                        </div>

                        {/* Campaign Focus & Platforms */}
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Focus:</span>
                            <span className="text-white font-medium">{plan.campaignFocus}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Platforms:</span>
                            <span className="text-cyan-300 font-medium">{plan.adPlatforms}</span>
                          </div>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              {f.included ? (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <ContactPopup
                          buttonText={`Start ${plan.title} Campaign`}
                          buttonClassName={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ALL-IN-ONE COMBOS */}
          {activeCategory === "combos" && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                  Full-Stack Synergies
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  All-in-One Digital Growth Combos
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Comprehensive digital packages combining bespoke web development, branding, SEO, and paid performance advertising under one transparent contract.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {comboPackages.map((combo) => {
                  const Icon = combo.icon;
                  return (
                    <div
                      key={combo.id}
                      className={`rounded-3xl p-8 bg-gradient-to-b from-white/[0.05] to-transparent border flex flex-col justify-between transition-all duration-300 relative ${
                        combo.popular
                          ? "border-emerald-400 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {combo.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-bold text-xs shadow-md tracking-wider uppercase">
                          Most Popular Combo
                        </div>
                      )}

                      <div className="space-y-6">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            {combo.duration}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white">{combo.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {combo.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-4 border-y border-white/10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">
                              {combo.price[currency]}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {combo.originalPrice[currency]}
                            </span>
                          </div>
                          <span className="text-xs text-emerald-400 font-medium">
                            Complete Turnkey Delivery
                          </span>
                        </div>

                        {/* Target Audience */}
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            Ideal For:
                          </span>
                          <span className="text-xs text-white font-medium">
                            {combo.targetAudience}
                          </span>
                        </div>

                        {/* Services List */}
                        <div className="space-y-2.5 pt-2 text-xs">
                          {combo.services.map((srv, sidx) => (
                            <div key={sidx} className="flex items-start gap-2.5 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{srv}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 mt-8 border-t border-white/5">
                        <ContactPopup
                          buttonText={`Order ${combo.title}`}
                          buttonClassName={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-center transition-all cursor-pointer ${
                            combo.popular
                              ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-black hover:opacity-95 shadow-xl shadow-emerald-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Transparent Details
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Package & Billing Questions
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Clear answers regarding currency conversion, advertising spends, contracts, and onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CONSULTATION CTA SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5" /> Need Advice on the Right Plan?
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Not Sure Which Package Fits Your Current Growth Stage?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Speak directly with our senior growth strategists. We'll evaluate your current traffic, review your conversion funnel, and recommend the exact package setup for your budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <ContactPopup
              buttonText="Request Custom Package Proposal"
              buttonClassName="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 text-black font-bold hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 cursor-pointer text-base"
            />
            <Link
              href="/contact-us"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition-all text-base"
            >
              Contact Our Team
            </Link>
          </div>

          {/* Related Links */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-400">
            <span className="text-gray-500 uppercase tracking-wider font-semibold">Explore Services:</span>
            <Link href="/service/ecommerce-marketing" className="hover:text-cyan-300 transition">
              Ecommerce Marketing
            </Link>
            <Link href="/service/mobile-application-development" className="hover:text-cyan-300 transition">
              Mobile App Development
            </Link>
            <Link href="/service/seo-company-in-lucknow" className="hover:text-cyan-300 transition">
              SEO Marketing
            </Link>
            <Link href="/service/pay-per-click-services" className="hover:text-cyan-300 transition">
              PPC & Google Ads
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
