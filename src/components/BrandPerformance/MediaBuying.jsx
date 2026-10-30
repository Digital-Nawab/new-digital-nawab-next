"use client";
import React, { useState, useEffect } from "react";
import {
  Monitor,
  Smartphone,
  Play,
  Radio,
  CheckCircle2,
  Globe,
} from "lucide-react";

const fallbackChannels = [
  {
    id: 1,
    title: "Display Advertising",
    reach: "2.5B+ Users",
    description:
      "Premium ad placements across high-traffic websites and apps to maximize brand exposure and drive conversions.",
    platforms: [
      "Google Display Network",
      "Google Audience Network",
      "Premium Publishers",
    ],
    benefits: [
      "Brand Awareness",
      "Retargeting",
      "Visual Impact",
      "Programmatic Buying",
    ],
    icon: Monitor,
  },
  {
    id: 2,
    title: "Mobile Media",
    reach: "2.1B+ Users",
    description:
      "Native mobile advertising across apps and mobile web to reach users in their most engaged moments.",
    platforms: ["In-App Advertising", "Mobile Web", "App Install Campaigns"],
    benefits: [
      "Location Targeting",
      "High Engagement",
      "App Installs",
      "Mobile-First Design",
    ],
    icon: Smartphone,
  },
  {
    id: 3,
    title: "Video Advertising",
    reach: "2.0B+ Users",
    description:
      "Compelling video campaigns across YouTube, social platforms, and connected TV for maximum impact.",
    platforms: [
      "YouTube",
      "Facebook Video",
      "Connected TV",
      "Streaming Platforms",
    ],
    benefits: [
      "High Retention",
      "Brand Storytelling",
      "Viral Potential",
      "Cross-Platform",
    ],
    icon: Play,
  },
  {
    id: 4,
    title: "Audio & Podcast",
    reach: "2.5B+ Users",
    description:
      "Strategic audio placements on streaming platforms and podcasts to reach engaged audiences.",
    platforms: [
      "Spotify Ads",
      "Podcast Networks",
      "Audio Streaming",
      "Voice Assistants",
    ],
    benefits: [
      "Intimate Connection",
      "Contextual Relevance",
      "Growing Market",
      "Cost-Effective",
    ],
    icon: Radio,
    highlight: true,
  },
];

const getChannelIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("display")) return Monitor;
  if (t.includes("mobile")) return Smartphone;
  if (t.includes("video")) return Play;
  if (t.includes("audio") || t.includes("podcast")) return Radio;
  return Monitor;
};

const getChannelReach = (title = "", index) => {
  const t = title.toLowerCase();
  if (t.includes("mobile")) return "2.1B+ Users";
  if (t.includes("video")) return "2.0B+ Users";
  if (t.includes("audio") || t.includes("podcast")) return "2.5B+ Users";
  if (t.includes("display")) return "2.5B+ Users";
  const reaches = ["2.5B+ Users", "2.1B+ Users", "2.0B+ Users", "2.5B+ Users"];
  return reaches[index % reaches.length];
};

const MediaBuyingSection = ({ theme = "dark" }) => {
  const [mediaChannels, setMediaChannels] = useState(fallbackChannels);
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchMediaChannels = async () => {
      try {
        const res = await fetch(
          "/api/googlemedia"
        );
        const json = await res.json();
        if (json?.data?.length) {
          const mappedChannels = json.data.map((item, index) => ({
            id: item.id || index + 1,
            title: item.heading,
            description: item.description,
            reach: getChannelReach(item.heading, index),
            platforms: item.platform
              ? item.platform
                  .split(",")
                  .map((p) => p.trim())
                  .filter(Boolean)
              : fallbackChannels[index]?.platforms || [],
            benefits: item.benefit
              ? item.benefit
                  .split(/[\n,]+/)
                  .map((b) => b.trim())
                  .filter(Boolean)
              : fallbackChannels[index]?.benefits || [],
            icon: getChannelIcon(item.heading),
            highlight: index === 3 || item.heading?.toLowerCase().includes("audio"),
          }));
          setMediaChannels(mappedChannels);
        }
      } catch (err) {
        console.error("Error fetching google media channels:", err);
      }
    };

    fetchMediaChannels();
  }, []);

  return (
    <section
      className={`relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-[#060212] via-[#0c0620] to-[#04010a] text-white"
          : "bg-white text-gray-900 border-y border-slate-200/60"
      }`}
      aria-label="Strategic Media Buying Channels"
    >
      {/* Dark Ambient Elements */}
      {isDark && (
        <>
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#8b5cf6 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-14">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-sm ${
              isDark
                ? "bg-purple-500/10 border border-purple-500/30 text-purple-300"
                : "bg-[#f3e8ff] border border-purple-200/60 text-[#7c3aed]"
            }`}
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span>✦ STRATEGIC MEDIA BUYING ✦</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Strategic Media Buying for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Maximum Brand Impact
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal ${
              isDark ? "text-slate-300" : "text-gray-500"
            }`}
          >
            Leverage our expertise in programmatic advertising, premium publisher networks, and omnichannel media planning to reach your target audience with maximum precision and ROAS.
          </p>
        </div>

        {/* Section Subheading */}
        <div className="text-center mb-10">
          <h3
            className={`text-lg sm:text-xl font-bold tracking-tight ${
              isDark ? "text-slate-200" : "text-gray-900"
            }`}
          >
            Media Channels We Specialize In
          </h3>
        </div>

        {/* 4 Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {mediaChannels.map((channel, index) => {
            const Icon = channel.icon || Monitor;
            const isHighlighted = channel.highlight || index === 3;

            return (
              <div
                key={channel.id || index}
                className={`relative rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isDark
                    ? isHighlighted
                      ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border-2 border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:border-purple-400"
                      : "bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 shadow-xl"
                    : isHighlighted
                    ? "bg-white border-2 border-[#c084fc] shadow-[0_0_25px_rgba(192,132,252,0.22)] ring-1 ring-purple-300/40 hover:shadow-2xl"
                    : "bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl"
                }`}
              >
                <div>
                  {/* Header Row: Icon, Title, Reach Badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-purple-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-bold text-lg sm:text-xl tracking-tight ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {channel.title}
                        </h4>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                            isDark
                              ? "text-pink-300 bg-pink-500/15 border border-pink-500/30"
                              : "text-[#db2777] bg-[#fdf2f8] border border-pink-200/60"
                          }`}
                        >
                          {channel.reach}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm mb-5 leading-relaxed font-normal ${
                      isDark ? "text-slate-300" : "text-gray-500"
                    }`}
                  >
                    {channel.description}
                  </p>

                  {/* Platforms */}
                  <div className="mb-5">
                    <div
                      className={`text-xs font-bold mb-2.5 uppercase tracking-wider ${
                        isDark ? "text-slate-300" : "text-gray-900"
                      }`}
                    >
                      Target Platforms:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {channel.platforms.map((platform, pIndex) => (
                        <span
                          key={pIndex}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            isDark
                              ? "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className={`pt-4 border-t ${isDark ? "border-white/10" : "border-gray-100"}`}>
                  <div
                    className={`text-xs font-bold mb-2.5 uppercase tracking-wider ${
                      isDark ? "text-slate-300" : "text-gray-900"
                    }`}
                  >
                    Key Strategic Benefits:
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {channel.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span
                          className={`truncate font-medium ${
                            isDark ? "text-slate-300" : "text-gray-600"
                          }`}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaBuyingSection;
