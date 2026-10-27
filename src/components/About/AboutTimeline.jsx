"use client";

import React from "react";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award,
  Rocket,
  Search,
  Megaphone,
} from "lucide-react";

const milestones = [
  {
    year: "2015",
    tag: "Inception & Local Foundations",
    icon: <Search className="w-4 h-4 text-pink-400" />,
    title: "Started with Local SEO & High-Intent Digital Solutions",
    desc: "Digital Nawab began its digital journey in 2015 as a performance-oriented local SEO agency in Lucknow. Our primary mission was helping regional enterprises build a robust, searchable online presence with transparent search ranking methods.",
    stats: "First 25+ Local Businesses Ranked #1",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    year: "2017",
    tag: "Scale & Content Innovation",
    icon: <TrendingUp className="w-4 h-4 text-purple-400" />,
    title: "Launched Full-Scale SEO & Content Marketing Operations",
    desc: "Expanded operations beyond local boundaries into national SEO, enterprise technical audits, and content marketing architectures. We established predictable client reporting and scalable search acquisition funnels.",
    stats: "Over 100+ Campaigns Successfully Managed",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  },
  {
    year: "2019",
    tag: "100+ Client Milestone",
    icon: <Award className="w-4 h-4 text-cyan-400" />,
    title: "100+ Retained Clients with Proven Multi-Industry ROI",
    desc: "Achieved the major landmark of serving over 100 long-term retained clients across ecommerce, education, healthcare, and retail sectors. Personalized analytics and continuous CRO optimization became our core trademark.",
    stats: "300% Average Traffic Increase for Clients",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    year: "2021",
    tag: "Paid Acquisition Era",
    icon: <Megaphone className="w-4 h-4 text-amber-400" />,
    title: "Introduced High-Conversion PPC & Paid Meta Advertising",
    desc: "Scaled our performance marketing division to manage high-volume Google Ads and Meta ad spends. We pioneered automated lead verification pipelines that slashed client cost-per-lead (CPL) by up to 40%.",
    stats: "Managed ₹5Cr+ in Paid Ad Spend",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80",
  },
  {
    year: "2023",
    tag: "Excellence & Recognition",
    icon: <Award className="w-4 h-4 text-pink-400" />,
    title: "Recognized Among Top Digital Marketing Agencies in North India",
    desc: "Honored for innovation in Google Ads management and omnichannel search dominance. Our client roster expanded to over 250 enterprise brands seeking dependable, high-yield digital returns.",
    stats: "95% Client Retention & Satisfaction",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    year: "2025+",
    tag: "Full-Stack Enterprise & AI",
    icon: <Rocket className="w-4 h-4 text-purple-400" />,
    title: "Next-Gen Web Architecture, AI Search & Omnichannel Dominance",
    desc: "Today, Digital Nawab builds future-proof digital ecosystems with lightning-fast Next.js engineering, AI-optimized search visibility (GEO/AEO), and comprehensive brand scale strategies across India and globally.",
    stats: "500+ Projects & Expanding Across Global Markets",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
];

const AboutTimeline = () => {
  return (
    <section className="relative w-full bg-[#05040a] border-t border-white/[0.06] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      {/* Background Radial Glows */}
      <div className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#8F5AFF]/15 to-transparent blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#C73673]/15 to-transparent blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Our Milestone</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            A Decade of Relentless Growth &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-[#FF6FD8]">
              Digital Triumphs
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            From our founding roots in 2015 to managing national multi-channel
            campaigns today, explore the key milestones that shaped Digital Nawab.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Central Vertical Glowing Line (visible on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C73673] via-[#8F5AFF] to-[#00F0FF] opacity-30 shadow-[0_0_15px_rgba(143,90,255,0.5)]" />

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-14 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card (Half width) */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className={`p-6 sm:p-8 rounded-3xl bg-[#0e0c18]/80 border border-white/[0.08] backdrop-blur-xl hover:border-purple-500/50 hover:bg-[#120f20]/90 transition-all duration-300 shadow-xl group relative overflow-hidden ${
                        isEven ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      {/* Top accent light on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Header tags inside card */}
                      <div
                        className={`flex flex-wrap items-center gap-2.5 mb-4 ${
                          isEven
                            ? "lg:justify-end justify-start"
                            : "justify-start"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C73673] to-[#8F5AFF] text-white font-mono font-bold text-xs tracking-wider shadow-md shadow-pink-500/20">
                          <Calendar className="w-3 h-3" />
                          <span>{item.year}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-gray-300">
                          {item.icon}
                          <span>{item.tag}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed font-light mb-5">
                        {item.desc}
                      </p>

                      {/* Stats badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300 ${
                          isEven ? "lg:flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Central Node Marker on Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0c0918] border-2 border-purple-500/60 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#C73673] to-[#8F5AFF] animate-pulse" />
                    </div>
                  </div>

                  {/* Image Card (Half width) */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0918] aspect-[16/10] group max-w-lg mx-auto shadow-2xl">
                      <img
                        src={item.image}
                        alt={`${item.year} - ${item.title}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05040a] via-transparent to-transparent opacity-60" />

                      {/* Year watermark */}
                      <div className="absolute bottom-4 right-4 text-4xl sm:text-5xl font-mono font-extrabold text-white/10 select-none pointer-events-none">
                        {item.year}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;