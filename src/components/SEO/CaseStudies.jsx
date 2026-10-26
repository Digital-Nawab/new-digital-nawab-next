"use client";
import React from "react";
import Image from "next/image";
import {
  TrendingUp,
  Search,
  Users,
  CheckCircle2,
  MapPin,
  PhoneCall,
  MousePointerClick,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const caseStudiesData = [
  {
    id: "healthcare",
    title: "Healthcare Website",
    category: "Technical SEO • Local SEO • Content",
    image: "/assets/images/seo/case-healthcare.jpg",
    alt: "Healthcare Clinic SEO Case Study in Lucknow",
    description:
      "A leading multi-speciality healthcare clinic in Lucknow achieved #1 Google positions for critical medical queries, booking high-trust patient appointments.",
    metrics: [
      {
        icon: TrendingUp,
        label: "Organic Traffic",
        value: "+ 200%",
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        icon: Search,
        label: "Keywords Ranked",
        value: "+ 120",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
      },
      {
        icon: Users,
        label: "Leads",
        value: "+ 150%",
        color: "text-cyan-600",
        bg: "bg-cyan-50",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "Ecommerce Store",
    category: "On-Page SEO • Product Optimization • Content",
    image: "/assets/images/seo/case-ecommerce.jpg",
    alt: "Fashion & Lifestyle Ecommerce SEO Case Study",
    description:
      "A fast-growing D2C lifestyle brand expanded non-branded search revenue exponentially with optimized collections, schema markup, and speed audits.",
    metrics: [
      {
        icon: TrendingUp,
        label: "Organic Traffic",
        value: "+ 180%",
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        icon: Search,
        label: "Keywords Ranked",
        value: "+ 95",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
      },
      {
        icon: ShoppingBag,
        label: "Revenue",
        value: "+ 120%",
        color: "text-cyan-600",
        bg: "bg-cyan-50",
      },
    ],
  },
  {
    id: "local-business",
    title: "Local Business",
    category: "Local SEO • GBP Optimization • Citations",
    image: "/assets/images/seo/case-local.jpg",
    alt: "Local Business Google Business Profile SEO Case Study",
    description:
      "A premium Lucknow dining and lounge brand dominated the local 3-pack Google Maps rankings across Gomti Nagar, Aliganj, and Hazratganj.",
    metrics: [
      {
        icon: MapPin,
        label: "Map Views",
        value: "+ 300%",
        color: "text-purple-600",
        bg: "bg-purple-50",
      },
      {
        icon: PhoneCall,
        label: "Calls",
        value: "+ 190%",
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        icon: MousePointerClick,
        label: "Website Clicks",
        value: "+ 160%",
        color: "text-cyan-600",
        bg: "bg-cyan-50",
      },
    ],
  },
];

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="relative bg-gradient-to-b from-white via-slate-50 to-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
    >
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header matching Screenshots 3 & 4 */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            CASE STUDIES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Real Results for Real Businesses
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal leading-relaxed">
            See how our SEO strategies have helped businesses improve visibility,
            traffic, and leads with verifiable growth.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Mockup Preview Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={study.image}
                  alt={study.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {study.title}
                  </h3>

                  {/* Subtitle Tags */}
                  <p className="text-xs text-slate-500 font-semibold tracking-wide mt-1 mb-4">
                    {study.category}
                  </p>

                  {/* 3-Box Metrics Row matching Screenshot 3 & 4 */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    {study.metrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center p-1"
                        >
                          <div
                            className={`w-7 h-7 rounded-lg ${metric.bg} flex items-center justify-center mb-1`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${metric.color}`} />
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">
                            {metric.label}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-extrabold ${metric.color} mt-0.5`}
                          >
                            {metric.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {study.description}
                  </p>
                </div>

                {/* Footer with Verified Result Pill */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 fill-blue-100" />
                    <span>Verified result</span>
                  </div>

                  <ContactPopup
                    buttonText="Get Similar Growth"
                    buttonClassName="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for audit */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Want to see how your website compares with your top competitors?
          </p>
          <a
            href="#audit-form"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>Claim Your Free Competitor SEO Audit</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
