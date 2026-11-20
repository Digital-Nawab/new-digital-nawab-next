"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MousePointer,
  ExternalLink,
  ChevronRight,
  Zap,
  Globe,
  MessageCircle,
  Megaphone,
  Eye,
  PhoneCall,
  Share2
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const iconMap = {
  1: Megaphone,
  2: Globe,
  3: Layers,
  4: TrendingUp,
  5: MessageCircle,
};

const serviceHighlights = {
  1: ["High-CTR Video & Carousel Formats", "Custom Copywriting & Hook Testing", "Brand-Centric Creative Direction"],
  2: ["Laser-Targeted Landing Page Traffic", "Cost-Per-Click (CPC) Minimization", "UTM Tracking & Attribution Setup"],
  3: ["Dynamic Catalog Showcase", "Multi-Item Shopping Carousels", "Browse-to-Buy Cart Retargeting"],
  4: ["Authority & Page Verification", "Viral Reel & Content Distribution", "Long-Term Brand Loyalty Building"],
  5: ["Active Comment & Lead Management", "Follower Growth & Page Engagement", "High-Intent Community Nurturing"],
};

const FacebookMarketingSection = () => {
  const [activeStrategyIndex, setActiveStrategyIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenContact = (subject) => {
    setSelectedService(subject);
    setIsContactOpen(true);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/getsmmfacebook");
        const data = await response.json();
        if (data && data.data) {
          const formatted = data.data.map((service, index) => ({
            id: service.id,
            icon: service.icon,
            title: service.heading,
            description: service.description,
            fallbackIcon: iconMap[service.id] || Megaphone,
            highlights: serviceHighlights[service.id] || [
              "Audience Targeting Optimization",
              "Conversion Tracking Integration",
              "Dedicated Media Buyer Support"
            ]
          }));
          setServices(formatted);
        }
      } catch (error) {
        console.error("Error fetching Facebook services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const strategies = [
    {
      title: "Facebook Page Creation & Bio Optimization",
      description: "We build a high-credibility, fully branded Facebook business profile with complete meta tags, verified business manager, and trust signals.",
      highlight: "Foundation Building"
    },
    {
      title: "Laser-Focused Audience AI Targeting",
      description: "We deploy custom CRM audiences, lookalike modeling (LAL 1-3%), and behavioral interest clusters to locate customers with immediate buying intent.",
      highlight: "Smart Targeting"
    },
    {
      title: "Strategic Ad Funnel Execution",
      description: "Our coordinated approach ensures your budget flows into high-performing ad sets with algorithmic bidding and conversion frequency capping.",
      highlight: "Expert Execution"
    },
    {
      title: "Thumb-Stopping Creative Labs & A/B Hooks",
      description: "High-contrast reels, interactive carousels, and dynamic product catalogs engineered to disrupt user feeds and drive maximum click-through rates.",
      highlight: "Creative Excellence"
    }
  ];

  const techniques = [
    { title: "Meta Conversions API (CAPI)", desc: "Server-side event tracking bypassing browser ad-blockers and iOS privacy restrictions." },
    { title: "Custom & Lookalike Audiences", desc: "Targeting high-value segments that closely mirror your top 10% highest-LTV buyers." },
    { title: "Dynamic Product Retargeting", desc: "Automated multi-item carousels tailored to users' exact browsing and cart history." },
    { title: "Omnichannel Funnel Optimization", desc: "Coordinating Facebook, Instagram, and WhatsApp click-to-chat lead funnels." },
    { title: "Rapid Hook Testing Engine", desc: "Continuously testing 5+ visual angles and captions weekly to eliminate ad fatigue." },
    { title: "Granular ROAS & CPL Dashboards", desc: "Real-time transparent reporting tracking actual revenue margins, not vanity impressions." }
  ];

  return (
    <section
      id="facebook-marketing"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/25 to-slate-100/70 text-gray-900 relative overflow-hidden font-sans"
      aria-label="Meta and Facebook Advertising Services"
    >
      {/* Radiant Decorative Ambient Glows */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-rose-400/10 via-orange-400/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Hero / Intro Banner */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>✦ Premium Meta & Facebook Marketing ✦</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.15] mb-6">
            Transform Your Brand with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500">
              Facebook & Meta Ads
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Looking for a premium company to promote your business on Facebook? Digital Nawab is your best choice for effective, high-ROAS Facebook advertising in Lucknow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleOpenContact("Facebook Marketing Campaign")}
              className="cursor-pointer bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-700 hover:to-rose-700 text-white font-bold px-9 py-4 rounded-full text-sm sm:text-base shadow-xl shadow-blue-500/25 transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>Start Your Campaign →</span>
            </button>

            <button
              onClick={() => handleOpenContact("Free Meta Ad Account Audit")}
              className="cursor-pointer inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 hover:border-blue-500 text-gray-800 font-bold px-8 py-4 rounded-full text-sm sm:text-base shadow-sm transition-all duration-300"
            >
              <span>View Case Studies & Audit</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-8 border-t border-gray-200/80">
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-600">4.8x</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Average ROAS</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">10M+</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Ad Impressions</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-600">₹45 - ₹120</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Avg Qualified CPL</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">98.4%</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Retention Rate</div>
            </div>
          </div>
        </div>

        {/* Dynamic Services Section (Admin API: /api/getsmmfacebook) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/70 px-4 py-1.5 rounded-full border border-blue-200">
              Live Core Capabilities
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 mb-3">
              Our Facebook Marketing Services
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              We deliver premium benefits with the best results, focusing on your company's promotion and sales on Facebook & Instagram.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const FallbackIcon = service.fallbackIcon;
              return (
                <div
                  key={service.id || index}
                  className="group relative bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <FallbackIcon className="w-7 h-7 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-blue-600 bg-gray-50 group-hover:bg-blue-50 px-3 py-1 rounded-full border border-gray-100 transition-colors">
                        FEATURE #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                      {service.title}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-gray-100 mb-6">
                      {service.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div>
                    <button
                      onClick={() => handleOpenContact(`Facebook Service: ${service.title}`)}
                      className="cursor-pointer w-full py-3 px-4 rounded-xl text-xs font-bold bg-gray-50 hover:bg-blue-600 text-gray-800 hover:text-white border border-gray-200 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 6th Complementary Custom Scale Card for Perfect Symmetry */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                    <Zap className="w-7 h-7 text-yellow-300 fill-current" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
                    VIP Growth
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-3 tracking-tight">
                  Free Meta Ad Account Audit
                </h4>

                <p className="text-sm text-blue-100 leading-relaxed mb-6">
                  Get our senior media buyers to inspect your pixel tracking, budget leaks, and cost-per-lead for immediate performance gains.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/20 mb-6 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Conversions API (CAPI) Health Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Audience Overlap & Fatigue Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Actionable 30-Day Scale Roadmap</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleOpenContact("VIP Free Meta Account Audit")}
                  className="cursor-pointer w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-blue-900 hover:bg-blue-50 transition-all text-center shadow-lg"
                >
                  Claim Your Free Audit Today →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Strategies & Proven Techniques Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-md mb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Strategy Selector */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Strategic Playbook
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-4">
                Growth Strategies That Drive Scalable Results
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Points that influence your company's growth and build customer trust through our proven paid media frameworks.
              </p>

              <div className="space-y-2.5">
                {strategies.map((strat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStrategyIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeStrategyIndex === idx
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                    }`}
                  >
                    <span>{strat.highlight}</span>
                    <ArrowRight className="w-4 h-4 opacity-80" />
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Detail Card */}
            <div className="lg:col-span-7 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-2xl p-8 border border-blue-100 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600 mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Active Focus Area
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {strategies[activeStrategyIndex].title}
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                {strategies[activeStrategyIndex].description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-blue-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Daily Budget Optimization (CBO)
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Conversion Frequency Capping
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Zero Ad Fatigue Rotation
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Negative Exclusion Targeting
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Facebook Advertising Techniques */}
        <div className="mb-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Technical Excellence
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-3">
              Advanced Facebook Advertising Techniques
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We implement cutting-edge methods to maximize your Facebook advertising ROI and reach your target audience effectively.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-100">
                      0{index + 1}
                    </span>
                    <h5 className="font-bold text-gray-900 text-sm">{tech.title}</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default FacebookMarketingSection;