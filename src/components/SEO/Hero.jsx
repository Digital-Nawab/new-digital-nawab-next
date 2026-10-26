"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  Search,
  Sparkles,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const HeroSection = () => {
  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Digital Nawab",
            url: "https://www.digitalnawab.com",
            description:
              "Best SEO Company in Lucknow for organic growth, top Google rankings, and high-ROI digital marketing.",
            service: {
              "@type": "Service",
              name: "SEO Services Lucknow",
              description:
                "Professional SEO audit, technical optimization, local SEO and growth strategies.",
            },
          }),
        }}
      />

      <section
        className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-[#070b18] via-[#0c142b] to-[#070b18] overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
        role="banner"
        aria-label="SEO Services Hero Section"
      >
        {/* Subtle Ambient Glow and Wave Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient Wave Line SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 600 C 300 450, 700 750, 1100 450 C 1300 300, 1500 500, 1600 450"
              stroke="url(#blueHeroGradient)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              d="M-50 700 C 400 550, 800 800, 1200 550 C 1400 400, 1550 550, 1650 500"
              stroke="url(#blueHeroGradient)"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="blueHeroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c1938] border border-blue-500/40 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-blue-300 uppercase">
                  ✦ SEO COMPANY IN LUCKNOW ✦
                </span>
              </div>

              {/* Main Headline matching Screenshot 1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold text-white leading-[1.12] tracking-tight">
                Best SEO Company in <br className="hidden sm:inline" />
                Lucknow for{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  Organic Growth
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                We help businesses in Lucknow and across India rank higher on
                Google, get more organic traffic and generate quality leads
                through result-driven SEO strategies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="#audit-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.03] active:scale-[0.98] group"
                >
                  <span>Get Free SEO Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <ContactPopup
                  buttonText="Book a Consultation"
                  buttonClassName="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                />
              </div>

              {/* Bottom Feature Tags matching Screenshot 1 */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-200">
                    Increase Website Traffic
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-200">
                    Get More Leads &amp; Sales
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-200">
                    Build Long-Term Online Growth
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual with Hero Person & Floating Glass Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
              
              {/* Outer Glow Halo behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/25 via-indigo-600/15 to-cyan-500/10 rounded-3xl blur-2xl" />

              {/* Visual Card Container */}
              <div className="relative w-full max-w-[500px] rounded-3xl overflow-visible p-1 sm:p-2">
                
                {/* Main Photo */}
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl bg-[#091024]">
                  <img
                    src="/assets/images/seo/hero-person.jpg"
                    alt="Best SEO Company in Lucknow - Digital Nawab Expert"
                    className="w-full h-auto object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle bottom gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b18]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Card 1: Google Rankings with Upward Chart (Top Left) */}
                <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-6 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-white/60 flex flex-col gap-1.5 animate-bounce-subtle z-20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                      Google Rankings
                    </span>
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600 ml-auto" />
                  </div>
                  {/* Upward Line Chart SVG */}
                  <div className="w-32 sm:w-36 h-10">
                    <svg viewBox="0 0 120 35" className="w-full h-full overflow-visible">
                      <path
                        d="M 2 28 L 25 22 L 50 25 L 75 14 L 98 16 L 118 4"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="118" cy="4" r="3.5" fill="#3b82f6" className="animate-ping" />
                      <circle cx="118" cy="4" r="3.5" fill="#2563eb" />
                    </svg>
                  </div>
                </div>

                {/* Floating Card 2: SEO Growth +320% with Bar Chart (Middle Left) */}
                <div className="absolute top-1/3 -left-4 sm:top-1/3 sm:-left-8 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-white/60 flex flex-col gap-1 z-20">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    SEO Growth
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-blue-600">
                      + 320%
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Organic</span>
                  </div>
                  {/* Mini Vertical Bar Chart */}
                  <div className="flex items-end gap-1.5 h-7 pt-1">
                    <div className="w-2 bg-blue-200 rounded-t h-2" />
                    <div className="w-2 bg-blue-300 rounded-t h-3.5" />
                    <div className="w-2 bg-blue-400 rounded-t h-5" />
                    <div className="w-2 bg-blue-500 rounded-t h-6" />
                    <div className="w-2 bg-blue-600 rounded-t h-7" />
                  </div>
                </div>

                {/* Floating Card 3: More Traffic Pill (Middle Right) */}
                <div className="absolute top-1/4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xl border border-white/60 flex items-center gap-2 z-20">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 leading-none">Monthly</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      More Traffic
                    </p>
                  </div>
                </div>

                {/* Floating Card 4: Google Ranking Badge (Bottom Banner) */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-2xl border border-white/70 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-blue-600 shadow-sm">
                      G
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 leading-none">Ranking</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        Your Business on Google
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold whitespace-nowrap border border-blue-200">
                    #1 Rank
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
