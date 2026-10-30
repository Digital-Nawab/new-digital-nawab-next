"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
  Settings,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Headphones,
  Calendar,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Globe,
  Search,
  Share2,
  Send,
  Smartphone,
  Laptop,
  TrendingUp,
  Palette,
  ShoppingCart,
  HelpCircle,
  Award,
  Zap,
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NawabMap from "@/components/NawabMap";

// Robust normalizer for contact arrays, comma-separated, slash-separated strings
export const normalizeContactItems = (items) => {
  if (!items) return [];
  const list = Array.isArray(items) ? items : [items];
  return list
    .flatMap((item) => {
      if (item === null || item === undefined) return [];
      if (typeof item !== "string") return [String(item)];
      const trimmed = item.trim();
      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith("{") && trimmed.endsWith("}"))
      ) {
        try {
          const parsed = JSON.parse(trimmed);
          return normalizeContactItems(parsed);
        } catch {}
      }
      return trimmed.split(/[,/;\n\r]+/);
    })
    .map((item) => (typeof item === "string" ? item.trim() : String(item).trim()))
    .filter(Boolean);
};

// Formats phone numbers cleanly for display
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

const ContactUs = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    subService: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [faqFilter, setFaqFilter] = useState("");
  // Multiple open state for FAQs in 2 columns
  const [openFaqs, setOpenFaqs] = useState({ 0: true, 1: true });

  const [contactInfo, setContactInfo] = useState({
    email: ["wedigitalnawab@gmail.com", "hello@digitalnawab.com"],
    phone_no: ["9335621987", "8860757649", "9936663337"],
    whatsapp_no: ["9335621987", "9936663337", "8860757649"],
    location: "B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006",
  });

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/get_service");
        if (Array.isArray(response.data)) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  // Fetch contact details on mount
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get("/api/getcontactdetail");
        const data = response.data?.data?.[0];
        if (data) {
          setContactInfo({
            email: normalizeContactItems(data.email),
            phone_no: normalizeContactItems(data.phone_no),
            whatsapp_no: normalizeContactItems(data.whatsapp_no),
            location: data.location || "B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006",
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };
    fetchContactDetails();
  }, []);

  // Fetch FAQs on mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("/api/getfaq");
        const data = response.data?.data || response.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  // Update subservices when service changes
  useEffect(() => {
    if (formData.service) {
      const selectedService = services.find((s) => s.name === formData.service);
      setSubServices(selectedService ? selectedService.subservices || [] : []);
      // If selected subservice doesn't belong to new service, clear it
      if (selectedService && !selectedService.subservices?.some((sub) => sub.name === formData.subService)) {
        setFormData((prev) => ({ ...prev, subService: "" }));
      }
    } else {
      setSubServices([]);
      setFormData((prev) => ({ ...prev, subService: "" }));
    }
  }, [formData.service, services]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value) && value !== "") {
          error = "Name should only contain letters and spaces";
        } else if (value.trim().length < 2 && value !== "") {
          error = "Name must be at least 2 characters";
        }
        break;
      case "phone":
        if (!/^\d+$/.test(value) && value !== "") {
          error = "Phone number should only contain digits";
        } else if (value.length !== 0 && value.length !== 10) {
          error = "Phone number must be exactly 10 digits";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
          error = "Please enter a valid email address";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text, keyLabel) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyLabel);
      toast.success(`${keyLabel} copied to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelectServiceFromCard = (serviceName, subserviceName = "") => {
    const matched = services.find(
      (s) => s.name?.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(s.name?.toLowerCase())
    );

    if (matched) {
      setFormData((prev) => ({
        ...prev,
        service: matched.name,
        subService: subserviceName || "",
      }));
    } else {
      const fallback = services[0]?.name || "";
      setFormData((prev) => ({
        ...prev,
        service: fallback,
        message: prev.message || `I am interested in ${serviceName}.`,
      }));
    }

    toast.success(`Selected "${serviceName}". Fill in your details below.`);
    scrollToForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ["name", "phone", "email", "city", "service", "message"].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.service && subServices.length > 0 && !formData.subService) {
      newErrors.subService = "Please select a specific service";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const selectedService = services.find((s) => s.name === formData.service);
        const selectedSubService = subServices.find((s) => s.name === formData.subService);

        const payload = {
          name: formData.name,
          email: formData.email,
          number: formData.phone,
          city: formData.city,
          service_id: selectedService ? selectedService.id : null,
          subservice_id: selectedSubService ? selectedSubService.id : null,
          message: formData.message,
        };

        await axios.post("/api/post_enquiry", payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        toast.success("Enquiry submitted successfully! Our strategist will call you shortly.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
          service: "",
          subService: "",
          message: "",
        });
      } catch (error) {
        toast.error("Failed to submit enquiry. Please try again or call us directly.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fill in all required fields properly.");
    }
  };

  // Normalized contact arrays (no mixed strings!)
  const emailList = normalizeContactItems(contactInfo.email);
  const phoneList = normalizeContactItems(contactInfo.phone_no);
  const whatsappList = normalizeContactItems(contactInfo.whatsapp_no);
  const primaryPhone = phoneList[0] || "9335621987";
  const primaryEmail = emailList[0] || "wedigitalnawab@gmail.com";
  const primaryWhatsApp = whatsappList[0] || primaryPhone;

  // 6 Services Data
  const sixServicesData = [
    {
      id: "web-dev",
      serviceTarget: "Website Development",
      subserviceTarget: "Custom Website Design (UI/UX)",
      title: "Web & App Engineering",
      tag: "Ultra-Fast & High Conversion",
      icon: Globe,
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      description:
        "Custom Next.js, React, Node.js, and mobile-first web applications built for blazing speed, enterprise security, and measurable conversion.",
      deliverables: [
        "Full-Stack Web Apps & Portals",
        "Next.js, React & Node.js Architecture",
        "E-Commerce & Payment Gateways",
        "API Integrations & 99.9% Uptime",
      ],
    },
    {
      id: "seo",
      serviceTarget: "Website Development",
      subserviceTarget: "Speed Optimization & SEO-Friendly Development",
      title: "Search Engine Optimization",
      tag: "Rank #1 on Google",
      icon: Search,
      gradient: "from-purple-500 via-pink-500 to-rose-600",
      description:
        "Dominating organic search results with data-driven technical audits, local SEO supremacy, high-authority link acquisition, and content strategy.",
      deliverables: [
        "Technical & On-Page SEO Audits",
        "Local SEO & Google Business Profile",
        "High-Authority Backlink Acquisition",
        "Transparent Keyword Ranking Reports",
      ],
    },
    {
      id: "smm",
      serviceTarget: "Social Media Marketing",
      subserviceTarget: "Brand Awareness Campaigns",
      title: "Social Media Marketing",
      tag: "Viral Reach & Brand Authority",
      icon: Share2,
      gradient: "from-pink-500 via-rose-500 to-amber-500",
      description:
        "High-engagement Instagram Reels, Meta ad campaigns, creative storytelling, and community growth that turn viewers into lifelong paying clients.",
      deliverables: [
        "Viral Reels & Creative Production",
        "Targeted Meta Ad Lead Campaigns",
        "Monthly Content Calendar & Design",
        "Influencer Collabs & Management",
      ],
    },
    {
      id: "google-ads",
      serviceTarget: "Google Ads",
      subserviceTarget: "Google Search Ads",
      title: "Google Ads & PPC Marketing",
      tag: "High-ROI Lead Generation",
      icon: TrendingUp,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      description:
        "Laser-focused Search, Display, and YouTube ad campaigns optimized for maximum return on ad spend (ROAS) and lowest cost per lead.",
      deliverables: [
        "Google Search & Performance Max Ads",
        "Advanced GTM & Conversion Tracking",
        "High-Converting Landing Pages",
        "Continuous A/B Bid Optimization",
      ],
    },
    {
      id: "uiux",
      serviceTarget: "Creative Designing",
      subserviceTarget: "Logo & Branding Design",
      title: "Creative Designing & UI/UX",
      tag: "Aesthetics That Sell",
      icon: Palette,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      description:
        "Distinctive brand identities, corporate logos, marketing collateral, and intuitive UI/UX design systems that leave an unforgettable impression.",
      deliverables: [
        "Logo Design & Brand Guidelines",
        "Figma UI/UX Prototypes & Wireframes",
        "High-Impact Social Media Banners",
        "Print, Packaging & Corporate Assets",
      ],
    },
    {
      id: "ecom",
      serviceTarget: "Website Development",
      subserviceTarget: "E-Commerce Website Development",
      title: "E-Commerce & Digital Growth",
      tag: "Scale Online Revenue",
      icon: ShoppingCart,
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      description:
        "Turnkey e-commerce infrastructure, frictionless checkout funnels, automated customer retention, and custom inventory integrations.",
      deliverables: [
        "Custom Shopify & WooCommerce Stores",
        "Cart Abandonment & Retargeting",
        "Payment & Shipping Gateways",
        "Conversion Rate Optimization (CRO)",
      ],
    },
  ];

  // Default rich agency FAQs
  const defaultAgencyFaqs = [
    {
      question: "How quickly will someone from Digital Nawab get back to me?",
      answer:
        "Our dedicated strategy team typically responds within 15 to 30 minutes during standard business hours (Monday to Saturday, 10:00 AM – 7:30 PM IST). Inquiries submitted after hours are prioritized first thing the following morning.",
    },
    {
      question: "Do you offer a free initial consultation and project estimate?",
      answer:
        "Yes, 100%! We provide a comprehensive, zero-obligation discovery call and strategy audit. We analyze your website, competitor landscape, and growth goals, then deliver a clear, transparent scope of work with milestone-based pricing.",
    },
    {
      question: "Can you sign a Non-Disclosure Agreement (NDA) before we discuss details?",
      answer:
        "Absolutely. We value client confidentiality and data security. We are glad to sign a mutual Non-Disclosure Agreement (NDA) prior to reviewing proprietary business workflows, prototypes, or confidential data.",
    },
    {
      question: "Do you work with international clients or only businesses in Lucknow?",
      answer:
        "We operate globally! While our headquarters is proud to be in Lucknow, Uttar Pradesh, we work with enterprise, SME, and startup clients across the United States, UK, UAE, Canada, Australia, and throughout India.",
    },
    {
      question: "Can I visit your office in Lucknow for an in-person meeting?",
      answer:
        "Yes, you are always welcome! Our office is located at B12 A, L. Road, Mahanagar, Lucknow. Please feel free to schedule an appointment via phone or WhatsApp so our team can prepare a personalized presentation for you.",
    },
    {
      question: "What information should I prepare before our introductory call?",
      answer:
        "Having your website link (if existing), primary target audience, monthly marketing budget, and key goals (such as lead generation, e-commerce sales, or brand revamp) will help us prepare high-impact insights for your call.",
    },
    {
      question: "What pricing models does Digital Nawab offer?",
      answer:
        "We offer flexible engagement models: Fixed-Price Milestone billing for custom web and app development, and Monthly Retainers for SEO, Social Media Marketing, and Performance Google Ads management.",
    },
    {
      question: "What happens after I submit this contact form?",
      answer:
        "Within 15 minutes, our senior growth consultant will review your requirements, conduct a quick preliminary audit of your industry, and contact you via phone or email to schedule your strategy session.",
    },
  ];

  // Combine fetched FAQs with default agency FAQs
  const allFaqs = faqs.length > 0 ? [...faqs, ...defaultAgencyFaqs.slice(0, 4)] : defaultAgencyFaqs;
  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question?.toLowerCase().includes(faqFilter.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(faqFilter.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (RIGHT SIDE IMAGE + LEFT CONTENT & TRUST STATS) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black text-white pt-24 pb-16 px-4 md:px-8 overflow-hidden border-b border-white/5">
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-pink-600/15 rounded-full blur-[130px] pointer-events-none animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle Geometric Mesh Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 0.5px, transparent 0.5px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto relative z-10 max-w-6xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span className="text-zinc-600">/</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              Contact Us
            </span>
          </nav>

          {/* 2-Column Hero: Left Content, Right Image */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 cols): Content & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-950/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium">
                  We're Active & Ready To Partner • 15 Min Response
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  HAVE{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    QUESTIONS?
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100">
                  WE'RE HERE TO HELP YOU WIN!
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed pt-1 max-w-xl">
                  Whether you need scalable web engineering, high-ROI paid advertising, aggressive SEO growth, or custom branding — our strategy team is just a call, WhatsApp message, or email away.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </button>

                <a
                  href={`https://wa.me/91${primaryWhatsApp.replace(/[^0-9]/g, "")}?text=Hello%20Digital%20Nawab%20Team,%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp</span>
                </a>

                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-semibold backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>Call: {formatPhoneNumber(primaryPhone)}</span>
                </a>
              </div>

              {/* 4 Trust Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">&lt; 15 Mins</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Avg Response</div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">100% Free</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Strategy Audit</div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">250+</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Projects Shipped</div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">NDA</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">100% Protected</div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Right Hero Image with Floating Badges & Ambient Glow */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Ambient Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-indigo-600/30 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
                <img
                  src="/admin-assets/images/about/team-office.jpg"
                  alt="Digital Nawab Headquarters & Strategists"
                  className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Floating Chip Top-Right */}
                <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-semibold text-white">Available For Consultations</span>
                </div>

                {/* Floating Chip Bottom-Left */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shrink-0">
                      <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-pink-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Digital Nawab Headquarters</div>
                      <div className="text-[11px] text-zinc-400">B12 A, Mahanagar, Lucknow</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK CONTACT CIRCLES SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-zinc-950 py-16 px-4 md:px-8 overflow-hidden border-b border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Quick Connect Circles
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Reach Out Via Your Preferred Channel
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2">
              Tap any circle below to immediately start a conversation or view active communication lines.
            </p>
          </div>

          {/* Quick Contact Circles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Circle 1: Call Directly */}
            <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
                title="Tap to Call"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-purple-400 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-purple-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Call
                </span>
              </a>
              <h3 className="font-bold text-white text-sm mt-4">One-Tap Dial</h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{formatPhoneNumber(primaryPhone)}</p>
              <span className="text-[11px] text-purple-400 font-medium mt-2">{phoneList.length} Active Lines</span>
            </div>

            {/* Circle 2: WhatsApp Chat */}
            <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
              <a
                href={`https://wa.me/91${primaryWhatsApp.replace(/[^0-9]/g, "")}?text=Hello%20Digital%20Nawab%20Team,%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
                title="Open WhatsApp"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  WhatsApp
                </span>
              </a>
              <h3 className="font-bold text-white text-sm mt-4">Instant Chat</h3>
              <p className="text-xs text-zinc-400 mt-1">Live Response</p>
              <span className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Online Now
              </span>
            </div>

            {/* Circle 3: Direct Email */}
            <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1">
              <a
                href={`mailto:${primaryEmail}`}
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
                title="Send Email"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-pink-400 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-pink-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Email
                </span>
              </a>
              <h3 className="font-bold text-white text-sm mt-4">Official Mail</h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{primaryEmail}</p>
              <span className="text-[11px] text-pink-400 font-medium mt-2">{emailList.length} Inboxes</span>
            </div>

            {/* Circle 4: Office Location */}
            <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
              <a
                href="https://maps.google.com/?q=Digital+Nawab+B12+A+L+Rd+Mahanagar+Lucknow"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
                title="Open in Maps"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Visit
                </span>
              </a>
              <h3 className="font-bold text-white text-sm mt-4">Lucknow HQ</h3>
              <p className="text-xs text-zinc-400 mt-1">Mahanagar, Lko</p>
              <span className="text-[11px] text-blue-400 font-medium mt-2">Open In Maps</span>
            </div>

            {/* Circle 5: Free Strategy Session */}
            <div
              onClick={scrollToForm}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-amber-400 group-hover:rotate-6 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-amber-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Audit
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mt-4">Free Audit</h3>
              <p className="text-xs text-zinc-400 mt-1">Discovery Call</p>
              <span className="text-[11px] text-amber-400 font-medium mt-2">Book Slot</span>
            </div>

            {/* Circle 6: Priority Support */}
            <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full p-1 bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg shadow-teal-600/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
                title="Priority Helpdesk"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-teal-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Support
                </span>
              </a>
              <h3 className="font-bold text-white text-sm mt-4">Helpdesk</h3>
              <p className="text-xs text-zinc-400 mt-1">10 AM - 7:30 PM</p>
              <span className="text-[11px] text-teal-400 font-medium mt-2">Mon - Sat Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES WE CAN HELP YOU WITH (6 CARDS LAYOUT) */}
      {/* ========================================================================= */}
      <section className="relative bg-black py-20 px-4 md:px-8 border-b border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> What We Specialize In
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Services We Can Help You Scale
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mt-3">
              Choose the exact solution your business needs. Tap any card to preselect it in the inquiry form below.
            </p>
          </div>

          {/* 6 Cards Grid (3x2) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixServicesData.map((svc) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="group relative rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-purple-500/50 p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/30 hover:-translate-y-1.5"
                >
                  {/* Glowing Accent Top Bar */}
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${svc.gradient} mb-6 group-hover:w-full transition-all duration-500`} />

                  <div>
                    {/* Header: Icon & Tag */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.gradient} p-0.5 shadow-lg`}>
                        <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center">
                          <IconComp className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-zinc-300">
                        {svc.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2.5 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Deliverable Bullets */}
                    <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleSelectServiceFromCard(svc.serviceTarget, svc.subserviceTarget)}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-zinc-200 hover:text-white border border-white/10 hover:border-transparent text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-lg cursor-pointer"
                  >
                    <span>Enquire About {svc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MAIN CONTACT FORM & DETAILS SECTION */}
      {/* (CENTERED HEADING, REMOVED WHATSAPP CARD, BALANCED HEIGHT) */}
      {/* ========================================================================= */}
      <section
        id="contact-form"
        ref={formRef}
        className="relative bg-gradient-to-b from-zinc-950 via-black to-zinc-950 py-20 px-4 md:px-8 border-b border-white/5"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* CENTERED HEADING FOR THE ENTIRE SECTION */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Direct Communication Channels
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
              Every inquiry is handled directly by our senior strategists. No middlemen, no delayed responses.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (5 Cols): Balanced, streamlined contact cards (NO WhatsApp Card) */}
            <div className="lg:col-span-5 space-y-4">
              {/* CARD 1: OFFICIAL INBOXES */}
              <div className="rounded-2xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Official Inboxes ({emailList.length})</h3>
                    <p className="text-xs text-zinc-400">Quick email responses guaranteed</p>
                  </div>
                </div>

                <div className="space-y-2 mt-3 pt-3 border-t border-white/5">
                  {emailList.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic">No email address configured</p>
                  ) : (
                    emailList.map((email, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all group/item"
                      >
                        <a
                          href={`mailto:${email}`}
                          className="text-xs md:text-sm font-medium text-zinc-200 hover:text-pink-400 flex items-center gap-2 truncate pr-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate">{email}</span>
                        </a>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={`mailto:${email}`}
                            className="px-2 py-1 rounded-md bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-[11px] font-semibold transition-colors"
                          >
                            Mail
                          </a>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(email, `Email ${idx + 1}`)}
                            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Copy email"
                          >
                            {copiedKey === `Email ${idx + 1}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CARD 2: PHONE LINES */}
              <div className="rounded-2xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Phone Lines ({phoneList.length})</h3>
                    <p className="text-xs text-zinc-400">Direct consultation & support</p>
                  </div>
                </div>

                <div className="space-y-2 mt-3 pt-3 border-t border-white/5">
                  {phoneList.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic">No phone number configured</p>
                  ) : (
                    phoneList.map((phone, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all group/item"
                      >
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="text-xs md:text-sm font-medium text-zinc-200 hover:text-purple-400 flex items-center gap-2 truncate pr-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="tracking-wide">{formatPhoneNumber(phone)}</span>
                        </a>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="px-2.5 py-1 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                          >
                            <Phone className="w-2.5 h-2.5" /> Call
                          </a>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(phone, `Phone ${idx + 1}`)}
                            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Copy number"
                          >
                            {copiedKey === `Phone ${idx + 1}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CARD 3: HEADQUARTERS & OPERATING HOURS */}
              <div className="rounded-2xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-md shadow-xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Headquarters</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{contactInfo.location}</p>
                    <a
                      href="https://maps.google.com/?q=Digital+Nawab+B12+A+L+Rd+Mahanagar+Lucknow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 mt-1.5 font-semibold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Operating Hours</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Mon – Sat: 10:00 AM – 7:30 PM IST</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Sunday: Emergency support via WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7 Cols): HIGH-CONVERSION ENQUIRY FORM */}
            <div className="lg:col-span-7 bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl backdrop-blur-xl relative">
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Send className="w-3 h-3" /> Fast Response
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Send Us A Message</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Tell us about your project requirements and we will send a detailed proposal within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Row 1: Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <User className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      required
                      className={`w-full px-4 py-3 bg-white/[0.04] border ${
                        errors.name ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-zinc-500 text-sm`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <Phone className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10 digit mobile number"
                      maxLength={10}
                      required
                      className={`w-full px-4 py-3 bg-white/[0.04] border ${
                        errors.phone ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-zinc-500 text-sm`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & City */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <Mail className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      required
                      className={`w-full px-4 py-3 bg-white/[0.04] border ${
                        errors.email ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-zinc-500 text-sm`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <Building2 className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      City / Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Lucknow, Delhi, Mumbai"
                      required
                      className={`w-full px-4 py-3 bg-white/[0.04] border ${
                        errors.city ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-zinc-500 text-sm`}
                    />
                    {errors.city && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Service Category & Subservice */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <Settings className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      Service Category *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-zinc-900 border ${
                        errors.service ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-sm cursor-pointer`}
                    >
                      <option value="" className="bg-zinc-900 text-zinc-400">
                        -- Select Category --
                      </option>
                      {services.map((service) => (
                        <option key={service.id} value={service.name} className="bg-zinc-900 text-white">
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                      <Sparkles className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                      Specific Subservice
                    </label>
                    <select
                      name="subService"
                      value={formData.subService}
                      onChange={handleInputChange}
                      disabled={!formData.service || subServices.length === 0}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-sm cursor-pointer disabled:opacity-50"
                    >
                      <option value="" className="bg-zinc-900 text-zinc-400">
                        {subServices.length > 0 ? "-- Choose Specific Subservice --" : "Select category first"}
                      </option>
                      {subServices.map((sub) => (
                        <option key={sub.id} value={sub.name} className="bg-zinc-900 text-white">
                          {sub.name}
                        </option>
                      ))}
                    </select>
                    {errors.subService && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subService}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                    <MessageSquare className="inline w-3.5 h-3.5 mr-1.5 text-purple-400" />
                    Project Details / Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, current bottlenecks, target goals, or expected timelines..."
                    rows={4}
                    required
                    className={`w-full px-4 py-3 bg-white/[0.04] border ${
                      errors.message ? "border-red-500" : "border-white/10"
                    } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none text-white placeholder-zinc-500 text-sm`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Privacy Notice */}
                <div className="pt-2 text-center">
                  <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Your information is encrypted & secure. We respect your privacy and never spam.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE FAQ SECTION (2 COLUMNS IN ONE ROW LAYOUT) */}
      {/* ========================================================================= */}
      <section className="relative bg-black py-20 px-4 md:px-8 border-b border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2">
              Learn more about how we work, onboarding timelines, confidentiality, and pricing models.
            </p>

            {/* Quick Search Bar for FAQs */}
            <div className="relative mt-6 max-w-md mx-auto">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={faqFilter}
                onChange={(e) => setFaqFilter(e.target.value)}
                placeholder="Search questions (e.g. consultation, pricing, NDA)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* 2 COLUMNS IN ONE ROW FAQ GRID */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5 items-start">
            {filteredFaqs.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-zinc-500 text-sm">
                No matching questions found for "{faqFilter}".
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = !!openFaqs[index];
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                    >
                      <span className="font-semibold text-sm sm:text-base text-zinc-100 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-500/15 text-purple-300 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 mt-0.5 ${
                          isOpen ? "rotate-180 text-pink-400" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                        <p className="pl-9">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* FAQ Still Have Questions Box */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-pink-950/40 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-base font-bold text-white">Have a specific question not listed here?</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Our team is happy to answer any custom technical or commercial query.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/91${primaryWhatsApp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OFFICE LOCATION & INTERACTIVE MAP */}
      {/* ========================================================================= */}
      <section className="relative bg-zinc-950 pt-16 pb-0 border-b border-white/5">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" /> Visit In Person
          </div>
          <h2 className="text-3xl font-extrabold text-white">Our Head Office Location</h2>
          <p className="text-zinc-400 text-sm mt-1">
            B12 A, L. Road, Mahanagar, Lucknow, Uttar Pradesh 226006
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full border-t border-white/10">
          <NawabMap />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL HIGH-IMPACT CALL TO ACTION (CTA) SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-black py-24 px-4 md:px-8 overflow-hidden">
        {/* Glowing Background Radial */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[350px] bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Let's Make It Happen
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready To Accelerate Your <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Digital Growth?
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Partner with Digital Nawab to engineer high-converting web applications, dominate search engines, launch viral social media, and scale your brand revenue.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-purple-600/40 transform hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/91${primaryWhatsApp.replace(/[^0-9]/g, "")}?text=Hello%20Digital%20Nawab%20Team,%20I%20am%20ready%20to%20start%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-md transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              <span>Call Us Directly</span>
            </a>
          </div>

          {/* Quick Direct Contacts Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-zinc-400 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <a href={`mailto:${primaryEmail}`} className="hover:text-white transition-colors">
                {primaryEmail}
              </a>
            </div>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                {formatPhoneNumber(primaryPhone)}
              </a>
            </div>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Mahanagar, Lucknow, UP</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
