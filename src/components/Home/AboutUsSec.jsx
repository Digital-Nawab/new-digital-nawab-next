"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Lightbulb,
  BarChart3,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";

export default function StatsSection() {
  const features = [
    {
      icon: MapPin,
      title: "Local Expertise",
      subtitle: "Lucknow Based",
    },
    {
      icon: Lightbulb,
      title: "Creative Team",
      subtitle: "& Strategy",
    },
    {
      icon: BarChart3,
      title: "Transparent",
      subtitle: "Weekly Reporting",
    },
    {
      icon: Target,
      title: "Client Focused",
      subtitle: "Measurable ROI",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-20 lg:py-24 text-slate-900 border-b border-slate-200/60">
      {/* Subtle Dot Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-pink-100/50 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute left-1/3 -bottom-20 h-72 w-72 rounded-full bg-purple-100/40 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Content */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-7 xl:col-span-7">
            {/* Top Pill / Badge */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/95 px-4 py-1.5 shadow-[0_2px_12px_rgba(230,0,103,0.06)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e60067] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e60067]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                  Digital Marketing Agency
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#e60067]">
                  Lucknow, India
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-[1.18]">
              Digital Marketing Agency in Lucknow for{" "}
              <span className="bg-gradient-to-r from-[#e60067] via-[#eb1c78] to-[#d81b60] bg-clip-text text-transparent">
                Business Growth
              </span>
            </h2>

            {/* Subtitle / Paragraph - High Contrast & Crisp Visibility */}
            <p className="max-w-xl text-base sm:text-lg lg:text-[19px] leading-relaxed text-slate-800 font-medium">
              We help businesses grow with result-driven digital marketing
              strategies including{" "}
              <span className="text-slate-950 font-bold underline decoration-[#e60067]/40 decoration-2 underline-offset-4">
                SEO
              </span>
              ,{" "}
              <span className="text-slate-950 font-bold underline decoration-blue-500/40 decoration-2 underline-offset-4">
                Google Ads
              </span>
              ,{" "}
              <span className="text-slate-950 font-bold underline decoration-purple-500/40 decoration-2 underline-offset-4">
                social media marketing
              </span>{" "}
              and{" "}
              <span className="text-slate-950 font-bold underline decoration-emerald-500/40 decoration-2 underline-offset-4">
                website development
              </span>
              .
            </p>

            {/* Action Buttons with High-Contrast Primary & Secondary Pair */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2">
              <Link
                href="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e60067] via-[#eb1c78] to-[#e11d48] hover:from-[#d81b60] hover:to-[#be123c] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/service"
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-slate-900/15 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="text-white font-bold">Explore Services</span>
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Feature Highlights (4 Pillars) Upgraded to Sleek Micro-Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-7 border-t border-slate-200/90">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white/95 rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-pink-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-2.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[#e60067] border border-pink-100 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-slate-950 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Composition with floating cards */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative pt-6 sm:pt-8 pr-2 sm:pr-8 pb-8">
              {/* Main Team Image Container */}
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14)]">
                <div className="relative h-[340px] sm:h-[400px] md:h-[430px] w-full">
                  <Image
                    fill
                    priority
                    src="/assets/images/about/team-office.jpg"
                    alt="Digital Nawab Team - Digital Marketing Agency in Lucknow"
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Social Proof Badge on Bottom Left of Image */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-950 leading-tight">
                      250+ Growth Projects
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      98% Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Website Design & Development */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 sm:-top-5 right-24 sm:right-32 w-28 sm:w-34 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_15px_35px_rgba(15,23,42,0.16)] z-20 backdrop-blur-xs hover:scale-105 transition-transform"
              >
                <div className="relative h-16 sm:h-20 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    fill
                    src="/assets/images/about/website-design.jpg"
                    alt="Website Design & Development"
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <p className="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold leading-tight text-slate-900">
                  Website Design &amp; Development
                </p>
              </motion.div>

              {/* Floating Card 2: Social Media Campaigns */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 w-28 sm:w-34 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_15px_35px_rgba(15,23,42,0.16)] z-20 backdrop-blur-xs hover:scale-105 transition-transform"
              >
                <div className="relative h-16 sm:h-20 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    fill
                    src="/assets/images/about/social-media.jpg"
                    alt="Social Media Campaigns"
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <p className="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold leading-tight text-slate-900">
                  Social Media Campaigns
                </p>
              </motion.div>

              {/* Handwritten Note with Curved Arrow: Your Success Our Priority */}
              <div className="absolute bottom-2 sm:bottom-6 -right-2 sm:-right-6 z-20 flex flex-col items-center select-none pointer-events-none">
                <span className="font-['Caveat',cursive] text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight -rotate-3 text-center drop-shadow-sm">
                  Your Success<br />Our Priority
                </span>
                <svg
                  viewBox="0 0 54 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-8 sm:w-12 sm:h-10 text-[#e60067] stroke-current -mt-0.5"
                >
                  {/* Swooping curved arrow pointing left towards the team */}
                  <path
                    d="M38 4C28 6 12 14 10 24C8 30 14 36 22 35C26 34 30 31 32 28"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M26 35L33 28L31 38"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
