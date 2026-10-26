"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Target,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

// Razor-sharp Google Ads official SVG logo
const GoogleAdsLogo = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Yellow Bar */}
    <path
      d="M4.09 15.65L9.62 6.07a3.5 3.5 0 0 1 4.78-1.28l1.73 1a3.5 3.5 0 0 1 1.28 4.78l-5.53 9.58a3.5 3.5 0 0 1-4.78 1.28l-1.73-1a3.5 3.5 0 0 1-1.29-4.78z"
      fill="#FBBC04"
    />
    {/* Blue Bar */}
    <path
      d="M19.91 15.65L14.38 6.07a3.5 3.5 0 0 0-4.78-1.28l-1.73 1a3.5 3.5 0 0 0-1.28 4.78l5.53 9.58a3.5 3.5 0 0 0 4.78 1.28l1.73-1a3.5 3.5 0 0 0 1.28-4.78z"
      fill="#4285F4"
    />
    {/* Green Circle */}
    <circle cx="6.5" cy="17.5" r="3.5" fill="#34A853" />
  </svg>
);

const BrandPerformanceHero = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-br from-[rgba(5,5,5,1)] via-[#130826] to-black overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
      role="banner"
      aria-label="PPC and Google Ads Services Hero"
    >
      {/* Background Dots Pattern with Brand Purple Hue */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#8b5cf6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Ambient Wave Graphic Line */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 650 C 300 500, 700 780, 1100 500 C 1300 350, 1500 550, 1600 480"
            stroke="url(#ppcHeroGradient)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            d="M-50 720 C 400 580, 800 820, 1200 600 C 1400 450, 1550 580, 1650 520"
            stroke="url(#ppcHeroGradient)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="ppcHeroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Details, Bullet Points, CTAs */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Breadcrumb Navigation */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-400 font-medium"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link href="/service/seo-company-in-lucknow" className="hover:text-white transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-purple-300 font-semibold">PPC &amp; Google Ads</span>
            </motion.div>

            {/* Pill Badge */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-purple-200 uppercase">
                  ✦ PPC &amp; GOOGLE ADS SERVICES ✦
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-white leading-[1.14] tracking-tight custom-bold"
              variants={fadeInUp}
            >
              Drive More Customers <br className="hidden sm:inline" />
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Google Ads
              </span>
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
              variants={fadeInUp}
            >
              Strategic PPC campaigns that bring high-quality traffic, generate
              qualified leads, and grow your business in Lucknow and across India
              with maximized return on ad spend.
            </motion.p>

            {/* Feature Checklist Tags (2x2 Grid) */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Target className="w-3 h-3" />
                </div>
                <span className="font-medium">Targeted Campaigns</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <TrendingUp className="w-3 h-3" />
                </div>
                <span className="font-medium">Better ROI</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="font-medium">Qualified Leads</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 flex-shrink-0">
                  <BarChart3 className="w-3 h-3" />
                </div>
                <span className="font-medium">Transparent Reporting</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <ContactPopup
                buttonText="Get Free PPC Audit →"
                buttonClassName="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              />

              <a
                href="tel:+919335621987"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-purple-300" />
                <span>Talk to Our Expert</span>
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Visual with Hero Person & Floating Glass Cards */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            {/* Multi-layered Glow Halo behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-blue-500/25 rounded-3xl blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Visual Container */}
            <div className="relative w-full max-w-[480px] rounded-3xl p-2 sm:p-3">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_20px_50px_rgba(139,92,246,0.3)] bg-gradient-to-b from-[#140b2b] to-[#080414]">
                <img
                  src="/assets/images/ppc/hero-expert.jpg"
                  alt="Google Ads and PPC Specialist - Digital Nawab"
                  className="w-full h-auto object-cover object-center transform hover:scale-[1.03] transition-transform duration-700"
                  loading="eager"
                />
                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080414]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Card 1: Google Ads Official Badge (Top Left) */}
              <motion.div
                className="absolute -top-3 left-1 sm:-top-7 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/80 flex items-center gap-2 sm:gap-2.5 z-20 cursor-default origin-top-left scale-[0.88] sm:scale-100"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 flex items-center justify-center p-1 shadow-sm border border-slate-100 flex-shrink-0">
                  <GoogleAdsLogo className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-left pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Google Ads
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Certified Partner</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Conversions +256% with Upward Sparkline (Top Right) */}
              <motion.div
                className="absolute -top-3 right-1 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/80 z-20 cursor-default origin-top-right scale-[0.88] sm:scale-100"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between gap-2 sm:gap-3 mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                      Conversions
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    +256%
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2 sm:gap-3 pt-0.5">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Last 3 Months</span>
                  {/* Upward Line Chart SVG */}
                  <div className="w-20 sm:w-28 h-5 sm:h-6">
                    <svg viewBox="0 0 100 25" className="w-full h-full overflow-visible">
                      <path
                        d="M2 20 L 25 16 L 48 18 L 70 8 L 88 10 L 98 3"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="98" cy="3" r="3" fill="#10b981" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3: Leads 482 (Bottom Left) */}
              <motion.div
                className="absolute bottom-3 left-1 sm:bottom-8 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/80 z-20 cursor-default origin-bottom-left scale-[0.88] sm:scale-100"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Leads
                    </p>
                    <p className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                      482
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span>↑ 38%</span>
                      <span className="text-slate-400 font-normal">This Month</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 4: Cost Per Lead -42% (Bottom Right) */}
              <motion.div
                className="absolute -bottom-3 right-1 sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/80 z-20 cursor-default origin-bottom-right scale-[0.88] sm:scale-100"
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-rose-100 flex items-center justify-center text-rose-600">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-semibold text-slate-600">
                    Cost Per Lead
                  </span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div>
                    <p className="text-base sm:text-xl font-black text-rose-600 leading-tight">
                      -42%
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Optimized</p>
                  </div>
                  {/* Downward Sparkline in Rose */}
                  <div className="w-16 sm:w-24 h-5 sm:h-6">
                    <svg viewBox="0 0 90 25" className="w-full h-full overflow-visible">
                      <path
                        d="M2 4 L 25 6 L 45 13 L 65 14 L 88 22"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="88" cy="22" r="3" fill="#f43f5e" />
                    </svg>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandPerformanceHero;
