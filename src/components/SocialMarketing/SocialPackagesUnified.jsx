"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Flame,
  Crown,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  HelpCircle,
  PhoneCall
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const smoPackages = [
  {
    id: "smo-starter",
    name: "Starter Growth",
    badge: "For Small Businesses & Startups",
    priceINR: "6,000",
    priceUSD: "75",
    popular: false,
    description: "Build an active, trustworthy organic presence on Meta platforms with consistent creative content.",
    features: [
      { text: "12 Custom Static Posts (3/week)", included: true },
      { text: "8 High-Engagement Stories", included: true },
      { text: "SEO Captions & Targeted Hashtags", included: true },
      { text: "Complete Page Bio & Highlight Setup", included: true },
      { text: "Monthly Engagement Summary Report", included: true },
      { text: "Dedicated Content Calendar", included: true },
      { text: "Reels / Video Editing", included: false },
      { text: "Community Comment Moderation", included: false },
    ],
  },
  {
    id: "smo-pro",
    name: "Pro Brand",
    badge: "Most Popular for Scaling",
    priceINR: "12,000",
    priceUSD: "150",
    popular: true,
    description: "Multi-platform presence with Reels, Carousels, and proactive community management to grow followers.",
    features: [
      { text: "18 Posts (Carousels + Static)", included: true },
      { text: "12 Interactive Stories / Polls", included: true },
      { text: "2 Short-Form Reels / Month", included: true },
      { text: "Multi-Platform (Meta + LinkedIn)", included: true },
      { text: "Comment Replies & Engagement", included: true },
      { text: "Detailed Monthly Performance Report", included: true },
      { text: "Monthly Strategy Consultation Call", included: true },
      { text: "Weekly Video Trend Production", included: false },
    ],
  },
  {
    id: "smo-elite",
    name: "Elite Viral",
    badge: "Full Authority & Video Domination",
    priceINR: "25,000",
    priceUSD: "300",
    popular: false,
    description: "Dominant brand presence with high-volume short-form video, cross-channel reach, and viral trendjacking.",
    features: [
      { text: "25 Mixed Posts & Carousels", included: true },
      { text: "20 Active Stories / Month", included: true },
      { text: "6 Viral Reels / Shorts / Month", included: true },
      { text: "Omnichannel (Meta, LinkedIn, YouTube)", included: true },
      { text: "Active Daily Community Management", included: true },
      { text: "Dedicated Social Media Manager", included: true },
      { text: "Bi-Weekly Strategy & Growth Calls", included: true },
      { text: "Custom Influencer Collab Strategy", included: true },
    ],
  },
];

const smmPackages = [
  {
    id: "smm-launch",
    name: "Launch Ads",
    badge: "Ideal For Local & Service Lead Gen",
    priceINR: "8,000",
    priceUSD: "100",
    adSpendINR: "₹10,000 - ₹20,000",
    adSpendUSD: "$150 - $300",
    popular: false,
    description: "Targeted Meta ad campaigns engineered for immediate traffic, brand awareness, and local customer inquiries.",
    features: [
      { text: "Up to 5 High-CTR Static Ad Creatives", included: true },
      { text: "2 Persuasive Ad Copy Variations", included: true },
      { text: "Targeted Audience & Interest Clustering", included: true },
      { text: "Weekly Ad Optimization & Bid Tuning", included: true },
      { text: "Monthly Performance & CPL Report", included: true },
      { text: "Pixel / Event Setup & Verification", included: true },
      { text: "Multi-Tiered Retargeting Funnel", included: false },
      { text: "Dynamic Catalog Ads", included: false },
    ],
  },
  {
    id: "smm-accelerate",
    name: "Accelerate ROAS",
    badge: "Highest Return On Ad Spend",
    priceINR: "20,000",
    priceUSD: "250",
    adSpendINR: "₹20,000 - ₹50,000",
    adSpendUSD: "$300 - $600",
    popular: true,
    description: "Full-funnel lead generation & e-commerce conversion ads with custom retargeting and A/B hook testing.",
    features: [
      { text: "10 Ad Creatives (Static, Carousel & Video)", included: true },
      { text: "6 A/B Copywriting Hooks", included: true },
      { text: "Lookalike & Custom Audiences (LAL 1-3%)", included: true },
      { text: "Full Retargeting Layer for Warm Leads", included: true },
      { text: "Bi-Weekly Deep Attribution Reporting", included: true },
      { text: "Bi-Weekly Strategy Consultation Call", included: true },
      { text: "Meta Conversions API (CAPI) Integration", included: true },
      { text: "Dedicated Senior Account Manager", included: false },
    ],
  },
  {
    id: "smm-scale",
    name: "Enterprise Scale",
    badge: "Maximum Volume & Aggressive Growth",
    priceINR: "35,000",
    priceUSD: "450",
    adSpendINR: "₹50,000 - ₹1,00,000+",
    adSpendUSD: "$600 - $1,200+",
    popular: false,
    description: "Aggressive multi-platform advertising designed to scale revenue with dynamic catalog ads and real-time bid scaling.",
    features: [
      { text: "20+ Mixed Creative Variants / Month", included: true },
      { text: "High-Impact Video Motion Ads & Reels", included: true },
      { text: "Multi-Platform (Meta, YouTube & LinkedIn)", included: true },
      { text: "Dynamic Retargeting & Catalog Feeds", included: true },
      { text: "Real-Time Campaign & Budget Scaling", included: true },
      { text: "Dedicated Senior Media Buyer", included: true },
      { text: "Weekly Performance Review Meetings", included: true },
      { text: "Custom Live KPI Analytics Dashboard", included: true },
    ],
  },
];

