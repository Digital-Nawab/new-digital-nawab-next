import React, { useState, useEffect } from "react";
import {
  Play,
  Tv,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  BarChart3,
  Video,
  Layers,
  Flame,
  Search,
  Target,
  PenTool,
  TrendingUp,
  Users,
  Eye,
  ChevronRight
} from "lucide-react";
import ContactPopup from "../ContactPopup";
import Link from "next/link";

const stepIcons = [Search, Target, PenTool, Video, TrendingUp, Play];

const YouTubeProcessSection = () => {
  const [activeTab, setActiveTab] = useState("services"); // "services" | "process"
  const [activeStep, setActiveStep] = useState(0);
  const [services, setServices] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ytRes, srvRes] = await Promise.all([
          fetch("/api/getsmmyoutube"),
          fetch("/api/getsmmService")
        ]);

        const ytData = await ytRes.json();
        const srvData = await srvRes.json();

        if (ytData?.data) {
          const mapped = ytData.data.map((step, idx) => ({
            ...step,
            title: step.heading,
            description: step.description,
            image: step.image?.startsWith("http")
              ? step.image
              : `https://dashboard.digitalnawab.com/${step.image}`,
            features: step.features || [],
            icon: stepIcons[idx % stepIcons.length]
          }));
          setProcessSteps(mapped);
        }

        if (srvData?.data) {
          setServices(
            srvData.data.map((item) => ({
              id: item.id,
              title: item.heading,
              description: item.description
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching YouTube section data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-[#0a0e1a] to-slate-950 text-white relative overflow-hidden">
      {/* Cinematic Red/Crimson Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Play className="w-3.5 h-3.5 fill-red-400" />
            YouTube & Video Growth Engine
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Social Media Marketing Services & Process to {" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Digital Nawab provides strategic social media marketing services to help businesses build brand awareness, connect with their target audience, and generate relevant enquiries. Our structured process combines business and audience research, social media strategy, creative content planning, account management, targeted advertising, and performance tracking to align marketing activities with your business goals and support continuous growth.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md shadow-xl">
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tv className="w-4 h-4" />
              Specialized Services ({services.length || 9})
            </button>
            <button
              onClick={() => setActiveTab("process")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "process"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              Growth Process ({processSteps.length || 6} Steps)
            </button>
          </div>
        </div>

        {/* TAB 1: Specialized Services Grid */}
        {activeTab === "services" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-red-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-500/10 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all duration-500" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                      <span className="text-2xl font-black text-slate-700 group-hover:text-red-500/40 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-red-400 group-hover:text-red-300">
                    <span>Algorithm-Driven Growth</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Process Steps Timeline */}
        {activeTab === "process" && (
          <div className="space-y-10 mb-16">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon || Search;
              return (
                <div
                  key={step.id || index}
                  onMouseEnter={() => setActiveStep(index)}
                  className="bg-slate-900/60 border border-slate-800/80 hover:border-red-500/40 rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10"
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Content */}
                    <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                          <StepIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                          Phase 0{index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                        {step.title}
                      </h3>

                      <p className="text-slate-300 leading-relaxed text-base mb-6">
                        {step.description}
                      </p>

                      {/* Feature Tags */}
                      {step.features && step.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                          {step.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/60 rounded-xl px-3.5 py-2">
                              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <span className="text-slate-300 text-xs font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Step Image */}
                    <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                      <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                            Deliverable: Stage #{index + 1}
                          </span>
                          <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                            100% Quality Checked
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* High-Converting CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 p-8 sm:p-12 text-white overflow-hidden shadow-2xl shadow-red-600/20">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4">
                Top YouTube Agency in Lucknow
              </span>
              <h3 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
                Ready to Grow Your Channel with Proven Viral Strategies?
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6">
                Get a comprehensive YouTube audit, audience blueprint, and high-retention video plan tailored for your brand.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <ContactPopup
                  buttonText="Get Free YouTube Audit"
                  buttonClassName="cursor-pointer bg-white text-red-600 px-7 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                />
                <a
                  href="tel:+919008504821"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-black/25 hover:bg-black/40 border border-white/20 transition-all hover:scale-105 backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4" />
                  +91 9008504821
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-white mb-1">500+</div>
                <div className="text-xs text-white/80 font-medium">Channels Optimized</div>
              </div>
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-white mb-1">20M+</div>
                <div className="text-xs text-white/80 font-medium">Views Generated</div>
              </div>
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-white mb-1">98.4%</div>
                <div className="text-xs text-white/80 font-medium">Satisfaction Rate</div>
              </div>
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-white mb-1">24/7</div>
                <div className="text-xs text-white/80 font-medium">Dedicated Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeProcessSection;
