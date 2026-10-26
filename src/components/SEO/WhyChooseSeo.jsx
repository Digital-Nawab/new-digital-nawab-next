"use client";

import React from "react";
import {
  ShieldCheck,
  MapPin,
  Zap,
  BarChart3,
  Link2,
  Users2,
  Sparkles,
  PhoneCall,
  BadgeCheck,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const pillars = [
  {
    icon: ShieldCheck,
    title: "100% White-Hat & Algorithm-Proof SEO",
    description:
      "We strictly adhere to Google's Helpful Content, Core Update, and Search Quality Rater Guidelines. No spammy PBNs, duplicate content, or toxic link schemes. Your rankings stay protected, resilient, and consistently rising.",
    highlight: "Zero Penalty Record Across 15,000+ Sites",
    accent: "from-blue-600 to-indigo-500",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: MapPin,
    title: "Hyper-Local Lucknow & Pan-India Dominance",
    description:
      "From Gomti Nagar and Hazratganj to metro hubs across India, we optimize your Google Business Profile (GBP), geo-targeted citations, and local schema so high-intent customers find you first when searching near them.",
    highlight: "Top 3 Google Maps Placement Focus",
    accent: "from-blue-500 to-cyan-400",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Zap,
    title: "Core Web Vitals & Technical Speed Mastery",
    description:
      "Search engines reward fast websites. Our technical team fixes crawl errors, eliminates render-blocking JavaScript, optimizes Core Web Vitals, and ensures mobile-first responsiveness for lightning-fast speeds.",
    highlight: "Sub-1.2s Load Times & 90+ PageSpeed",
    accent: "from-amber-500 to-orange-400",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: BarChart3,
    title: "Transparent Dashboards & Lead Attribution",
    description:
      "No technical smoke and mirrors. You get a real-time live performance dashboard tracking keyword movements, organic impressions, click-to-call actions, WhatsApp inquiries, and verified revenue growth.",
    highlight: "Live GA4 & Call Tracking Reports",
    accent: "from-purple-500 to-indigo-400",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: Link2,
    title: "High-Authority PR & Editorial Backlinks",
    description:
      "We earn authoritative backlinks from genuine news publications, relevant industry blogs, and established domain directories. True topical authority signals that make Google trust and elevate your domain.",
    highlight: "DA 50+ Editorial Contextual Links",
    accent: "from-indigo-500 to-cyan-500",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: Users2,
    title: "Dedicated Senior SEO Strategist",
    description:
      "You don't get passed around to junior interns or account trainees. You work directly with seasoned SEO specialists who know your industry, conduct regular strategy syncs, and execute proactive optimizations.",
    highlight: "Direct Access & Weekly Growth Sprints",
    accent: "from-rose-500 to-pink-400",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
];

const WhyChooseSeo = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/80 to-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold tracking-wide mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            WHY PARTNER WITH DIGITAL NAWAB
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Why Lucknow Businesses Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Digital Nawab for SEO
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Most SEO agencies sell keyword ranking promises and traffic screenshots.
            We engineer complete organic pipelines that dominate Google, capture
            qualified customer intent, and deliver measurable business ROI.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-blue-300 shadow-md hover:shadow-2xl hover:shadow-blue-950/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-blue-500/30 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Micro Highlight Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">
                    {pillar.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proven Track Record Counter Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                15,000+
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-2">
                Keywords Ranked Page #1
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                340%+
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-2">
                Avg. Organic Traffic Surge
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                98.4%
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-2">
                Client Retention Rate
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                10+ Yrs
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-2">
                Search Engine Mastery
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-700 text-white p-8 sm:p-12 text-center shadow-2xl shadow-indigo-700/25 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              TAKE THE FIRST STEP TODAY
            </span>
            
            <h3 className="text-2xl sm:text-4xl font-black leading-tight mb-4">
              Ready to Outrank Competitors and Dominate Google in Lucknow?
            </h3>
            
            <p className="text-blue-50 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto font-normal">
              Get an honest, comprehensive SEO and competitor gap analysis from our senior search strategists. No generic pitch decks, just actionable ranking opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ContactPopup
                buttonText="Claim Your Free SEO Consultation"
                buttonClassName="cursor-pointer inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold py-4 px-9 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-base sm:text-lg"
              />

              <a
                href="tel:+919936663337"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold py-4 px-8 rounded-2xl backdrop-blur-md transition-all duration-300 text-base border border-white/20"
              >
                <PhoneCall className="w-5 h-5" />
                <span>+91-9936663337</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSeo;
