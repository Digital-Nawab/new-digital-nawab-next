"use client";

import React, { useState } from "react";
import {
  Search,
  Compass,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Layers,
  ChevronRight,
  Check,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const processSteps = [
  {
    step: "01",
    phase: "Discovery",
    title: "Discovery & Strategic Alignment",
    shortDesc: "Deep-dive research into brand goals, audience personas, and competitor benchmarks.",
    fullDesc:
      "Every high-converting website begins with deep clarity. We conduct comprehensive discovery sessions to understand your brand identity, business model, audience pain points, and commercial objectives. We benchmark competitors in Lucknow and globally to identify market gaps your new site will exploit.",
    duration: "2 - 4 Days",
    tag: "Strategy & Intelligence",
    accent: "from-blue-500 to-cyan-400",
    glowColor: "rgba(56, 189, 248, 0.25)",
    icon: Search,
    deliverables: [
      "Project Discovery Blueprint",
      "Audience Persona Mapping",
      "Competitor Benchmarking Report",
      "Feature Scope & Technical Specification",
    ],
    highlight: "Clear scope with zero guesswork before writing a single line of code.",
  },
  {
    step: "02",
    phase: "Planning",
    title: "Information Architecture & Wireframing",
    shortDesc: "Structuring intuitive sitemaps, conversion funnels, and low-fidelity user journeys.",
    fullDesc:
      "We design the skeletal framework of your digital experience. Through detailed sitemaps and responsive wireframes, we structure conversion funnels that guide visitors effortlessly from initial landing to final enquiry or checkout with zero cognitive friction.",
    duration: "3 - 5 Days",
    tag: "Architecture & UX",
    accent: "from-indigo-500 to-purple-500",
    glowColor: "rgba(99, 102, 241, 0.25)",
    icon: Compass,
    deliverables: [
      "Visual Sitemap & Content Hierarchy",
      "Low-Fidelity Interactive Wireframes",
      "Conversion Funnel Architecture",
      "Technical Stack & Database Roadmap",
    ],
    highlight: "Conversion-first layout calibrated for maximum user retention and search engine crawlability.",
  },
  {
    step: "03",
    phase: "Design",
    title: "Bespoke UI/UX Design & Prototyping",
    shortDesc: "Pixel-perfect Figma visual interfaces, custom typography, and dynamic micro-interactions.",
    fullDesc:
      "Our senior designers create bespoke visual systems tailored exclusively to your brand. We design responsive, accessible UI components with modern typography, smooth color palettes, and realistic clickable prototypes so you can experience the exact website flow before engineering begins.",
    duration: "5 - 8 Days",
    tag: "Visual Craft",
    accent: "from-purple-500 to-pink-500",
    glowColor: "rgba(217, 70, 239, 0.25)",
    icon: Palette,
    deliverables: [
      "High-Fidelity Figma UI Prototypes",
      "Custom Design System & Component Library",
      "Mobile, Tablet & Desktop Layouts",
      "Interactive Micro-Interactions & Transitions",
    ],
    highlight: "Stunning aesthetic that elevates your brand authority above regional competitors.",
  },
  {
    step: "04",
    phase: "Development",
    title: "Full-Stack Development & CMS Integration",
    shortDesc: "Clean, scalable engineering using modern frameworks with fast database queries.",
    fullDesc:
      "We bring approved designs to life with clean, modular code. Utilizing modern full-stack architectures (Next.js, React, Node.js, Tailwind CSS, or headless CMS platforms), we engineer lightweight, ultra-responsive pages with sub-second load times and seamless third-party API integrations.",
    duration: "8 - 15 Days",
    tag: "Engineering",
    accent: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: Code2,
    deliverables: [
      "Full-Stack Clean, Maintainable Codebase",
      "Dynamic Admin Panel / Custom CMS",
      "Payment Gateway & CRM Integrations",
      "Server-Side Rendering (SSR) & API Endpoints",
    ],
    highlight: "Built for speed, scalability, and seamless content management by your internal team.",
  },
  {
    step: "05",
    phase: "QA",
    title: "Quality Assurance & Multi-Device Testing",
    shortDesc: "Rigorous testing across 25+ browser & device combinations, security, and speed audits.",
    fullDesc:
      "Zero defects policy. Our dedicated QA engineers test every user pathway, form submission, and checkout journey across real Android, iOS, Windows, and macOS devices. We optimize Core Web Vitals to achieve 90+ Google PageSpeed scores and conduct stringent security vulnerability checks.",
    duration: "3 - 5 Days",
    tag: "Testing & Audits",
    accent: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
    icon: CheckCircle2,
    deliverables: [
      "Cross-Browser & Cross-Device QA Matrix",
      "Google Core Web Vitals 90+ Speed Audit",
      "Forms, Gateways & Security Penetration Check",
      "Accessibility (WCAG 2.1) & W3C Code Validation",
    ],
    highlight: "Pre-flight audited for lightning-fast speeds and bulletproof stability.",
  },
  {
    step: "06",
    phase: "Launch",
    title: "Deployment & Production Launch",
    shortDesc: "Seamless zero-downtime deployment, DNS setup, SSL certification, and Google Search Console indexation.",
    fullDesc:
      "When everything is verified and approved, we orchestrate a smooth, zero-downtime go-live. We configure production servers, global CDN edge caching, SSL certificates, 301 redirect maps, XML sitemaps, Google Analytics 4, and submit your property for immediate search engine indexing.",
    duration: "1 - 2 Days",
    tag: "Go-Live",
    accent: "from-blue-600 to-indigo-600",
    glowColor: "rgba(79, 70, 229, 0.25)",
    icon: Rocket,
    deliverables: [
      "Zero-Downtime Server & CDN Setup",
      "Domain DNS Routing & SSL Hardening",
      "Google Search Console & GA4 Setup",
      "Complete Source Code & Admin Handoff",
    ],
    highlight: "Flawless launch with automated backups and immediate search engine indexation.",
  },
  {
    step: "07",
    phase: "Support",
    title: "Continuous Maintenance & Growth Optimization",
    shortDesc: "Ongoing 24/7 uptime monitoring, security patches, regular backups, and conversion scaling.",
    fullDesc:
      "Launch is just day one. Digital Nawab provides comprehensive post-launch support including 24/7 uptime monitoring, routine security patches, automated off-site backups, and ongoing Conversion Rate Optimization (CRO) to continuously grow your organic traffic and leads.",
    duration: "Continuous",
    tag: "24/7 Care",
    accent: "from-rose-500 to-pink-600",
    glowColor: "rgba(244, 63, 94, 0.25)",
    icon: LifeBuoy,
    deliverables: [
      "30 Days Complimentary Post-Launch Warranty",
      "24/7 Server Health & Uptime Monitoring",
      "Regular Security Patches & Plugin Updates",
      "Quarterly CRO & SEO Performance Audits",
    ],
    highlight: "Long-term technical partnership ensuring your website remains secure and ahead of the curve.",
  },
];

export default function WebsiteDevProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const current = processSteps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section
      id="website-development-process"
      className="relative py-14 lg:py-20 bg-[#060312] text-white overflow-hidden selection:bg-indigo-500 selection:text-white"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-lg shadow-indigo-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-indigo-200 uppercase">
              07 / End-to-End Methodology
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
            Our Website Development{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Process
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            From initial discovery and custom UI/UX design to full-stack engineering, QA, launch, and ongoing support — an agile 7-stage roadmap built for speed, transparency, and high commercial ROI.
          </p>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none no-scrollbar">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white border-white/30 shadow-xl shadow-indigo-500/25 scale-[1.03]"
                    : "bg-white/[0.04] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span className="text-[11px] font-black opacity-80">{step.step}</span>
                <span>{step.phase}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl mb-16 overflow-hidden">
          {/* Subtle Stage Accent Backdrop Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-700"
            style={{ background: current.glowColor }}
          />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                  Step {current.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/15">
                  {current.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 px-3 py-1 rounded-full bg-black/40 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Estimated: {current.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
                {current.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {current.fullDesc}
              </p>

              {/* Key Deliverables Matrix */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Key Deliverables in this Stage
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-gray-200"
                    >
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Callout */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                  {current.highlight}
                </p>
              </div>
            </div>

            {/* Right Column: Visual Stage Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
                <div
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${current.accent} flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6`}
                >
                  <CurrentIcon className="w-12 h-12 text-white" />
                </div>

                <div className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">
                  Phase {current.step} of 07
                </div>

                <div className="text-2xl font-black text-white mb-2">
                  {current.phase}
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {current.shortDesc}
                </p>

                {/* Progress Indicators */}
                <div className="w-full flex items-center justify-center gap-2 mb-8">
                  {processSteps.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveStep(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeStep
                          ? "w-8 bg-gradient-to-r from-cyan-400 to-indigo-500"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to step ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="w-full flex items-center justify-between gap-3">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      activeStep === 0
                        ? "opacity-40 cursor-not-allowed border-white/10 text-gray-500"
                        : "border-white/20 text-white hover:bg-white/10 cursor-pointer"
                    }`}
                  >
                    Previous Step
                  </button>
                  <button
                    disabled={activeStep === processSteps.length - 1}
                    onClick={() =>
                      setActiveStep((prev) =>
                        Math.min(processSteps.length - 1, prev + 1)
                      )
                    }
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg transition-all ${
                      activeStep === processSteps.length - 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:from-indigo-600 hover:to-cyan-600 cursor-pointer hover:scale-[1.02]"
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Overview Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-indigo-950/80 to-purple-950/60 border-indigo-400/80 shadow-lg shadow-indigo-500/20 -translate-y-1"
                    : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-black ${
                        isSelected ? "text-cyan-400" : "text-gray-500"
                      }`}
                    >
                      {step.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-cyan-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="font-bold text-white text-xs mb-1 line-clamp-1">
                    {step.phase}
                  </div>
                  <div className="text-[11px] text-gray-400 line-clamp-2 leading-tight">
                    {step.shortDesc}
                  </div>
                </div>
                <div className="text-[10px] text-indigo-300 mt-2 font-medium">
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Bottom CTA */}
        <div className="mt-14 text-center">
          <ContactPopup
            buttonText="Start Your Project With Our 7-Stage Process"
            buttonClassName="cursor-pointer px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}
