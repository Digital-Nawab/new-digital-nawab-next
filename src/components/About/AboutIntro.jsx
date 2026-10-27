"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Projects Completed", growth: "+38% YoY" },
  { value: "95%", label: "Client Retention Rate", growth: "Industry High" },
  { value: "1,200+", label: "Monthly Leads Driven", growth: "Across Clients" },
  { value: "30%+", label: "Average ROI Increase", growth: "Within 90 Days" },
];

const highlights = [
  "Performance-first SEO architectures designed for sustained #1 rankings",
  "High-conversion Google & Meta ad campaigns with obsessive CPA tracking",
  "Tailored web engineering with lightning-fast Next.js / React technologies",
  "Complete transparency with real-time analytics and weekly strategy sprints",
];

const AboutIntro = () => {
  return (
    <section className="relative w-full bg-[#f8f9fc] border-y border-gray-200/90 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-gray-900 overflow-hidden">
      {/* Background Soft Glows & Texture */}
      <div className="pointer-events-none absolute top-1/4 -right-20 w-96 h-96 bg-[#8F5AFF]/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-96 h-96 bg-[#C73673]/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200/80 text-xs sm:text-sm font-semibold tracking-wider uppercase text-purple-700 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C73673]" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
              Grow, Dominate & Rise:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF1F6D]">
                We Engineer Market Leaders
              </span>
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              In this digital age, when business velocity is determined by online
              visibility, traditional marketing methods simply fall short. Being
              digitally sound means achieving your business milestones 3X faster
              with predictable acquisition channels.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
              At Digital Nawab, we are growth architects. We do not believe in
              one-size-fits-all packages; every strategy is customized, data-backed,
              and rigorously tested to ensure our partners achieve maximum search
              dominance, high customer acquisition, and exponential return on investment.
            </p>

            {/* Strategic Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-purple-300 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-gray-200/90 hover:border-purple-400 hover:shadow-lg transition-all group shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#C73673] to-[#8F5AFF] bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-900 font-semibold leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-purple-700 font-medium mt-1">
                    {stat.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gradient border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#C73673]/40 via-[#8F5AFF]/40 to-purple-200 shadow-2xl">
                <div className="relative rounded-[22px] overflow-hidden bg-gray-100 aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                    alt="Digital Nawab Team Strategic Meeting"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  {/* Floating Pill on image */}
                  <div className="absolute top-5 left-5 px-4 py-2 rounded-xl bg-white/95 border border-gray-200 shadow-lg backdrop-blur-md flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-900">
                      Google & Meta Partner
                    </span>
                  </div>

                  {/* Bottom Floating Glass Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-white/95 border border-gray-200 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C73673] to-[#8F5AFF] flex items-center justify-center text-white shadow-md">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            Digital Nawab
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Premier Digital Growth Agency
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#C73673] px-2 py-0.5 rounded-md bg-pink-50 border border-pink-200">
                        Top Rated
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      Empowering startups, brands, and enterprises across India with
                      measurable search dominance & revenue scaling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-br from-[#C73673]/20 to-[#8F5AFF]/20 blur-2xl pointer-events-none -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;