"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Target,
  Cpu,
  FileText,
  MapPin,
  Link2,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Default comprehensive 8-step SEO process fallback
const DEFAULT_PROCESS_STEPS = [
  {
    id: 1,
    step: "01",
    heading: "SEO Audit & Competitor Analysis",
    description:
      "Identify technical SEO errors, indexing issues, content gaps, and competitor strategies through a comprehensive website audit to boost visibility.",
    iconComponent: Search,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-cyan-500/20",
  },
  {
    id: 2,
    step: "02",
    heading: "High-Intent Keyword Research",
    description:
      "Research commercial keywords, local search terms, customer intent, and competitor gaps to connect your services with high-value business opportunities.",
    iconComponent: Target,
    gradient: "from-indigo-500 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
  {
    id: 3,
    step: "03",
    heading: "Technical SEO & Speed Optimization",
    description:
      "Improve website crawlability, indexing, mobile usability, architecture, page speed, and Core Web Vitals for search engines and visitors.",
    iconComponent: Cpu,
    gradient: "from-cyan-500 to-teal-500",
    shadow: "shadow-teal-500/20",
  },
  {
    id: 4,
    step: "04",
    heading: "On-Page SEO & Content Optimization",
    description:
      "Optimize page titles, meta descriptions, headings, internal links, and authoritative helpful content matching exact search intent.",
    iconComponent: FileText,
    gradient: "from-sky-500 to-blue-500",
    shadow: "shadow-sky-500/20",
  },
  {
    id: 5,
    step: "05",
    heading: "Local SEO & Google Maps (GBP)",
    description:
      "Optimize Google Business Profile, local landing pages, business citations, and reviews to dominate Lucknow local searches.",
    iconComponent: MapPin,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    id: 6,
    step: "06",
    heading: "Quality Link Building & Digital PR",
    description:
      "Strengthen authority through relevant backlink opportunities, editorial outreach, digital PR, and genuine brand mentions.",
    iconComponent: Link2,
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
  },
  {
    id: 7,
    step: "07",
    heading: "SEO Analytics & Ranking Monitoring",
    description:
      "Monitor keyword visibility, organic clicks, impressions, indexing, and conversion trends with regular transparent performance reports.",
    iconComponent: BarChart3,
    gradient: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/20",
  },
  {
    id: 8,
    step: "08",
    heading: "SEO Conversion & Lead Optimization",
    description:
      "Refine landing pages, calls to action, user journeys, and contact forms using SEO data insights to maximize your enquiry ROI.",
    iconComponent: TrendingUp,
    gradient: "from-indigo-500 to-cyan-500",
    shadow: "shadow-indigo-500/20",
  },
];

const SeoService = () => {
  const [processList, setProcessList] = useState(DEFAULT_PROCESS_STEPS);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "/api/getseodigital"
        );
        const result = await response.json();
        if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
          // Merge API data with icons and stylish step numbering
          const mapped = result.data.map((item, index) => {
            const fallback = DEFAULT_PROCESS_STEPS[index] || DEFAULT_PROCESS_STEPS[0];
            return {
              id: item.id || index + 1,
              step: String(index + 1).padStart(2, "0"),
              heading: item.heading || fallback.heading,
              description: item.description || fallback.description,
              iconComponent: fallback.iconComponent,
              rawIcon: item.icon,
              gradient: fallback.gradient,
              shadow: fallback.shadow,
            };
          });
          setProcessList(mapped);
        }
      } catch (error) {
        console.error("Error fetching process services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#070b18] via-[#0d162f] to-[#070b18] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-b border-blue-950/60">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header matching Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c1938] border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR SEO PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            How We Grow Your Business Online
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-3 font-normal leading-relaxed">
            A proven and transparent SEO process designed to deliver real results,
            higher Google rankings, and sustainable revenue growth.
          </p>
        </div>

        {/* Process Cards Grid - Compact cards with proper icons as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {processList.map((item) => {
            const IconComponent = item.iconComponent;
            return (
              <div
                key={item.id}
                className="group relative bg-[#0f172a]/90 hover:bg-[#152342] border border-[#1e293b] hover:border-blue-500/50 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/50"
              >
                {/* Colored Icon Container matching Screenshot 2 */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300 mb-3`}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5 text-white" strokeWidth={2.2} />
                  ) : (
                    <span className="text-xl">{item.rawIcon || "🔍"}</span>
                  )}
                </div>

                {/* Step Number */}
                <span className="text-xs font-bold tracking-widest text-cyan-400/90 group-hover:text-cyan-300 transition-colors uppercase">
                  {item.step}
                </span>

                {/* Step Heading */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors mt-1.5 leading-snug">
                  {item.heading}
                </h3>

                {/* Compact Description */}
                <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-2 leading-relaxed transition-colors line-clamp-4">
                  {item.description}
                </p>

                {/* Subtle indicator bar on hover */}
                <div className="w-8 h-0.5 bg-blue-500/0 group-hover:bg-cyan-400/80 rounded-full mt-4 transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/50 via-[#0d1c3a] to-blue-950/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Ready to start your customized SEO campaign?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Get a comprehensive site audit and competitor roadmap tailored to your industry.
            </p>
          </div>
          <a
            href="#audit-form"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
          >
            <span>Request Free Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SeoService;
