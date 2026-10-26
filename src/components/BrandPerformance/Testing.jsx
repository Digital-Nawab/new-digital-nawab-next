"use client";
import React from "react";
import {
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Zap,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const ABTestingSection = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  const stats = [
    {
      number: "87%",
      label: "Average Conversion Increase",
      color: isDark ? "text-cyan-400" : "text-[#2563eb]",
    },
    {
      number: "2.4x",
      label: "ROI Improvement",
      color: isDark ? "text-purple-400" : "text-[#7c3aed]",
    },
    {
      number: "15+",
      label: "Testing Variables",
      color: isDark ? "text-emerald-400" : "text-[#059669]",
    },
    {
      number: "48hrs",
      label: "Results Delivery",
      color: isDark ? "text-amber-400" : "text-[#ea580c]",
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Split Testing",
      description:
        "Run controlled experiments to compare different versions of your ad copies, landing pages, and CTAs to identify what converts highest.",
      cardBg: isDark ? "bg-white/[0.04] border-white/10" : "bg-[#f0f8ff] border-sky-100",
      iconBg: "bg-[#0284c7]",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track key metrics, cost-per-lead, and conversion rates with detailed insights into user behavior and bounce drop-offs.",
      cardBg: isDark ? "bg-white/[0.04] border-white/10" : "bg-[#fdf2f8] border-pink-100",
      iconBg: "bg-[#db2777]",
    },
    {
      icon: Target,
      title: "Funnel Analysis",
      description:
        "Identify friction points and leakages in your sales funnel to streamline checkout flows and increase closed sales.",
      cardBg: isDark ? "bg-white/[0.04] border-white/10" : "bg-[#ecfdf5] border-emerald-100",
      iconBg: "bg-[#059669]",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description:
        "Test customized offers and messaging tailored to different traffic temperatures (cold search intent vs. warm retargeting).",
      cardBg: isDark ? "bg-white/[0.04] border-white/10" : "bg-[#fff7ed] border-orange-100",
      iconBg: "bg-[#ea580c]",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Hypothesis",
      description: "Define clear testing objectives and expected conversion outcomes.",
      circleBg: "bg-[#0284c7]",
    },
    {
      step: "02",
      title: "Design",
      description: "Create landing page variations and configure split traffic rules.",
      circleBg: "bg-[#db2777]",
    },
    {
      step: "03",
      title: "Execute",
      description: "Run statistical tests with proper traffic allocation and tracking.",
      circleBg: "bg-[#059669]",
    },
    {
      step: "04",
      title: "Analyze & Scale",
      description: "Review winning variations and roll out winners to maximize ad ROAS.",
      circleBg: "bg-[#ea580c]",
    },
  ];

  return (
    <section
      className={`relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-[#070214] via-[#0d0622] to-[#04010a] text-white"
          : "bg-[#f8f9ff] text-gray-900 border-y border-slate-200/60"
      }`}
      aria-label="A/B Testing and Funnel Optimization"
    >
      {/* Dark Ambient Elements */}
      {isDark && (
        <>
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#8b5cf6 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-14">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-sm ${
              isDark
                ? "bg-purple-500/10 border border-purple-500/30 text-purple-300"
                : "bg-[#f3e8ff] border border-purple-200/60 text-[#7c3aed]"
            }`}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>✦ DATA-DRIVEN OPTIMIZATION ✦</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            A/B Testing &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Funnel Optimization
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal ${
              isDark ? "text-slate-300" : "text-gray-500"
            }`}
          >
            Driving PPC clicks is only half the formula. We continuously split-test landing page headlines, CTAs, and checkout flows to transform traffic into profitable conversions.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 shadow-xl"
                  : "bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md"
              }`}
            >
              <div
                className={`text-3xl sm:text-4xl font-extrabold ${stat.color} mb-1 tracking-tight`}
              >
                {stat.number}
              </div>
              <div
                className={`text-xs font-medium ${
                  isDark ? "text-slate-400" : "text-gray-500"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Feature Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`${feature.cardBg} border rounded-2xl p-6 sm:p-7 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "hover:border-purple-500/40 shadow-xl"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-base sm:text-lg mb-1.5 tracking-tight ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isDark ? "text-slate-300" : "text-gray-500"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testing Process Box */}
        <div
          className={`rounded-2xl sm:rounded-3xl p-8 sm:p-10 max-w-5xl mx-auto mb-12 ${
            isDark
              ? "bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-white border border-gray-100 shadow-sm"
          }`}
        >
          <h3
            className={`text-xl sm:text-2xl font-bold text-center mb-8 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our 4-Step Optimization Methodology
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center">
                <div
                  className={`w-12 h-12 ${item.circleBg} text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 shadow-md shadow-black/10 text-sm`}
                >
                  {item.step}
                </div>
                <h4
                  className={`font-bold text-sm sm:text-base mb-1 tracking-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-xs leading-relaxed font-normal ${
                    isDark ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </p>

                {/* Subtle connector dot for desktop */}
                {index < 3 && (
                  <div className="hidden lg:flex absolute top-5 -right-3 transform translate-x-1/2 items-center justify-center pointer-events-none">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isDark ? "bg-white/20" : "bg-gray-300"
                      }`}
                    ></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ContactPopup
            buttonText="Start Testing Today →"
            buttonClassName="cursor-pointer bg-gradient-to-r from-[#4f46e5] via-[#9333ea] to-[#db2777] hover:opacity-95 text-white text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/25 transition-all inline-flex items-center gap-2 transform hover:scale-105 active:scale-95"
          />
          <p
            className={`text-xs mt-3 font-normal ${
              isDark ? "text-slate-400" : "text-gray-400"
            }`}
          >
            No setup fees · Comprehensive conversion tracking · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default ABTestingSection;
