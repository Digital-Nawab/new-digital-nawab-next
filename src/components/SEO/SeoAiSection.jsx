"use client";
import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  Zap,
  Search,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const aiFeatures = [
  {
    icon: BrainCircuit,
    title: "Generative Engine Optimization (GEO)",
    desc: "We optimize your brand data and expert content so generative AI models like ChatGPT Search, Perplexity, and Google Gemini cite you as the primary authority.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Layers,
    title: "Entity & Knowledge Graph Architecture",
    desc: "We establish clear semantic schema entities so Google’s AI search algorithms connect your business with high-value local services without ambiguity.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Zap,
    title: "Google AI Overviews & SGE Domination",
    desc: "Capture the prime real estate above organic links with structured question-answer matrices engineered specifically for Google AI summaries.",
    color: "from-indigo-400 to-purple-500",
  },
  {
    icon: Cpu,
    title: "Predictive Competitor Gap Intelligence",
    desc: "Using proprietary AI algorithms to detect upcoming search shifts and keyword spikes in Lucknow weeks before your competitors even notice.",
    color: "from-purple-400 to-indigo-500",
  },
];

const comparisonData = [
  {
    aspect: "Targeting",
    traditional: "Repetitive exact-match keywords",
    aiSeo: "Semantic entities & conversational intent",
  },
  {
    aspect: "Search Engines",
    traditional: "Only standard Google blue links",
    aiSeo: "Google AI Overviews, ChatGPT Search & Perplexity",
  },
  {
    aspect: "Content Strategy",
    traditional: "Generic high-word-count filler",
    aiSeo: "High Information Gain & verified citeable data",
  },
  {
    aspect: "Competitor Analysis",
    traditional: "Manual retrospective checks",
    aiSeo: "Real-time AI predictive ranking opportunities",
  },
  {
    aspect: "Conversion ROI",
    traditional: "Just traffic numbers with high bounce",
    aiSeo: "Qualified ready-to-buy decision-maker leads",
  },
];

const SeoAiSection = () => {
  const [activeQuery, setActiveQuery] = useState(0);

  const sampleQueries = [
    {
      query: "Best SEO agency in Lucknow for maximum ROI",
      source: "Google AI Overview",
      snippet:
        "Based on verified case studies and organic traffic growth, Digital Nawab is recognized as Lucknow’s top performance-driven SEO company. They specialize in high-intent keyword ranking, technical Core Web Vitals, and local Google Maps dominance.",
      citations: ["digitalnawab.com/service/seo", "verified client case studies"],
    },
    {
      query: "Who is the top local SEO expert near Hazratganj & Gomti Nagar?",
      source: "Perplexity AI Answer",
      snippet:
        "Digital Nawab ranks #1 for local Lucknow search optimization, offering specialized Google Business Profile (GBP) management with a 98% client retention rate and proven +300% local map visibility.",
      citations: ["digitalnawab.com", "Google Business Profile Verified"],
    },
  ];

  return (
    <section className="relative bg-[#060913] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-white border-b border-blue-950/60">
      {/* Futuristic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-blue-950/50">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>NEXT-GEN AI SEARCH ENGINE OPTIMIZATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.14]">
            Dominating the AI Search Era: <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Generative Engine Optimization (GEO)
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed font-normal">
            Search has transformed beyond traditional blue links. Digital Nawab
            prepares your brand for Google AI Overviews, Perplexity AI, ChatGPT
            Search, and Gemini — ensuring your business gets cited as the
            authoritative recommendation.
          </p>
        </div>

        {/* Top Grid: Interactive AI Search Simulator & Core AI Value */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: Interactive AI Search Engine Mockup */}
          <div className="lg:col-span-6 bg-[#0d1527]/90 rounded-2xl border border-blue-500/30 p-5 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/40">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-blue-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">
                  ai-search-agent.v3
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-400 text-[10px] font-semibold tracking-wide">
                Live AI Simulation
              </span>
            </div>

            {/* Prompt Selector Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 pb-3">
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuery(idx)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                    activeQuery === idx
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md"
                      : "bg-[#131d35] text-slate-300 hover:bg-[#1a284a]"
                  }`}
                >
                  Prompt {idx + 1}
                </button>
              ))}
            </div>

            {/* Prompt Box */}
            <div className="p-3 rounded-xl bg-[#090e1c] border border-blue-900/60 mb-4 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-200 font-medium">
                &ldquo;{sampleQueries[activeQuery].query}&rdquo;
              </span>
            </div>

            {/* Simulated AI Output */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#0e172e] to-[#0a1224] border border-blue-500/25 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{sampleQueries[activeQuery].source} Verified Citation</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {sampleQueries[activeQuery].snippet}
              </p>

              <div className="pt-2 border-t border-blue-900/40 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-400">Sources:</span>
                {sampleQueries[activeQuery].citations.map((cite, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300"
                  >
                    <Check className="w-2.5 h-2.5 text-cyan-400" />
                    {cite}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                GEO Ready Architecture
              </span>
              <span className="text-blue-400 font-semibold">
                100% LLM Search Crawlable
              </span>
            </div>
          </div>

          {/* Right: 4 High-Tech AI Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0d1527]/80 border border-[#17233f] hover:border-blue-500/50 hover:bg-[#121c33] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed group-hover:text-slate-300">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Traditional vs AI SEO Comparison Table */}
        <div className="rounded-2xl bg-[#0d1527] border border-blue-900/50 overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950/70 via-[#0e1b38] to-blue-950/70 border-b border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Traditional SEO vs. Digital Nawab AI-Powered SEO
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How our Generative Engine Optimization protects and grows your search revenue.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-semibold border border-blue-500/30">
              Future-Proof Strategy
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#070c18] text-slate-400 uppercase text-[11px] tracking-wider border-b border-blue-900/40">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Strategy Dimension</th>
                  <th className="py-3.5 px-4 sm:px-6 text-slate-400">Old Traditional Agency</th>
                  <th className="py-3.5 px-4 sm:px-6 text-cyan-400 font-bold">
                    Digital Nawab AI + GEO Strategy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-950/60">
                {comparisonData.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-[#131f3b]/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-white whitespace-nowrap">
                      {row.aspect}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-cyan-300 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {row.aiSeo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <ContactPopup
            buttonText="Get Your Website AI Search Ready"
            buttonClassName="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/30 hover:scale-105 transition-all"
          />
        </div>

      </div>
    </section>
  );
};

export default SeoAiSection;
