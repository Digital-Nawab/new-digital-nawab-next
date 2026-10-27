"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Phone,
  ArrowRight,
} from "lucide-react";

// Pre-filled verified FAQs from API for instant high-speed rendering & zero layout shift
const defaultFaqs = [
  {
    id: 6,
    question: "What digital marketing services does Digital Nawab offer?",
    answer:
      "Digital Nawab offers digital marketing services including search engine optimization (SEO), Google Ads management, social media marketing, website design and development, graphic design, content optimization, local SEO, Google Business Profile optimization, and lead generation. The right combination of services depends on your business goals, target audience, and marketing requirements.",
  },
  {
    id: 7,
    question: "Why should I choose Digital Nawab as my digital marketing agency in Lucknow?",
    answer:
      "Digital Nawab helps businesses plan and manage their online marketing through relevant digital channels, including SEO, paid advertising, social media, and website optimization. Our approach focuses on understanding business objectives, improving online visibility, reaching relevant audiences, and measuring campaign performance. Contact our team to discuss a strategy suited to your business.",
  },
  {
    id: 8,
    question: "Why does my business need digital marketing?",
    answer:
      "Digital marketing helps businesses reach relevant audiences through search engines, paid advertising, social media, and other online channels. It can support brand awareness, customer engagement, lead generation, and sales while providing measurable performance data to guide marketing decisions.",
  },
  {
    id: 9,
    question: "How can I choose the right digital marketing strategy for my business?",
    answer:
      "Start by defining your business goals, target audience, budget, and desired outcomes. SEO can support long-term organic visibility, Google Ads can help reach people actively searching for products or services, and social media marketing can build awareness and engagement. A suitable strategy combines the channels that best match your audience and objectives.",
  },
  {
    id: 10,
    question: "How much do digital marketing services cost in Lucknow?",
    answer:
      "Digital marketing costs in Lucknow depend on the services required, campaign scope, competition, business goals, and expected workload. SEO, social media management, website development, and paid advertising have different cost structures. Google Ads budgets should also be distinguished from agency management fees. Contact Digital Nawab for a proposal based on your requirements.",
  },
  {
    id: 11,
    question: "Does Digital Nawab provide SEO and local SEO services in Lucknow?",
    answer:
      "Digital Nawab offers SEO-focused services intended to improve relevant organic search visibility. Local SEO can include Google Business Profile optimization, local keyword research, business information consistency, local landing-page optimization, and other location-relevant improvements. Specific deliverables depend on the agreed scope of work.",
  },
  {
    id: 12,
    question: "Does Digital Nawab manage Google Ads and social media advertising?",
    answer:
      "Digital Nawab offers paid advertising services, including Google Ads and social media advertising, subject to the services confirmed in your current offering. Campaign work may include planning, targeting, ad setup, conversion tracking, and ongoing optimization. Advertising outcomes depend on factors such as budget, competition, targeting, offer, and landing-page quality.",
  },
  {
    id: 13,
    question: "Does Digital Nawab offer website design, development, and mobile app development?",
    answer:
      "Digital Nawab offers website design and development services. Mobile application development should be included in this answer only if it is part of the current service offering. Project scope may cover user experience, responsive design, development requirements, functionality, and deployment planning, depending on the agreed specifications.",
  },
  {
    id: 14,
    question: "Which industries can benefit from Digital Nawab's services?",
    answer:
      "Digital marketing can support businesses in industries such as healthcare, education, real estate, ecommerce, retail, hospitality, and professional services. The most suitable strategy depends on the business model, audience, location, competition, and marketing objectives. Contact our team to discuss your industry's requirements.",
  },
  {
    id: 15,
    question: "What is performance marketing?",
    answer:
      "Performance marketing is an approach that uses measurable campaign objectives to evaluate advertising effectiveness. Depending on the campaign, key metrics can include qualified leads, cost per lead, conversions, revenue, and return on ad spend. Advertisers may pay for clicks, impressions, leads, or other defined actions depending on the advertising model.",
  },
  {
    id: 16,
    question: "How can businesses in Lucknow improve their online visibility?",
    answer:
      "Businesses in Lucknow can improve online visibility by maintaining accurate business information, developing useful website content, optimizing relevant service and location pages, improving their Google Business Profile where eligible, and using targeted advertising when appropriate. The right combination depends on the business's goals and competitive landscape.",
  },
  {
    id: 17,
    question: "How can I get started with Digital Nawab?",
    answer:
      "Start by contacting Digital Nawab and sharing your business website, services, target audience, location, and main marketing goals. Our team can use this information to understand your requirements and discuss suitable digital marketing options, priorities, and next steps.",
  },
];

