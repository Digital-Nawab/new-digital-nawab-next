"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Search,
  Code2,
  Share2,
  BarChart3,
  Users2,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const advantages = [
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
    badge: "ROI First",
    title: "Data-Obsessed ROI Strategies",
    desc: "We treat your marketing spend like a capital investment. Every campaign is engineered with rigorous attribution tracking to maximize qualified leads and return on ad spend (ROAS).",
    gradient: "from-[#C73673]/20 via-transparent to-transparent",
    border: "group-hover:border-pink-500/50",
  },
  {
    icon: <Search className="w-6 h-6 text-purple-400" />,
    badge: "Search Authority",
    title: "First-Page Search Dominance",
    desc: "Our multi-tiered organic SEO architecture targets high-intent commercial keywords, building enduring domain authority that keeps you ahead of competitors sustainably.",
    gradient: "from-[#8F5AFF]/20 via-transparent to-transparent",
    border: "group-hover:border-purple-500/50",
  },
  {
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    badge: "Next-Gen Tech",
    title: "Modern Web Engineering",
    desc: "We build blazing-fast, mobile-first websites using Next.js and modern React frameworks, engineered for sub-second load times and flawless conversion funnels.",
    gradient: "from-[#00F0FF]/20 via-transparent to-transparent",
    border: "group-hover:border-cyan-500/50",
  },
  {
    icon: <Share2 className="w-6 h-6 text-amber-400" />,
    badge: "Omnichannel",
    title: "Integrated Marketing Synergy",
    desc: "No isolated silos. We synchronize SEO, Google Ads, Meta advertising, and content funnels so your audience receives consistent, high-converting touchpoints everywhere.",
    gradient: "from-amber-500/20 via-transparent to-transparent",
    border: "group-hover:border-amber-500/50",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
    badge: "100% Clarity",
    title: "Transparent Real-Time Analytics",
    desc: "Say goodbye to vanity metrics and delayed PDFs. Access live dashboard analytics tracking cost-per-lead, conversion rates, and weekly strategy sprint reports.",
    gradient: "from-emerald-500/20 via-transparent to-transparent",
    border: "group-hover:border-emerald-500/50",
  },
  {
    icon: <Users2 className="w-6 h-6 text-indigo-400" />,
    badge: "Senior Talent",
    title: "Dedicated Growth Specialists",
    desc: "Your business is handled by seasoned performance marketers, SEO leads, and engineers—ensuring strategic depth and proactive scaling at every growth stage.",
    gradient: "from-indigo-500/20 via-transparent to-transparent",
    border: "group-hover:border-indigo-500/50",
  },
];

export default function AboutWhyChooseUs() {
  return (
    <section className="relative w-full bg-[#05040a] border-t border-white/[0.06] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-white overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 bg-[#8F5AFF]/15 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#C73673]/15 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>The Digital Nawab Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Why Ambitious Brands{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-[#FF6FD8]">
              Choose Digital Nawab
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            We don&apos;t just deliver generic marketing campaigns. We build
            resilient revenue engines backed by search intelligence, custom tech,
            and complete operational transparency.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl p-7 sm:p-8 bg-[#0c0a15]/70 border border-white/[0.08] backdrop-blur-xl ${item.border} hover:bg-[#120e22]/80 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden`}
            >
              {/* Subtle gradient glow inside card */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header row with icon and badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 group-hover:text-white transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.05] flex items-center text-xs font-semibold text-purple-400 group-hover:text-pink-300 transition-colors">
                <span>Enterprise Proven Quality</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#120e24]/90 via-[#0d0919]/90 to-[#140b20]/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C73673] to-[#8F5AFF] flex items-center justify-center shrink-0 text-white shadow-lg shadow-pink-500/20 mx-auto md:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                The Digital Nawab Client Guarantee
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-light">
                100% Code & Data Ownership • Weekly Transparent Check-ins • Proven ROI Track Record
              </div>
            </div>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold text-sm transition-transform hover:scale-105 shadow-lg shadow-purple-500/25 shrink-0"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
