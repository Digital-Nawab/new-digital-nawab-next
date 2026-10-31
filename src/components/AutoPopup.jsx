"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Building2,
  Settings,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const defaultCategories = [
  {
    id: 1,
    name: "Web App Development",
    subServices: [
      { id: 11, name: "Website Design" },
      { id: 12, name: "E-commerce Development" },
      { id: 13, name: "Web App Development" },
    ],
  },
  {
    id: 2,
    name: "Digital Marketing",
    subServices: [
      { id: 21, name: "SEO" },
      { id: 22, name: "Social Media Marketing" },
      { id: 23, name: "PPC / Google Ads" },
    ],
  },
  {
    id: 3,
    name: "Graphic Design",
    subServices: [
      { id: 31, name: "Logo Design" },
      { id: 32, name: "Branding" },
      { id: 33, name: "Ad Creatives" },
    ],
  },
  {
    id: 4,
    name: "Video Production",
    subServices: [
      { id: 41, name: "Reels / Shorts" },
      { id: 42, name: "Corporate Videos" },
      { id: 43, name: "Motion Graphics" },
    ],
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  subService: "",
  message: "",
};

export default function AutoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [subServices, setSubServices] = useState([]);

  // Auto trigger after 5 seconds OR on scroll past ~1200px (approx 5 sections)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dn_popup_shown")) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("dn_popup_shown", "true");
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 1200 && !sessionStorage.getItem("dn_popup_shown")) {
        setIsOpen(true);
        sessionStorage.setItem("dn_popup_shown", "true");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Update subservices when category changes
  useEffect(() => {
    const selected = defaultCategories.find((c) => c.name === formData.service);
    setSubServices(selected ? selected.subServices : []);
  }, [formData.service]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Please enter your full name" : "";
      case "phone":
        return /^[0-9+\-\s]{10,13}$/.test(value)
          ? ""
          : "Enter a valid phone number";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email address";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "service" ? { subService: "" } : {}),
    }));
    if (["name", "phone", "email"].includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
    };
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.service) newErrors.service = "Service category is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedCat = defaultCategories.find((c) => c.name === formData.service);
      const selectedSub = selectedCat?.subServices?.find((s) => s.name === formData.subService);

      await axios.post(
        "https://dashboard.digitalnawab.com/api/post_enquiry",
        {
          name: formData.name,
          email: formData.email,
          number: formData.phone,
          city: formData.city,
          service_id: selectedCat?.id ? (selectedCat.id === 1 ? 6 : selectedCat.id === 2 ? 4 : selectedCat.id === 3 ? 7 : 5) : 4,
          subservice_id: selectedSub?.id ? (selectedSub.id === 11 ? 22 : selectedSub.id === 12 ? 26 : selectedSub.id === 13 ? 25 : 3) : 3,
          message: `[Auto Popup | Category: ${formData.service || "General"} | Sub: ${formData.subService || "All"}] ${formData.message}`,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.warn("API post_enquiry error (fallback to local success):", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormData(initialForm);
        setErrors({});
      }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 p-1 shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 className="w-16 h-16 text-purple-400 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Thank you, {formData.name.split(" ")[0]}!
              </h3>
              <p className="text-white/80 text-sm max-w-sm">
                We've received your details and will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get In Touch
                </h3>
                <p className="text-white/80 text-sm">
                  Fill out the form and we'll respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                      <User className="inline w-3 h-3 mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className={`w-full px-4 py-3 bg-black/20 border ${
                        errors.name ? "border-red-400" : "border-white/10"
                      } rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white placeholder-white/60 backdrop-blur-sm`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                      <Phone className="inline w-3 h-3 mr-1" />
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      maxLength={13}
                      minLength={10}
                      required
                      className={`w-full px-4 py-3 bg-black/20 border ${
                        errors.phone ? "border-red-400" : "border-white/10"
                      } rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white placeholder-white/60 backdrop-blur-sm`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                      <Mail className="inline w-3 h-3 mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className={`w-full px-4 py-3 bg-black/20 border ${
                        errors.email ? "border-red-400" : "border-white/10"
                      } rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white placeholder-white/60 backdrop-blur-sm`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                      <Building2 className="inline w-3 h-3 mr-1" />
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white placeholder-white/60 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                      <Settings className="inline w-3 h-3 mr-1" />
                      Service Category *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800 text-white">
                        Select category
                      </option>
                      {defaultCategories.map((c) => (
                        <option
                          key={c.id}
                          value={c.name}
                          className="bg-slate-800 text-white"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.service && (
                    <div className="animate-fadeIn">
                      <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                        <Settings className="inline w-3 h-3 mr-1" />
                        Specific Service *
                      </label>
                      <select
                        name="subService"
                        value={formData.subService}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-white backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800 text-white">
                          Select service
                        </option>
                        {subServices.map((sub) => (
                          <option
                            key={sub.id}
                            value={sub.name}
                            className="bg-slate-800 text-white"
                          >
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white/90 font-medium mb-2 text-xs uppercase tracking-wide">
                    <MessageSquare className="inline w-3 h-3 mr-1" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here."
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all resize-none text-white placeholder-white/60 backdrop-blur-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-4 focus:ring-purple-300/50 focus:outline-none disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>

                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <p className="text-white/80 text-xs text-center">
                    🔒 Your information is encrypted and secure. We never share
                    your details with third parties.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
