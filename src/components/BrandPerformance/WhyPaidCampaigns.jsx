"use client";
import React, { useState, useEffect } from "react";
import {
  Target,
  Users,
  Globe,
  Zap,
  DollarSign,
  HeadphonesIcon,
  Tag,
  Play,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const cardThemes = [
  {
    glow: "from-[#e0f2fe] via-[#f0f9ff]/50 to-transparent",
    iconBg: "bg-[#0284c7]",
    defaultIcon: Users,
    defaultEmoji: "👤",
  },
  {
    glow: "from-[#dcfce7] via-[#f0fdf4]/50 to-transparent",
    iconBg: "bg-[#059669]",
    defaultIcon: Globe,
    defaultEmoji: "🌐",
  },
  {
    glow: "from-[#fce7f3] via-[#fdf2f8]/50 to-transparent",
    iconBg: "bg-[#9333ea]",
    defaultIcon: Zap,
    defaultEmoji: "✨",
  },
  {
    glow: "from-[#ffedd5] via-[#fff7ed]/50 to-transparent",
    iconBg: "bg-[#ea580c]",
    defaultIcon: DollarSign,
    defaultEmoji: "💲",
  },
  {
    glow: "from-[#e0e7ff] via-[#eef2ff]/50 to-transparent",
    iconBg: "bg-[#4f46e5]",
    defaultIcon: HeadphonesIcon,
    defaultEmoji: "💁‍♀️",
  },
  {
    glow: "from-[#ccfbf1] via-[#f0fdfa]/50 to-transparent",
    iconBg: "bg-[#0d9488]",
    defaultIcon: Tag,
    defaultEmoji: "🏷️",
  },
];

const fallbackCampaigns = [
  {
    id: 4,
    heading: "Targeted Customers",
    description:
      "Analyze your audience's statistics across all of your digital channels to uncover key factors such as keywords, localities, demographics, job titles, interests, and popular subjects. All of this data is used to fine-tune your campaign targeting, bringing in high-intent leads and driving conversions.",
    icon: "👤",
  },
  {
    id: 5,
    heading: "Local or Global: You Choose",
    description:
      "Whether you are targeting customers locally in Lucknow or scaling across national and international markets, PPC allows pinpoint geographic targeting down to postal codes, radius radiuses, and specific language preferences.",
    icon: "🌐",
  },
  {
    id: 6,
    heading: "Speedy Results",
    description:
      "Paid advertising guarantees immediate reach. If your website does not yet appear on Google's first page organically, PPC allows your brand to appear for top keywords and capture buying traffic from day one.",
    icon: "✨",
  },
  {
    id: 7,
    heading: "You Control the Budget",
    description:
      "You have absolute control over your spend. Set daily limits, adjust keyword bids in real time, and determine whether your goals are cost-per-click (CPC) or cost-per-thousand-impressions (CPM).",
    icon: "💲",
  },
  {
    id: 8,
    heading: "Superb Campaign Support",
    description:
      "Our team provides ongoing strategic oversight, negative keyword pruning, and multi-channel campaign coordination so your brand stays consistent, relevant, and profitable over time.",
    icon: "💁‍♀️",
  },
  {
    id: 9,
    heading: "Measurable ROI & Tracking",
    description:
      "Track every impression, click, conversion, and rupee spent with complete transparency. Seamless integration with Google Analytics 4 ensures every advertising rupee is accountable.",
    icon: "🏷️",
  },
];

const WhyPaidCampaigns = () => {
  const [campaigns, setCampaigns] = useState(fallbackCampaigns);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(
          "https://dashboard.digitalnawab.com/api/googlecampaigns"
        );
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setCampaigns(json.data);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 overflow-hidden font-sans border-y border-slate-200/60">
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0f4ff] border border-blue-100 text-[#4338ca] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Target className="w-4 h-4 text-[#4338ca]" />
            <span>✦ CAMPAIGN ADVANTAGES ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-950">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Paid Campaigns?
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Paid advertising guarantees immediate high-intent reach, measurable ROI, and total budget control that organic marketing simply cannot deliver alone.
          </p>
        </div>

        {/* Introduction Content Box */}
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-12 shadow-[0_4px_20px_rgba(99,102,241,0.06)]">
          <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            <p>
              While search engine optimization (SEO) is invaluable for sustainable long-term authority, paid advertising delivers instant commercial visibility. Whether launching a new product, capturing peak festival demand, or beating aggressive competitors to top search rankings, paid search ensures your business is seen first.
            </p>
            <p>
              Paid advertising covers high-converting channels including Google Ads (Search, Display, Shopping, YouTube), Meta Ads (Facebook &amp; Instagram), and multi-channel programmatic networks tailored to target audiences ready to purchase.
            </p>
          </div>
        </div>

        {/* Benefits Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {campaigns.map((campaign, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const displayEmoji = campaign.icon || theme.defaultEmoji;

            return (
              <div
                key={campaign.id || index}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Colored Glow Gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${theme.glow} pointer-events-none rounded-t-2xl`}
                />

                <div className="relative z-10">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center text-xl text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className="leading-none select-none">{displayEmoji}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                    {campaign.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {campaign.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/90 rounded-3xl p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
              Ready to Launch Your High-ROI Campaign?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto mb-7 font-normal leading-relaxed">
              Start seeing high-intent leads with measurable paid advertising campaigns tailored to your specific profit margins.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <ContactPopup
                buttonText="Start Campaign Now →"
                buttonClassName="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-indigo-500/25 transform hover:scale-105 transition-all duration-200"
              />

              <ContactPopup
                buttonText="Schedule Free Audit"
                buttonClassName="cursor-pointer bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold px-7 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPaidCampaigns;
