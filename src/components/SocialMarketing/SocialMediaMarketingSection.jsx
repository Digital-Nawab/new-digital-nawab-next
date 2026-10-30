"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  Target,
  Zap,
  Globe,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ChevronRight
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const DigitalNawabSections = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const res = await fetch("/api/getsmmbenefit");
        const json = await res.json();

        if (json?.data) {
          // Filter out test dummy entries if any
          const validData = json.data.filter(
            (item) => !item.heading?.toLowerCase().includes("edittttt")
          );

          const formatted = (validData.length > 0 ? validData : json.data).map((item, idx) => {
            const parts = (item.description || "").split("\r\n\r\n");

            return {
              id: item.id || idx,
              number: String(idx + 1).padStart(2, "0"),
              title: item.heading,
              description: parts[0] || item.description || "",
              additionalText: parts[1] || "",
              badgeColor: [
                "text-purple-700 bg-purple-50 border-purple-200",
                "text-blue-700 bg-blue-50 border-blue-200",
                "text-rose-700 bg-rose-50 border-rose-200",
                "text-emerald-700 bg-emerald-50 border-emerald-200",
              ][idx % 4],
              accentColor: [
                "from-purple-600 to-indigo-600",
                "from-blue-600 to-cyan-600",
                "from-pink-600 to-rose-600",
                "from-emerald-600 to-teal-600",
              ][idx % 4],
              image: item.image?.startsWith("http")
                ? item.image
                : `https://dashboard.digitalnawab.com/${item.image}`,
            };
          });

          setBenefits(formatted);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-purple-50/25 text-gray-900 overflow-hidden font-sans"
      aria-label="Social Media Marketing Services and Benefits"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>✦ WHY SOCIAL MEDIA MARKETING MATTERS ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
            Benefits of Social Media {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
              Marketing for Your Business
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            
Social media marketing helps businesses connect with their target audience, build brand recognition, and create meaningful opportunities for growth. With the right content and strategy, your business can strengthen its online presence, drive relevant website traffic, and build lasting customer relationships.
          </p>
        </div>

        {/* Dynamic Benefits Grid (100% Admin API Data: /api/getsmmbenefit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id || index}
              className="group relative rounded-3xl p-7 sm:p-9 bg-white border border-gray-200/80 hover:border-purple-400/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${benefit.badgeColor}`}>
                    Benefit #{benefit.number}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Digital Nawab Growth
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors tracking-tight">
                  {benefit.title}
                </h3>

                {/* Dynamic Image from Admin */}
                {benefit.image && (
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Description 1 */}
                <p className="text-sm text-gray-600 leading-relaxed font-normal mb-3">
                  {benefit.description}
                </p>

                {/* Description 2 */}
                {benefit.additionalText && (
                  <p className="text-sm text-gray-500 leading-relaxed font-normal">
                    {benefit.additionalText}
                  </p>
                )}
              </div>

              {/* Bottom Card CTA */}
              <div className="pt-5 mt-6 border-t border-gray-100 flex items-center justify-between">
                <ContactPopup
                  buttonText="Scale With This Strategy →"
                  buttonClassName="text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer inline-flex items-center gap-1 group-hover:translate-x-1"
                  defaultSubject={`SMM Strategy Inquiry: ${benefit.title}`}
                />
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Strategy
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalNawabSections;