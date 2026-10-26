"use client";

import React from "react";
import {
  ArrowRight,
  MessageSquare,
  Smartphone,
  Search,
  Sparkles,
  TrendingUp,
  Video,
  Target,
  Palette,
  Users,
  CheckCircle2,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const SocialMediaServices = () => {
  const services = [
    {
      icon: Video,
      title: "Thumb-Stopping Reels & Creative",
      badge: "Viral Content",
      accent: "from-pink-500 to-rose-500",
      bgLight: "bg-pink-50 text-pink-600 border-pink-100",
      description:
        "High-retention short-form video production, aesthetic carousels, and scroll-stopping stories designed to capture attention in the first 3 seconds and trigger algorithmic distribution.",
      benefits: ["High-Retention Hooks", "Trend Analysis & Audio", "Custom Motion Graphics"],
    },
    {
      icon: Target,
      title: "High-ROAS Paid Social Ads (SMM)",
      badge: "Paid Growth",
      accent: "from-blue-600 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
      description:
        "Hyper-targeted Meta Ads (Facebook & Instagram) engineered with lookalike audiences, retargeting pixels, and conversion-optimized ad creatives for maximum return on ad spend.",
      benefits: ["Audience Segmentation", "A/B Creative Split-Testing", "Conversion API & Pixel"],
    },
    {
      icon: Users,
      title: "Community & Brand Reputation",
      badge: "Engagement",
      accent: "from-purple-600 to-violet-600",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
      description:
        "Active DM management, genuine comment replies, influencer seeding, and proactive customer interaction that turns casual followers into vocal brand champions.",
      benefits: ["Fast Response Moderation", "Influencer Collaborations", "Sentiment & Trust Growth"],
    },
  ];

  return (
    <section
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 text-slate-900 relative overflow-hidden font-sans border-y border-slate-200/70"
      aria-label="Core Social Media Marketing Services"
    >
      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>✦ FULL-FUNNEL SOCIAL STRATEGY ✦</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 leading-tight tracking-tight">
              Take the Lead With Smarter{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Social Media Marketing
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              In today&apos;s fast-paced digital ecosystem, sporadic posting won&apos;t cut through the noise. Digital Nawab unites thumb-stopping creative production, algorithmic audience growth, and full-funnel conversion tracking under one roof.
            </p>
          </div>
        </div>

        {/* Services Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${service.bgLight} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3 group-hover:text-purple-600 transition-colors tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <ContactPopup
                    buttonText="Get Strategy Call →"
                    buttonClassName="text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-900 cursor-pointer inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-[11px] text-slate-400 font-mono font-semibold">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaServices;