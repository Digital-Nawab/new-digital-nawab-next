"use client";

import React from "react";
import {
  Monitor,
  Search,
  Target,
  DollarSign,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  TrendingUp,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Commercial Search Intent",
    subtitle: "Qualified Search Traffic",
    desc: "PPC ads trigger whenever individuals search online using Google or Bing for products and services with buying intent — from local 'near me' searches to high-ticket B2B software solutions.",
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 text-blue-600 border-blue-100",
    borderHover: "hover:border-cyan-400",
    badge: "High Intent",
  },
  {
    num: "02",
    icon: Target,
    title: "The Real-Time Auction",
    subtitle: "Quality Score & Rank",
    desc: "Google's automated Ad Auction assesses keyword bids, ad relevance, expected CTR, and landing page quality score in milliseconds to determine top placement on search result pages (SERPs).",
    color: "from-indigo-500 to-purple-600",
    bgLight: "bg-purple-50 text-purple-600 border-purple-100",
    borderHover: "hover:border-purple-400",
    badge: "Algorithmic Placement",
  },
  {
    num: "03",
    icon: DollarSign,
    title: "Pay Only For Results",
    subtitle: "Accountable Acquisition",
    desc: "You never pay for empty views or impressions. You only pay when a prospective customer actively clicks your ad to visit your landing page, giving you 100% control over acquisition costs.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
    borderHover: "hover:border-emerald-400",
    badge: "100% Measurable",
  },
];

const HowPPCWorks = () => {
  return (
    <section
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 text-slate-900 overflow-hidden font-sans border-y border-slate-200/70"
      aria-label="How Pay Per Click Ads Work"
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Monitor className="w-4 h-4 text-cyan-600" />
            <span>✦ TRANSPARENT AUCTION MECHANISM ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight mb-5 tracking-tight">
            How Does Pay-Per-Click{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Advertising Work?
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Pay-Per-Click is a high-performance marketing model where businesses only incur a cost when an interested prospect actively clicks on their advertisement.
          </p>
        </div>

        {/* 3 Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`group relative rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${step.borderHover} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-5 text-4xl sm:text-5xl font-mono font-black text-slate-100 group-hover:text-slate-200 select-none transition-colors">
                  {step.num}
                </span>

                <div className="relative z-10">
                  {/* Icon Box + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${step.bgLight} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-full">
                      {step.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-3.5">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Step {step.num} of 03</span>
                  <span className="text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Learn more →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Callout Box */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Zero Wasted Advertising Spend
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Businesses running pay-per-click advertising only pay when a prospective customer actively clicks, hence the name <span className="font-bold text-indigo-700">&ldquo;Pay-Per-Click&rdquo;</span>.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3">
            <span className="inline-flex px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
              ✓ 100% Accountable ROI
            </span>
            <ContactPopup
              buttonText="Launch PPC Campaign →"
              buttonClassName="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-indigo-500/20 transform hover:scale-105 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowPPCWorks;
