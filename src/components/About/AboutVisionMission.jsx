"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Target,
  Rocket,
  Sparkles,
  CheckCircle2,
  Compass,
  Lightbulb,
} from "lucide-react";

const defaultVisionMission = {
  heading: "Our Vision & Mission: Driving Sustainable Digital Growth",
  para: "At Digital Nawab, our vision and mission guide how we help businesses strengthen their online presence, connect with relevant audiences, and pursue sustainable growth. As a digital marketing agency in Lucknow, we focus on combining creative thinking, search optimization, performance marketing, and user-focused digital solutions to support our clients' business objectives.",
  vision_heading: "Our Vision",
  vision_description:
    "To empower businesses with innovative digital marketing strategies that strengthen online visibility, build customer trust, and drive sustainable growth across digital ecosystems.",
  mission_heading: "Our Mission",
  mission_description:
    "To help businesses grow through SEO, Google Ads, social media marketing, and website development using data-driven strategies tailored specifically to their commercial goals.",
};

const visionPillars = [
  "Building transparent, long-term brand equity",
  "Pioneering AI-first search ranking methodologies",
  "Empowering local brands to achieve national scale",
];

const missionPillars = [
  "Obsessive focus on qualified leads & positive ROAS",
  "Tailored multi-channel strategies with zero fluff",
  "Rapid continuous optimization based on real metrics",
];

export default function AboutVisionMission() {
  const [data, setData] = useState(defaultVisionMission);
  const [loading, setLoading] = useState(false);

  // Fetch live Vision & Mission from API: https://dashboard.digitalnawab.com/api/getvision_mission
  useEffect(() => {
    let isMounted = true;
    const fetchVision = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://dashboard.digitalnawab.com/api/getvision_mission",
          { timeout: 7000 }
        );
        if (
          isMounted &&
          res.data?.data &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          setData(res.data.data[0]);
        }
      } catch (err) {
        console.warn("Using default Vision & Mission (API slow/offline):", err?.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVision();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative w-full bg-[#f8f9fc] border-y border-gray-200/90 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-gray-900 overflow-hidden">
      {/* Background Soft Glows & Texture */}
      <div className="pointer-events-none absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#C73673]/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#8F5AFF]/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200/80 text-purple-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#C73673]" />
            <span>Guiding Principles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mb-5 leading-tight tracking-tight">
            {data.heading}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            {data.para}
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Vision Card */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-pink-200/90 shadow-xl hover:shadow-2xl hover:border-pink-400 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            {/* Top accent light */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C73673] to-[#FF6FD8]" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C73673] to-[#FF1F6D] text-white flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C73673] px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200">
                  Future Horizon
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
                {data.vision_heading}
              </h3>

              <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed font-normal mb-8">
                {data.vision_description}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C73673] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C73673]" />
                <span>Strategic Vision Pillars</span>
              </div>
              {visionPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-purple-200/90 shadow-xl hover:shadow-2xl hover:border-purple-400 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            {/* Top accent light */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8F5AFF] to-[#00F0FF]" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8F5AFF] to-[#00F0FF] text-white flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
                  <Rocket className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200">
                  Daily Execution
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
                {data.mission_heading}
              </h3>

              <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed font-normal mb-8">
                {data.mission_description}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                <span>Actionable Mission Commitments</span>
              </div>
              {missionPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
