"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { use } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Share2,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Banner from "@/components/Banner";
import { motion } from "framer-motion";

export default function JobDetailPage({ slug }) {
  // const router = useRouter();
  //   const slug = decodeURIComponent(params);
  
    console.log(slug)
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    experience: "",
    resume: null,
    skills: [],
    projectLinks: "",
    message: "",
    job_id: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [currentSkill, setCurrentSkill] = useState(""); // For skill input

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/careerdetail/${slug}`
        );
        setJob(res?.data?.data);
        setFormData((prev) => ({ ...prev, job_id: res?.data?.data?.id || "" }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details.");
        setLoading(false);
      }
    };

    if (slug) fetchJob();
  }, [slug]);
  console.log("Job Data:", job);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle skill input change
  const handleSkillChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  // Add skill to array
  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
    }
  };

  // Remove skill from array
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.includes("msword"))
    ) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setFormError("");
    } else {
      setFormError("Please upload a PDF or Word document.");
    }
  };

  // Handle form submission (fixed for Laravel backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.address ||
      !formData.experience ||
      !formData.resume ||
      !formData.projectLinks ||
      !formData.skills.length
    ) {
      setFormError(
        "Please fill in all required fields and add at least one skill."
      );
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("year_of_experience", formData.experience); // ✅ match backend
    formDataToSend.append("career_id", formData.job_id); // ✅ backend expects career_id
    formDataToSend.append("resume", formData.resume);
    formDataToSend.append("contact_number", formData.contact);
    formDataToSend.append("project_link", formData.projectLinks);
    formDataToSend.append("message", formData.message);

    // Send skills[] array
    formData.skills.forEach((skill, i) => {
      formDataToSend.append(`skills[${i}]`, skill);
    });

    try {
      await axios.post(
        "/api/career_form",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFormSuccess("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
        experience: "",
        resume: null,
        skills: [],
        projectLinks: "",
        message: "",
        job_id: job?.id || "",
      });
      setCurrentSkill("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormError("Failed to submit application. Please try again.");
    }
  };

  // Scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Banner
        title={job?.desig}
        subtitle="We'd love to hear from you!"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Career", href: "/career" },
        ]}
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push("/career")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-lime-400 to-green-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {job?.title}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Posted 3 days ago</span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold capitalize text-gray-900 mb-4">
                {job?.desig}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job?.city}</span>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <Clock className="w-4 h-4" />
                  <span>{job?.job_type}</span>
                </div>
                <div className="flex items-center gap-2 capitalize">
                  <Users className="w-4 h-4" />
                  <span>{job?.work_mode}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2 shadow-md"
              >
                Apply Now
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Job Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Role
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {job?.about_role}
                </p>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Key Responsibilities
              </h2>
              <ul className="space-y-4">
                {job?.responsibilities
                  ?.filter((x) => x != null)
                  ?.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-4">
                {job?.requirements
                  ?.filter((x) => x != null)
                  ?.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Benefits & Perks
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {job?.benefits_perks
                  ?.filter((x) => x != null)
                  ?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Ready to Apply?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our team and help us build amazing digital experiences that
                make a real impact.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-full font-semibold transition-colors shadow-md"
              >
                Apply for This Position
              </motion.button>
              <p className="text-sm text-gray-500 text-center mt-4">
                We typically respond within 2-3 business days
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                About Our Company
              </h3>
              <div className="space-y-4 text-gray-900 font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium">50-100 employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">Digital Marketing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">Los Angeles, CA</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Similar Positions
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900">SEO Analyst</h4>
                  <p className="text-sm text-gray-600">Full Time • Remote</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900">
                    Content Writer
                  </h4>
                  <p className="text-sm text-gray-600">Freelance • Remote</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Social Media Manager
                  </h4>
                  <p className="text-sm text-gray-600">Full Time • Onsite</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 bg-white rounded-2xl p-4 lg:p-8 shadow-xl border-2 border-gradient-to-r from-lime-400 to-green-500"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Apply for {job?.desig}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="job_id" value={formData.job_id} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Years of Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Enter years of experience"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Resume (PDF or Word) <span className="text-red-500">*</span>
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-lime-400 file:text-white file:hover:bg-lime-500"
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="skills"
                  type="text"
                  value={currentSkill}
                  onChange={handleSkillChange}
                  placeholder="Enter a skill"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addSkill}
                  disabled={!currentSkill.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1 bg-lime-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-gray-600 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div>
              <label
                htmlFor="projectLinks"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Links
              </label>
              <textarea
                id="projectLinks"
                name="projectLinks"
                value={formData.projectLinks}
                onChange={handleInputChange}
                placeholder="Enter project links (one per line)"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter any additional information"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Form Status */}
            {formError && (
              <p className="text-red-500 text-sm text-center">{formError}</p>
            )}
            {formSuccess && (
              <p className="text-green-500 text-sm text-center">
                {formSuccess}
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-full font-semibold transition-colors shadow-md"
            >
              Submit Application
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
