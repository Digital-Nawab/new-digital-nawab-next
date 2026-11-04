"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  ShieldCheck,
  Layers,
  Search,
  MousePointerClick,
  Globe,
  Building2,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Compass,
  Factory,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  HelpCircle,
  Send,
  FileText,
  BarChart3,
  Clock,
  Star,
  Laptop,
  Palette,
  DollarSign,
  Megaphone,
  UserCheck,
  MessageSquare,
  Award,
  Zap,
  Store,
  SlidersHorizontal,
  Rocket,
  Crown,
  Flame,
} from "lucide-react";
import ContactPopup from "@/components/ContactPopup";

export default function PackagesPage() {
  // Active Package Category for Section 05 tabs ('seo', 'social', 'google-ads', 'web-dev', 'meta-ads')
  const [activeCategory, setActiveCategory] = useState("seo");
  const [currency, setCurrency] = useState("INR"); // 'INR' or 'USD'

  // State for active FAQ accordion (first open by default)
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    budget: "",
    requirements: "",
    services: [],
    privacyConsent: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Toggle FAQ
  const selectPackageAndEnquire = (packageName, serviceName) => {
    if (serviceName && !formData.services.includes(serviceName)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceName],
        requirements: prev.requirements
          ? `${prev.requirements}\nInterested in: ${packageName}`
          : `Interested in: ${packageName}`,
      }));
    }
    scrollTo("enquiry-form");
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle Services Multi-Select
  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceName)
          : [...prev.services, serviceName],
      };
    });
    if (formErrors.services) {
      setFormErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.businessName.trim())
      errors.businessName = "Business name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+-\s]{10,15}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    if (formData.services.length === 0) {
      errors.services = "Please select at least one service";
    }
    if (!formData.privacyConsent) {
      errors.privacyConsent = "Please agree to the privacy policy";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Backend submission or notification handler
      const res = await fetch("https://dashboard.digitalnawab.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          company: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          website: formData.websiteUrl,
          budget: formData.budget,
          services: formData.services.join(", "),
          message: formData.requirements,
          source: "Packages Page Quote Request",
        }),
      }).catch(() => null);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        websiteUrl: "",
        budget: "",
        requirements: "",
        services: [],
        privacyConsent: false,
      });
    } catch (err) {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }
  };

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Comparison Table Data
  const comparisonRows = [
    {
      feature: "SEO Strategy & Roadmapping",
      starter: "Foundational",
      business: "Comprehensive",
      advanced: "Full Enterprise",
    },
    {
      feature: "Keyword Research & Mapping",
      starter: "Local Focus (15–20)",
      business: "Competitive (30–50)",
      advanced: "Advanced National / Global",
    },
    {
      feature: "On-Page SEO Optimization",
      starter: "Core Web Pages",
      business: "Expanded Architecture",
      advanced: "Full-Funnel Site Architecture",
    },
    {
      feature: "Social Media Planning",
      starter: "1–2 Channels",
      business: "Multi-Channel (3+ Platforms)",
      advanced: "Omnichannel Brand Production",
    },
    {
      feature: "Paid Ads Management (PPC/Meta)",
      starter: "Optional Add-on",
      business: "Active Campaign Management",
      advanced: "Multi-Platform AI Scale",
    },
    {
      feature: "Content & Creative Planning",
      starter: "Content Recommendations",
      business: "Monthly Content Calendar",
      advanced: "High-Converting Content Studio",
    },
    {
      feature: "Lead Generation & CRO Review",
      starter: "Basic Form Audit",
      business: "Conversion Funnel Planning",
      advanced: "End-to-End CRO & Retention",
    },
    {
      feature: "Performance Reports",
      starter: "Monthly Summary",
      business: "Bi-Weekly Detailed Review",
      advanced: "Weekly Live Dashboard & Review",
    },
    {
      feature: "Dedicated Strategy Review",
      starter: "Quarterly Alignment",
      business: "Monthly Strategy Call",
      advanced: "Dedicated Senior Account Lead",
    },
  ];

  // 12 FAQs Data
  const faqs = [
    {
      q: "What are digital marketing packages?",
      a: "Digital marketing packages are structured service bundles combining key digital capabilities—such as SEO, Google Ads (PPC), social media marketing, content planning, and website optimization—into a predictable monthly roadmap. They provide businesses with defined deliverables, specialized multi-channel expertise, and disciplined execution.",
    },
    {
      q: "How much do digital marketing packages cost?",
      a: "Package costs vary based on your business stage, target market, competitive difficulty, and agreed service scope. Digital Nawab provides custom, transparent quotations based on your specific deliverables and objectives rather than rigid one-size-fits-all pricing.",
    },
    {
      q: "Which digital marketing package is suitable for a small business?",
      a: "For startups and small businesses, the Starter Growth package is typically optimal. It focuses on core local SEO, Google Business Profile visibility, baseline social media presence, and website performance to generate immediate local awareness on a comfortable budget.",
    },
    {
      q: "Can I choose only SEO services?",
      a: "Yes, absolutely. We offer dedicated, service-specific SEO packages covering technical audits, on-page optimization, content strategy, and high-authority link acquisition if organic Google rankings are your primary goal.",
    },
    {
      q: "Do digital marketing packages include Google Ads?",
      a: "Our multi-channel packages (such as Business Growth and Advanced Performance) include comprehensive Google Ads management, search campaigns, and conversion tracking. We also provide standalone PPC management packages.",
    },
    {
      q: "Can I customise a digital marketing package?",
      a: "Yes. Every business has distinct requirements. We regularly build customized packages combining specific services (for example, Ecommerce SEO + Meta Ads, or Web Development + Google Ads) to suit your unique commercial timeline and budget.",
    },
    {
      q: "How long does SEO take to show results?",
      a: "Organic SEO typically generates measurable ranking and crawl improvements within 60 to 90 days, with significant traffic and lead compounding across 4 to 6 months. Timelines depend on domain age, current technical health, and competitive keyword landscape.",
    },
    {
      q: "Are digital marketing packages available monthly?",
      a: "Yes. Our digital marketing packages operate on flexible monthly retainer cycles. We believe in earning your partnership every month through verifiable results and transparent reporting rather than enforcing restrictive long-term lock-ins.",
    },
    {
      q: "Can I upgrade my package later?",
      a: "Certainly. As your business scales and requires broader geographical reach, higher ad spend management, or multi-channel expansion, you can upgrade your package at the start of any billing month.",
    },
    {
      q: "Do you guarantee Google rankings or leads?",
      a: "No ethical agency can guarantee specific #1 Google rankings or exact lead volumes, as search algorithms and market conditions are governed by hundreds of independent factors. Digital Nawab guarantees disciplined white-hat execution, agreed deliverables, transparent analytics, and continuous optimization to maximize qualified customer enquiries.",
    },
    {
      q: "Is advertising budget included in Google Ads management fees?",
      a: "No. Our package fees cover professional management, campaign strategy, audience testing, ad copy, and daily performance tuning. The media advertising spend is paid directly by you to Google or Meta through your own card, ensuring total financial transparency.",
    },
    {
      q: "How can I get a quotation from Digital Nawab?",
      a: "You can submit the enquiry form below, call our team directly at 08860757649 / +91 93356 21987, or reach out via WhatsApp. Our strategists will review your website and objectives to deliver a tailored quotation.",
    },
  ];

  return (
    <div className="bg-[#07090e] text-white min-h-screen selection:bg-purple-500/30 selection:text-purple-200">
      {/* =========================================================
          SECTION 02 – HERO SECTION
      ========================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>DIGITAL MARKETING SOLUTIONS</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              </div>

              {/* Single H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.14]">
                Digital Marketing Packages for{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Every Business
                </span>
              </h1>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Choose the right digital marketing package to strengthen your
                online presence, reach your target audience and generate
                meaningful business enquiries. From SEO and social media
                marketing to Google Ads and complete digital growth solutions,
                Digital Nawab offers flexible strategies aligned with your
                business goals.
              </p>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollTo("main-packages")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-xl shadow-purple-600/30 cursor-pointer"
                >
                  <span>Explore Our Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollTo("enquiry-form")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-md cursor-pointer"
                >
                  <span>Get a Free Consultation</span>
                </button>
              </div>

              {/* Breadcrumb strip */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-gray-400">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>/</span>
                <span className="text-purple-300 font-medium">Packages</span>
              </div>
            </motion.div>

            {/* Right Column: 3D Marketing Graphic / Analytics Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-orange-500/20 to-blue-500/30 shadow-2xl shadow-purple-500/20">
                <div className="rounded-[22px] bg-[#0c101c] border border-white/10 p-6 sm:p-7 space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                      <span className="ml-2 text-xs font-mono text-gray-400">digitalnawab-growth-engine</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Multi-Channel Live
                    </span>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Organic Search</span>
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-black text-white">+245%</div>
                      <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                        <span>↑ High-intent keywords</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Paid ROI (ROAS)</span>
                        <Target className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="text-2xl font-black text-white">4.8x</div>
                      <div className="text-[11px] text-orange-300 mt-1 flex items-center gap-1">
                        <span>Targeted ad spend</span>
                      </div>
                    </div>
                  </div>

                  {/* Growth Chart Simulation */}
                  <div className="rounded-xl bg-gradient-to-br from-purple-950/40 via-blue-950/20 to-transparent border border-white/5 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-300">Conversion Growth Velocity</span>
                      <span className="text-purple-400 font-mono font-bold">Q1-Q4 Scale</span>
                    </div>
                    <div className="flex items-end gap-2 h-20 pt-2">
                      {[40, 58, 48, 70, 65, 84, 76, 92, 88, 100].map((val, idx) => (
                        <div key={idx} className="flex-1 bg-white/5 rounded-t hover:bg-purple-500/40 transition-colors h-full flex items-end">
                          <div
                            style={{ height: `${val}%` }}
                            className="w-full bg-gradient-to-t from-purple-600 via-pink-500 to-orange-400 rounded-t"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channel Highlights */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-300">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="font-bold text-white text-sm">SEO</div>
                      <div className="text-[10px] text-purple-300">Page 1 Focus</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="font-bold text-white text-sm">Google Ads</div>
                      <div className="text-[10px] text-orange-300">Lead Funnels</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="font-bold text-white text-sm">Social Media</div>
                      <div className="text-[10px] text-blue-300">Brand Reach</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 03 – TRUST HIGHLIGHTS
      ========================================================= */}
      <section className="py-16 md:py-20 border-b border-white/5 bg-[#0a0d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                title: "Goal-Based Strategies",
                desc: "Marketing plans aligned with your business objectives.",
              },
              {
                icon: SlidersHorizontal,
                color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
                title: "Flexible Packages",
                desc: "Solutions based on your requirements and budget.",
              },
              {
                icon: ShieldCheck,
                color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                title: "Clear Deliverables",
                desc: "Defined activities, scope and service expectations.",
              },
              {
                icon: BarChart3,
                color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
                title: "Performance Monitoring",
                desc: "Regular monitoring and reporting of agreed activities.",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 04 – PACKAGE CATEGORIES
      ========================================================= */}
      <section id="package-categories" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              SERVICE-SPECIFIC ROADMAPS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Digital Marketing Packages Based on Your Needs
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Explore service-specific packages designed to support different
              business requirements, from improving search visibility to
              generating leads and building a stronger online presence.
            </p>
          </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                key: "seo",
                icon: Search,
                accent: "from-blue-500/20 to-transparent",
                borderColor: "hover:border-cyan-500/50",
                iconColor: "text-cyan-400",
                title: "SEO Packages",
                desc: "Dominate search engine rankings, attract high-intent organic visitors, and establish long-term authority in your industry.",
                ctaText: "Explore SEO Packages",
              },
              {
                key: "social",
                icon: Megaphone,
                accent: "from-pink-500/20 to-transparent",
                borderColor: "hover:border-pink-500/50",
                iconColor: "text-pink-400",
                title: "Social Media Packages",
                desc: "Engage your audience with professional creative design, storytelling, and targeted brand visibility across Instagram, Facebook, and LinkedIn.",
                ctaText: "Explore Social Packages",
              },
              {
                key: "google-ads",
                icon: MousePointerClick,
                accent: "from-orange-500/20 to-transparent",
                borderColor: "hover:border-orange-500/50",
                iconColor: "text-orange-400",
                title: "Google Ads Packages",
                desc: "Capture immediate commercial demand with high-converting search ads, Google Shopping, Performance Max, and optimized PPC bidding.",
                ctaText: "Explore Google Ads",
              },
              {
                key: "web-dev",
                icon: Laptop,
                accent: "from-teal-500/20 to-transparent",
                borderColor: "hover:border-teal-500/50",
                iconColor: "text-teal-400",
                title: "Website Development Packages",
                desc: "Fast, responsive, conversion-engineered corporate and custom web development designed to turn website visitors into qualified enquiries.",
                ctaText: "Explore Web Packages",
              },
              {
                key: "meta-ads",
                icon: Target,
                accent: "from-cyan-500/20 to-transparent",
                borderColor: "hover:border-cyan-500/50",
                iconColor: "text-cyan-400",
                title: "Meta Ads Packages",
                desc: "Targeted Facebook & Instagram advertising campaigns engineered to build brand awareness, drive qualified clicks, and maximize ROAS with precision retargeting.",
                ctaText: "Explore Meta Ads",
              },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    scrollTo("main-packages");
                  }}
                  className={`rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 ${cat.borderColor} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${cat.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                    >
                      <span>{cat.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 05 – PACKAGES DISPLAY (REDESIGNED 1:1 TO VERCEL APP)
      ========================================================= */}
      <section id="main-packages" className="py-20 md:py-28 bg-[#07090e] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Bar: The 5 Category Tabs */}
          <div className="flex justify-center overflow-x-auto max-w-full py-2 mb-6">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-1 sm:gap-2">
              {[
                { key: "seo", title: "SEO Packages", icon: Search },
                { key: "social", title: "Social Media Packages", icon: Megaphone },
                { key: "google-ads", title: "Google Ads Packages", icon: MousePointerClick },
                { key: "web-dev", title: "Website Development Packages", icon: Laptop },
                { key: "meta-ads", title: "Meta Ads Packages", icon: Target },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Currency Toggle (Broken into its own line below tabs) */}
          <div className="flex justify-center items-center mb-12">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 shadow-md">
              <span className="text-xs text-gray-400 uppercase tracking-wider pl-3 pr-1 font-medium">Currency:</span>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>INR (₹)</span>
                {currency === "INR" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>USD ($)</span>
                {currency === "USD" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* TAB 1: SEO PACKAGES (Exact from Image 2 & Vercel App) */}
          {activeCategory === "seo" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  ORGANIC VISIBILITY RETAINERS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Search Engine Optimization (SEO) Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Dominate your niche with comprehensive SEO packages designed to boost rankings, earn backlinks, and drive organic traffic.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {[
                  {
                    id: "local-starter",
                    title: "Local Starter",
                    popular: false,
                    icon: Target,
                    description: "Perfect for local service providers, clinics, and restaurants looking to dominate their local catchment area.",
                    price: { INR: "₹10,000", USD: "$120" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "Local Service Providers, Clinics, Restaurants",
                    serviceName: "SEO",
                    features: [
                      { label: "Target Locations", value: "1–2 Cities" },
                      { label: "Website Pages Optimized", value: "Up to 10 Pages" },
                      { label: "Keyword Research", value: "Local Keyword Focus" },
                      { label: "On-Page SEO", value: "Meta, H1, URL & Alt Tags" },
                      { label: "Technical SEO", value: "Basic Audit & Fixes" },
                      { label: "Local Business Listings", value: "GMB + 3 Citations" },
                    ],
                  },
                  {
                    id: "standard-growth",
                    title: "Standard Growth",
                    popular: true, // Most Popular in source
                    icon: TrendingUp,
                    description: "Accelerate your search visibility with comprehensive SEO strategies built for expanding regional & national brands.",
                    price: { INR: "₹20,000", USD: "$240" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "National SMEs, B2B Corporates, Scaling Brands",
                    serviceName: "SEO",
                    features: [
                      { label: "Target Locations", value: "Country-Wide" },
                      { label: "Website Pages Optimized", value: "Up to 20 Pages" },
                      { label: "Keyword Research", value: "Competitive & Industry Research" },
                      { label: "On-Page SEO", value: "Advanced Tags + Internal Linking" },
                      { label: "Technical SEO", value: "Full Audit + Speed & Crawl Fixes" },
                      { label: "Local Listings", value: "GMB + 10+ Citations" },
                    ],
                  },
                  {
                    id: "ecommerce-seo",
                    title: "E-Commerce SEO",
                    popular: false,
                    icon: Store,
                    description: "Specialized search engine optimization engineered specifically for Shopify, WooCommerce, and Magento stores.",
                    price: { INR: "₹35,000", USD: "$420" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "Online Stores (Shopify, WooCommerce, Magento)",
                    serviceName: "SEO",
                    features: [
                      { label: "Target Locations", value: "Country + Targeted Regions" },
                      { label: "Website Pages Optimized", value: "Up to 50 Product/Category Pages" },
                      { label: "Keyword Research", value: "Product-Based + Category Targeting" },
                      { label: "On-Page SEO", value: "Product Schema Markup + PDP Optimization" },
                      { label: "Technical SEO", value: "Mobile UX + Structured Data" },
                      { label: "Local & Rich Snippets", value: "GMB + Product Rich Snippets" },
                    ],
                  },
                  {
                    id: "global-seo",
                    title: "Global SEO",
                    popular: false,
                    icon: Globe,
                    description: "Enterprise-grade SEO architecture for global brands, SaaS platforms, and multilingual multi-domain web applications.",
                    price: { INR: "₹50,000", USD: "$600" },
                    period: "+/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "SaaS, Global Brands, Multilingual Sites",
                    serviceName: "SEO",
                    features: [
                      { label: "Target Locations", value: "Multi-Country & Multi-Language" },
                      { label: "Website Pages Optimized", value: "50+ Enterprise Pages" },
                      { label: "Keyword Research", value: "Multilingual & Geo-Based Research" },
                      { label: "On-Page SEO", value: "Region-Specific Hreflang & Tags" },
                      { label: "Technical SEO", value: "Multi-Domain/Subfolder Architecture" },
                      { label: "Directory Submissions", value: "Global Authoritative Directories" },
                    ],
                  },
                ].map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-[#0b0f19] border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-bold text-[11px] shadow-md tracking-wider uppercase">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono block mt-1">
                            {plan.retainerNote}
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            TARGET AUDIENCE:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <button
                          onClick={() => selectPackageAndEnquire(plan.title, plan.serviceName)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        >
                          Get Started with {plan.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL MEDIA PACKAGES */}
          {activeCategory === "social" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  SOCIAL ENGAGEMENT & BRAND VISIBILITY
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Social Media Marketing Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Engage your target audience across Instagram, Facebook, and LinkedIn with creative designs, reels, and data-backed storytelling.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    id: "starter-social",
                    title: "Starter Social",
                    popular: false,
                    icon: Sparkles,
                    description: "Build a consistent social presence with branded visuals, community updates, and focused hashtag optimization.",
                    price: { INR: "₹12,000", USD: "$145" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "Startups, Local Clinics, Service Brands",
                    serviceName: "Social Media Marketing",
                    features: [
                      { label: "Creative Posts", value: "12 Branded Graphics / Month" },
                      { label: "Platforms Covered", value: "Instagram & Facebook" },
                      { label: "Content Copywriting", value: "Engaging Captions & Callouts" },
                      { label: "Hashtag Strategy", value: "Niche Research & Trend Align" },
                      { label: "Story Management", value: "4 Weekly Interactive Stories" },
                      { label: "Performance Report", value: "Monthly Reach & Growth Review" },
                    ],
                  },
                  {
                    id: "growth-social",
                    title: "Growth Social",
                    popular: true,
                    icon: TrendingUp,
                    description: "Accelerate audience engagement and follower growth with dynamic Reels, carousel infographics, and interactive stories.",
                    price: { INR: "₹22,000", USD: "$265" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "Growing D2C Brands, B2B Companies, Retailers",
                    serviceName: "Social Media Marketing",
                    features: [
                      { label: "Creative Posts", value: "20 Graphics + 4 Reels / Month" },
                      { label: "Platforms Covered", value: "Instagram, Facebook & LinkedIn" },
                      { label: "Video Production", value: "Short-Form Video Editing & Hooks" },
                      { label: "Community Engagement", value: "Active Comment & DM Moderation" },
                      { label: "Carousel Guides", value: "High-Save Educational Carousels" },
                      { label: "Strategy Reviews", value: "Bi-Weekly Optimization Calls" },
                    ],
                  },
                  {
                    id: "brand-authority",
                    title: "Brand Authority",
                    popular: false,
                    icon: Crown,
                    description: "Establish undisputed brand leadership with high-production video storytelling, executive personal branding, and multi-channel campaigns.",
                    price: { INR: "₹38,000", USD: "$455" },
                    period: "/month",
                    retainerNote: "Monthly retainer • No lock-in",
                    targetAudience: "Established Enterprises, Founders & Scaling Brands",
                    serviceName: "Social Media Marketing",
                    features: [
                      { label: "Creative Posts", value: "30 Mixed Creatives (Reels, Motion, 3D)" },
                      { label: "Platforms Covered", value: "All Major Platforms (IG, FB, LI, X, YT)" },
                      { label: "Executive Branding", value: "Founder / C-Level Thought Leadership" },
                      { label: "Influencer Strategy", value: "Creator Outreach & Collab Planning" },
                      { label: "Trend Jacking", value: "Real-Time Viral Moment Marketing" },
                      { label: "Executive Reporting", value: "Dedicated Senior Social Strategist" },
                    ],
                  },
                ].map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-[#0b0f19] border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-bold text-[11px] shadow-md tracking-wider uppercase">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono block mt-1">
                            {plan.retainerNote}
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            TARGET AUDIENCE:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <button
                          onClick={() => selectPackageAndEnquire(plan.title, plan.serviceName)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        >
                          Get Started with {plan.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE ADS PACKAGES */}
          {activeCategory === "google-ads" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  PAID SEARCH & COMMERCIAL DEMAND
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Google Ads & PPC Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Capture immediate commercial demand with high-converting search ads, Google Shopping, Performance Max, and optimized PPC bidding.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    id: "search-starter",
                    title: "Search Starter",
                    popular: false,
                    icon: MousePointerClick,
                    description: "Target immediate high-intent buyers searching directly for your services on Google Search with tightly managed ad spend.",
                    price: { INR: "₹12,000", USD: "$145" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Local Service Businesses, Clinics, Consultancies",
                    serviceName: "Google Ads / PPC",
                    features: [
                      { label: "Campaign Type", value: "Google Search & Call Ads" },
                      { label: "Keyword Sculpting", value: "Negative Keywords & Match Types" },
                      { label: "Ad Copywriting", value: "Up to 5 Responsive Search Ads (RSA)" },
                      { label: "Tracking Setup", value: "Google Tag Manager & Call Tracking" },
                      { label: "Geotargeting", value: "Radius & City-Level Geo-Fencing" },
                      { label: "Reporting", value: "Monthly Transparent Spend & Leads Report" },
                    ],
                  },
                  {
                    id: "performance-growth",
                    title: "Performance Growth",
                    popular: true,
                    icon: Zap,
                    description: "Scale qualified enquiries and sales with combined Google Search, Display Remarketing, and Call-Only ad funnels.",
                    price: { INR: "₹22,000", USD: "$265" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Growing SMEs, Real Estate, B2B Corporates",
                    serviceName: "Google Ads / PPC",
                    features: [
                      { label: "Campaign Types", value: "Search + Display Remarketing Funnels" },
                      { label: "Bid Optimization", value: "Smart Bidding (Target CPA / ROAS)" },
                      { label: "Landing Page CRO", value: "Conversion Rate Optimization Review" },
                      { label: "Ad Extensions", value: "Sitelinks, Callouts, Structured Snippets" },
                      { label: "Audience Slicing", value: "In-Market & Affinity Audiences" },
                      { label: "Strategic Reviews", value: "Bi-Weekly CPL & Funnel Review Calls" },
                    ],
                  },
                  {
                    id: "scale-pmax",
                    title: "Scale & Performance Max",
                    popular: false,
                    icon: Flame,
                    description: "Unleash Google's full AI advertising power across YouTube, Gmail, Maps, Search, and Shopping in unified Performance Max campaigns.",
                    price: { INR: "₹38,000", USD: "$455" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Ecommerce Brands, Multi-City Chains & Scale-ups",
                    serviceName: "Google Ads / PPC",
                    features: [
                      { label: "Campaign Types", value: "Performance Max (PMax) + YouTube Video" },
                      { label: "Merchant Center", value: "Google Shopping Feed Tuning & Schema" },
                      { label: "Creative Assets", value: "Video Ads, Banners & Responsive Sets" },
                      { label: "First-Party Data", value: "Customer Match & Offline Conversions" },
                      { label: "Budget Pacing", value: "Dynamic Real-Time Budget Reallocation" },
                      { label: "Dedicated Manager", value: "Dedicated Senior Google Ads Lead" },
                    ],
                  },
                ].map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-[#0b0f19] border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-bold text-[11px] shadow-md tracking-wider uppercase">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono block mt-1">
                            {plan.retainerNote}
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            TARGET AUDIENCE:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <button
                          onClick={() => selectPackageAndEnquire(plan.title, plan.serviceName)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        >
                          Get Started with {plan.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: WEBSITE DEVELOPMENT PACKAGES */}
          {activeCategory === "web-dev" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  CONVERSION-FOCUSED WEB ARCHITECTURE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Website Development Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Modern, lightning-fast, and responsive websites engineered to build trust and convert visitors into active leads.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    id: "starter-web",
                    title: "Starter Business Website",
                    popular: false,
                    icon: Laptop,
                    description: "A clean, modern, and mobile-friendly corporate website designed to establish instant digital credibility.",
                    price: { INR: "₹25,000", USD: "$300" },
                    period: "One-Time",
                    retainerNote: "Fixed Project Scope • No Recurring Dev Fee",
                    targetAudience: "Startups, Independent Consultants, Local Practices",
                    serviceName: "Website Design and Development",
                    features: [
                      { label: "Pages Included", value: "5–8 Custom Responsive Pages" },
                      { label: "Tech Stack", value: "Modern Next.js / Tailwind CSS" },
                      { label: "SEO Baseline", value: "Meta Tags, Schema Markup & Sitemap" },
                      { label: "Lead Capture", value: "Contact Forms & WhatsApp Direct Chat" },
                      { label: "Infrastructure", value: "SSL Setup, Domain & High-Speed Cloud" },
                      { label: "Maintenance", value: "1 Month Complimentary Post-Launch Care" },
                    ],
                  },
                  {
                    id: "growth-corporate",
                    title: "Growth Corporate & CMS",
                    popular: true,
                    icon: Building2,
                    description: "Dynamic, scalable corporate web portal with easy-to-use content management, blog architecture, and high conversion funnels.",
                    price: { INR: "₹45,000", USD: "$550" },
                    period: "One-Time",
                    retainerNote: "Milestone-Based Delivery • Fully Custom",
                    targetAudience: "Growing SMEs, B2B Companies, Healthcare, Schools",
                    serviceName: "Website Design and Development",
                    features: [
                      { label: "Pages Included", value: "10–18 Pages + Dynamic Blog CMS" },
                      { label: "Interactive UI", value: "Micro-Interactions & Modern Motion" },
                      { label: "Core Web Vitals", value: "90+ PageSpeed & Speed Optimization" },
                      { label: "Lead Magnets", value: "CRM Integration, Webhooks & Analytics" },
                      { label: "Custom Architecture", value: "Tailored Information Architecture" },
                      { label: "Maintenance", value: "3 Months Dedicated Maintenance & Updates" },
                    ],
                  },
                  {
                    id: "custom-ecom",
                    title: "Custom E-Commerce Store",
                    popular: false,
                    icon: ShoppingBag,
                    description: "Full-featured online store engineered for high conversions, effortless checkout, and seamless inventory management.",
                    price: { INR: "₹75,000", USD: "$900" },
                    period: "One-Time",
                    retainerNote: "Turnkey Ecom Delivery • Scalable Store",
                    targetAudience: "D2C Brands, Retail Chains, Multi-Product Sellers",
                    serviceName: "Website Design and Development",
                    features: [
                      { label: "Store Platform", value: "Shopify / WooCommerce / Headless" },
                      { label: "Catalog Scale", value: "Unlimited Products, Collections & Filters" },
                      { label: "Payment & Shipping", value: "Multi-Gateway Integration (Razorpay, etc.)" },
                      { label: "Conversion Funnels", value: "1-Click Checkout & Cart Recovery" },
                      { label: "Rich Schemas", value: "Product Schema, Reviews & Merchant Center" },
                      { label: "Training & Care", value: "Complete Admin Training + 6 Months Support" },
                    ],
                  },
                ].map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-[#0b0f19] border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-bold text-[11px] shadow-md tracking-wider uppercase">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono block mt-1">
                            {plan.retainerNote}
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            TARGET AUDIENCE:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <button
                          onClick={() => selectPackageAndEnquire(plan.title, plan.serviceName)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        >
                          Get Started with {plan.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: META ADS PACKAGES */}
          {activeCategory === "meta-ads" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                  META PERFORMANCE ADVERTISING
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Meta Ads (Facebook & Instagram) Packages
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Data-driven Facebook and Instagram advertising campaigns engineered to drive brand discovery, qualified leads, and measurable ROAS.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    id: "meta-launch",
                    title: "Meta Launch",
                    popular: false,
                    icon: Target,
                    description: "The essential starting point for launching targeted Facebook & Instagram ads with disciplined budget pacing.",
                    price: { INR: "₹10,000", USD: "$120" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Emerging Brands, Local Businesses, Early Startups",
                    serviceName: "Meta Ads (Facebook & Instagram)",
                    features: [
                      { label: "Ad Creatives", value: "Up to 6 Custom High-Converting Static Ads" },
                      { label: "Platforms", value: "Facebook & Instagram Feeds / Stories" },
                      { label: "Targeting", value: "Core Demographics & Interest Mapping" },
                      { label: "Pixel & Tracking", value: "Meta Pixel & Baseline Event Setup" },
                      { label: "Copywriting", value: "2 Tested Ad Copy Angle Variations" },
                      { label: "Reporting", value: "Monthly Performance & Spend Summary" },
                    ],
                  },
                  {
                    id: "meta-accelerate",
                    title: "Meta Accelerate",
                    popular: true,
                    icon: Zap,
                    description: "Scale customer volume and orders with dynamic video hooks, carousel catalog ads, and custom lookalike funnels.",
                    price: { INR: "₹20,000", USD: "$240" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Growth-Stage Brands, D2C Ecommerce, Lead Gen",
                    serviceName: "Meta Ads (Facebook & Instagram)",
                    features: [
                      { label: "Ad Creatives", value: "12 Creatives (Statics, Carousels & Video Reels)" },
                      { label: "Audiences", value: "Custom Audiences & Lookalikes (LAL 1-5%)" },
                      { label: "Tracking Tech", value: "Conversions API (CAPI) & Server Events" },
                      { label: "A/B Testing", value: "6 Hook & Headline Testing Variations" },
                      { label: "Funnel Retargeting", value: "Dynamic Catalog & Website Retargeting" },
                      { label: "Review Cadence", value: "Bi-Weekly Scaling & ROAS Tracking Calls" },
                    ],
                  },
                  {
                    id: "meta-scale",
                    title: "Meta Scale & Dominate",
                    popular: false,
                    icon: Flame,
                    description: "Aggressive multi-platform acquisition velocity with omnichannel video sequences, catalog sales, and deep algorithmic retargeting.",
                    price: { INR: "₹35,000", USD: "$420" },
                    period: "/month",
                    retainerNote: "Management Fee + Ad Spend",
                    targetAudience: "Scaling D2C Leaders, High-Growth Enterprise Brands",
                    serviceName: "Meta Ads (Facebook & Instagram)",
                    features: [
                      { label: "Ad Creatives", value: "20+ Mixed Creatives (High-Production Reels & Motion)" },
                      { label: "Campaign Strategy", value: "Advantage+ Shopping Campaigns (ASC)" },
                      { label: "Retention Funnels", value: "Post-Purchase & VIP Retargeting Flows" },
                      { label: "Deep Attribution", value: "Offline Events & Multi-Touch Attribution" },
                      { label: "Bidding Precision", value: "Cost-Cap & Real-Time Dayparting Controls" },
                      { label: "Dedicated Strategist", value: "Senior Meta Ads Strategist & Weekly Sync" },
                    ],
                  },
                ].map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-3xl p-6 sm:p-7 bg-[#0b0f19] border flex flex-col justify-between transition-all duration-300 relative ${
                        plan.popular
                          ? "border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-bold text-[11px] shadow-md tracking-wider uppercase">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="flex items-center justify-between pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="py-3 border-y border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {plan.price[currency]}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <span className="text-[11px] text-cyan-400/80 font-mono block mt-1">
                            {plan.retainerNote}
                          </span>
                        </div>

                        {/* Target Audience Box */}
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            TARGET AUDIENCE:
                          </span>
                          <p className="text-xs text-cyan-200 font-medium leading-snug">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Feature Specs */}
                        <div className="space-y-2.5 pt-1 text-xs">
                          {plan.features.map((f, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">{f.label}: </span>
                                <span>{f.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/5">
                        <button
                          onClick={() => selectPackageAndEnquire(plan.title, plan.serviceName)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                            plan.popular
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25"
                              : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                        >
                          Get Started with {plan.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footnote note */}
          <div className="mt-12 text-center text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-8">
            * Note: Inclusions and scope listed above represent proposed frameworks. Final activities, quantities, schedules, and deliverables are confirmed directly with you in a clear proposal before project commencement.
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 06 – PACKAGE COMPARISON TABLE
      ========================================================= */}
      <section id="comparison-table" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              FEATURE-BY-FEATURE BREAKDOWN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Compare Digital Marketing Packages
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Review deliverables across our standard packages to choose the scope
              that best fits your business stage.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="py-5 px-6 text-sm font-bold text-gray-300 uppercase tracking-wider w-1/4">
                    Features
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-gray-300 text-center w-1/4">
                    Starter Growth
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-purple-300 bg-purple-500/10 text-center w-1/4 border-x border-purple-500/30">
                    Business Growth
                    <span className="block text-[11px] text-pink-400 font-normal uppercase mt-0.5">Recommended</span>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-gray-300 text-center w-1/4">
                    Advanced Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-300">
                      {row.starter}
                    </td>
                    <td className="py-4 px-6 text-center text-white font-medium bg-purple-500/[0.05] border-x border-purple-500/20">
                      {row.business}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-300">
                      {row.advanced}
                    </td>
                  </tr>
                ))}
                {/* Actions Row */}
                <tr className="bg-white/[0.02]">
                  <td className="py-6 px-6 font-bold text-gray-400">
                    Select Your Plan
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button
                      onClick={() => scrollTo("enquiry-form")}
                      className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Enquire
                    </button>
                  </td>
                  <td className="py-6 px-6 text-center bg-purple-500/[0.08] border-x border-purple-500/30">
                    <button
                      onClick={() => scrollTo("enquiry-form")}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition cursor-pointer"
                    >
                      Choose Recommended
                    </button>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button
                      onClick={() => scrollTo("enquiry-form")}
                      className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 07 – SERVICE-WISE PACKAGES
      ========================================================= */}
      <section id="service-packages" className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              SPECIALIZED SERVICE PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Explore Our Digital Marketing Service Packages
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Detailed service pages explaining deliverables, execution strategy,
              and dedicated roadmaps for individual channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "SEO Packages",
                url: "/service/seo-company-in-lucknow",
                desc: "Improve rankings on Google, optimize high-intent keywords, and build organic traffic authority for local and national search.",
              },
              {
                icon: Megaphone,
                title: "Social Media Packages",
                url: "/service/social-media-marketing",
                desc: "Build engaged communities on Instagram, Facebook, and LinkedIn with thumb-stopping creative graphics and content planning.",
              },
              {
                icon: MousePointerClick,
                title: "Google Ads Packages",
                url: "/service/pay-per-click-services",
                desc: "High-ROI PPC search, display, and shopping campaigns designed to reach buyers actively looking for your products or services.",
              },
              {
                icon: Laptop,
                title: "Website Development Packages",
                url: "/service/website-design-and-development",
                desc: "Modern corporate websites, landing pages, and web applications built for blazing speed, mobile usability, and conversions.",
              },
              {
                icon: Store,
                title: "Ecommerce Marketing Packages",
                url: "/service/ecommerce-marketing",
                desc: "Full-funnel growth for online stores combining product SEO, Google Shopping, dynamic catalog ads, and cart recovery.",
              },
              {
                icon: Palette,
                title: "Graphic Design Packages",
                url: "/service/graphic-designing-services",
                desc: "Impactful brand identity design, marketing collaterals, social creatives, packaging, and business branding visual assets.",
              },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 bg-white/[0.03] border border-white/10 hover:border-purple-500/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <Link
                      href={srv.url}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 08 – CUSTOM DIGITAL MARKETING SOLUTIONS
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-purple-950/40 via-[#101328] to-indigo-950/40 border border-purple-500/30 relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold tracking-widest text-purple-300 uppercase">
                  TAILORED STRATEGY
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Need a Custom Digital Marketing Package?
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Every business has different goals, audiences and marketing
                  requirements. If the available packages do not match your needs,
                  Digital Nawab can help you plan a customised digital marketing
                  solution based on your objectives, industry, budget and
                  preferred services.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {[
                    "Solutions based on business requirements.",
                    "Flexible service combinations.",
                    "Defined scope and deliverables.",
                    "Clear proposal before starting work.",
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => scrollTo("enquiry-form")}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-xl shadow-purple-600/30 cursor-pointer"
                  >
                    <span>Build My Custom Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Custom Strategy Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 space-y-4 w-full max-w-sm backdrop-blur-md">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <SlidersHorizontal className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Custom Growth Engine</div>
                      <div className="text-xs text-gray-400">Tailored multi-service retainer</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-gray-300">Strategy Mix</span>
                      <span className="text-purple-300 font-semibold">SEO + PPC + Creative</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-gray-300">Deliverable Cadence</span>
                      <span className="text-purple-300 font-semibold">Custom Sprint Milestones</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-gray-300">Reporting</span>
                      <span className="text-purple-300 font-semibold">Custom Analytics KPI</span>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <span className="text-[11px] text-gray-400">100% transparent scope • Zero lock-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 09 – OUR WORKING PROCESS
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              STRUCTURED EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              How We Plan and Deliver Your Marketing Strategy
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              A disciplined, transparent 6-step framework from requirement analysis
              to continuous performance refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              {
                step: "01",
                title: "Understand Your Business",
                desc: "We study your market, industry positioning, competitors, and target audience.",
              },
              {
                step: "02",
                title: "Analyse Your Requirements",
                desc: "Review your existing website, analytics data, current leads, and commercial goals.",
              },
              {
                step: "03",
                title: "Recommend the Right Package",
                desc: "Suggest the ideal package or plan a custom solution matching your scale.",
              },
              {
                step: "04",
                title: "Plan and Execute",
                desc: "Launch SEO optimizations, ad campaigns, and content schedules with clear deliverables.",
              },
              {
                step: "05",
                title: "Monitor Performance",
                desc: "Continuously track keyword rankings, conversion funnels, and ad efficiency.",
              },
              {
                step: "06",
                title: "Review and Improve",
                desc: "Regular strategy reviews, transparent reporting, and iterative improvements.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-sm flex items-center justify-center mb-4">
                    {p.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 10 – SERVICES WE OFFER
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              AGENCY CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Digital Marketing Services to Support Your Growth
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Explore the full range of digital capabilities available from
              Digital Nawab.
            </p>
            <p className="text-xs text-purple-300/80 bg-purple-500/10 inline-block px-4 py-1.5 rounded-full border border-purple-500/20">
              * These represent our agency capabilities and are tailored into agreed package deliverables based on your chosen scope.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { name: "Search Engine Optimization (SEO)", link: "/service/seo-company-in-lucknow", icon: Search },
              { name: "Local SEO", link: "/service/seo-company-in-lucknow", icon: MapPin },
              { name: "Google Business Profile Optimization", link: "/service/seo-company-in-lucknow", icon: Building2 },
              { name: "Google Ads and PPC Management", link: "/service/pay-per-click-services", icon: MousePointerClick },
              { name: "Social Media Marketing", link: "/service/social-media-marketing", icon: Megaphone },
              { name: "Social Media Advertising", link: "/service/social-media-marketing", icon: Target },
              { name: "Website Design and Development", link: "/service/website-design-and-development", icon: Laptop },
              { name: "Ecommerce Marketing", link: "/service/ecommerce-marketing", icon: Store },
              { name: "Content Marketing", link: "/service/seo-company-in-lucknow", icon: FileText },
              { name: "Graphic Designing", link: "/service/graphic-designing-services", icon: Palette },
              { name: "Lead Generation", link: "/service/direct-marketing", icon: UserCheck },
              { name: "AI Search Optimization", link: "/blog", icon: Sparkles },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  href={srv.link}
                  className="rounded-xl p-5 bg-white/[0.02] border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
                >
                  <Icon className="w-6 h-6 text-purple-400 group-hover:text-pink-400 transition-colors mb-3" />
                  <div className="text-sm font-semibold text-white group-hover:text-purple-200 transition-colors leading-snug">
                    {srv.name}
                  </div>
                  <div className="pt-3 flex items-center gap-1 text-[11px] text-gray-500 group-hover:text-purple-300 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 11 – INDUSTRIES WE SERVE
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              SECTOR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Digital Marketing Packages for Different Industries
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              We understand that buyer journeys differ across markets. Our packages
              adapt to the regulatory, commercial, and customer realities of your sector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: "Startups",
                desc: "Agile go-to-market strategies, initial customer traction, and scalable CAC optimization.",
              },
              {
                icon: MapPin,
                title: "Local Businesses",
                desc: "Hyper-local SEO, Google Maps visibility, and phone call generation for service providers.",
              },
              {
                icon: HeartPulse,
                title: "Healthcare",
                desc: "Reputable digital presence, patient appointment funnels, and local clinic SEO.",
              },
              {
                icon: GraduationCap,
                title: "Education",
                desc: "Student enrollment campaigns, course visibility, and webinar lead acquisition.",
              },
              {
                icon: Building2,
                title: "Real Estate",
                desc: "High-intent property buyer leads, landing page funnels, and geo-targeted ads.",
              },
              {
                icon: ShoppingBag,
                title: "Ecommerce and Retail",
                desc: "Catalog promotion, Google Shopping, ROAS optimization, and cart recovery.",
              },
              {
                icon: Compass,
                title: "Hospitality and Tourism",
                desc: "Direct booking generation, travel discovery, and seasonal promotional marketing.",
              },
              {
                icon: Factory,
                title: "Manufacturing and B2B",
                desc: "Qualified corporate buyer enquiries, RFQ generation, and LinkedIn professional marketing.",
              },
            ].map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 12 – WHY CHOOSE DIGITAL NAWAB
      ========================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              CREDENTIALS &amp; TRUST
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Choose Digital Nawab for Digital Marketing?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Digital Nawab helps businesses plan and manage their online marketing
              activities through service-specific and customised digital solutions.
              Our approach focuses on understanding business requirements, defining
              deliverables and monitoring agreed marketing activities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Business-Focused Strategies",
                desc: "We align digital marketing activities directly with your revenue targets, target demographics, and commercial milestones.",
                icon: Target,
              },
              {
                title: "Multiple Digital Services",
                desc: "SEO, PPC, social media, web development, and content creation coordinated seamlessly under one dedicated roof.",
                icon: Layers,
              },
              {
                title: "Flexible Solutions",
                desc: "Whether you need a full turnkey digital retainer or channel-specific execution, our packages scale with your needs.",
                icon: SlidersHorizontal,
              },
              {
                title: "Clear Scope of Work",
                desc: "Transparent proposals outlining exact activities, timelines, inclusions, and exclusions with zero ambiguity.",
                icon: ShieldCheck,
              },
              {
                title: "Performance Monitoring",
                desc: "Disciplined tracking and regular performance reports so you can clearly evaluate progress and return on investment.",
                icon: BarChart3,
              },
              {
                title: "Experienced Agency",
                desc: "A multidisciplinary team based in Lucknow, UP, supporting businesses across India with dedicated account management.",
                icon: Award,
              },
            ].map((tp, idx) => {
              const Icon = tp.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{tp.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-normal">
                      {tp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Genuine Business & E-E-A-T Strip */}
          <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/30 via-slate-900 to-indigo-950/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-white font-bold text-base sm:text-lg">
                Digital Nawab · Verified Agency Office
              </div>
              <div className="text-sm text-gray-300">
                B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006
              </div>
              <div className="text-xs text-purple-300">
                Phone: 08860757649 | +91 93356 21987 • Email: wedigitalnawab@gmail.com
              </div>
            </div>
            <Link
              href="/about-us"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all whitespace-nowrap"
            >
              Learn More About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 13 – FREQUENTLY ASKED QUESTIONS
      ========================================================= */}
      <section className="py-20 md:py-28 bg-[#0a0d16] border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              CLEAR ANSWERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions About Digital Marketing Packages
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Get factual, clear information about package scopes, pricing structures,
              timelines, and execution expectations.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 14 – FINAL CTA BANNER
      ========================================================= */}
      <section className="py-20 md:py-24 relative bg-gradient-to-r from-purple-900 via-[#1e133d] to-indigo-950 border-b border-purple-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">
            TAKE THE NEXT STEP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Ready to Choose the Right Digital Marketing Package?
          </h2>
          <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your business goals and find a digital marketing solution
            that fits your requirements, audience and budget.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("enquiry-form")}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              Get a Custom Quote
            </button>

            <a
              href="tel:08860757649"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-md cursor-pointer"
            >
              <Phone className="w-4 h-4 text-purple-300" />
              <span>Talk to Our Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 15 – ENQUIRY FORM
      ========================================================= */}
      <section id="enquiry-form" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Side: Information & Verified Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Get a Custom Digital Marketing Package
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Tell us about your business and marketing requirements. Our team
                can review your needs and discuss a suitable solution tailored to
                your growth goals.
              </p>

              {/* Verified Contact Details Card */}
              <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Business Address</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                  <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Phone Enquiries</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      <a href="tel:08860757649" className="hover:text-purple-300 transition">08860757649</a>
                      {" "}|{" "}
                      <a href="tel:+919335621987" className="hover:text-purple-300 transition">+91 93356 21987</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Email Address</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      <a href="mailto:wedigitalnawab@gmail.com" className="hover:text-purple-300 transition">
                        wedigitalnawab@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours / Direct Response Assurance */}
              <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Quick Response Time: We usually review requirements within 24-48 business hours.</span>
              </div>
            </div>

            {/* Right Side: Clean Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.03] border border-white/10 shadow-2xl">
                {submitSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Thank You for Reaching Out!</h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                      Your package enquiry has been successfully submitted. Our team will review your requirements and get in touch with you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                            formErrors.fullName ? "border-rose-500" : "border-white/15 focus:border-purple-400"
                          } text-white text-sm outline-none transition`}
                        />
                        {formErrors.fullName && (
                          <p className="text-xs text-rose-400 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      {/* Business Name */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Business Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="e.g. Apex Health Clinic"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                            formErrors.businessName ? "border-rose-500" : "border-white/15 focus:border-purple-400"
                          } text-white text-sm outline-none transition`}
                        />
                        {formErrors.businessName && (
                          <p className="text-xs text-rose-400 mt-1">{formErrors.businessName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                            formErrors.email ? "border-rose-500" : "border-white/15 focus:border-purple-400"
                          } text-white text-sm outline-none transition`}
                        />
                        {formErrors.email && (
                          <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Phone Number <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="08860757649"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                            formErrors.phone ? "border-rose-500" : "border-white/15 focus:border-purple-400"
                          } text-white text-sm outline-none transition`}
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Website URL (Optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Website URL <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 text-white text-sm outline-none transition"
                        />
                      </div>

                      {/* Monthly Marketing Budget (Optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          Monthly Marketing Budget <span className="text-gray-500">(Optional)</span>
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#111625] border border-white/15 focus:border-purple-400 text-white text-sm outline-none transition cursor-pointer"
                        >
                          <option value="">Select an estimated budget range</option>
                          <option value="Under ₹25,000 / month">Under ₹25,000 / month</option>
                          <option value="₹25,000 – ₹50,000 / month">₹25,000 – ₹50,000 / month</option>
                          <option value="₹50,000 – ₹1,00,000 / month">₹50,000 – ₹1,00,000 / month</option>
                          <option value="₹1,00,000+ / month">₹1,00,000+ / month (Enterprise)</option>
                          <option value="Custom Project Scope">Custom Project Scope</option>
                        </select>
                      </div>
                    </div>

                    {/* Services Required (Multi-Select Checkboxes) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Services Required <span className="text-rose-400">*</span>{" "}
                        <span className="text-gray-500 font-normal">(Select all that apply)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          "SEO",
                          "Social Media Marketing",
                          "Google Ads / PPC",
                          "Website Design and Development",
                          "Ecommerce Marketing",
                          "Lead Generation",
                          "Complete Digital Marketing",
                          "Other / Custom Requirements",
                        ].map((srv, i) => {
                          const isSelected = formData.services.includes(srv);
                          return (
                            <button
                              type="button"
                              key={i}
                              onClick={() => handleServiceToggle(srv)}
                              className={`p-2.5 rounded-xl border text-xs text-left font-medium transition cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? "bg-purple-600/20 border-purple-500 text-white"
                                  : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                              }`}
                            >
                              <span>{srv}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                      {formErrors.services && (
                        <p className="text-xs text-rose-400 mt-1">{formErrors.services}</p>
                      )}
                    </div>

                    {/* Requirements / Message (Optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Tell Us About Your Requirements <span className="text-gray-500">(Optional)</span>
                      </label>
                      <textarea
                        name="requirements"
                        rows="3"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="Provide details about your business goals, target locations, or specific package questions..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 text-white text-sm outline-none transition"
                      />
                    </div>

                    {/* Privacy Policy Consent */}
                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          name="privacyConsent"
                          checked={formData.privacyConsent}
                          onChange={handleInputChange}
                          className="mt-1 rounded bg-white/10 border-white/20 text-purple-600 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 leading-relaxed">
                          I agree to Digital Nawab's{" "}
                          <Link href="/privacy-policy" className="text-purple-400 underline hover:text-purple-300">
                            Privacy Policy
                          </Link>{" "}
                          and consent to being contacted regarding my quotation request.
                        </span>
                      </label>
                      {formErrors.privacyConsent && (
                        <p className="text-xs text-rose-400 mt-1">{formErrors.privacyConsent}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-xl shadow-purple-600/30 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Submitting Request...</span>
                        ) : (
                          <>
                            <span>Request My Custom Quote</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
