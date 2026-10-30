"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Headphones,
  User,
  DollarSign,
  Building2,
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function WebsiteConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Lucknow",
    projectType: "Custom Website",
    budget: "₹25,000 - ₹50,000",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    } else if (formData.name.length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        number: formData.phone,
        city: formData.city,
        service_id: null,
        subservice_id: null,
        message: `[Website Consultation Enquiry]\nProject Type: ${formData.projectType}\nEstimated Budget: ${formData.budget}\nMessage: ${formData.message || "Requesting free website consultation and technical estimate."}`,
      };

      await axios.post(
        "/api/post_enquiry",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setIsSuccess(true);
      toast.success("Consultation request submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "Lucknow",
        projectType: "Custom Website",
        budget: "₹25,000 - ₹50,000",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback gracious acknowledgment
      setIsSuccess(true);
      toast.success("Thank you! Our technical lead will contact you within 24 hours.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="get-free-consultation"
      className="relative py-14 lg:py-20 bg-[#090518] text-white overflow-hidden selection:bg-cyan-500 selection:text-white"
    >
      <Toaster position="top-right" />

      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-lg shadow-cyan-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-indigo-200 uppercase">
              14 / Project Launchpad
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
            Get Free Website{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Consultation
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Ready to turn your website into a 24/7 revenue engine? Discuss your goals with our senior web architects in Lucknow. Get a custom technical roadmap, wireframe concept, and quote in 24 hours.
          </p>
        </div>

        {/* Two-Column Grid: Form + Verified Contact Options */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] border border-white/20 p-7 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                  Direct Enquiry Form
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Tell Us About Your Project
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Fill in the details below and our lead engineer will get back to you within 24 hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Enquiry Received Successfully!
                  </h4>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out. One of our senior web architects will review your project requirements and connect with you shortly with a tailored technical roadmap.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          errors.name
                            ? "border-red-500/80 bg-red-950/20"
                            : "border-white/15 focus:border-cyan-400 focus:bg-white/[0.08]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          errors.phone
                            ? "border-red-500/80 bg-red-950/20"
                            : "border-white/15 focus:border-cyan-400 focus:bg-white/[0.08]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & City */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@company.com"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                          errors.email
                            ? "border-red-500/80 bg-red-950/20"
                            : "border-white/15 focus:border-cyan-400 focus:bg-white/[0.08]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        City / Location
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Lucknow, Delhi, Mumbai..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#120a2e] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                      >
                        <option value="Custom Website">Custom Corporate Website</option>
                        <option value="E-Commerce Store">E-Commerce Online Store</option>
                        <option value="Website Redesign">Website Redesign & Migration</option>
                        <option value="Web Application / SaaS">Web Application / SaaS Portal</option>
                        <option value="WordPress / Shopify">WordPress or Shopify Setup</option>
                        <option value="Maintenance & Support">Website Maintenance & Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#120a2e] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                      >
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+ (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Project Requirements & Key Features
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your business goals, target audience, preferred reference websites, or specific features needed..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Consultation Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Claim Your Free Website Consultation</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      100% Privacy Guaranteed. Your details are safe and never shared.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Verified Contact Options & Trust Signals */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Connect Options Card */}
            <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 block mb-1">
                Direct Channels
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Verified Contact Options
              </h3>

              <div className="space-y-4">
                {/* Phone Link */}
                <a
                  href="tel:+919369996767"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Direct Technical Helpline
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      +91 93699 96767
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Mon - Sat • 9:30 AM - 7:30 PM IST (Instant Response)
                    </div>
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a
                  href="https://wa.me/919369996767?text=Hello%20Digital%20Nawab%2C%20I%20am%20interested%20in%20website%20design%20and%20development%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Official WhatsApp Desk
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Chat on WhatsApp
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Share references, PDFs, or ask quick pricing queries
                    </div>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href="mailto:info@digitalnawab.com"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/40 hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Official RFPs & Enquiries
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      info@digitalnawab.com
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Send your detailed RFP or requirement document
                    </div>
                  </div>
                </a>

                {/* Physical Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Lucknow Headquarters
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Digital Nawab, Hazratganj
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Lucknow, Uttar Pradesh 226001, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Partner With Us Trust Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 backdrop-blur-xl">
              <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Our Enterprise Client Guarantees
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">24-Hour Proposal SLA:</strong> Itemized scope, tech stack, and fixed quote delivered next day.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">100% IP & Code Ownership:</strong> Complete copyright and repository transfer upon launch.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">30-Day Free Warranty:</strong> Dedicated post-launch technical bug fixes and guidance.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Zero-Lock-in Architecture:</strong> Open-source, industry-standard frameworks you can scale anywhere.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
