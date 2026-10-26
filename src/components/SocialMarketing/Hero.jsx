"use client";

import React from "react";
import Link from "next/link";
import {
  Play,
  Sparkles,
  TrendingUp,
  Users,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  BarChart3,
  Target
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const SocialMediaHero = () => {
  const floatingCards = [
    {
      name: "Instagram",
      subtext: "Reels & Viral Reach",
      stat: "+340%",
      badge: "Viral Growth",
      icon: Instagram,
      gradient: "from-pink-500 via-purple-500 to-amber-500",
      position: "top-36 left-4 lg:left-8 xl:left-16",
      delay: "0s",
      glow: "rgba(236,72,153,0.35)",
    },
    {
      name: "Meta Ads",
      subtext: "Laser Lead Gen",
      stat: "4.8x ROAS",
      badge: "Targeted PPC",
      icon: Facebook,
      gradient: "from-blue-600 via-indigo-600 to-cyan-500",
      position: "top-36 right-4 lg:right-8 xl:right-16",
      delay: "1s",
      glow: "rgba(59,130,246,0.35)",
    },
    {
      name: "YouTube",
      subtext: "Shorts & 4K Video",
      stat: "15M+ Views",
      badge: "Organic Video",
      icon: Youtube,
      gradient: "from-red-600 to-rose-700",
      position: "bottom-48 left-4 lg:left-8 xl:left-16",
      delay: "1.6s",
      glow: "rgba(239,68,68,0.35)",
    },
    {
      name: "LinkedIn",
      subtext: "B2B Authority",
      stat: "Qualified Leads",
      badge: "Enterprise Growth",
      icon: Linkedin,
      gradient: "from-blue-500 to-cyan-600",
      position: "bottom-44 right-4 lg:right-8 xl:right-16",
      delay: "2.2s",
      glow: "rgba(37,99,235,0.35)",
    },
  ];

  const metrics = [
    { value: "15M+", label: "Organic Views Generated", icon: Play },
    { value: "4.8x", label: "Average Campaign ROAS", icon: TrendingUp },
    { value: "250+", label: "Brands Scaled Nationwide", icon: Award },
    { value: "98%", label: "Client Retention Rate", icon: Users },
  ];

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-[#070214] via-[#0d0725] to-[#04010a] text-white overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24 px-4 sm:px-6 lg:px-8 font-sans"
      aria-label="Social Media Marketing Hero Section"
    >
      {/* Background Dots Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#a855f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Animated Social Metric Cards (Desktop & Large Screens) */}
      <div className="absolute inset-0 hidden xl:block pointer-events-none">
        {floatingCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`absolute ${item.position} animate-bounce`}
              style={{ animationDelay: item.delay, animationDuration: "5s" }}
            >
              <div className="relative group pointer-events-auto">
                <div
                  className="absolute -inset-2 rounded-2xl blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-300"
                  style={{ background: item.glow }}
                />
                <div className="relative flex items-center gap-3.5 bg-slate-900/80 border border-white/15 backdrop-blur-xl p-3 pr-4 rounded-2xl shadow-2xl hover:border-purple-400/50 hover:bg-slate-900/95 transition-all duration-300">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 shadow-md flex items-center justify-center text-white shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300">
                      {item.stat}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-none mt-0.5">
                      {item.subtext}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Semantic H1: SOCIAL MEDIA MARKETING AGENCY IN LUCKNOW */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4 sm:mb-5 leading-tight">
          <span className="block text-white drop-shadow-sm">
            Social Media Marketing
          </span>
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Agency In Lucknow
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full opacity-80" />
          </span>
        </h1>

        {/* Semantic H2: Social Media Marketing Services That Grow Your Brand & Generate Leads */}
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-slate-200 mb-5 max-w-4xl mx-auto tracking-tight leading-snug">
          Social Media Marketing Services That Grow Your Brand &amp; Generate Leads
        </h2>

        {/* Content Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal mb-9 text-balance">
          Build a stronger online presence with strategic social media marketing services from Digital Nawab. We help businesses improve brand visibility, engage the right audience, and generate qualified leads through social media management, creative content, and targeted Facebook and Instagram advertising.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <ContactPopup
            buttonText="Get Free Consultation"
            buttonClassName="cursor-pointer group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold px-8 sm:px-9 py-4 rounded-full text-sm sm:text-base shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          />

          <a
            href="#services"
            className="cursor-pointer inline-flex items-center gap-2 border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] hover:border-purple-400/50 text-white font-semibold px-8 sm:px-9 py-4 rounded-full text-sm sm:text-base backdrop-blur-md transition-all duration-300 shadow-md group"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Quick Highlights / Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300/85 mb-14">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Verified Meta &amp; Google Partner
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Targeted ROI &amp; Lead Generation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Custom Content &amp; Video Production
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Rated 4.9/5 by 250+ Brands
          </span>
        </div>

        {/* Metrics Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all text-center group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaHero;
