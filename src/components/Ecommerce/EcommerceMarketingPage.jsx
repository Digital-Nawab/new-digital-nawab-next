"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  TrendingUp,
  Search,
  Share2,
  MousePointerClick,
  Mail,
  Store,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  Zap,
  Star,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe,
  RefreshCw,
  Target,
  ExternalLink,
  Users,
  Check,
  Package,
  Clock,
  Award,
  HelpCircle,
  Percent,
  SlidersHorizontal,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";

export default function EcommerceMarketingPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeStrategyTab, setActiveStrategyTab] = useState("acquisition");

  const services = [
    {
      id: "ecommerce-seo",
      icon: Search,
      title: "Ecommerce SEO",
      tagline: "Dominate Search Results with High-Intent Organic Traffic",
      accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-500/30 hover:border-cyan-400",
      description:
        "Over 75% of online shoppers never scroll past page one. We optimize your product catalogs, collection architecture, schema markup, and technical crawlability so your store ranks at the top for valuable, high-intent transactional search terms.",
      features: [
        "Product schema & rich snippet integration",
        "Collection & category page keyword optimization",
        "High-intent transactional keyword targeting",
        "Technical SEO: core web vitals, speed & crawl budget",
        "Competitor gap analysis & authoritative backlink building",
      ],
      link: "/service/seo-company-in-lucknow",
    },
    {
      id: "social-media-marketing",
      icon: Share2,
      title: "Social Media Marketing",
      tagline: "Turn Social Scrolling into High-Converting Store Checkouts",
      accent: "from-pink-500/20 via-purple-500/10 to-transparent",
      iconColor: "text-pink-400",
      borderColor: "border-pink-500/30 hover:border-pink-400",
      description:
        "According to consumer studies, 75% of shoppers purchase products they discovered on social media. We create thumb-stopping creative ad sets, dynamic catalog ads on Meta (Instagram & Facebook), and influencer collaborations engineered to drive high-margin sales.",
      features: [
        "Meta Dynamic Product Ads (DPA) & Catalog Sales",
        "Reels, short-form video & lifestyle creative design",
        "Targeted retargeting for store visitors & cart abandoners",
        "Audience lookalike modeling based on high-LTV buyers",
        "Omnichannel brand engagement & social proof amplification",
      ],
      link: "/service/social-media-marketing",
    },
    {
      id: "ppc-advertising",
      icon: MousePointerClick,
      title: "PPC & Paid Search Advertising",
      tagline: "Capture Ready-to-Buy Customers with Laser-Focused ROI",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30 hover:border-amber-400",
      description:
        "Pay-Per-Click advertising connects your products directly with customers actively searching to buy. With Google Shopping, Performance Max, and high-converting Search Ads, we maximize Return on Ad Spend (ROAS) and eliminate wasted marketing budget.",
      features: [
        "Google Shopping & Merchant Center feed optimization",
        "Performance Max (PMax) multi-channel AI campaigns",
        "High-converting search ads on commercial keywords",
        "Negative keyword filtering & bidding strategy optimization",
        "Cross-platform retargeting with tailored promotional offers",
      ],
      link: "/service/pay-per-click-services",
    },
    {
      id: "email-marketing",
      icon: Mail,
      title: "Email & Retention Marketing",
      tagline: "Automate Repeat Revenue & Maximize Customer Lifetime Value",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30 hover:border-emerald-400",
      description:
        "Email marketing remains one of the highest-ROI channels in ecommerce. We architect personalized lifecycle automations, recovered cart flows, and VIP re-engagement campaigns that turn one-time shoppers into repeat brand advocates.",
      features: [
        "Automated abandoned cart & abandoned browse sequences",
        "Welcome nurture series with conversion incentive testing",
        "Post-purchase cross-sell, up-sell & replenishment flows",
        "VIP customer segmentation & loyalty milestone rewards",
        "High-deliverability list hygiene & sender reputation care",
      ],
      link: "/packages",
    },
    {
      id: "marketplace-advertising",
      icon: Store,
      title: "Marketplace Advertising",
      tagline: "Dominate Amazon, Flipkart & Multi-Channel Marketplaces",
      accent: "from-indigo-500/20 via-blue-500/10 to-transparent",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/30 hover:border-indigo-400",
      description:
        "With millions of searches per minute on Amazon and leading marketplaces, standing out requires algorithm mastery. We implement Sponsored Products, Sponsored Brands, and inventory-synced campaigns that ensure ad spend is only deployed when stock is available.",
      features: [
        "Amazon Sponsored Products, Brands & Display Ads",
        "Inventory-synced pacing to prevent out-of-stock wasted ad spend",
        "A+ Content and enhanced brand storefront optimization",
        "Buy Box protection & competitor conquesting campaigns",
        "Review acquisition strategies & keyword rank tracking",
      ],
      link: "/packages",
    },
  ];

  const strategies = {
    acquisition: {
      title: "Traffic Acquisition",
      tagline: "Attracting High-Intent Shoppers at the Lowest Possible Cost",
      description:
        "Growth begins with consistent, relevant traffic. We deploy a multi-channel acquisition engine spanning organic search, high-intent Google Shopping, Meta discovery ads, and marketplace visibility so your brand reaches ready-to-buy consumers across every touchpoint.",
      bullets: [
        "Capturing commercial search intent on Google & Bing",
        "Visual product discovery across Instagram, Facebook, and Pinterest",
        "High-relevance marketplace ranking for Amazon & regional platforms",
        "Lookalike & interest-based targeting engineered for scalable ROAS",
      ],
      metrics: [
        { label: "Targeting Accuracy", val: "94%" },
        { label: "Qualified Clicks", val: "High Intent" },
      ],
    },
    conversion: {
      title: "Conversion Optimization (CRO)",
      tagline: "Transforming Store Visitors into High-Value Customers",
      description:
        "Driving traffic is only half the battle. We rigorously analyze user session recordings, heatmaps, and funnel drop-offs to remove checkout friction, optimize product detail pages (PDPs), and build unshakable consumer trust that boosts cart checkout rates.",
      bullets: [
        "Mobile-first product page layout and typography hierarchy",
        "Streamlined 1-page checkout flows and trusted payment gateways",
        "Strategic urgency elements, customer review proof, and trust badges",
        "A/B split testing on CTAs, value propositions, and bundle deals",
      ],
      metrics: [
        { label: "Checkout Friction", val: "-40%" },
        { label: "Avg. Cart Value", val: "Optimized" },
      ],
    },
    retention: {
      title: "Customer Retention & LTV",
      tagline: "Multiplying Revenue Through Loyal, Repeat Buyers",
      description:
        "Acquiring a new customer costs 5x more than retaining an existing one. We build automated retention loops that continuously engage past buyers with tailored recommendations, exclusive loyalty perks, and replenishment reminders that maximize Lifetime Value (LTV).",
      bullets: [
        "Data-driven email and SMS replenishment flows based on usage cycles",
        "Tiered loyalty and VIP reward structures to encourage repeat orders",
        "Post-purchase cross-sell sequences matched to purchase history",
        "Reactivation campaigns to win back inactive shoppers before churn",
      ],
      metrics: [
        { label: "Repeat Purchase Rate", val: "Scalable" },
        { label: "Customer LTV", val: "Compounded" },
      ],
    },
  };

  const processSteps = [
    {
      num: "01",
      title: "Store Audit & Strategy",
      desc: "We analyze your store tech stack, product catalog unit economics, target audience personas, and current competitor benchmarks to design a tailored full-funnel growth roadmap.",
    },
    {
      num: "02",
      title: "Tracking & Asset Setup",
      desc: "Flawless tracking is paramount. We configure Meta Conversions API (CAPI), Google Analytics 4 Ecommerce events, product feeds, and creative ad assets built for high conversion.",
    },
    {
      num: "03",
      title: "Multi-Channel Scaling",
      desc: "We launch segmented campaigns across Search, Shopping, Social, and Marketplaces, actively managing bids, testing creative variations, and scaling winning audiences.",
    },
    {
      num: "04",
      title: "Optimization & Reporting",
      desc: "Continuous A/B testing, inventory-aligned budget adjustments, and transparent bi-weekly performance reporting with actionable insights focused on net profit and ROAS.",
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Omnichannel Reach",
      desc: "Seamless integration across Google Search, Shopping, Social Media, and Marketplaces to ensure your brand is omnipresent.",
    },
    {
      icon: Target,
      title: "High-Intent Buyers",
      desc: "We focus on transactional search intent and ready-to-buy audiences rather than vanity clicks that drain marketing budgets.",
    },
    {
      icon: ShieldCheck,
      title: "Inventory-Synced Ads",
      desc: "Automated controls ensure ad spend is instantly paused on out-of-stock SKUs, preventing wasted budget and poor customer experiences.",
    },
    {
      icon: TrendingUp,
      title: "Predictable ROAS",
      desc: "Data-backed bid management and conversion tracking allow you to scale ad budgets with confidence and clear margin predictability.",
    },
    {
      icon: Users,
      title: "Dedicated Specialists",
      desc: "Work directly with seasoned ecommerce strategists, media buyers, copywriters, and developers focused on your revenue goals.",
    },
    {
      icon: Award,
      title: "Full-Funnel Synergy",
      desc: "Acquisition, conversion rate optimization, and retention work together under one roof for maximum compounding returns.",
    },
  ];

  const faqs = [
    {
      q: "What is the difference between Ecommerce SEO and PPC advertising?",
      a: "Ecommerce SEO focuses on optimizing your store structure, product schema, and collection pages to earn organic (free) top rankings on Google and Bing over the medium to long term. PPC (Pay-Per-Click), including Google Shopping and Meta Ads, provides immediate visibility and traffic where you only pay when an interested user clicks your ad. Combining both channels produces the most resilient, cost-effective growth strategy.",
    },
    {
      q: "Which ecommerce platforms does Digital Nawab support?",
      a: "We work seamlessly across all major ecommerce architectures, including Shopify & Shopify Plus, WooCommerce, Magento (Adobe Commerce), BigCommerce, and custom Headless Next.js/React storefronts. Our marketing strategies and tracking pipelines are tailored to each platform's unique technical capabilities.",
    },
    {
      q: "How do you prevent wasted ad spend on out-of-stock products?",
      a: "We integrate dynamic product feeds and automated rules connected to your store inventory. When a product or specific variant falls below stock thresholds, campaigns automatically throttle or pause advertising for that SKU and reallocate budget to in-stock, high-margin bestsellers.",
    },
    {
      q: "What ad budget is required to start seeing meaningful results?",
      a: "Recommended starting budgets vary depending on your average order value (AOV) and target market. For local or niche stores, paid advertising packages can launch with ₹10,000–₹20,000 monthly ad spend to establish baseline data, while scaling brands typically allocate ₹50,000+ per month. We provide transparent recommendations during our initial audit.",
    },
    {
      q: "How do you track ecommerce sales and return on ad spend (ROAS)?",
      a: "We implement server-side tracking via Meta Conversions API (CAPI), Google Analytics 4 (GA4) Enhanced Ecommerce, and Google Tag Manager. This circumvents browser cookie blockers and provides accurate reporting on Add to Cart, Initiate Checkout, Purchase Value, and ROAS across all channels.",
    },
    {
      q: "Do you design the creative assets and copy for our ad campaigns?",
      a: "Yes. Our full-service model includes professional ad creative design (static image banners, carousel graphics, promotional badges, and video hooks) as well as conversion-focused copywriting tailored to your target buyer personas.",
    },
  ];

  return (
    <div className="bg-[#07090e] text-white min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-pink-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Performance-Driven Ecommerce Agency</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Turn Browsers into Buyers with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Data-Driven Ecommerce Marketing
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Scale your online store with full-funnel digital marketing. From top-ranking Ecommerce SEO and high-ROAS Google Shopping to automated email retention and marketplace advertising — we engineer measurable sales growth for ambitious brands.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ContactPopup
                  buttonText="Get Free Ecommerce Audit"
                  buttonClassName="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 text-black font-semibold hover:opacity-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer text-sm sm:text-base"
                />

                <Link
                  href="/packages"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium transition-all text-sm sm:text-base"
                >
                  <span>Explore Pricing Packages</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

              {/* Platform Highlights */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
                <span className="text-gray-500 font-semibold tracking-wider uppercase">Platforms We Scale:</span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Shopify & Plus
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> WooCommerce
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Amazon & Marketplaces
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Headless / Next.js
                </span>
              </div>
            </motion.div>

            {/* Right Interactive Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-white/10 to-purple-500/20 shadow-2xl shadow-cyan-500/10">
                <div className="rounded-[14px] bg-[#0c101a] border border-white/10 p-5 sm:p-6 space-y-5">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-xs font-mono text-gray-400">store-performance.live</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Tracking
                    </span>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 font-medium">Monthly Gross Sales</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mt-1">₹14,85,400</p>
                      <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +38.6% vs last month
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 font-medium">Average ROAS</p>
                      <p className="text-xl sm:text-2xl font-bold text-cyan-300 mt-1">4.82x</p>
                      <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                        <Percent className="w-3 h-3" /> 4.2% Conv. Rate
                      </p>
                    </div>
                  </div>

                  {/* Interactive Styled Graph */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-semibold text-gray-300">Revenue Growth Velocity</span>
                      <span className="text-cyan-400 font-mono">Q3 Performance</span>
                    </div>
                    <div className="h-28 w-full pt-2">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="ecomGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,80 Q50,65 100,50 T200,28 T300,10 L300,100 L0,100 Z"
                          fill="url(#ecomGrad)"
                        />
                        <path
                          d="M0,80 Q50,65 100,50 T200,28 T300,10"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="50" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="200" cy="28" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="300" cy="10" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-1">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span className="text-cyan-400 font-bold">Week 4 (Peak)</span>
                    </div>
                  </div>

                  {/* Channel Breakdown */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                      <span>Channel Attribution</span>
                      <span className="text-gray-500 text-[11px]">Orders Generated</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="flex items-center gap-2 text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" /> Google Shopping / PMax
                        </span>
                        <span className="font-mono text-white font-medium">1,120 orders (42%)</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="flex items-center gap-2 text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-pink-400" /> Meta Dynamic Ads
                        </span>
                        <span className="font-mono text-white font-medium">890 orders (33%)</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="flex items-center gap-2 text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Klaviyo Email Retention
                        </span>
                        <span className="font-mono text-white font-medium">670 orders (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Understanding Ecommerce Growth
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              What Are Ecommerce Marketing Services?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Ecommerce marketing is far more than just running sporadic social ads. It is an end-to-end commercial strategy designed to guide shoppers through every step of their purchasing journey — from brand awareness to checkout and loyal repeat purchases.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="mt-14 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Powering Both Pure-Play & Physical Retailers
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Over <strong className="text-white">56% of businesses</strong> employing ecommerce digital marketing also maintain brick-and-mortar storefronts. Ecommerce marketing empowers physical retailers to break geographical limitations, unlock national customer demand, and serve multi-location shoppers seamlessly.
              </p>
            </div>

            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Digital Nawab's 360° Full-Service Approach
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Unlike siloed freelancers, Digital Nawab unites <strong className="text-white">Strategy, Creative, Performance Marketing, and Technology</strong> under one roof. We eliminate fragmented agency handoffs so your advertising campaigns, product pages, and technical integrations work in total harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES GRID SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Our Service Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Comprehensive Ecommerce Marketing Solutions
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Tailored growth engines engineered to maximize store visibility, cart order volume, and long-term customer profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent p-7 border ${srv.borderColor} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-lg`}
                >
                  <div className="space-y-5">
                    {/* Icon & Category Tag */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${srv.iconColor}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs font-medium text-cyan-400/90 mt-1">
                        {srv.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {srv.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={srv.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5 duration-200"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          THE STRATEGY SECTION (3-PILLAR FLYWHEEL)
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              The Ecommerce Flywheel
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our 3-Pillar Ecommerce Strategy
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Choosing the right methodology and adapting it to shifting consumer behaviors is half the battle won. Our dynamic framework scales your revenue predictably.
            </p>
          </div>

          {/* Interactive Strategy Selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveStrategyTab("acquisition")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeStrategyTab === "acquisition"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                1. Traffic Acquisition
              </button>
              <button
                onClick={() => setActiveStrategyTab("conversion")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeStrategyTab === "conversion"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                2. Conversion Rate (CRO)
              </button>
              <button
                onClick={() => setActiveStrategyTab("retention")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeStrategyTab === "retention"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                3. Customer Retention
              </button>
            </div>
          </div>

          {/* Selected Strategy Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStrategyTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-block px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                    Pillar Strategy Focus
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {strategies[activeStrategyTab].title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    {strategies[activeStrategyTab].tagline}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {strategies[activeStrategyTab].description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {strategies[activeStrategyTab].bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4">
                  {strategies[activeStrategyTab].metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1"
                    >
                      <span className="text-xs uppercase text-gray-400 tracking-wider">
                        {m.label}
                      </span>
                      <p className="text-3xl font-extrabold text-cyan-300">
                        {m.val}
                      </p>
                    </div>
                  ))}
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <p className="text-xs text-cyan-200">
                      Synchronized across all marketing campaigns for compounding returns.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          THE PROCESS SECTION (4 STEPS)
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Proven Execution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our 4-Step Ecommerce Process
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              A systematic roadmap that eliminates guesswork, reduces ad waste, and scales store revenues consistently.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 relative hover:border-cyan-500/40 transition-all group"
              >
                <div className="text-3xl font-extrabold text-cyan-500/30 group-hover:text-cyan-400 font-mono transition-colors">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Why Choose Digital Nawab
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Key Advantages for Your Online Business
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Gain a competitive edge with cutting-edge tools, battle-tested strategies, and dedicated execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-white/20 transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Everything you need to know about our ecommerce marketing services and onboarding process.
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
          FINAL CONVERSION CTA SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Zap className="w-3.5 h-3.5" /> Start Scaling Your Store Today
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Ready to Accelerate Your Online Sales & Maximize Store ROAS?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential 30-minute growth audit with our ecommerce specialists. We'll identify conversion leaks, ad spend inefficiencies, and untapped search opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <ContactPopup
              buttonText="Claim Your Free Growth Audit"
              buttonClassName="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 text-black font-bold hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 cursor-pointer text-base"
            />
            <Link
              href="/packages"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition-all text-base"
            >
              View Service Packages
            </Link>
          </div>

          {/* Related Links */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-400">
            <span className="text-gray-500 uppercase tracking-wider font-semibold">Related Services:</span>
            <Link href="/service/seo-company-in-lucknow" className="hover:text-cyan-300 transition">
              SEO Services
            </Link>
            <Link href="/service/pay-per-click-services" className="hover:text-cyan-300 transition">
              PPC & Google Ads
            </Link>
            <Link href="/service/social-media-marketing" className="hover:text-cyan-300 transition">
              Social Media Marketing
            </Link>
            <Link href="/service/mobile-application-development" className="hover:text-cyan-300 transition">
              Mobile App Development
            </Link>
            <Link href="/packages" className="hover:text-cyan-300 transition">
              Pricing Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
