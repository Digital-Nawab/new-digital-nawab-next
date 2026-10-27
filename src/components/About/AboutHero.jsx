"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[#05040a] text-white pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Gradients & Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#8F5AFF]/20 via-[#C73673]/15 to-transparent blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -left-48 w-[450px] h-[450px] bg-[#C73673]/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-48 w-[450px] h-[450px] bg-[#00F0FF]/10 blur-[130px] rounded-full" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Breadcrumb Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 shadow-lg shadow-purple-500/10">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            About Us
          </span>
        </div>

        {/* Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C73673] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Digital Nawab • Est. 2015</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto">
          Pioneering Digital Growth,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8]">
            Empowering Modern Brands
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10">
          We are Lucknow&apos;s leading performance-driven digital marketing agency.
          We architect data-backed campaigns, high-ranking SEO strategies, and
          scalable digital solutions that convert visitors into lifelong customers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold text-sm sm:text-base transition-transform hover:scale-105 shadow-xl shadow-[#C73673]/30"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#team"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 text-gray-200 hover:text-white font-medium text-sm sm:text-base transition-all backdrop-blur-md"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Meet Our Team</span>
          </a>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0c18]/70 border border-white/[0.08] backdrop-blur-xl hover:border-purple-500/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              10+ Years
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-light">
              Digital Industry Experience
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0c18]/70 border border-white/[0.08] backdrop-blur-xl hover:border-pink-500/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              500+
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-light">
              Successful Projects Delivered
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0c18]/70 border border-white/[0.08] backdrop-blur-xl hover:border-purple-500/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              250+
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-light">
              Active Retained Clients
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0c18]/70 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              95%
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-light">
              Client Retention Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
