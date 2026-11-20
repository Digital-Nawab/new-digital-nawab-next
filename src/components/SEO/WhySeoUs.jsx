"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Zap,
  Target,
  Search,
  BarChart3,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const WhySeoUs = () => {
  const [seoData, setSeoData] = useState({
    heading: "Grow Your Business with Strategic SEO Services",
    description:
      "<p>Looking for a reliable SEO company in Lucknow? Digital Nawab provides result-focused SEO services to help businesses improve Google visibility, attract relevant organic traffic, and generate more enquiries. Our approach combines technical SEO, search intent-based keyword research, on-page optimization, helpful content, and website user experience to strengthen your search presence. We focus on making your services easier to discover, your pages more useful, and your contact journey simpler. Whether you need local SEO or broader search engine optimization services, our strategy is tailored to your business goals and audience. Ready to grow your organic reach? Contact Digital Nawab to discuss your SEO strategy.</p>",
    image: "assets/images/seo/SEO-Consultation.webp",
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(
          "/api/getseohighlight"
        );
        const result = await response.json();
        if (result?.data && result.data.length > 0) {
          setSeoData((prev) => ({
            ...prev,
            ...result.data[0],
          }));
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };
    fetchSeoData();
  }, []);

  const imageUrl = seoData?.image
    ? seoData.image.startsWith("http")
      ? seoData.image
      : `https://dashboard.digitalnawab.com/${seoData.image}`
    : "https://dashboard.digitalnawab.com/assets/images/seo/SEO-Consultation.webp";

  const keyPillars = [
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: "High-Intent Keyword Dominance",
      desc: "Target commercial search queries that attract ready-to-buy customers.",
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      title: "Technical & Core Web Vitals",
      desc: "Lightning speed, mobile-first responsiveness, and clean indexable code.",
    },
    {
      icon: <Search className="w-5 h-5 text-amber-600" />,
      title: "Local Lucknow Map Dominance",
      desc: "Top 3-Pack Google Maps visibility across Gomti Nagar, Hazratganj & beyond.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
      title: "Measurable Revenue & ROI",
      desc: "Transparent tracking for phone calls, WhatsApp chats, and lead forms.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Image Section */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={seoData.heading || "SEO Consultation Graphic"}
              className="w-full h-auto max-w-lg lg:max-w-full object-contain"
              loading="eager"
            />
          </div>

          {/* Right Text Content Section */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs sm:text-sm font-semibold tracking-wide border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              LUCKNOW&apos;S PREMIER SEO AGENCY
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.18] tracking-tight">
              Grow Your Business with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Strategic SEO Services
              </span>
            </h2>

            {/* Description Text */}
            <div
              className="text-slate-600 text-base sm:text-lg leading-relaxed space-y-3 font-normal"
              dangerouslySetInnerHTML={{ __html: seoData.description }}
            />

            {/* 4 Strategic Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {keyPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ContactPopup
                buttonText="Discuss Your SEO Strategy"
                buttonClassName="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-base"
              />
              
              <a
                href="tel:+919936663337"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 !text-slate-900 hover:!text-blue-600 font-bold transition-all duration-300 border-2 border-slate-300 hover:border-blue-500 shadow-sm text-base group"
                style={{ color: "#0f172a" }}
              >
                <PhoneCall className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="!text-slate-900 group-hover:!text-blue-600 font-bold" style={{ color: "#0f172a" }}>
                  +91-9936663337
                </span>
              </a>
            </div>

            {/* Assurance Guarantee */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> No Lock-in Contracts
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> 100% White-Hat Practices
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Direct Senior Strategist Access
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySeoUs;
