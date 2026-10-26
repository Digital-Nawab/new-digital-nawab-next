"use client";

import React from "react";
import Image from "next/image";
import {
  MousePointer,
  Sparkles,
  Target,
  Search,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const WhatIsPPC = () => {
  return (
    <section
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-100/80 text-slate-900 overflow-hidden font-sans border-y border-slate-200/60"
      aria-label="What is PPC - Pay Per Click Concept"
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft Ambient Colorful Tints */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-sm hover:shadow transition-shadow">
            <MousePointer className="w-4 h-4 text-indigo-600" />
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>✦ FOUNDATION & CORE CONCEPT ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-5 leading-tight">
            What is Pay-Per-Click{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              (PPC) Advertising?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Pay-Per-Click (PPC) is a high-intent digital marketing model where advertisers bid to place targeted ads at the top of search engines like Google and Bing, paying only when a prospective customer actively clicks.
          </p>
        </div>

        {/* 2-Column Content + Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Conceptual Value Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Buying High-Intent Traffic */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Buy High-Intent Visitors, Don&apos;t Wait Months
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    PPC is essentially a proven method of buying qualified visitors to your website rather than attempting to &ldquo;earn&rdquo; them solely through slow organic efforts. You get instantaneous first-page Google visibility on high-intent transactional search queries.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Keyword Auction Mechanics */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Commercial Search Keyword Bidding
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Marketers bid for ad placement in Google&apos;s sponsored results for terms prospective buyers enter. For instance, when a customer searches for &ldquo;Best PPC Services in Lucknow&rdquo;, your ad appears right at the very top of Google&apos;s results page.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Multi-Format Visuals & Shopping */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-purple-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Dynamic Search &amp; Product Listing Ads (PLAs)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    PPC ads range from compelling text ads to rich visual Product Listing Ads (Google Shopping), allowing buyers to view key information like pricing, ratings, and instant product photos before clicking.
                  </p>
                </div>
              </div>
            </div>

            {/* Takeaway Highlight Pill */}
            <div className="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                <span className="font-bold text-indigo-950">100% Budget Control:</span> You set daily budget caps, control maximum cost-per-click bids, and only pay when qualified visitors click to reach your landing page.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Decorative Gradient Border */}
              <div className="p-2 sm:p-3 rounded-3xl bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-200 shadow-[0_20px_50px_rgba(99,102,241,0.15)] border border-white">
                <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
                  {/* Top Floating Simulated Badge */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Ad · Top Result
                      </span>
                      <span className="text-xs font-mono text-slate-400">google.com/search</span>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                      High Intent
                    </span>
                  </div>

                  {/* Main PPC Illustration Image */}
                  <div className="relative overflow-hidden rounded-xl bg-slate-900 p-2 shadow-inner group">
                    <Image
                      src="/assets/images/ppc.png"
                      alt="Pay Per Click PPC Advertising Strategy & Management"
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover rounded-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                      priority={false}
                    />
                  </div>

                  {/* Quick Feature Metric Counters */}
                  <div className="grid grid-cols-3 gap-2 pt-5 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-base sm:text-lg font-bold text-indigo-600">Day 1</div>
                      <div className="text-[11px] text-slate-500 font-medium">Fast Reach</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-base sm:text-lg font-bold text-emerald-600">100%</div>
                      <div className="text-[11px] text-slate-500 font-medium">Measurable</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-base sm:text-lg font-bold text-purple-600">4.5x+</div>
                      <div className="text-[11px] text-slate-500 font-medium">Avg ROAS</div>
                    </div>
                  </div>

                  {/* Direct Contact Button */}
                  <div className="pt-5 text-center">
                    <ContactPopup
                      buttonText="Start Your PPC Campaign →"
                      buttonClassName="w-full justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-indigo-500/20 text-xs sm:text-sm transition-all transform hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsPPC;
