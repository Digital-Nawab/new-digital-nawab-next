"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  FlaskConical,
  Smartphone,
  Target,
  BarChart2,
  Sparkles,
  ArrowRight,
  Zap,
  MousePointerClick,
  Activity,
  CheckCircle2,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const defaultOfferings = [
  {
    id: 1,
    icon: "📈",
    lucideIcon: TrendingUp,
    accent: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/20",
    title: "Data-Driven SEO & Conversion Rate Optimization",
    description:
      "Improve the value of your organic traffic with data-driven SEO and conversion rate optimization (CRO). We analyze landing pages, search performance, user journeys, and engagement data to identify conversion barriers and opportunities. Our SEO optimization services in Lucknow focus on improving website usability, relevant organic traffic, and qualified business enquiries through measurable, evidence-based improvements.",
    expertise: 96,
    tags: ["User Journey Mapping", "Drop-Off Elimination", "Evidence-Based SEO"],
  },
  {
    id: 2,
    icon: "🧪",
    lucideIcon: FlaskConical,
    accent: "from-cyan-500 to-blue-400",
    glow: "shadow-cyan-500/20",
    title: "A/B Testing & User Behaviour Analysis",
    description:
      "Make informed website improvements by evaluating landing page layouts, headlines, calls to action, and enquiry forms. A/B testing and user behaviour analysis can help identify which page elements better support visitor engagement and conversions. Use these insights to refine the website experience, improve conversion opportunities, and make your SEO traffic more valuable.",
    expertise: 94,
    tags: ["Heatmaps & Recordings", "CTA Experiments", "Headline Testing"],
  },
  {
    id: 3,
    icon: "💻",
    lucideIcon: Smartphone,
    accent: "from-teal-400 to-emerald-400",
    glow: "shadow-teal-500/20",
    title: "Website UX, Mobile SEO & Page Speed Optimization",
    description:
      "Improve website usability through responsive design, intuitive navigation, mobile optimization, and page speed improvements. We identify relevant Core Web Vitals and technical performance issues that may affect the user experience. A fast, accessible, and easy-to-navigate website helps visitors find information more efficiently and supports a better experience across search and mobile devices.",
    expertise: 98,
    tags: ["Core Web Vitals Pass", "Sub-1.2s Load Time", "Mobile-First UX"],
  },
  {
    id: 4,
    icon: "🎯",
    lucideIcon: Target,
    accent: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/20",
    title: "Landing Page Optimization for Qualified Leads",
    description:
      "Turn relevant website visits into stronger enquiry opportunities with landing page optimization tailored to your services and audience. We align page content with commercial search intent, improve headings and content structure, clarify calls to action, and simplify enquiry forms. This approach helps potential customers understand your offering and take the next step through contact forms, phone calls, or WhatsApp enquiries.",
    expertise: 95,
    tags: ["Commercial Intent Alignment", "Simplified Lead Forms", "WhatsApp Integration"],
  },
  {
    id: 5,
    icon: "📊",
    lucideIcon: BarChart2,
    accent: "from-purple-500 to-indigo-400",
    glow: "shadow-purple-500/20",
    title: "SEO Conversion Tracking & Performance Measurement",
    description:
      "Understand how organic search contributes to business enquiries through SEO performance monitoring and conversion tracking. Measure relevant metrics such as organic clicks, search impressions, landing page engagement, form submissions, click-to-call actions, and WhatsApp enquiries using suitable analytics tools. Use these insights to evaluate performance, identify improvement opportunities, and make more informed SEO and conversion optimization decisions.",
    expertise: 97,
    tags: ["GA4 & GTM Events", "Call & WhatsApp Tracking", "ROI Dashboards"],
  },
];

const CROServices = () => {
  const [offerings, setOfferings] = useState(defaultOfferings);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const response = await fetch(
          "https://dashboard.digitalnawab.com/api/getseo_optimization"
        );
        const result = await response.json();
        if (result?.data && result.data.length > 0) {
          const mapped = result.data.map((item, index) => {
            const fallback = defaultOfferings[index] || defaultOfferings[0];
            return {
              ...fallback,
              id: item.id || fallback.id,
              icon: item.icon || fallback.icon,
              title: item.heading || fallback.title,
              description: item.description || fallback.description,
              expertise: fallback.expertise || 95,
            };
          });
          setOfferings(mapped);
        }
      } catch (error) {
        console.error("Error fetching offerings:", error);
      }
    };

    fetchOfferings();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#070e10] via-[#0a1618] to-[#050a0b] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide mb-5 backdrop-blur-md">
            <Zap className="w-4 h-4 text-emerald-400" />
            CONVERSION RATE OPTIMISATION (CRO)
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            What Digital Nawab Provides as a{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Conversion Rate Optimisation (CRO)
            </span>{" "}
            Services Provider Agency
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Digital Nawab develops personalised CRO techniques in collaboration
            with professional SEO services in Lucknow to convert visitors into
            leads, reduce bounce rates, enhance user experience, and optimise
            ROI, ultimately driving measurable business growth with website design
            & development.
          </p>
        </div>

        {/* Quick Impact Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {[
            { metric: "+280%", label: "Avg. Conversion Lift", icon: TrendingUp },
            { metric: "-45%", label: "Bounce Rate Reduction", icon: Activity },
            { metric: "< 1.2s", label: "Core Web Vitals Speed", icon: Zap },
            { metric: "100%", label: "Trackable Leads & Calls", icon: MousePointerClick },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  {stat.metric}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* List of Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {offerings.map((offering, index) => {
            const isFullSpan =
              offerings.length % 2 !== 0 &&
              index === offerings.length - 1 &&
              "lg:col-span-1 md:col-span-2 lg:col-start-2";

            return (
              <div
                key={offering.id || index}
                className={`group relative rounded-3xl p-7 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5 ${
                  isFullSpan || ""
                }`}
              >
                {/* Glowing Top Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-tr-3xl pointer-events-none" />

                <div>
                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300 shrink-0">
                      {offering.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 block mb-1">
                        Pillar #{index + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                        {offering.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {offering.description}
                  </p>

                  {/* Feature Tags */}
                  {offering.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {offering.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expertise Level Progress Indicator */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider">
                      Expertise Level
                    </span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      {offering.expertise}% Mastered
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5">
                    <div
                      className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-300 h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                      style={{ width: `${offering.expertise}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 sm:mt-20 relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-[#0d231e] via-[#091b17] to-[#0a1819] text-center shadow-2xl shadow-emerald-950/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Turn Clicks Into Paying Clients
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              Stop Wasting High-Value Traffic on Low-Converting Pages
            </h3>

            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Combine our high-ranking SEO services with conversion-engineered UX,
              persuasive copy, and streamlined enquiry journeys that scale your revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ContactPopup
                buttonText="Start Optimizing with Digital Nawab"
                buttonClassName="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4FF66] via-[#4ade80] to-[#22c55e] hover:from-[#C0E55A] hover:to-[#16a34a] text-slate-950 font-extrabold py-4 px-9 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#4ade80]/30 hover:scale-105 active:scale-95 transition-all duration-300 text-base sm:text-lg"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free 30-Min CRO Audit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailored For Your Audience
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Measurable Outcomes
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CROServices;