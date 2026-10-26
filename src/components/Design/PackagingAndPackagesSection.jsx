"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Check,
  Star,
  Zap,
  Building,
  Palette,
  Users,
  Shield,
  ArrowRight,
  TrendingUp,
  Layers,
  Box,
  Eye,
  CheckCircle2,
  FileText,
  BadgeCheck,
  PhoneCall,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const PackagingAndPackagesSection = () => {
  // Active category tab for packages
  // options: 'all' | 'logo' | 'social' | 'corporate' | 'collateral'
  const [activeCategory, setActiveCategory] = useState("all");
  // Currency toggle: 'inr' | 'usd'
  const [currency, setCurrency] = useState("inr");

  // Process Steps Data
  const processSteps = [
    {
      step: "01",
      title: "Research & Analysis",
      desc: "Market insights, competitor positioning, and deep consumer behavior analysis.",
      accent: "from-blue-500 to-cyan-500",
      tag: "Discovery",
    },
    {
      step: "02",
      title: "Strategy Development",
      desc: "Brand positioning, structural packaging mapping, and target audience alignment.",
      accent: "from-indigo-500 to-purple-500",
      tag: "Architecture",
    },
    {
      step: "03",
      title: "Creative Execution",
      desc: "High-fidelity 3D renders, digital packaging concepts, and print-ready finishes.",
      accent: "from-purple-500 to-pink-500",
      tag: "Creation",
    },
    {
      step: "04",
      title: "Performance Tracking",
      desc: "Shelf-to-feed analytics, unboxing virality monitoring, and continuous iteration.",
      accent: "from-emerald-500 to-teal-500",
      tag: "Scale",
    },
  ];

  // Key Value Props
  const valueProps = [
    {
      icon: Eye,
      title: "Strategic Brand Positioning",
      desc: "Visual storytelling engineered to captivate shoppers and command market authority.",
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      borderColor: "border-indigo-500/30",
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Consumer Psychology",
      desc: "Color psychology and structural ergonomics calibrated to drive impulse & retention.",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Box,
      title: "Instagram & TikTok-Ready Packaging",
      desc: "Photogenic unboxing designs engineered to spark user-generated organic viral buzz.",
      gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
      borderColor: "border-pink-500/30",
    },
    {
      icon: Layers,
      title: "Cross-Platform Shelf-to-Screen Synergy",
      desc: "Flawless design consistency transitioning seamlessly from retail shelves to digital ad feeds.",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30",
    },
  ];

  // 1. Logo & Identity Packages
  const logoPackages = [
    {
      id: "logo-starter",
      name: "Logo Starter",
      icon: "💼",
      badge: "Fast Launch",
      price: { inr: "₹5,000", usd: "$65" },
      popular: false,
      specs: [
        { label: "Logo Concepts", value: "2 Concepts" },
        { label: "Revisions", value: "2 Rounds" },
        { label: "Deliverables", value: "PNG, JPEG" },
        { label: "Extras", value: "High-Res Export" },
      ],
      description: "Ideal for startups needing a quick, professional brand mark.",
    },
    {
      id: "brand-essentials",
      name: "Brand Essentials",
      icon: "🌍",
      badge: "Most Popular",
      price: { inr: "₹12,000", usd: "$150" },
      popular: true,
      specs: [
        { label: "Logo Concepts", value: "4 Concepts" },
        { label: "Revisions", value: "4 Rounds" },
        { label: "Deliverables", value: "PNG, SVG, Source Files" },
        { label: "Extras", value: "Icon + Favicon Pack" },
      ],
      description: "Complete identity foundation for growing businesses.",
    },
    {
      id: "identity-pro",
      name: "Identity Pro",
      icon: "📚",
      badge: "Enterprise Grade",
      price: { inr: "₹20,000+", usd: "$250+" },
      popular: false,
      specs: [
        { label: "Logo Concepts", value: "6+ Custom Concepts" },
        { label: "Revisions", value: "Unlimited (within scope)" },
        { label: "Deliverables", value: "Full Kit (AI, PSD, Fonts, Vector)" },
        { label: "Extras", value: "Brand Guidelines PDF" },
      ],
      description: "End-to-end bespoke brand identity with comprehensive rulebook.",
    },
  ];

  // 2. Social Media Kit Packages
  const socialPackages = [
    {
      id: "social-basic",
      name: "Social Basic",
      icon: "📱",
      badge: "Starter",
      price: { inr: "₹3,500", usd: "$45" },
      popular: false,
      specs: [
        { label: "Platforms", value: "Instagram + Facebook" },
        { label: "Designs", value: "8 Custom Posts" },
        { label: "Templates", value: "Static High-Res" },
        { label: "Extras", value: "Hashtag Guidance" },
      ],
      description: "Consistent visual presence for new social profiles.",
    },
    {
      id: "pro-social-kit",
      name: "Pro Social Kit",
      icon: "🌐",
      badge: "Recommended",
      price: { inr: "₹7,000", usd: "$90" },
      popular: true,
      specs: [
        { label: "Platforms", value: "+ LinkedIn & YouTube" },
        { label: "Designs", value: "15 Posts + 5 Stories" },
        { label: "Templates", value: "Static + Multi-slide Carousel" },
        { label: "Extras", value: "Highlight Covers + Banners" },
      ],
      description: "High-engagement social assets built to convert scrollers into followers.",
    },
    {
      id: "influencer-ready",
      name: "Influencer Ready",
      icon: "🤝",
      badge: "Omnichannel",
      price: { inr: "₹12,000+", usd: "$150+" },
      popular: false,
      specs: [
        { label: "Platforms", value: "+ Twitter, Custom Formats" },
        { label: "Designs", value: "20+ Posts, Stories, Covers" },
        { label: "Templates", value: "Static + Motion Graphics" },
        { label: "Extras", value: "Video Intros & Animated Assets" },
      ],
      description: "All-in-one content powerhouse with motion graphics for maximum reach.",
    },
  ];

  // 3. Corporate Branding Kit Packages
  const corporatePackages = [
    {
      id: "corp-mini",
      name: "Mini Kit",
      icon: "🎓",
      badge: "Essential",
      price: { inr: "₹7,500", usd: "$95" },
      popular: false,
      specs: [
        { label: "Includes", value: "Logo + Business Card" },
        { label: "Design Format", value: "Print Ready CMYK" },
        { label: "Revisions", value: "3 Rounds" },
        { label: "Extras", value: "Digital PDF Card" },
      ],
      description: "Essential corporate stationery for consultants and founders.",
    },
    {
      id: "business-pro",
      name: "Business Pro",
      icon: "💼",
      badge: "Best Seller",
      price: { inr: "₹15,000", usd: "$185" },
      popular: true,
      specs: [
        { label: "Includes", value: "Logo, Card, Letterhead, Envelope" },
        { label: "Design Format", value: "Editable Vector Source" },
        { label: "Deliverables", value: "Print & Digital Suites" },
        { label: "Extras", value: "Staff ID Card Template" },
      ],
      description: "Comprehensive corporate identity pack for established companies.",
    },
    {
      id: "enterprise-pack",
      name: "Enterprise Brand Pack",
      icon: "🏢",
      badge: "Complete Suite",
      price: { inr: "₹30,000+", usd: "$375+" },
      popular: false,
      specs: [
        { label: "Includes", value: "Full Kit + Slide Deck & Email Signature" },
        { label: "Design Format", value: "All Major Formats (AI, PSD, PDF)" },
        { label: "Deliverables", value: "Pitch Deck + Corporate Deck" },
        { label: "Extras", value: "Signage & Merch Mockups" },
      ],
      description: "Full-scale corporate identity and investor presentation suite.",
    },
  ];

  // 4. Marketing Collateral Data
  const marketingCollateral = [
    {
      type: "Brochure & Catalog Design",
      tag: "Multi-page",
      price: { inr: "₹6,000", usd: "$75" },
      icon: "📖",
      turnaround: "3-4 Days",
      popular: true,
    },
    {
      type: "Business Card",
      tag: "Stationery",
      price: { inr: "₹1,500", usd: "$20" },
      icon: "💳",
      turnaround: "24 Hours",
      popular: false,
    },
    {
      type: "Poster / Flyer",
      tag: "Marketing",
      price: { inr: "₹2,500", usd: "$30" },
      icon: "🎨",
      turnaround: "1-2 Days",
      popular: false,
    },
    {
      type: "Roll-up Standee",
      tag: "Exhibition",
      price: { inr: "₹4,500", usd: "$55" },
      icon: "🎪",
      turnaround: "2 Days",
      popular: false,
    },
    {
      type: "Pitch Deck / PPT",
      tag: "Investor",
      price: { inr: "₹7,000+", usd: "$85+" },
      icon: "📊",
      turnaround: "3-5 Days",
      popular: true,
    },
    {
      type: "Packaging Box / Label",
      tag: "Packaging",
      price: { inr: "₹8,500+", usd: "$105+" },
      icon: "📦",
      turnaround: "3-5 Days",
      popular: true,
    },
  ];

  // Reusable Package Card Component with ultra-premium dark glassmorphism
  const RenderPackageCard = ({ pkg, categoryName }) => {
    return (
      <div
        className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-500 backdrop-blur-xl ${
          pkg.popular
            ? "bg-gradient-to-b from-indigo-950/70 via-purple-950/50 to-slate-950/90 border-2 border-indigo-500/70 shadow-2xl shadow-indigo-500/20 scale-[1.02]"
            : "bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-purple-500/10"
        }`}
      >
        {/* Glow ambient background for popular card */}
        {pkg.popular && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        )}

        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="text-3xl p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-inner">
              {pkg.icon}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                pkg.popular
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md shadow-pink-500/30"
                  : "bg-white/10 text-gray-300 border border-white/10"
              }`}
            >
              {pkg.popular && <Star className="w-3 h-3 fill-current" />}
              {pkg.badge}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 group-hover:bg-clip-text transition-colors">
            {pkg.name}
          </h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[40px]">
            {pkg.description}
          </p>

          {/* Pricing Display */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 backdrop-blur-md">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200">
                {currency === "inr" ? pkg.price.inr : pkg.price.usd}
              </span>
              <span className="text-gray-400 text-xs">
                / {currency === "inr" ? `approx. ${pkg.price.usd}` : `approx. ${pkg.price.inr}`}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-medium">
              Transparent Pricing • All Rights Transferred
            </p>
          </div>

          {/* Feature Specs */}
          <div className="space-y-3.5 mb-8">
            {pkg.specs.map((spec, sIdx) => (
              <div
                key={sIdx}
                className="flex items-start justify-between gap-3 text-sm border-b border-white/5 pb-2.5 last:border-0"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium">{spec.label}</span>
                </div>
                <span className="text-white font-semibold text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div>
          <ContactPopup
            buttonText={`Choose ${pkg.name}`}
            buttonClassName={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              pkg.popular
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30 hover:scale-[1.01]"
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-[#070211] text-white overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-600/15 via-rose-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* ========================================================================= */}
        {/* PART 1: PACKAGE DESIGNING REDEFINED (HERO & PHILOSOPHY)                   */}
        {/* ========================================================================= */}
        <section id="packaging-design-overview" className="mb-24 lg:mb-32">
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-lg shadow-purple-500/10">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-pink-200 uppercase">
                Packaging Design Services in Lucknow
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Strategic Packaging Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                Services
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
              Where consumer psychology meets innovative structural packaging design to create retail and D2C brands that{" "}
              <span className="text-white font-medium underline decoration-indigo-400 decoration-2 underline-offset-4">
                captivate, convert, and dominate
              </span>{" "}
              supermarket shelves and e-commerce feeds.
            </p>
          </div>

          {/* Two-Column Deep-Dive */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
            {/* Left Column: What is Package Designing */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                  <Palette className="w-4 h-4" />
                  The Strategic Creative Edge
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
                  Why Invest in Professional{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Packaging Design Services?
                  </span>
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Packaging design is your product&apos;s most influential silent salesperson. At Digital Nawab, our packaging design services in Lucknow go far beyond surface graphics. We engineer a{" "}
                  <strong className="text-white font-semibold">
                    strategic fusion of consumer psychology, brand storytelling, and shelf ergonomics
                  </strong>{" "}
                  that commands instant shopper trust and accelerates retail velocity.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  From custom box packaging and product label design to photogenic unboxing aesthetics engineered for social media virality, our design solutions ensure your products stand out on competitive retail shelves and digital marketplaces like Amazon and Blinkit alike.
                </p>
              </div>

              {/* 4 Interactive Feature Pillars */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {valueProps.map((prop, idx) => {
                  const Icon = prop.icon;
                  return (
                    <div
                      key={idx}
                      className={`group relative p-5 rounded-2xl bg-gradient-to-br ${prop.gradient} border ${prop.borderColor} backdrop-blur-md hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-1.5">
                        {prop.title}
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {prop.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual Mockup Showcase with Interactive Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse" />

                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl p-3 shadow-2xl">
                  <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden">
                    <img
                      src="/assets/images/services/service-packaging.jpg"
                      alt="Strategic Packaging Design by Digital Nawab"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Card Internal Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/80 backdrop-blur-md text-white text-xs font-semibold mb-1">
                        Physical + Digital Synergy
                      </div>
                      <h4 className="text-white text-xl font-bold">
                        Strategic Design Process
                      </h4>
                      <p className="text-gray-300 text-xs">
                        Data-driven creative solutions engineered to convert
                      </p>
                    </div>
                  </div>

                  {/* Dual Grid Supporting Images */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="relative h-28 rounded-xl overflow-hidden border border-white/10 group">
                      <img
                        src="/assets/images/services/service-logo-identity.jpg"
                        alt="Brand Strategy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                        <span className="text-xs font-semibold text-white">
                          Brand Strategy
                        </span>
                      </div>
                    </div>

                    <div className="relative h-28 rounded-xl overflow-hidden border border-white/10 group">
                      <img
                        src="/assets/images/services/service-social-creatives.jpg"
                        alt="Creative Design"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                        <span className="text-xs font-semibold text-white">
                          Creative Design
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Pills for Social Proof */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 px-4 py-2.5 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white text-xs">
                    98%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Shelf Recall Rate
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Verified Client Growth
                    </div>
                  </div>
                </div>

                <div className="absolute -top-5 -right-3 sm:-right-5 px-4 py-2.5 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                    340%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Viral Unboxing Buzz
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Instagram & Reels Reach
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Strategic Design Process Roadmap */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2 block">
                Workflow Precision
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Our Proven Packaging Design Process
              </h3>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2">
                A seamless 4-stage engineering roadmap designed to translate
                ideas into market-dominating physical packaging and high-converting retail displays.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Step Number with glowing gradient */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${step.accent}`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                      {step.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-indigo-400 font-medium group-hover:gap-2.5 transition-all">
                    <span>Explore Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRANSITION DIVIDER: "DISCOVER OUR ADVANTAGES"                              */}
        {/* ========================================================================= */}
        <div className="relative my-20 lg:my-28 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#0d0620] border border-purple-500/30 shadow-xl shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-indigo-200">
              Discover Our Advantages
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: BRANDING & GRAPHIC DESIGN PACKAGES (PRICING & TIERS)              */}
        {/* ========================================================================= */}
        <section id="graphic-packages" className="relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" />
              Transparent & Scalable Pricing
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Branding & Graphic Design Packages in Lucknow
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Transparent, scalable graphic design packages tailored for ambitious startups, local businesses, and established enterprises across Lucknow and India.
            </p>
          </div>

          {/* Interactive Controls: Category Tabs & Currency Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-14 p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: "All Packages", icon: Sparkles },
                { id: "logo", label: "Logo & Identity", icon: Palette },
                { id: "social", label: "Social Media Kit", icon: Users },
                { id: "corporate", label: "Corporate Branding", icon: Building },
                { id: "collateral", label: "Marketing Collateral", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-[1.02]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Currency Selector Toggle */}
            <div className="flex items-center gap-2 self-center md:self-auto bg-black/50 p-1 rounded-xl border border-white/10">
              <span className="text-[11px] uppercase font-bold text-gray-400 px-2">
                Currency:
              </span>
              <button
                onClick={() => setCurrency("inr")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "inr"
                    ? "bg-indigo-500 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "usd"
                    ? "bg-indigo-500 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* PACKAGE TIERS RENDERED ACCORDING TO ACTIVE TAB */}

          {/* 1. LOGO & IDENTITY DESIGN */}
          {(activeCategory === "all" || activeCategory === "logo") && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    1. Logo & Identity Design
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Strategic symbol crafting and visual identity foundations.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-7">
                {logoPackages.map((pkg) => (
                  <RenderPackageCard
                    key={pkg.id}
                    pkg={pkg}
                    categoryName="Logo Design"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 2. SOCIAL MEDIA KIT DESIGN */}
          {(activeCategory === "all" || activeCategory === "social") && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    2. Social Media Kit Design
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Feed aesthetics, stories, and viral motion graphics built for engagement.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-7">
                {socialPackages.map((pkg) => (
                  <RenderPackageCard
                    key={pkg.id}
                    pkg={pkg}
                    categoryName="Social Media Kit"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. CORPORATE BRANDING KIT */}
          {(activeCategory === "all" || activeCategory === "corporate") && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    3. Corporate Branding Kit
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Executive stationery, pitch slide decks, and corporate presentation suites.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-7">
                {corporatePackages.map((pkg) => (
                  <RenderPackageCard
                    key={pkg.id}
                    pkg={pkg}
                    categoryName="Corporate Branding"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. MARKETING COLLATERAL DESIGN */}
          {(activeCategory === "all" || activeCategory === "collateral") && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    4. Brochure Design Services & Marketing Collateral
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    A la carte high-impact print & digital promotional collateral, corporate brochures, and catalogs.
                  </p>
                </div>
              </div>

              {/* Collateral Grid Card */}
              <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      Starting Prices & Deliverables
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Transparent flat-rate starting fees for single asset commissions.
                    </p>
                  </div>
                  <ContactPopup
                    buttonText="Request a Design Quote"
                    buttonClassName="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
                  />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketingCollateral.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                          {item.icon}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                            {item.type}
                          </div>
                          <div className="text-[11px] text-gray-400 flex items-center gap-2">
                            <span>Turnaround: {item.turnaround}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="font-extrabold text-emerald-400 text-base">
                          {currency === "inr" ? item.price.inr : item.price.usd}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {currency === "inr" ? item.price.usd : item.price.inr}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TRUST & GUARANTEES STRIP                                                  */}
          {/* ========================================================================= */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-950/40 border border-white/10 backdrop-blur-xl mb-16">
            <div className="flex items-center gap-3 p-2">
              <BadgeCheck className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">100% IP Transfer</div>
                <div className="text-gray-400 text-xs">Full commercial ownership</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Zap className="w-6 h-6 text-pink-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Rapid Turnaround</div>
                <div className="text-gray-400 text-xs">First concepts in 48-72h</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Print-Ready Spec</div>
                <div className="text-gray-400 text-xs">Pre-flight checked files</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <PhoneCall className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Art Director Call</div>
                <div className="text-gray-400 text-xs">1-on-1 strategic review</div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MASTER CALL TO ACTION BANNER                                              */}
          {/* ========================================================================= */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-white/20 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Let's Build An Iconic Brand Together
              </span>

              <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Ready to Captivate Your Market with Strategic Graphic Design?
              </h3>

              <p className="text-gray-200 text-base sm:text-lg max-w-2xl mx-auto font-light">
                Whether you need high-impact advertising creatives, packaging design services, or a comprehensive graphic design package in Lucknow, our senior design team is ready to elevate your brand.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <ContactPopup
                  buttonText="Get Free Consultation"
                  buttonClassName="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-indigo-900 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                />
                <a
                  href="tel:+919369996767"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-base transition-all duration-300 text-center"
                >
                  Call +91 93699 96767
                </a>
              </div>

              <p className="text-xs text-indigo-200/80 pt-2">
                ⚡ Free 30-min brand audit • Non-disclosure agreement protected • 100% custom designs
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PackagingAndPackagesSection;
