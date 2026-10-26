"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Code,
  Zap,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Search,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const WebDevelopmentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const highlights = [
    { icon: Award, text: "Expert Developers", color: "blue", bg: "bg-blue-50", textCol: "text-blue-600", border: "hover:border-blue-300" },
    { icon: Zap, text: "Cutting-edge Technology", color: "purple", bg: "bg-purple-50", textCol: "text-purple-600", border: "hover:border-purple-300" },
    { icon: Users, text: "User-friendly Design", color: "green", bg: "bg-emerald-50", textCol: "text-emerald-600", border: "hover:border-emerald-300" },
    { icon: Search, text: "SEO Optimized", color: "orange", bg: "bg-amber-50", textCol: "text-amber-600", border: "hover:border-amber-300" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 lg:py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 rounded-full px-4 py-2 mb-6 shadow-sm">
              <Monitor className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">
                Web Development
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Website Development{" "}
              <span className="block text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Company in Lucknow
              </span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-5 mb-8 text-slate-600 leading-relaxed text-base sm:text-lg">
              <p>
                Discover excellence with{" "}
                <strong className="font-bold text-slate-900">Digital Nawab</strong>,
                your premier choice for web design and website development company
                in Lucknow. We craft stunning, high-performance websites tailored
                for startups, businesses, and enterprises. Experience the perfect
                blend of{" "}
                <span className="font-semibold text-blue-600">
                  creativity, innovation, and functionality
                </span>
                .
              </p>

              <p className="text-sm sm:text-base text-slate-600">
                Looking for the best website development company in Lucknow? Look no
                further than Digital Nawab. Our website development agency in Lucknow
                is backed by a team of expert developers and cutting-edge
                technology, specializing in creating responsive, user-friendly, and
                SEO-optimized websites that enhance your brand&apos;s online
                presence.
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mb-9">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3.5 sm:p-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${highlight.border}`}
                  >
                    <div className={`p-2.5 ${highlight.bg} rounded-xl flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${highlight.textCol}`} />
                    </div>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {highlight.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div>
              <ContactPopup
                buttonText="LET'S PLAN YOUR WEBSITE"
                buttonClassName="cursor-pointer group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Visual Engineering & Performance Showcase */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-70 animate-pulse pointer-events-none" />

              {/* Main Card: Browser Mockup */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
                {/* Window Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">🔒</span>
                    digitalnawab.com/web-engineering
                  </div>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>

                {/* Performance Metrics Dashboard */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Google Core Web Vitals
                      </span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        98/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full w-[98%]" />
                    </div>
                  </div>

                  {/* 2x2 Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-black text-blue-600">
                        0.8s
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        First Contentful Paint
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-black text-indigo-600">
                        99.9%
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Production Uptime
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-black text-purple-600">
                        250+
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Websites Deployed
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-black text-emerald-600">
                        100%
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Mobile Responsive
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Technical Standards */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Clean Next.js & React Component Architecture</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>On-Page Technical SEO & Schema Structured Data</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Sub-2-Second Load Times with Edge Caching</span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Trust Pill */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 px-4 py-2.5 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center gap-3 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-xs">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold">Top Rated in Lucknow</div>
                  <div className="text-[10px] text-slate-400">Trusted by 250+ Brands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-100 {
          background-image: linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>
    </section>
  );
};

export default WebDevelopmentSection;