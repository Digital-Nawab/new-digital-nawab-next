"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  FileSearch,
  Award,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const faqs = [
  {
    q: "How fast will our business see qualified leads from Google Ads?",
    a: "Unlike SEO which takes 3 to 6 months to build organic ranking momentum, PPC campaigns start driving qualified, high-intent traffic the very day your ads go live. Once your campaign structure and conversion tracking are configured, your ads can appear at the top of Google search results within hours.",
  },
  {
    q: "How do you prevent wasted ad spend and irrelevant clicks?",
    a: "We implement exhaustive negative keyword lists (thousands of filtered terms), exact and phrase match keyword strategies, device bid adjustments, and precise geographic exclusions down to local pin codes. We also audit search query reports daily to ensure your budget is never wasted on non-converting clicks.",
  },
  {
    q: "What Google Ads budget is recommended for small to mid-sized businesses?",
    a: "We tailor budgets to your specific industry CPC and customer lifetime value. In Lucknow and nationwide, businesses often begin with ₹15,000 to ₹50,000/month in ad spend to gather statistically significant conversion data, and then systematically scale budgets based on verified return on ad spend (ROAS).",
  },
  {
    q: "Do you audit and fix existing Google Ads accounts that aren't performing?",
    a: "Yes! Over 60% of our clients come to us with underperforming existing campaigns. We conduct a comprehensive 360° audit of your Quality Scores, keyword match types, landing page alignment, bidding strategies, and conversion tracking to eliminate wasted spend and rapidly restore profitability.",
  },
  {
    q: "What key metrics and reports will our team receive?",
    a: "You receive transparent, real-time Google Analytics 4 dashboards and transparent weekly reports tracking Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), Click-Through Rate (CTR), Total Qualified Leads, and Net Revenue generated.",
  },
];

const PPCAuditCTA = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 font-sans overflow-hidden border-t border-slate-200/70"
      aria-label="PPC FAQ and Free Google Ads Audit"
    >
      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>✦ FREE STRATEGY AUDIT &amp; FAQS ✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight mb-4 tracking-tight">
            Frequently Asked Questions &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Free PPC Audit
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Clear answers to common questions about Google Ads management, plus a complimentary 30-minute account review by our certified specialists.
          </p>
        </div>

        {/* 2-Column Grid: FAQ Left + Audit Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* FAQ Accordion Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Common Questions About PPC Management
              </h3>
            </div>

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-indigo-300 shadow-md ring-1 ring-indigo-200/50"
                      : "bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white shadow-sm"
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 sm:px-6 py-4.5 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-bold text-sm sm:text-base tracking-tight leading-snug transition-colors ${
                        isOpen ? "text-indigo-600" : "text-slate-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-indigo-50 text-indigo-600"
                          : "rotate-0 bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Converting Free Audit Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/20">
              <div className="bg-white rounded-[22px] p-6 sm:p-8 space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Free Account Audit
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    30-Min Session
                  </span>
                </div>

                {/* Audit Title */}
                <div>
                  <h3 className="text-2xl font-black text-slate-950 mb-2 leading-tight">
                    Claim Your Free Google Ads Audit &amp; Strategy Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Stop burning ad budget on low-intent search terms. Our certified Google Ads specialists will dissect your account to uncover immediate revenue opportunities.
                  </p>
                </div>

                {/* What is Included Checklist */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    What You Will Receive:
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Negative Keyword Gap Analysis:</strong> Identify non-converting clicks draining your budget.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Competitor Ad Breakdown:</strong> Discover competitor keywords, ad copies, and bidding strategies.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Landing Page CRO Review:</strong> Pinpoint conversion bottlenecks hurting your Quality Score.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Custom ROAS Roadmap:</strong> Projected customer acquisition cost and scaling plan.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <ContactPopup
                    buttonText="Claim Free 30-Min Audit Now →"
                    buttonClassName="w-full justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-500/25 text-sm transition-all transform hover:scale-[1.01]"
                  />

                  <a
                    href="tel:+919335621987"
                    className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 py-3 px-6 rounded-xl font-medium text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-4 h-4 text-indigo-600" />
                    <span>Speak Directly with Specialist: +91 93356 21987</span>
                  </a>
                </div>

                {/* Trust Footer */}
                <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Confidential
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-600" /> Google Certified
                  </span>
                  <span>·</span>
                  <span>No Obligation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PPCAuditCTA;
