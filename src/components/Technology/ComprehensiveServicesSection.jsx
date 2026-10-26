"use client";

import React, { useState } from "react";
import {
  Globe,
  ShoppingCart,
  Database,
  Layers,
  Smartphone,
  Palette,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const servicesList = [
  {
    id: "corporate",
    icon: Globe,
    title: "Corporate Websites",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50/80",
    borderColor: "hover:border-blue-400",
    shadowColor: "hover:shadow-blue-500/10",
    description:
      "High-impact corporate web architectures engineered for brand authority, investor confidence, and high-value B2B lead generation.",
    features: ["Custom Brand Architecture", "Executive Lead Funnels", "Multi-Office Directories"],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50/80",
    borderColor: "hover:border-emerald-400",
    shadowColor: "hover:shadow-emerald-500/10",
    description:
      "Robust online retail storefronts with seamless multi-currency checkouts, inventory synchronisation, and conversion-optimized sales funnels.",
    features: ["Secure Payment Gateways", "Inventory & Stock Sync", "Frictionless One-Click Checkout"],
  },
  {
    id: "wordpress",
    icon: Database,
    title: "WordPress Websites",
    color: "purple",
    gradient: "from-purple-500 to-indigo-500",
    bgLight: "bg-purple-50/80",
    borderColor: "hover:border-purple-400",
    shadowColor: "hover:shadow-purple-500/10",
    description:
      "Bespoke WordPress theme and plugin development offering extreme speed, effortless non-technical content editing, and strong security.",
    features: ["Custom Theme Engineering", "Gutenberg / Elementor Setup", "Automated Security Hardening"],
  },
  {
    id: "cms",
    icon: Layers,
    title: "CMS Development",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50/80",
    borderColor: "hover:border-amber-400",
    shadowColor: "hover:shadow-amber-500/10",
    description:
      "Headless and tailored CMS platforms (Strapi, Sanity, custom admin panels) allowing omnichannel content distribution across any digital touchpoint.",
    features: ["API-First Headless Architecture", "Custom Admin Dashboards", "Granular Role & Permissions"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50/80",
    borderColor: "hover:border-pink-400",
    shadowColor: "hover:shadow-pink-500/10",
    description:
      "High-performance native and cross-platform mobile apps for iOS and Android built with React Native and Flutter with offline capabilities.",
    features: ["iOS & Android Deployments", "Real-Time Push Notifications", "Fluid Native Touch Ergonomics"],
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    color: "indigo",
    gradient: "from-indigo-500 to-violet-500",
    bgLight: "bg-indigo-50/80",
    borderColor: "hover:border-indigo-400",
    shadowColor: "hover:shadow-indigo-500/10",
    description:
      "User-centric interface design backed by behavioral research, interactive Figma wireframes, design token systems, and accessible WCAG principles.",
    features: ["Interactive Clickable Prototypes", "Scalable Design Systems", "Conversion-Focused Ergonomics"],
  },
  {
    id: "graphics",
    icon: Target,
    title: "Graphics Design",
    color: "red",
    gradient: "from-rose-500 to-red-500",
    bgLight: "bg-rose-50/80",
    borderColor: "hover:border-rose-400",
    shadowColor: "hover:shadow-rose-500/10",
    description:
      "Memorable visual identities, logos, brand guidelines, social media assets, and digital marketing creatives that make your brand stand apart.",
    features: ["Iconic Brand Marks & Logos", "Social Media Creative Kits", "Marketing & Pitch Collateral"],
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
    bgLight: "bg-cyan-50/80",
    borderColor: "hover:border-cyan-400",
    shadowColor: "hover:shadow-cyan-500/10",
    description:
      "Data-driven SEO, Google Ads PPC campaigns, social media marketing, and conversion optimization strategies delivering measurable revenue growth.",
    features: ["Search Engine Optimization", "High-ROI Google & Meta Ads", "Monthly Growth Analytics"],
  },
];

export default function ComprehensiveServicesSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="comprehensive-services"
      className="relative py-14 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden text-slate-900"
    >
      {/* Background Ambient Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/80 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Full-Spectrum Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Our Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-3xl mx-auto">
            From corporate websites, e-commerce solutions, WordPress websites, ecommerce websites, software development, CMS website development, mobile app development, UI/UX design & development, graphics design, digital marketing, social media marketing and custom web applications, we offer a wide range of services to meet your business needs.
          </p>

          {/* Callout Action Pill */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-blue-200 shadow-md shadow-blue-500/5 hover:shadow-lg transition-all">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-pulse" />
            <span className="text-sm sm:text-base font-semibold text-slate-800">
              Contact us today to transform your digital vision into reality!
            </span>
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-16">
          {servicesList.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-3xl bg-white border border-slate-200/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${service.borderColor} ${service.shadowColor} flex flex-col justify-between`}
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
                      Service
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6 pt-2 border-t border-slate-100">
                    {service.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <ContactPopup
                    buttonText={`Enquire ${service.title}`}
                    buttonClassName="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-700 hover:text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200 hover:border-transparent cursor-pointer shadow-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="rounded-3xl p-8 lg:p-10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 flex items-center justify-center md:justify-start gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Tailored Digital Solutions
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Multi-Service Package?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Combine custom website development, UI/UX design, e-commerce, and digital marketing into a single high-ROI roadmap.
            </p>
          </div>

          <div className="flex-shrink-0">
            <ContactPopup
              buttonText="Request Custom Project Plan"
              buttonClassName="cursor-pointer px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 font-bold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
