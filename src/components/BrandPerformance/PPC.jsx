"use client";
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import {
  MousePointer,
  Search,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  DollarSign,
  Eye,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Monitor,
  Globe,
  Award,
  Play,
  Star,
} from "lucide-react";



const PPC = () => {
    const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(
          "/api/googlecampaigns"
        );
        const json = await res.json();
        if (json?.data) {
          setCampaigns(json.data);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Google Ads Services Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-white backdrop-blur-sm"></div>

        {/* Floating Elements */}
        <div className="absolute top-12 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-16 left-20 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-md hover:shadow-blue-500/10 transition-all duration-300 group">
            <MousePointer className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 text-blue-600" />
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Best PPC Services in Lucknow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-[1.15] tracking-tight">
            <span className="bg-gradient-to-r from-slate-950 via-blue-700 to-slate-950 bg-clip-text text-transparent">
              Google Ads
            </span>{" "}
            <span className="bg-gradient-to-r from-slate-950 via-blue-700 to-slate-950 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <div className="space-y-3.5 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed text-center font-normal">
            <p>
              The technique of marketing a business through paid adverts that
              display on search engine results pages is known as search engine
              marketing or PPC advertising. Advertisers bid on keywords that
              users of search engines like Google and Bing may input when
              seeking certain items or services, giving the advertiser the
              possibility for their adverts to show alongside the results for
              such search queries.
            </p>
            <p>
              These advertising, often known as pay-per-click advertisements,
              are available in several forms. Some are modest text-based
              advertising, and others, such as product listing advertising
              (PLAs, also known as Shopping advertising), are more visual,
              product-based promotions that allow users to see key
              information, such as pricing and reviews, at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* What is PPC - Enhanced Layout */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 md:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black"></div>
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-1000"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-indigo-500/30">
                  <Target className="w-4 h-4" />
                  Core Concept
                </div>

                <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    What is PPC
                  </span>
                  <br />
                  <span className="text-white/80 text-4xl md:text-5xl font-light">
                    (Pay Per Click)?
                  </span>
                </h2>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                  <p className="text-lg xl:text-xl text-gray-300 leading-relaxed pl-8">
                    PPC is an abbreviation for pay-per-click, an online
                    marketing technique in which advertisers pay a charge each
                    time one of their ads is clicked. It is essentially a method
                    of purchasing visitors to your website rather than
                    attempting to "earn" those views naturally.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <p className="text-lg xl:text-xl text-gray-300 leading-relaxed pl-8">
                    Search engine advertising one of the most popular kinds of
                    PPC. It enables marketers to bid for ad placement in a
                    search engine's sponsored links when a customer searches for
                    a term related to their company offering. For example, if we
                    bid on the term "PPC software," our ad may appear at the top
                    of the Google results page.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div className="space-y-8">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500">  
                  {/* Header */}
                  <Image
                    loading="lazy"
                    src="/assets/images/ppc.png"
                    width={600}
                    height={600}
                    className="rounded-2xl"
                    />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How PPC Works Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#070312] via-[#0d0722] to-black text-white">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#8b5cf6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating Ambient Glow Elements */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>✦ TRANSPARENT AUCTION MECHANISM ✦</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              How Does Pay-Per-Click{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Ads Work?
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Pay-Per-Click is a high-performance marketing model where businesses only incur a cost when an interested prospect actually clicks on their advertisement.
            </p>
          </div>

          {/* Structured 3-Part Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Step 1 */}
            <div className="relative rounded-3xl p-7 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                Commercial Search Intent
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                PPC ads trigger whenever individuals search online using Google or Bing for products and services with buying intent — from local &ldquo;near me&rdquo; searches to high-ticket B2B software solutions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl p-7 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                The Real-Time Auction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Google&rsquo;s automated Ad Auction assesses keyword bids, ad relevance, and landing page quality score in milliseconds to determine top placement on search result pages (SERPs).
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl p-7 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                Pay Only For Results
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                You never pay for empty impressions. You only pay when a customer clicks your ad to visit your landing page, giving you 100% control over customer acquisition costs.
              </p>
            </div>
          </div>

          {/* Highlight Callout Box */}
          <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-blue-950/50 via-purple-950/50 to-pink-950/50 border border-purple-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-medium">
                Businesses running pay-per-click advertising only pay when a prospective customer actively clicks, hence the name <span className="text-cyan-300 font-bold">&ldquo;Pay-Per-Click&rdquo;</span>.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-wide">
                100% Accountable ROI
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PPC;
