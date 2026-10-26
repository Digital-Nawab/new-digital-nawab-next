import React, { useState } from "react";
import {
  TrendingUp,
  Eye,
  Mail,
  Users,
  BarChart3,
  Target,
  Settings,
  MessageSquare,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const LinkedInMarketingSection = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Precision B2B LinkedIn Ads",
      description:
        "Execute laser-targeted campaigns filtered by exact job titles, industry niches, company sizes, and decision-maker seniority for maximum C-suite engagement and high-ticket pipeline generation.",
      image: "/assets/ads/linkedin.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80",
      accent: "from-blue-500 to-cyan-500",
      badge: "High-Intent B2B",
      stats: "3.4x Higher Conversion"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Sponsored Content & Executive Branding",
      description:
        "Transform leadership profiles into thought-leader powerhouses. We distribute high-value industry whitepapers, research, and founder stories directly into the feeds of key decision makers.",
      image: "/assets/ads/sponsor.webp",
      fallbackImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
      accent: "from-indigo-500 to-purple-500",
      badge: "Authority & Reach",
      stats: "+240% Follower Growth"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Personalized Sponsored InMail Sequences",
      description:
        "Deliver 1-to-1 conversational messaging directly to the VIP inboxes of prospective enterprise clients with compelling copy, personalized hooks, and 50%+ open rates.",
      image: "/assets/ads/mail.png",
      fallbackImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
      accent: "from-cyan-500 to-blue-600",
      badge: "Direct Inbox Access",
      stats: "52% Avg. Open Rate"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Prospect & ABM List Building",
      description:
        "Digital Nawab extracts and refines qualified prospect lists using Account-Based Marketing (ABM) techniques, ensuring your sales outreach touches only pre-vetted corporate buyers.",
      image: "/assets/ads/list.webp",
      fallbackImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      accent: "from-amber-500 to-orange-500",
      badge: "ABM Prospecting",
      stats: "Pre-Qualified Leads"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "CRM & Analytics Integration",
      description:
        "Seamless synchronization between LinkedIn Campaign Manager, HubSpot, Salesforce, and Google Analytics 4 for closed-loop attribution from initial impression to closed contract.",
      image: "/assets/ads/integration.webp",
      fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      accent: "from-violet-500 to-indigo-600",
      badge: "Closed-Loop Tracking",
      stats: "100% Attribution"
    },
  ];

  const processSteps = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Target Segmentation",
      description: "Map C-level personas by seniority, geography, and enterprise industry code."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "ABM Prospecting",
      description: "Build curated decision-maker account lists with deep profile intelligence."
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Creative & Copy Engine",
      description: "Produce executive case studies, carousels, and high-converting InMail copy."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Multi-Touch Execution",
      description: "Launch retargeting layers across sponsored feeds, lead gen forms, and inboxes."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Pipeline Optimization",
      description: "Weekly pipeline attribution reviews and ongoing bid/budget scaling."
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-[#070d1e] to-slate-950 text-white relative overflow-hidden">
      {/* Ambient Sapphire Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            B2B Lead Generation & Executive Branding
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Turn LinkedIn Into an Automated{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              High-Ticket Client Pipeline
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Reach corporate decision-makers, VPs, and founders who have the budget to buy. Digital Nawab executes full-funnel LinkedIn strategies that drive qualified sales conversations.
          </p>
        </div>

        {/* Services Showcase Cards */}
        <div className="space-y-12 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Visual Side */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = service.fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                        {service.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                        {service.stats}
                      </span>
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                        Verified Result
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`space-y-5 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.accent} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}
                    >
                      {service.icon}
                    </div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                      Enterprise Pillar 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <ContactPopup
                      buttonText="Inquire About This Strategy"
                      buttonClassName="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/30 px-4 py-2.5 rounded-xl transition-all"
                      defaultSubject={`LinkedIn Strategy Inquiry: ${service.title}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Step B2B Process Stepper */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              Systematic Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
              Our 5-Step B2B Growth Blueprint
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-xs font-black text-slate-600">
                      STEP 0{index + 1}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center gap-1.5 text-[11px] font-semibold text-blue-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Phase Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/40 border border-blue-500/30">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
              Ready to Fill Your Calendar with Qualified B2B Sales Meetings?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-8">
              Partner with Digital Nawab to scale your B2B authority, prospect outreach, and high-ticket pipeline today.
            </p>
            <div className="flex justify-center">
              <ContactPopup
                buttonText="Schedule a B2B Strategy Session"
                buttonClassName="cursor-pointer bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
                defaultSubject="LinkedIn B2B Strategy Session Request"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInMarketingSection;
