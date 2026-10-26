"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  PhoneCall,
  CheckCircle2
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const faqs = [
  {
    question: "What is the key difference between SMO (Organic) and SMM (Paid Advertising)?",
    answer:
      "SMO (Social Media Optimization) focuses on organic brand equity—establishing an appealing profile aesthetic, creating viral Reels, engaging with followers, and using hashtag strategies to grow organically without paying for impressions. SMM (Social Media Marketing) uses paid ad budgets on Meta, Instagram, YouTube, and LinkedIn to instantly target your ideal buyer personas, drive immediate qualified traffic, and generate predictable sales pipeline."
  },
  {
    question: "How quickly can my business expect measurable results?",
    answer:
      "For paid advertising campaigns (Meta Ads & YouTube PPC), initial qualified leads and website traffic generally start generating within 48 to 72 hours of campaign activation. For organic community building and brand authority (Reels & Carousels), noticeable momentum, organic follower growth, and algorithmic distribution typically compound significantly within 60 to 90 days of consistent publishing."
  },
  {
    question: "Does Digital Nawab create all graphics, reels, captions, and hashtags?",
    answer:
      "Yes, completely! Our creative team handles 100% of the creative production—including visual branding, graphic design, short-form Reel editing, copyright-free trending music selection, copywriting, and SEO hashtag sets. Everything is submitted to you in advance via an easy-to-review monthly content calendar for your approval before publishing."
  },
  {
    question: "What monthly ad spend budget should I allocate for Meta & Instagram Ads?",
    answer:
      "We typically recommend starting with a minimum ad budget of ₹15,000 to ₹30,000 ($200–$400/month) for local service businesses or startups to test audiences and gather conversion signals. For high-growth e-commerce brands or B2B lead generation, budgets of ₹50,000+ ($600+/month) allow for aggressive scaling, custom lookalike audiences, and full-funnel retargeting."
  },
  {
    question: "Do you monitor comments, spam, and direct customer inquiries?",
    answer:
      "Yes! On our Pro, Elite, and Performance plans, our community team actively monitors incoming comments on your posts and ads, filters negative spam, and flags hot purchase inquiries or customer booking requests directly to your sales team via WhatsApp or email in real-time."
  },
  {
    question: "Can I customize a package or cancel/upgrade my plan anytime?",
    answer:
      "Absolutely. We do not lock our clients into rigid long-term contracts. You can upgrade, pause, or customize your deliverables at the end of any monthly billing cycle with 15 days advance notice. If your business requires custom video shoots or dedicated on-site creators, we will tailor a bespoke scope for you."
  }
];

const SocialFAQ = () => {
  // Store open state for each item independently (none open by default)
  const [openItems, setOpenItems] = useState({});

  const toggleFAQ = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/80 to-purple-50/20 text-gray-900 relative overflow-hidden font-sans"
      aria-label="Frequently Asked Questions about Social Media Marketing"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Compact & Sleek */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-semibold mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>✦ GOT QUESTIONS? WE'VE GOT ANSWERS ✦</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3 tracking-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
              Questions
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            Everything you need to know about our social media management, content production, paid advertising, and monthly reporting.
          </p>
        </div>

        {/* 2-Column FAQ Layout: 1 Row with 2 Columns across md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start mb-10">
          {faqs.map((faq, index) => {
            const isOpen = !!openItems[index];
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-white border-purple-300 shadow-md ring-1 ring-purple-100"
                    : "bg-white hover:bg-purple-50/20 border-gray-200/90 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3.5 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-xs sm:text-sm md:text-base text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-purple-600 text-white rotate-180 shadow-md shadow-purple-600/30"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Card */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-white rounded-3xl p-7 sm:p-9 border border-purple-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Have a Specific Requirement?
            </span>
            <h4 className="text-lg sm:text-xl font-black text-gray-900 mt-1">
              Talk to Our Social Media Strategists Today
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Get an honest assessment of your current profiles and a custom roadmap within 24 hours.
            </p>
          </div>

          <div className="flex-shrink-0">
            <ContactPopup
              buttonText="Request Free Consultation →"
              buttonClassName="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:shadow-xl hover:scale-105 transition-all"
              defaultSubject="SMM Strategy Question / Consultation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFAQ;