const SocialPackagesUnified = () => {
  const [activeTab, setActiveTab] = useState("smo"); // "smo" | "smm"
  const [currency, setCurrency] = useState("INR");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  const currentList = activeTab === "smo" ? smoPackages : smmPackages;

  return (
    <section
      id="packages"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-[#0a0518] to-slate-950 text-white relative overflow-hidden font-sans"
    >
      {/* Ambient Neon Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>✦ TRANSPARENT PACKAGES & PRICING ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5 tracking-tight">
            Flexible Packages Designed to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
              Accelerate Brand Growth
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Choose between organic creative growth (SMO) or high-ROAS performance advertising (SMM). No hidden fees, clear deliverables, and measurable milestones.
          </p>

          {/* Controls: Category Switcher & Currency Toggle */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Category Switcher */}
            <div className="inline-flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setActiveTab("smo")}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === "smo"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">SMO Organic Growth (Content &amp; Reels)</span>
              </button>
              <button
                onClick={() => setActiveTab("smm")}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === "smm"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Rocket className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">SMM Paid Ads (Meta &amp; Video)</span>
              </button>
            </div>

            {/* Currency Toggle */}
            <div className="inline-flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md shadow-2xl items-center">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {currentList.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? "bg-gradient-to-b from-purple-900/30 via-slate-900/80 to-slate-900 border-2 border-purple-500/80 shadow-2xl shadow-purple-500/20 transform md:-translate-y-2"
                  : "bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 hover:shadow-xl shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-max pointer-events-none">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xl shadow-purple-500/30 border border-white/20 whitespace-nowrap inline-flex items-center gap-1.5">
                    ★ Most Popular Choice ★
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    {pkg.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {pkg.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {currency === "INR" ? `₹${pkg.priceINR}` : `$${pkg.priceUSD}`}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/month</span>
                  </div>

                  {pkg.adSpendINR && (
                    <div className="mt-2.5 p-2 bg-purple-950/40 border border-purple-500/20 rounded-xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Suggested Ad Spend
                      </div>
                      <div className="text-xs font-bold text-pink-300">
                        {currency === "INR" ? pkg.adSpendINR : pkg.adSpendUSD}
                      </div>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? "text-slate-200" : "text-slate-500 line-through"}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleSelectPlan(`${pkg.name} (${activeTab.toUpperCase()})`)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-95 hover:scale-[1.02]"
                      : "bg-slate-800 hover:bg-purple-600 text-white hover:shadow-lg"
                  }`}
                >
                  Get Started With {pkg.name} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote Assurance */}
        <div className="text-center max-w-xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              No Long-Term Lock-in
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Detailed Monthly ROI Reports
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Need a custom scope with dedicated creators, daily video shoots, or enterprise ad spends?{" "}
            <button
              onClick={() => handleSelectPlan("Custom Enterprise Package")}
              className="text-purple-400 font-bold hover:underline cursor-pointer"
            >
              Request a Custom Quote
            </button>
          </p>
        </div>
      </div>

      
    </section>
  );
};

export default SocialPackagesUnified;