const FAQSection = () => {
  const [faqs, setFaqs] = useState(defaultFaqs);
  // Initially no FAQ is open - opens only when clicked
  const [openIds, setOpenIds] = useState({});

  // Fetch live FAQs from API: https://dashboard.digitalnawab.com/api/getfaq
  useEffect(() => {
    let isMounted = true;
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          "https://dashboard.digitalnawab.com/api/getfaq",
          { timeout: 7000 }
        );

        if (
          isMounted &&
          response.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const apiFaqs = response.data.data.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
          }));
          setFaqs(apiFaqs);
        }
      } catch (err) {
        console.warn("Using cached FAQs (API offline/slow):", err?.message);
      }
    };

    fetchFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle single accordion item on click
  const toggleItem = (id) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Split into 2 columns for desktop masonry (even index left, odd index right)
  const leftColumnFaqs = useMemo(
    () => faqs.filter((_, idx) => idx % 2 === 0),
    [faqs]
  );
  const rightColumnFaqs = useMemo(
    () => faqs.filter((_, idx) => idx % 2 === 1),
    [faqs]
  );

  // Render an individual FAQ card
  const renderFaqCard = (faq, displayIndex) => {
    const isOpen = !!openIds[faq.id];
    const formattedIndex = String(displayIndex + 1).padStart(2, "0");

    return (
      <div
        key={faq.id}
        className={`group relative rounded-2xl transition-all duration-300 border ${
          isOpen
            ? "bg-gradient-to-br from-[#17122b]/95 via-[#0d0a18]/95 to-[#160c24]/95 border-purple-500/60 shadow-[0_12px_36px_rgba(143,90,255,0.18)] ring-1 ring-purple-500/25"
            : "bg-[#0c0a14]/60 hover:bg-[#120f20]/80 border-white/[0.08] hover:border-purple-500/40 hover:shadow-[0_6px_24px_rgba(143,90,255,0.08)]"
        } backdrop-blur-xl overflow-hidden`}
      >
        {/* Subtle top accent gradient bar when open */}
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#00F0FF]" />
        )}

        <button
          type="button"
          onClick={() => toggleItem(faq.id)}
          className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl select-none"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
        >
          <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
            {/* Number Pill / Badge */}
            <span
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold tracking-tight transition-all duration-300 mt-0.5 ${
                isOpen
                  ? "bg-gradient-to-br from-[#C73673] to-[#8F5AFF] text-white shadow-md shadow-purple-500/40"
                  : "bg-white/[0.05] border border-white/10 text-purple-300/80 group-hover:border-purple-500/30 group-hover:text-purple-200"
              }`}
            >
              {formattedIndex}
            </span>

            {/* Question Text */}
            <h3
              className={`text-[15px] sm:text-base lg:text-[17px] font-semibold leading-snug transition-colors pr-2 ${
                isOpen
                  ? "text-white"
                  : "text-gray-200 group-hover:text-white"
              }`}
            >
              {faq.question}
            </h3>
          </div>

          {/* Toggle Chevron */}
          <div
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-gradient-to-r from-[#C73673] to-[#8F5AFF] text-white rotate-180 shadow-md shadow-pink-500/30"
                : "bg-white/[0.06] border border-white/10 text-gray-400 group-hover:text-white group-hover:border-purple-500/40 rotate-0"
            }`}
          >
            <ChevronDown className="w-4 h-4 transition-transform duration-300" />
          </div>
        </button>

        {/* Answer Container with smooth grid transition */}
        <div
          id={`faq-answer-${faq.id}`}
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 pt-0">
              <div className="border-t border-white/[0.08] pt-4 pl-0 sm:pl-12">
                <p className="text-gray-300/90 leading-relaxed text-sm sm:text-[15px] font-light">
                  {faq.answer}
                </p>

                {/* Helpful Contact Micro-CTA inside active card */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/[0.05] text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 text-purple-300/70">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    Digital Nawab Growth Advisory
                  </span>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-pink-300 font-medium transition-colors"
                  >
                    <span>Ask about this</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#05040a] border-t border-gray-800/80 overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-white selection:bg-purple-500 selection:text-white"
    >
      {/* Background Decorative Mesh & Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#C73673]/15 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#8F5AFF]/15 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5 shadow-lg shadow-purple-500/10">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Got Questions?{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-[#FF6FD8]">
              We&apos;ve Got Answers
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Clear, transparent answers to help you navigate our digital marketing,
            SEO strategies, Google Ads campaigns, and web development services.
          </p>
        </div>

        {/* 2-Column FAQ Layout (1 Row, 2 Columns on Desktop & Tablets) */}
        {/* Desktop / Tablet: 2 Columns in 1 Row (Items split evenly for independent height expansion) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-5 lg:gap-6 items-start">
          {/* Left Column (Even numbered indexes: 0, 2, 4...) */}
          <div className="flex flex-col gap-5">
            {leftColumnFaqs.map((faq, idx) => renderFaqCard(faq, idx * 2))}
          </div>

          {/* Right Column (Odd numbered indexes: 1, 3, 5...) */}
          <div className="flex flex-col gap-5">
            {rightColumnFaqs.map((faq, idx) => renderFaqCard(faq, idx * 2 + 1))}
          </div>
        </div>

        {/* Mobile / Small Screens: Single Column Sequential */}
        <div className="flex flex-col gap-4 lg:hidden">
          {faqs.map((faq, idx) => renderFaqCard(faq, idx))}
        </div>

        {/* Bottom High-Converting Support Banner */}
        <div className="mt-16 sm:mt-20 relative rounded-3xl bg-gradient-to-r from-[#120e24]/90 via-[#0d0919]/90 to-[#140b20]/90 border border-white/10 p-6 sm:p-10 text-center overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/10">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8F5AFF]/15 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Direct Support & Consultation</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3">
              Still have questions about our services?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Speak directly with our digital marketing specialists in Lucknow for a customized growth plan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-transform hover:scale-[1.03] shadow-lg shadow-[#C73673]/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=919335621987&text=Hello%20Digital%20Nawab%20team,%20I%20have%20a%20question%20regarding%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-6 py-3.5 rounded-full transition-all"
              >
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:9335621987"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-6 py-3.5 rounded-full transition-colors"
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+91 9335621987</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default FAQSection;
