"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Code2,
  Palette,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  Globe,
  Check,
  Server,
  Activity,
  Terminal,
  HelpCircle,
  FileCheck,
  GitBranch,
  Rocket,
  Lock,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";

export default function MobileAppPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTechTab, setActiveTechTab] = useState("all");

  const services = [
    {
      id: "ios",
      icon: Smartphone,
      title: "iOS App Development",
      platform: "Apple Ecosystem",
      tagline: "High-Performance iPhone Experiences Built on Swift & SwiftUI",
      accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
      borderColor: "border-blue-500/30 hover:border-blue-400",
      iconColor: "text-blue-400",
      description:
        "We build powerful, elegant applications for the entire Apple ecosystem. Leveraging Swift, SwiftUI, and Xcode, we adhere strictly to Apple's Human Interface Guidelines to deliver fluid, intuitive, and secure iOS applications.",
      features: [
        "Native Swift & SwiftUI architecture",
        "Deep Apple SDK, CoreML & ARKit integration",
        "FaceID, Apple Pay & Keychain security protocols",
        "Rigorous Apple App Store compliance & launch management",
        "Backward compatibility & smooth iOS version upgrades",
      ],
      link: "/contact-us",
    },
    {
      id: "android",
      icon: Smartphone,
      title: "Android App Development",
      platform: "Google Android",
      tagline: "Scalable, Resilient Apps Engineered with Kotlin & Jetpack",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-emerald-500/30 hover:border-emerald-400",
      iconColor: "text-emerald-400",
      description:
        "Target the world's largest mobile audience with robust Android apps. Built using Kotlin, Java, and modern Android Jetpack libraries, our applications run smoothly across diverse manufacturers, screen densities, and OS versions.",
      features: [
        "Modern Kotlin-first development & Jetpack Compose",
        "Material Design 3 adaptive design systems",
        "Extensive multi-device & resolution testing matrix",
        "Google Play Console management & compliance review",
        "Background services, push notifications & battery efficiency",
      ],
      link: "/contact-us",
    },
    {
      id: "ipad",
      icon: Tablet,
      title: "iPad & Tablet App Development",
      platform: "Tablet Optimized",
      tagline: "Expansive Interfaces for Enterprise Productivity & Media",
      accent: "from-purple-500/20 via-pink-500/10 to-transparent",
      borderColor: "border-purple-500/30 hover:border-purple-400",
      iconColor: "text-purple-400",
      description:
        "Tablets require specialized UX that takes advantage of larger screens. We build high-performance iPadOS and Android tablet apps with split-screen multitasking, stylus support, and rich data visualization for corporate and consumer use.",
      features: [
        "Adaptive split-view & multi-column layouts",
        "Apple Pencil & digital stylus interaction support",
        "High-density data visualization & dashboards",
        "Drag-and-drop workspace integration",
        "Enterprise field operations & point-of-sale (POS) tuning",
      ],
      link: "/contact-us",
    },
    {
      id: "web-app",
      icon: Globe,
      title: "Web App Development & PWA",
      platform: "Browser & Mobile",
      tagline: "Progressive Web Apps Delivering Native-Like Capabilities",
      accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30 hover:border-cyan-400",
      iconColor: "text-cyan-400",
      description:
        "Bridge the gap between website and native app. Our Progressive Web Applications (PWAs) and responsive web apps offer offline caching, push notifications, and sub-second load times without requiring an app store download.",
      features: [
        "Offline-capable service worker architecture",
        "Instant installability to smartphone home screens",
        "Web push notifications & automated background sync",
        "Ultra-lightweight bundle sizes & sub-second render times",
        "Full cross-device compatibility across desktop & mobile",
      ],
      link: "/service/website-design-and-development",
    },
    {
      id: "ui-ux",
      icon: Palette,
      title: "Mobile App UI/UX Design",
      platform: "Design Systems",
      tagline: "User-Centered Interfaces with Micro-Interactions & Flow",
      accent: "from-pink-500/20 via-purple-500/10 to-transparent",
      borderColor: "border-pink-500/30 hover:border-pink-400",
      iconColor: "text-pink-400",
      description:
        "Exceptional usability is the foundation of high user retention. We design frictionless mobile user flows, interactive Figma prototypes, and comprehensive design systems tailored to human ergonomics and thumb-friendly zones.",
      features: [
        "User persona mapping & interactive wireframing",
        "Clickable high-fidelity Figma & ProtoPie prototypes",
        "Ergonomic thumb-zone layout architecture",
        "Delightful micro-interactions & fluid 60fps animations",
        "WCAG accessibility & multi-language localization readiness",
      ],
      link: "/service/graphic-designing-services",
    },
    {
      id: "cross-platform",
      icon: Layers,
      title: "Cross-Platform Mobile Apps",
      platform: "Unified Codebase",
      tagline: "Faster Time-to-Market with Flutter & React Native",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-amber-500/30 hover:border-amber-400",
      iconColor: "text-amber-400",
      description:
        "Build once and deploy seamlessly across iOS, Android, and web. Utilizing Flutter and React Native, we deliver near-native execution speed with a single shared codebase, cutting development budgets and maintenance overhead in half.",
      features: [
        "Unified codebase saving 40–50% in development costs",
        "Near-native runtime performance & compiled binaries",
        "Reusable business logic with platform-specific UI polish",
        "Synchronized release schedules across Apple & Google stores",
        "Streamlined post-launch maintenance & single-team support",
      ],
      link: "/packages",
    },
  ];

  const processStages = [
    {
      step: "01",
      title: "Requirement Analysis",
      desc: "We dive deep into your business objectives, target audience demographics, functional specifications, and technical feasibility to define a solid MVP scope and development blueprint.",
    },
    {
      step: "02",
      title: "Wireframing & UI/UX Design",
      desc: "Our designers craft interactive wireframes, user flow diagrams, and pixel-perfect high-fidelity prototypes. Every screen is reviewed and approved before coding begins.",
    },
    {
      step: "03",
      title: "Agile Development",
      desc: "Using modular Clean Architecture, our engineers build frontend screens and secure backend APIs in two-week agile sprints, providing continuous test builds for your feedback.",
    },
    {
      step: "04",
      title: "Testing & Quality Assurance",
      desc: "Rigorous automated unit testing, manual device lab validation, security audits, and memory-leak tests ensure your application is fast, resilient, and 100% bug-free.",
    },
    {
      step: "05",
      title: "Deployment & Launch",
      desc: "We manage the end-to-end submission process to both the Apple App Store and Google Play Store, handling compliance, certificates, screenshots, and metadata for a smooth approval.",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Blistering Performance",
      desc: "Engineered for 60/120 FPS fluid interactions, instantaneous cold start times, and minimal device battery consumption.",
    },
    {
      icon: Layers,
      title: "Enterprise Scalability",
      desc: "Cloud-native backend architectures that gracefully handle surges from thousands to millions of concurrent active users.",
    },
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      desc: "End-to-end encryption, biometric authentication, secure token storage, and strict adherence to data privacy regulations.",
    },
    {
      icon: Globe,
      title: "Platform Compatibility",
      desc: "Flawless rendering across standard smartphones, foldables, tablets, and varying screen resolutions without distortion.",
    },
    {
      icon: FileCheck,
      title: "100% Code Ownership",
      desc: "You retain complete intellectual property and source code rights upon project completion. No proprietary lock-in.",
    },
    {
      icon: Activity,
      title: "Post-Launch Support",
      desc: "Proactive monitoring, OS version compatibility updates, crash analytics tracking, and continuous feature expansion.",
    },
  ];

  const faqs = [
    {
      q: "How much does custom mobile app development cost?",
      a: "Mobile application development costs depend on project complexity, target platforms (iOS, Android, or both), backend infrastructure, and feature set (e.g., custom payment gateways, real-time GPS tracking, chat systems, or offline caching). Standard MVP apps generally start with affordable milestones, while comprehensive enterprise platforms scale based on architecture. Contact us for a transparent, itemized project estimate.",
    },
    {
      q: "How long does it typically take to design and launch an app?",
      a: "A standard minimum viable product (MVP) mobile application typically requires 6 to 10 weeks from initial requirement discovery to App Store submission. Larger, feature-rich enterprise platforms may span 12 to 16 weeks. We provide a milestone-based timeline before starting any development.",
    },
    {
      q: "Should I choose Native (iOS/Android) or Cross-Platform (Flutter/React Native)?",
      a: "If your app demands heavy hardware interaction (e.g., complex Bluetooth peripheral pairing, AR/VR, or intensive 3D graphic rendering), Native development in Swift or Kotlin is optimal. For the majority of consumer, ecommerce, and SaaS applications, Cross-Platform development using Flutter or React Native offers virtually identical performance while reducing development time and cost by 40% with a single shared codebase.",
    },
    {
      q: "Do you handle the App Store and Google Play approval process?",
      a: "Yes, completely. We configure your developer accounts, generate required SSL certificates, compile release builds, prepare store screenshots, privacy policies, and metadata, and shepherd the application through Apple's App Store Review and Google's Play Protect review until it is live.",
    },
    {
      q: "Who owns the mobile application source code upon completion?",
      a: "You retain 100% intellectual property (IP) and full source code ownership upon final project milestone delivery. We provide all repository access, design assets, and technical documentation with zero ongoing vendor lock-in.",
    },
    {
      q: "What maintenance and support do you provide after the app launches?",
      a: "We offer dedicated post-launch maintenance packages that include monitoring crash logs, fixing unexpected bugs, updating libraries for major iOS and Android OS version releases, and scaling cloud backend servers as your user base expands.",
    },
  ];

  return (
    <div className="bg-[#07090e] text-white min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Next-Gen Mobile App Engineering</span>
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Engineering Intuitive,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                  High-Performance Mobile Apps
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your visionary concept into a polished iOS or Android application. We architect custom native and cross-platform mobile solutions engineered for blistering speed, human-centered UX, and limitless cloud scalability.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ContactPopup
                  buttonText="Schedule Technical Consultation"
                  buttonClassName="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold hover:opacity-95 transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] cursor-pointer text-sm sm:text-base"
                />

                <Link
                  href="/packages"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium transition-all text-sm sm:text-base"
                >
                  <span>View Development Packages</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
                <span className="text-gray-500 font-semibold uppercase tracking-wider">Capabilities:</span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Swift (iOS)
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Kotlin (Android)
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Flutter & React Native
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> App Store Approval
                </span>
              </div>
            </motion.div>

            {/* Right Column: Realistic Smartphone Mockup Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              {/* Smartphone Frame */}
              <div className="relative w-[280px] sm:w-[310px] rounded-[48px] p-3.5 bg-gradient-to-b from-gray-700 via-gray-900 to-black shadow-2xl shadow-indigo-500/20 border-4 border-gray-800">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-blue-950" />
                </div>

                {/* Inner Screen */}
                <div className="w-full rounded-[38px] bg-[#0c101c] overflow-hidden border border-white/10 pt-8 pb-5 px-4 space-y-4 text-left">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[10px] text-gray-400 px-1 pt-1 font-mono">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px]">5G</span>
                      <div className="w-4 h-2 border border-gray-400 rounded-sm p-0.5 flex items-center">
                        <div className="w-full h-full bg-gray-300 rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[11px] text-gray-400">Welcome back,</p>
                      <h4 className="text-sm font-bold text-white">Digital Nawab App</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      DN
                    </div>
                  </div>

                  {/* App Balance Card */}
                  <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg space-y-2">
                    <div className="flex justify-between text-[11px] opacity-80">
                      <span>Store Revenue</span>
                      <span className="font-mono">Active Sync</span>
                    </div>
                    <p className="text-2xl font-bold font-mono">₹2,84,950</p>
                    <div className="flex justify-between text-[10px] pt-1 border-t border-white/20">
                      <span>Transactions: 840</span>
                      <span className="text-emerald-300 font-bold">+18.4%</span>
                    </div>
                  </div>

                  {/* Quick Feature Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                      <Zap className="w-4 h-4 mx-auto mb-1 text-cyan-400" /> Fast Sync
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                      <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-400" /> Secure
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                      <Cpu className="w-4 h-4 mx-auto mb-1 text-purple-400" /> 60 FPS
                    </div>
                  </div>

                  {/* Recent Activity List */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-semibold text-gray-400">Live Services</p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                          iOS
                        </div>
                        <span className="text-gray-300 text-[11px]">Swift Native Core</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] font-mono">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                          AND
                        </div>
                        <span className="text-gray-300 text-[11px]">Kotlin Microservice</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] font-mono">Synced</span>
                    </div>
                  </div>

                  {/* Bottom Navigation Bar */}
                  <div className="pt-2 flex justify-around text-gray-500 border-t border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -left-6 top-24 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">Flutter & Swift</span>
                </div>
                <div className="absolute -right-6 bottom-20 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-semibold text-white">99.9% Crash-Free</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Engineering Digital Dominance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Invest in Custom Mobile App Development?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Mobile devices account for over 60% of all global web traffic and customer interaction. An engineered mobile app provides your enterprise with direct consumer access, push notification channels, and offline accessibility that responsive websites cannot match.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-7 bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3x Higher Engagement</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                App users browse 3x more products and complete purchases with 2x higher conversion rates compared to mobile browser visitors.
              </p>
            </div>

            <div className="rounded-2xl p-7 bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sub-Second Responsiveness</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Compiled native code and local asset caching eliminate network load latency, offering instant page renders and smooth 60fps animations.
              </p>
            </div>

            <div className="rounded-2xl p-7 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Hardware & Security Access</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Seamlessly utilize biometric FaceID/fingerprint authentication, GPS geo-fencing, camera scanning, and encrypted local storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES GRID SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Full-Spectrum Development
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our Mobile Application Services
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              From native iOS and Android apps to cross-platform solutions and progressive web apps, we build software that drives real commercial success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent p-7 border ${srv.borderColor} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-lg`}
                >
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${srv.iconColor}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        {srv.platform}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs font-medium text-indigo-400/90 mt-1">
                        {srv.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {srv.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <Link
                      href={srv.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-0.5 duration-200"
                    >
                      <span>Consult With Developers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          NATIVE VS HYBRID COMPARISON SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Architectural Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Native vs. Hybrid & Cross-Platform
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Selecting the right technology stack depends on your budget, timeline, and functional hardware requirements. Here is how both paradigms compare:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Native Card */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-blue-950/20 via-white/[0.03] to-transparent border border-blue-500/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
                  <Cpu className="w-3.5 h-3.5" /> Native Applications (Swift / Kotlin)
                </div>
                <h3 className="text-2xl font-bold text-white">Maximum Performance & Hardware Control</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Engineered specifically for iOS using Swift or Android using Kotlin. Directly communicates with device OS layers and underlying hardware without intermediary bridges.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Peak Raw Speed:</strong> Optimal for 3D rendering, complex math, and heavy media.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Full Hardware Access:</strong> Immediate day-1 support for all new iOS/Android OS features.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>True OS UX:</strong> 100% adherence to platform-native interaction patterns.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Best Suited For:</strong> FinTech banking, AR/VR, intensive gaming, and hardware pairing.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 text-center">
                Requires separate codebases for iOS & Android. Ideal when performance is the #1 priority.
              </div>
            </div>

            {/* Hybrid / Cross-Platform Card */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-purple-950/20 via-white/[0.03] to-transparent border border-purple-500/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
                  <Layers className="w-3.5 h-3.5" /> Cross-Platform (Flutter / React Native)
                </div>
                <h3 className="text-2xl font-bold text-white">Unified Codebase & Rapid Launch Speed</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Build once and run simultaneously across both iOS and Android. Reusable components and business logic drastically reduce development timelines and long-term maintenance costs.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>40% Cost Reduction:</strong> Single engineering team manages both platforms.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Near-Native Performance:</strong> Compiles to native ARM binaries with 60fps animations.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Faster Iteration:</strong> Hot-reload speeds up QA testing, feature rollouts, and bug patches.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Best Suited For:</strong> Ecommerce apps, SaaS portals, social platforms, and startup MVPs.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 text-center">
                One codebase for both App Store and Google Play. Ideal for fast time-to-market.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DEVELOPMENT PROCESS SECTION (5 STEPS)
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Engineering Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our 5-Stage Development Process
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              From concept discovery to App Store approval, our structured agile workflow guarantees transparency, code quality, and timely milestone delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processStages.map((stage, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-indigo-500/30 group-hover:text-indigo-400 font-mono transition-colors">
                    {stage.step}
                  </div>
                  <h3 className="text-base font-bold text-white mt-3 mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Engineering Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Partner with Digital Nawab for Apps
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              We combine enterprise coding standards with modern UI aesthetics so your application performs reliably at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-white/20 transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Clarifications & FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Got questions about mobile app development, costs, or App Store publishing? Here are clear answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CONVERSION CTA SECTION
      ========================================================= */}
      <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            <Rocket className="w-3.5 h-3.5" /> Ready to Launch Your Application?
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Have an App Idea? Let's Turn It into a Scalable Reality.
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Schedule a free technical architecture consultation with our senior mobile developers. We'll assess your feature roadmap, evaluate Native vs Cross-Platform options, and provide a clear milestone estimate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <ContactPopup
              buttonText="Schedule Technical Consultation"
              buttonClassName="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold hover:opacity-95 transition-all shadow-xl shadow-indigo-500/25 cursor-pointer text-base"
            />
            <Link
              href="/packages"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition-all text-base"
            >
              Explore Pricing Packages
            </Link>
          </div>

          {/* Related Links */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-400">
            <span className="text-gray-500 uppercase tracking-wider font-semibold">Related Services:</span>
            <Link href="/service/ecommerce-marketing" className="hover:text-indigo-300 transition">
              Ecommerce Marketing
            </Link>
            <Link href="/service/website-design-and-development" className="hover:text-indigo-300 transition">
              Website Development
            </Link>
            <Link href="/service/graphic-designing-services" className="hover:text-indigo-300 transition">
              Graphic & UI Design
            </Link>
            <Link href="/packages" className="hover:text-indigo-300 transition">
              Service Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
