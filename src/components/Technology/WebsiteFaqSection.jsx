"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  Search,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  DollarSign,
  Clock,
  Layers,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const faqData = [
  {
    id: "faq-1",
    category: "cost",
    categoryLabel: "Cost & Packages",
    question: "How much does a custom website design and development cost in Lucknow?",
    answer:
      "Our website development pricing is completely transparent with zero hidden fees. Standard corporate business websites start at ₹15,000 to ₹25,000. Feature-rich e-commerce stores (custom cart, payment gateways, product catalog management) range between ₹30,000 and ₹65,000. Enterprise web applications and custom SaaS portals are quoted based on specific architecture and API requirements. Every quote includes full source code ownership, mobile responsiveness, and 30 days of post-launch technical support.",
  },
  {
    id: "faq-2",
    category: "timeline",
    categoryLabel: "Timelines & Process",
    question: "How long does it take to design, develop, and launch a website from start to finish?",
    answer:
      "A standard corporate website takes approximately 2 to 3 weeks from initial discovery to production go-live. E-commerce platforms typically require 3 to 5 weeks depending on catalog complexity, custom filters, and ERP/logistics integrations. Complex web applications follow agile sprints across 6 to 10 weeks with dedicated demo milestones at the end of each sprint.",
  },
  {
    id: "faq-3",
    category: "tech",
    categoryLabel: "Technology & SEO",
    question: "Will our website be mobile-responsive, lightning fast, and SEO-optimized?",
    answer:
      "Yes, 100%. We follow mobile-first responsive architecture ensuring pixel-perfect layout and touch ergonomics on iPhones, Android devices, tablets, and 4K desktops. We optimize Core Web Vitals to achieve sub-2-second load times and 90+ Google PageSpeed scores. Every build includes foundational on-page SEO: semantic HTML5, Schema.org structured data, dynamic OpenGraph social cards, canonical tags, automated XML sitemaps, and SSL security hardening.",
  },
  {
    id: "faq-4",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    question: "Do I get full ownership of the website's source code, domain, and database?",
    answer:
      "Yes, absolutely. Unlike agencies that lock you into proprietary closed platforms or continuous monthly leasing fees, Digital Nawab transfers 100% intellectual property, copyright, source code, database access, and admin credentials directly to you upon final settlement. You own your digital asset completely with zero vendor lock-in.",
  },
  {
    id: "faq-5",
    category: "tech",
    categoryLabel: "Technology & SEO",
    question: "What technologies, programming languages, and CMS platforms do you develop with?",
    answer:
      "We select modern, enterprise-proven tech stacks based on your specific scalability goals. Our core stack includes Next.js, React, Node.js, TypeScript, Tailwind CSS, Laravel, and Python, paired with databases like PostgreSQL and MySQL. For clients needing easy in-house content management, we deliver user-friendly WordPress, Shopify, or headless CMS (Strapi / Sanity) backends.",
  },
  {
    id: "faq-6",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    question: "Can our internal team easily update text, images, and products without coding knowledge?",
    answer:
      "Yes. We build intuitive, visual administrative dashboards that allow anyone on your team to easily add new blog articles, publish case studies, update product inventory, change prices, and edit banner visuals with zero programming background. We also provide a recorded 1-on-1 walkthrough and written documentation upon project handoff.",
  },
  {
    id: "faq-7",
    category: "timeline",
    categoryLabel: "Timelines & Process",
    question: "Can you redesign our existing outdated website without losing our current Google rankings?",
    answer:
      "Yes. Website redesign migrations are one of our core specialties. We audit your existing organic keyword rankings, preserve all high-ranking URL slugs, map comprehensive 301 redirects for any altered paths, preserve historical metadata, and upgrade your site's speed and mobile experience — ensuring your existing search engine authority is fully preserved and primed for growth.",
  },
  {
    id: "faq-8",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    question: "What happens after the website goes live? Do you provide maintenance and security updates?",
    answer:
      "Every website project includes 30 days of complimentary post-launch technical warranty covering bug fixes and minor adjustments. Afterwards, we offer flexible, cost-effective monthly maintenance plans that include 24/7 uptime monitoring, regular off-site cloud backups, security firewall patches, framework updates, and dedicated developer hours for new features.",
  },
];

export default function WebsiteFaqSection() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqCard = (faq) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        className={`rounded-2xl transition-all duration-300 border backdrop-blur-xl ${
          isOpen
            ? "bg-gradient-to-b from-white/[0.09] to-white/[0.03] border-cyan-400/50 shadow-xl shadow-cyan-500/10"
            : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
        }`}
      >
        <button
          onClick={() => toggleAccordion(faq.id)}
          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300 ${
                isOpen
                  ? "bg-cyan-400 text-black shadow-md shadow-cyan-400/40"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              Q
            </div>
            <span className="text-sm sm:text-base font-bold text-white leading-snug">
              {faq.question}
            </span>
          </div>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
              isOpen
                ? "bg-cyan-400/20 text-cyan-300 rotate-180"
                : "bg-white/10 text-gray-400"
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        {isOpen && (
          <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed font-light border-t border-white/5 animate-fadeIn">
            <div className="pl-10">{faq.answer}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="website-faqs"
      className="relative py-12 lg:py-16 bg-[#060312] text-white overflow-hidden selection:bg-cyan-500 selection:text-white"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-lg shadow-cyan-500/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-indigo-200 uppercase">
              Buyer Clarity & Transparency
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400">
              Questions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Direct, buyer-focused answers to common questions about custom website development costs, delivery timelines, code ownership, and post-launch maintenance.
          </p>
        </div>

        {/* 2-Column FAQ Grid (4 in Left Column, 4 in Right Column) */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-10 items-start">
          <div className="space-y-4">
            {faqData.slice(0, 4).map(renderFaqCard)}
          </div>
          <div className="space-y-4">
            {faqData.slice(4, 8).map(renderFaqCard)}
          </div>
        </div>

        {/* Still Have Questions Box */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950/40 border border-white/15 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0 mx-auto sm:mx-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                Have a unique project question or technical requirement?
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                Speak directly with our senior full-stack architect in Lucknow.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919369996767"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>+91 93699 96767</span>
            </a>
            <ContactPopup
              buttonText="Ask Custom Question"
              buttonClassName="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-black font-bold text-xs sm:text-sm shadow-md transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
