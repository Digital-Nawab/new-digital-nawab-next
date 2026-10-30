"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Search,
  Target,
  Globe,
  Zap,
  DollarSign,
  HeadphonesIcon,
  TestTube,
  BarChart3,
  MousePointer,
  TrendingUp,
  Settings,
  Sparkles,
  Users,
  ArrowRight,
  Monitor,
  Eye,
  Play,
  ShoppingBag,
  Mail,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const iconMap = {
  "fa-solid fa-cloud": Search,
  "fa-solid fa-tv": Monitor,
  "fa-solid fa-users": Users,
  "fa-solid fa-user": Users,
  "fa-solid fa-bullseye": Target,
  "fa-solid fa-chart-bar": BarChart3,
  "fa-solid fa-eye": Eye,
  "fa-solid fa-play": Play,
  "fa-solid fa-cog": Settings,
};

// Helper for dynamic contextual icon assignment if needed
const getCardIcon = (iconStr, heading) => {
  const h = (heading || "").toLowerCase();
  if (h.includes("shopping") || h.includes("product")) return ShoppingBag;
  if (h.includes("gmail") || h.includes("mail") || h.includes("email")) return Mail;
  if (h.includes("youtube") || h.includes("video")) return Play;
  if (h.includes("display") || h.includes("banner")) return Monitor;
  if (h.includes("social")) return Users;
  if (h.includes("search")) return Search;
  if (iconMap[iconStr]) return iconMap[iconStr];
  return Search;
};

// Distinct vibrant gradients for each service card
const cardStyles = [
  {
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.35)",
    tag: "High Search Intent",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.35)",
    tag: "Visual Brand Reach",
  },
  {
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.35)",
    tag: "Social Audience",
  },
  {
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.35)",
    tag: "Direct Product Sales",
  },
  {
    gradient: "from-red-500 to-rose-600",
    glow: "rgba(239, 68, 68, 0.35)",
    tag: "Direct Inbox Ads",
  },
  {
    gradient: "from-violet-600 to-indigo-600",
    glow: "rgba(124, 58, 237, 0.35)",
    tag: "Video & Streaming",
  },
];

const PPCServicesSection = () => {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const res = await fetch("/api/googleppc");
        const data = await res.json();
        console.log("Fetched PPC services data:", data);
        if (data?.data) {
          setAdsData(data.data);
        }
      } catch (err) {
        console.error("Error fetching PPC services:", err);
      }
    };
    fetchAdsData();
  }, []);

  return (
    <div className="relative bg-[#060210] text-white overflow-hidden">
      {/* Background Dots Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#8b5cf6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Services Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>✦ TAILORED AD FORMATS ✦</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
              Our Best{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                PPC Services
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
              When launching search engine marketing, choosing the right ad format is critical to driving
              high-quality traffic and qualified leads. Here are the specialized PPC ad formats we manage and scale for your business.
            </p>
          </div>

          {/* Dynamic Services Grid (100% Admin API Data) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {adsData.map((ad, index) => {
              const Icon = getCardIcon(ad.icon, ad.heading);
              const style = cardStyles[index % cardStyles.length];
              const formatNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={ad.id}
                  className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(139,92,246,0.22)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Glowing Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative">
                        <div
                          className="absolute -inset-2 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                          style={{ background: style.glow }}
                        />
                        <div
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-purple-300 transition-colors">
                          #{formatNumber}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                          {style.tag}
                        </span>
                      </div>
                    </div>

                    {/* Heading from API */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 tracking-tight">
                      {ad.heading}
                    </h3>

                    {/* Description from API */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                      {ad.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA & Status */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <ContactPopup
                      buttonText="Start Campaign →"
                      buttonClassName="text-xs sm:text-sm font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    />

                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Certified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Conversion CTA Card */}
          <div className="mt-16 sm:mt-20">
            <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-purple-950/60 via-[#160b33]/80 to-blue-950/60 border border-purple-500/30 backdrop-blur-xl text-center shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-200 text-xs sm:text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Ready to Scale Your PPC Results?</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Let Our Certified Experts Formulate Your Custom PPC Strategy
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Our specialists will analyze your industry, audit competitor ads, and recommend
                  the exact ad formats best suited for your business goals and customer acquisition targets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3">
                  <ContactPopup
                    buttonText="Get Free Consultation →"
                    buttonClassName="cursor-pointer bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-xl shadow-purple-500/25 transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                  />
                  <a
                    href="tel:+919335621987"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-3.5 rounded-full font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-purple-300" />
                    <span>Talk to Expert: +91 93356 21987</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PPCServicesSection;
