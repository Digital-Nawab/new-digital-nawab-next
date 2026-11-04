"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Star,
  Zap,
  Gift,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart,
  Store,
  Globe,
  Rocket,
  Users,
  Lightbulb,
  Search,
  MousePointerClick,
  Share2,
  Mail,
} from "lucide-react";

import { motion } from "framer-motion";


function Ecommerce() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingElements = [
    { icon: Star, delay: "0s", x: "10%", y: "20%", size: "w-6 h-6" },
    { icon: Gift, delay: "1s", x: "85%", y: "25%", size: "w-8 h-8" },
    { icon: Zap, delay: "2s", x: "15%", y: "75%", size: "w-5 h-5" },
    { icon: Sparkles, delay: "0.5s", x: "90%", y: "60%", size: "w-6 h-6" },
    { icon: Heart, delay: "1.5s", x: "20%", y: "40%", size: "w-4 h-4" },
    { icon: TrendingUp, delay: "2.5s", x: "80%", y: "80%", size: "w-7 h-7" },
  ];
    const tools = [
    {
      name: "Google Analytics",
      category: "Analytics",
      description: "Advanced web analytics and user behavior tracking",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      name: "SEMrush",
      category: "SEO",
      description: "Comprehensive SEO and competitive analysis",
      icon: "🔍",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      name: "Facebook Ads",
      category: "Advertising",
      description: "Social media advertising and campaign management",
      icon: "📱",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      name: "Google Ads",
      category: "Advertising",
      description: "Pay-per-click advertising and search marketing",
      icon: "🎯",
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50"
    },
    {
      name: "Shopify",
      category: "E-commerce",
      description: "E-commerce platform and store management",
      icon: "🛒",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50"
    },
    {
      name: "Mailchimp",
      category: "Email Marketing",
      description: "Email automation and newsletter campaigns",
      icon: "📧",
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50"
    },
    {
      name: "Canva",
      category: "Design",
      description: "Graphic design and visual content creation",
      icon: "🎨",
      color: "from-teal-500 to-cyan-500",
      bgColor: "from-teal-50 to-cyan-50"
    },
    {
      name: "Hootsuite",
      category: "Social Media",
      description: "Social media management and scheduling",
      icon: "📅",
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50"
    },
    {
      name: "Klaviyo",
      category: "Email Marketing",
      description: "Advanced email marketing automation",
      icon: "✉️",
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-50 to-purple-50"
    },
    {
      name: "Hotjar",
      category: "Analytics",
      description: "User experience analytics and heatmaps",
      icon: "🔥",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      name: "Slack",
      category: "Communication",
      description: "Team collaboration and project management",
      icon: "💬",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      name: "Zapier",
      category: "Automation",
      description: "Workflow automation and app integrations",
      icon: "⚡",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50"
    }
  ];

  const categories = ["All", "Analytics", "SEO", "Advertising", "E-commerce", "Email Marketing", "Design", "Social Media", "Communication", "Automation"];

  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);


     const caseStudies = [
    {
      id: 1,
      image: "https://www.digitalnawab.com/assets/img/1621677546443.webp",
      title: "E-commerce Platform Revolution",
      description: "Transformed a traditional retail business into a thriving digital marketplace with cutting-edge technology and user-centric design.",
      tags: ["E-commerce", "UI/UX", "Mobile App"]
    },
    {
      id: 2,
      image: "https://www.digitalnawab.com/assets/img/1621677603887.webp",
      title: "Complete Brand Transformation",
      description: "Reimagined a startup's entire brand identity from logo to digital presence, creating a cohesive and memorable brand experience.",
      tags: ["Branding", "Logo Design", "Web Design"]
    },
    {
      id: 3,
      image: "https://www.digitalnawab.com/assets/img/1621677684961.webp",
      title: "Digital Marketing Success",
      description: "Developed a comprehensive digital marketing strategy that elevated online presence and drove unprecedented growth across all channels.",
      tags: ["Digital Marketing", "SEO", "Social Media"]
    }
  ];

  return (
    
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#05060f] via-[#0f1524] to-[#1a1f36] text-white pt-[90px]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(56,189,248,0.25),transparent_55%)]" />
          <div className="absolute -top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#6d3cff]/30 via-transparent to-transparent blur-3xl opacity-80" />
          <div className="absolute -bottom-16 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#3c8bff]/25 via-transparent to-transparent blur-3xl opacity-90" />
        </div>

        {/* Floating Background Elements */}
        {floatingElements.map((elem, index) => {
          const IconComponent = elem.icon;
          return (
            <div
              key={index}
              className={`absolute animate-float opacity-40 text-[#8da2ff] ${elem.size}`}
              style={{
                left: elem.x,
                top: elem.y,
                animationDelay: elem.delay,
              }}
            >
              <IconComponent className="w-full h-full" />
            </div>
          );
        })}

        {/* Main Content */}
        <div className="relative z-20 h-full flex items-center justify-center max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl">
            {/* Top Badge */}
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-sm text-white rounded-full border border-white/20 shadow-lg backdrop-blur-md mb-8 transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Zap className="w-5 h-5 text-teal-300 animate-pulse" />
              <span className="text-white font-medium">
                Calm Ecommerce Growth Suite
              </span>
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl md:text-6xl font-semibold leading-tight text-white mb-6 transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <span className="block">Minimal ecommerce experiences</span>
              <span className="block bg-gradient-to-r from-[#a8b5ff] via-[#6dd6ff] to-[#fbc2ff] bg-clip-text text-transparent">
                built for longevity
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.6s" }}
            >
              Thoughtful storytelling, lean content blocks, and a single accent color
              keep your brand feeling calm while still guiding visitors toward action.
              We focus on typography, spacing, and conversion data—nothing loud, just
              intentional design.
            </p>

            {/* Action Buttons */}
            <div
              className={`flex flex-col md:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <button className="group relative px-10 py-4 bg-gradient-to-r from-[#7c61ff] via-[#5c7dff] to-[#46c2ff] text-white text-base font-semibold rounded-2xl shadow-lg shadow-[#46c2ff]/30 hover:from-[#8a6dff] hover:to-[#4cd6ff] transition-all duration-300">
                <div className="relative flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  Start a project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <button className="px-10 py-4 border border-white/30 text-white text-base font-semibold rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
                See capabilities
              </button>
            </div>
          </div>
        </div>

        {/* Custom CSS */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-10px) rotate(5deg);
            }
            50% {
              transform: translateY(-20px) rotate(0deg);
            }
            75% {
              transform: translateY(-10px) rotate(-5deg);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-gradient-shift {
            animation: gradient-shift 3s ease infinite;
          }

          .bg-300% {
            background-size: 300% 300%;
          }
        `}</style>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              What is{" "}
              <span className="text-[#7D2492]">Ecommerce Marketing</span>{" "}
              Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ecommerce marketing is important for more than just online
              merchants and eCommerce marketers. It is intended for businesses
              with physical locations as well as an online presence. 56 percent
              of firms that use eCommerce digital marketing also have a physical
              location where they offer their products and services.
            </p>
          </motion.div>

          {/* Highlighted Info Cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 text-[#7D2492] rounded-full">
                  <Store size={28} />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    56% of firms
                  </span>{" "}
                  that use eCommerce digital marketing also have a{" "}
                  <span className="font-semibold">physical store</span> to offer
                  their products and services.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 text-[#7D2492] rounded-full">
                  <Globe size={28} />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ecommerce marketing allows businesses to{" "}
                  <span className="font-semibold">
                    expand into multiple locations
                  </span>
                  , reach a wider customer base, and boost revenue.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-12 p-6 bg-purple-50 border-l-4 border-[#7D2492] rounded-xl text-center"
          >
            <p className="text-gray-800 text-lg leading-relaxed flex items-center justify-center gap-2">
              <TrendingUp className="text-[#7D2492]" size={24} />
              Success depends on an{" "}
              <span className="font-semibold">
                effective ecommerce strategy
              </span>{" "}
              that scales with your business.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-br from-[#fdf2ff] via-[#f4f6ff] to-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header Section */}
          <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-[#f8ecff] to-[#e8f0ff] p-12 text-center shadow-xl shadow-purple-100/40">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500 mb-4">
              inside digital nawab
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
              What Digital Nawab Ecommerce Marketing Agency Does
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Strategy, creative, marketing, and technology sit under one calm roof. We collaborate with your team to
              remove clutter, solve complicated growth challenges, and keep every touchpoint intentional.
            </p>
          </div>

          {/* First Content Card */}
          <div className="bg-gradient-to-br from-white to-[#f4f7ff] border border-white/60 rounded-2xl p-8 shadow-lg shadow-indigo-100/60">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ede8ff] to-[#dff2ff] text-[#4c3ae6] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                A Digital Nawab eCommerce agency works as an embedded team. We pair smart creative with technical
                clarity so your objectives move forward without the noise of trend-chasing design.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-gradient-to-r from-[#fefbff] via-[#f2f8ff] to-[#fef9ff] border border-white/60 rounded-2xl p-10 shadow-xl shadow-blue-100/40">
            <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
              Our Full-Service Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-white to-[#f0f4ff] border border-white/60 flex items-center justify-center text-[#4c3ae6] shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Strategy</h3>
                    <p className="text-gray-600">Comprehensive planning and roadmaps rooted in data.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-white to-[#f0f4ff] border border-white/60 flex items-center justify-center text-[#4c3ae6] shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Creative</h3>
                    <p className="text-gray-600">Design systems that prioritize typography, spacing, and clarity.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-white to-[#f0f4ff] border border-white/60 flex items-center justify-center text-[#4c3ae6] shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Marketing</h3>
                    <p className="text-gray-600">Campaigns with measurable intent, not loud distractions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-white to-[#f0f4ff] border border-white/60 flex items-center justify-center text-[#4c3ae6] shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Technology</h3>
                    <p className="text-gray-600">Modern stacks that support agile content and reliable performance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/60 bg-white/80 backdrop-blur-sm p-6 text-center shadow-md">
              <p className="text-gray-600 leading-relaxed">
                We favour a quiet, full-service approach. Inbound marketing, intentional UX, and balanced technology work
                together so visitors feel confident and ready to convert without visual overload.
              </p>
            </div>
          </div>

          {/* Final Section */}
          <div className="bg-gradient-to-br from-white to-[#f3f6ff] border border-white/70 rounded-2xl p-8 shadow-lg shadow-purple-100/60">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ece9ff] to-[#dff4ff] text-[#4c3ae6] rounded-2xl flex items-center justify-center shadow-inner shadow-white/60">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Industry leadership</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We keep a close pulse on SEO, site design, and lead-generation trends so you don`t have to. Expect
                  clear recommendations, a shared operating cadence, and deliverables that feel as minimal as the UI we
                  ship.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-transparent bg-gradient-to-r from-[#7e5bff] via-[#5f82ff] to-[#48c2ff] text-white font-semibold shadow-lg shadow-[#48c2ff]/30 hover:translate-y-0.5 transition">
              Get started with Digital Nawab
            </button>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Ecommerce Marketing Strategy
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our eCommerce marketing is the process of directing traffic to your
            business, converting that traffic into purchases, and making your
            brand visible to the general public. Our eCommerce marketing
            concepts are dynamic; as the industry and audiences change, so must
            your approach to ensure that you always get the highest ROI rates.
          </motion.p>
          <motion.p
            className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choosing the appropriate approach and adapting it to produce the
            desired outcomes is half the fight won.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-[#7D2492] mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Ecommerce Marketing Services
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {/* SEO */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-start hover:shadow-2xl transition duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Search className="w-12 h-12 text-[#7D2492] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Search Engine Optimization (SEO)</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Getting more traffic is often at the top of every business owner`s thoughts. SEO increases organic (free, natural) traffic from search engines such as Google, Bing, and Yahoo. The goal is to have your product pages appear in the top 10 organic search results. There are, of course, many more pages to explore.
              </p>
            </motion.div>

            {/* SMM */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-start hover:shadow-2xl transition duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Share2 className="w-12 h-12 text-[#7D2492] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Social Media Marketing (SMM)</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Social media marketing is a crucial avenue for business growth. 75% of consumers admit to buying something after seeing it on social media, and 90% use it to help make purchasing decisions. A reasonable budget ensures your efforts generate the conversions and sales you desire.
              </p>
            </motion.div>

            {/* PPC */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-start hover:shadow-2xl transition duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <MousePointerClick className="w-12 h-12 text-[#7D2492] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Pay-per-Click Advertising (PPC)</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                PPC for eCommerce is an online advertising method that promotes your store and items on search engines, social media, and websites. You only pay when someone clicks on your ad, targeting ready-to-buy customers to drive instant traffic and sales.
              </p>
            </motion.div>

            {/* Email Marketing */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-start hover:shadow-2xl transition duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Mail className="w-12 h-12 text-[#7D2492] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Email Marketing</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Ecommerce email marketing uses email to promote your store`s items to existing or potential customers. It helps increase user engagement, client loyalty, share important information, advertise deals, and ultimately boost sales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#eef6ff] via-white to-[#fcf4ff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">marketplace advertising</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">Lean marketplace advertising</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A softer palette paired with sharp data points keeps marketplace reporting calm yet credible.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-white via-[#eef3ff] to-[#f8edff] p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xl shadow-indigo-100/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ece9ff] to-[#dff2ff] text-[#4c3ae6] flex items-center justify-center shadow-inner shadow-white/70">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-gray-900">190</p>
                  <p className="text-sm uppercase tracking-widest text-gray-500">searches every second on amazon</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                We surface only the signals that matter so teams can react without dashboard fatigue.
              </p>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white via-[#f2f5ff] to-[#fef7ff] border border-white/70 rounded-2xl p-8 shadow-lg shadow-indigo-100/60">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#ece9ff] text-[#4c3ae6] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Multiple revenue streams</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-3">
                      Amazon and other marketplaces create calm add-on income streams. We pair organic lift with
                      retargeting and lookalike modelling without overwhelming users with colour overload.
                    </p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  {[
                    "Increase organic rankings",
                    "Advanced retargeting capabilities",
                    "AI-powered lookalike modeling",
                    "Algorithm-informed merchandising",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#4c3ae6]" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Optimization Card */}
              <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-[#f7f2ff] to-[#ebf6ff] p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white to-[#f0f4ff] border border-white/60 flex items-center justify-center text-[#4c3ae6] shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Smart ROI optimisation</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We protect budgets by advertising only when stock is healthy. Simple alerts and tidy dashboards keep
                  teams focused on action over aesthetics.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/70 shadow-2xl shadow-indigo-200/50">
                <img loading="lazy" decoding="async"
                  src="https://www.roihunt.in/wp-content/uploads/2020/09/desktop-and-phone.jpg-1-1-1.webp"
                  alt="Desktop and mobile marketplace advertising interface"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-6 -left-6 bg-white/90 border border-white/60 rounded-xl p-4 shadow-lg backdrop-blur-md">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Monitoring</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white/90 border border-white/60 rounded-xl p-4 shadow-lg backdrop-blur-md">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">ROI</p>
                  <p className="text-sm text-gray-500">Optimised</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Growth tracking",
                copy: "Monitor marketplace performance in real-time with restrained visual layers.",
              },
              {
                title: "Cost efficiency",
                copy: "Reduce wasted ad spend with smart inventory and pacing controls.",
              },
              {
                title: "AI optimisation",
                copy: "Leverage machine learning for targeting without overwhelming insights.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-white via-[#f6f3ff] to-[#eef6ff] border border-white/70 rounded-xl p-6 text-left shadow-lg shadow-indigo-100/60 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ece9ff] to-[#dff2ff] text-[#4c3ae6] flex items-center justify-center shadow-inner shadow-white/60">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      <section className="py-20 bg-gradient-to-br from-[#f6f7ff] via-white to-[#fff2fb] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ece9ff] to-[#dff2ff] text-[#4c3ae6] mb-6 shadow-inner shadow-white/60">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">social media outreach</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">Social media outreach</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Warm colours, balanced whitespace, and a single accent hue keep social reporting modern and calm.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Instagram Stats */}
            <div className="bg-gradient-to-br from-white via-[#fff5fb] to-[#f0f4ff] border border-white/70 rounded-3xl p-8 shadow-lg shadow-pink-100/60">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ffeef5] text-[#e4579c] flex items-center justify-center mr-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Instagram</h2>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">daily engagement</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-semibold text-gray-900 mb-2">30</p>
                  <p className="text-gray-500 text-sm">Minutes per day</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-semibold text-gray-900 mb-2">75%</p>
                  <p className="text-gray-500 text-sm">Make investment choices</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Instagram users spend an average of <span className="font-semibold text-gray-900">30 minutes daily</span>.
                  <span className="font-semibold text-gray-900"> 75% </span>cite posts as influence for investment decisions.
                </p>
              </div>
            </div>

            {/* Facebook Stats */}
            <div className="bg-gradient-to-br from-white via-[#eef4ff] to-[#fdf7ff] border border-white/70 rounded-3xl p-8 shadow-lg shadow-blue-100/60">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#e4f0ff] text-[#3970ff] flex items-center justify-center mr-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Facebook</h2>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">daily usage</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-semibold text-gray-900 mb-2">40</p>
                  <p className="text-gray-500 text-sm">Minutes per day</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-semibold text-gray-900 mb-2">30%</p>
                  <p className="text-gray-500 text-sm">Investment influenced</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Facebook still commands <span className="font-semibold text-gray-900">40 minutes daily</span>, impacting
                  <span className="font-semibold text-gray-900"> 30% </span>of purchase choices when paired with clear messaging.
                </p>
              </div>
            </div>
          </div>

          {/* Solutions Grid */}
          <div>
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Our strategic solutions</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Advanced planning tools",
                  copy: "Frameworks that break down platform silos and map unified, minimal campaigns.",
                },
                {
                  title: "Comprehensive testing",
                  copy: "Rigorous A/B methodologies uncover true incrementality without noisy dashboards.",
                },
                {
                  title: "Silo-breaking analytics",
                  copy: "Cross-platform attribution models with digestible, monochrome reporting.",
                },
              ].map((solution) => (
                <div key={solution.title} className="bg-gradient-to-br from-white via-[#f5f3ff] to-[#eef6ff] border border-white/70 rounded-2xl p-6 shadow-lg shadow-indigo-100/60">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ece9ff] to-[#dff2ff] text-[#4c3ae6] flex items-center justify-center mb-4 shadow-inner shadow-white/60">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{solution.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Actions speak louder than words. Discover how we`ve transformed businesses with our innovative digital solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium">
                    View Project
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {study.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {study.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    </>
  );
}

export default Ecommerce;
