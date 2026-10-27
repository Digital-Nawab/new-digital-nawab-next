"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Target,
  Palette,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Box,
  Sliders,
  Check,
  Eye,
  Award,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const BrandingSection = () => {
  const [activeTab, setActiveTab] = useState("brand");

  const tabs = [
    { id: "brand", label: "Brand Identity", icon: Sparkles },
    { id: "ads", label: "Ad Creatives", icon: Zap },
    { id: "packaging", label: "Packaging & Print", icon: Box },
  ];

  const brandSwatches = [
    { name: "Obsidian", hex: "#0F172A", bg: "bg-slate-900" },
    { name: "Royal Purple", hex: "#7C3AED", bg: "bg-purple-600" },
    { name: "Neon Rose", hex: "#F43F5E", bg: "bg-rose-500" },
    { name: "Electric Cyan", hex: "#06B6D4", bg: "bg-cyan-500" },
    { name: "Warm Gold", hex: "#F59E0B", bg: "bg-amber-500" },
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 overflow-hidden scroll-mt-24">
      {/* Subtle modern grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1.2px, transparent 1.2px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric lighting glows */}
      <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-purple-200/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-blue-200/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[360px] h-[360px] bg-pink-200/25 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-200/60 shadow-sm backdrop-blur-md mb-5">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-purple-900 uppercase">
              Creative Excellence & Brand Strategy
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
            Leading Graphic Design{" "}
            <span className="block mt-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Company in Lucknow
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Transforming visionary businesses into iconic market leaders with strategic visual storytelling, high-converting marketing creative, and custom-crafted brand identities.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Strategic Value Cards (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card 1: Strategic Brand Identity Design */}
            <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Target className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Strategic Brand Identity Design
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                    As a premier graphic design company in Lucknow, Digital Nawab delivers strategic visual assets that elevate market credibility and inspire customer action. In today&apos;s crowded digital landscape, professional graphic designing services provide your business with the distinct visual identity needed to outshine competitors, establish trust, and drive sustainable growth.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Distinct Visual Identity
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Market Trust & Authority
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 border border-pink-100">
                      <Layers className="w-3.5 h-3.5 text-pink-600" /> Brand Guidelines
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Full-Service Graphic Designing Solutions */}
            <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Palette className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Full-Service Graphic Designing Solutions
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                    From custom logo development and complete brand identity guidelines to sales brochures and digital ad campaigns, our talented graphic designers in Lucknow translate your core value proposition into stunning visual experiences. We blend artistic brilliance with consumer psychology to ensure every asset drives tangible ROI.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-100">
                      <Zap className="w-3.5 h-3.5 text-rose-600" /> High-CTR Ad Creatives
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100">
                      <Box className="w-3.5 h-3.5 text-amber-600" /> Print & Packaging
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Award className="w-3.5 h-3.5 text-emerald-600" /> 100% Vector Precision
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Trust Highlights & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-6 divide-x divide-slate-200">
                <div>
                  <div className="text-2xl font-black text-slate-900">500+</div>
                  <div className="text-xs font-medium text-slate-500">Brands Elevated</div>
                </div>
                <div className="pl-6">
                  <div className="text-2xl font-black text-purple-600">4.9/5</div>
                  <div className="text-xs font-medium text-slate-500">Creative Rating</div>
                </div>
                <div className="pl-6">
                  <div className="text-2xl font-black text-slate-900">48h</div>
                  <div className="text-xs font-medium text-slate-500">Fast Turnaround</div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <ContactPopup
                  buttonText="Get Design Consultation"
                  buttonClassName="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Design Studio Canvas (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-75" />

              {/* Main Canvas Frame (Modern Studio Workstation) */}
              <div className="relative bg-slate-950 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800 text-white">
                {/* Canvas Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/90">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm shadow-rose-500/50" />
                      <span className="w-3 h-3 rounded-full bg-amber-400/90 inline-block shadow-sm shadow-amber-400/50" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm shadow-emerald-500/50" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      dn-design-suite.fig <span className="text-emerald-400 font-semibold">• Live</span>
                    </span>
                  </div>

                  {/* Interactive Deliverable Tabs */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          type="button"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Canvas Inner Body: Tab Views */}
                <div className="pt-6 min-h-[380px] flex flex-col justify-between">
                  {/* TAB 1: Brand Identity View */}
                  {activeTab === "brand" && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Logo Preview Stage */}
                      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/70 p-6 border border-slate-800 flex items-center justify-between overflow-hidden">
                        <div className="space-y-2 z-10">
                          <span className="inline-block text-[11px] font-mono tracking-widest text-purple-400 uppercase bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                            Custom Vector Monogram
                          </span>
                          <h4 className="text-xl font-bold text-white tracking-wide">
                            KNK Luxury Brand Mark
                          </h4>
                          <p className="text-xs text-slate-400">
                            Geometric precision • Golden ratio grid • Scalable SVG/EPS
                          </p>
                        </div>
                        <div className="relative w-28 h-28 flex-shrink-0 bg-slate-950/80 rounded-2xl border border-slate-700/60 flex items-center justify-center p-3 shadow-inner">
                          <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-lg" />
                          <Image
                            src="/assets/Logos/logo/KNK LOGO GOLDEN.webp"
                            alt="Brand Logo Design"
                            width={100}
                            height={100}
                            className="object-contain relative z-10 drop-shadow-md"
                          />
                        </div>
                      </div>

                      {/* Brand Color Palette Swatches */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-semibold text-slate-300">
                            Curated Color Architecture
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            WCAG AAA Compliant
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-2.5">
                          {brandSwatches.map((swatch, idx) => (
                            <div
                              key={idx}
                              className="group p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all text-center"
                            >
                              <div
                                className={`w-full h-8 rounded-lg ${swatch.bg} shadow-sm mb-1.5 transition-transform group-hover:scale-105`}
                              />
                              <div className="text-[10px] font-bold text-slate-200 truncate">
                                {swatch.name}
                              </div>
                              <div className="text-[9px] font-mono text-slate-400 truncate">
                                {swatch.hex}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typography & Assets Bar */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-1">
                            Primary Font Pairing
                          </span>
                          <p className="text-sm font-bold text-white tracking-wide">
                            Outfit Display & Inter Sans
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-1">
                            Asset Export Formats
                          </span>
                          <p className="text-sm font-bold text-purple-400">
                            AI, EPS, SVG, PNG, PDF
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Ad Creatives View */}
                  {activeTab === "ads" && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                        <div className="grid grid-cols-12 gap-4 p-5 items-center">
                          <div className="col-span-7 space-y-3">
                            <span className="inline-block text-[11px] font-mono tracking-widest text-pink-400 uppercase bg-pink-500/10 px-2.5 py-1 rounded-md border border-pink-500/20">
                              Performance Creative
                            </span>
                            <h4 className="text-lg font-bold text-white">
                              High-CTR Social Ad Campaigns
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Engineered for thumb-stopping engagement, psychological buyer triggers, and measurable ROAS on Meta & Google Ads.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                📈 +42% Avg. CTR
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-slate-800 text-slate-300">
                                Multi-format 1:1 & 9:16
                              </span>
                            </div>
                          </div>
                          <div className="col-span-5">
                            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-slate-700/60">
                              <Image
                                src="/assets/images/creatives/1.webp"
                                alt="Performance Ad Creative"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Meta Ads</div>
                          <div className="text-sm font-bold text-white mt-0.5">Feed & Story</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Google Display</div>
                          <div className="text-sm font-bold text-white mt-0.5">Banners & PMax</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Brand Social</div>
                          <div className="text-sm font-bold text-white mt-0.5">Carousels & Posts</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Packaging & Print View */}
                  {activeTab === "packaging" && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                        <div className="grid grid-cols-12 gap-4 p-5 items-center">
                          <div className="col-span-7 space-y-3">
                            <span className="inline-block text-[11px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                              Shelf Impact & 3D
                            </span>
                            <h4 className="text-lg font-bold text-white">
                              Product Packaging & Labeling
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Precision print-ready dielines with specialized finishes including foil stamping, embossed textures, and spot UV.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                300 DPI CMYK Ready
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-slate-800 text-slate-300">
                                Dielines Included
                              </span>
                            </div>
                          </div>
                          <div className="col-span-5">
                            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-slate-700/60">
                              <Image
                                src="/assets/images/creatives/15.webp"
                                alt="Packaging Design"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Box & Carton</div>
                          <div className="text-sm font-bold text-white mt-0.5">Custom Dieline</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Pouches & Bags</div>
                          <div className="text-sm font-bold text-white mt-0.5">Food Grade</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Bottle & Jars</div>
                          <div className="text-sm font-bold text-white mt-0.5">Waterproof Foil</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Canvas Footer Tools Bar */}
                  <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Industry Standard Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 relative" title="Figma">
                          <Image src="/assets/Logos/figma.png" alt="Figma" fill className="object-contain" />
                        </div>
                        <div className="w-5 h-5 relative" title="Adobe Illustrator">
                          <Image src="/assets/Logos/adobe-illustrator.png" alt="Adobe Illustrator" fill className="object-contain" />
                        </div>
                        <div className="w-5 h-5 relative" title="Adobe Photoshop">
                          <Image src="/assets/Logos/adobe-photoshop.png" alt="Adobe Photoshop" fill className="object-contain" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Dedicated Designers in Lucknow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white text-slate-900 px-3.5 py-2 rounded-xl shadow-xl border border-slate-200/80 items-center gap-2 z-20 animate-bounce delay-300">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-xs font-bold">100% Original Vector Art</span>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-slate-900/95 text-white px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 items-center gap-2 z-20">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">Award-Winning Creative Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BrandingSection;
