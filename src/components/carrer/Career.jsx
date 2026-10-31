"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Clock,
  Laptop,
  Globe,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Send,
  Search,
  MessageCircle,
  FileText,
  Upload,
  X,
  ChevronDown,
  Mail,
  Phone,
  HelpCircle,
  HeartHandshake,
  GraduationCap,
  Coffee,
  Check,
  Smile,
  Flame,
  Star,
  Compass,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const Career = () => {
  const positionsRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [openFaqs, setOpenFaqs] = useState({ 0: true, 1: true });

  // Quick Apply Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    experience: "",
    projectLink: "",
    skills: "",
    message: "",
    resume: null,
  });

  // Fallback jobs if admin hasn't configured many yet
  const fallbackJobs = [
    {
      id: "fe-dev",
      desig: "Engineering",
      title: "Senior Full-Stack Developer (Next.js / Node.js)",
      city: "Lucknow / Remote",
      job_type: "Full Time",
      work_mode: "Hybrid / Remote",
      about_role:
        "Architect and build high-velocity Next.js and Node.js enterprise applications, modern REST APIs, and high-converting client platforms.",
      responsibilities: ["Develop Next.js applications", "Build robust REST APIs", "Optimize Core Web Vitals & speed"],
      requirements: ["3+ years React / Node.js", "Deep knowledge of Tailwind CSS", "Experience with MySQL / MongoDB"],
    },
    {
      id: "seo-spec",
      desig: "SEO & Growth",
      title: "Lead Technical SEO Specialist",
      city: "Lucknow / Remote",
      job_type: "Full Time",
      work_mode: "Remote",
      about_role:
        "Lead aggressive organic growth strategies, technical website audits, local search domination, and high-authority link acquisition campaigns.",
      responsibilities: ["Perform technical SEO audits", "Conduct high-intent keyword research", "Manage backlink acquisition"],
      requirements: ["2+ years in technical SEO", "Proficiency in Ahrefs, SEMrush, GSC", "Proven ranking track record"],
    },
    {
      id: "ppc-lead",
      desig: "Performance Marketing",
      title: "Google Ads & PPC Campaign Strategist",
      city: "Lucknow",
      job_type: "Full Time",
      work_mode: "Onsite",
      about_role:
        "Manage six-figure ad budgets across Google Search, Display, YouTube, and Performance Max to deliver exceptional ROAS and lead pipelines.",
      responsibilities: ["Plan and execute Google Ads campaigns", "A/B test ad copies and landing pages", "Configure GTM conversion tracking"],
      requirements: ["2+ years running paid Google campaigns", "Strong analytical skills", "Google Ads certified"],
    },
    {
      id: "uiux-des",
      desig: "Design",
      title: "Senior UI/UX & Brand Designer",
      city: "Lucknow / Remote",
      job_type: "Full Time",
      work_mode: "Hybrid",
      about_role:
        "Create captivating digital brand systems, pixel-perfect Figma prototypes, and conversion-focused visual assets for global clients.",
      responsibilities: ["Design high-converting Figma prototypes", "Establish modern design systems", "Create ad and social media visual assets"],
      requirements: ["2+ years product / UI design", "Expertise in Figma & Adobe Suite", "Strong interactive portfolio"],
    },
  ];

  // Fetch jobs dynamically from Admin/Backend API
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://dashboard.digitalnawab.com/api/getcareer");
        const list = res.data?.data || res.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setJobs(list);
        } else {
          setJobs(fallbackJobs);
        }
      } catch (err) {
        console.error("Error fetching careers:", err);
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  // Fetch real team members for culture showcase
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("https://dashboard.digitalnawab.com/api/getourteam");
        const list = res.data?.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setTeamMembers(list.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };
    fetchTeam();
  }, []);

  const scrollToPositions = () => {
    if (positionsRef.current) {
      positionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openApplyModal = (job = null) => {
    setSelectedJobForModal(job);
    setIsModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsModalOpen(false);
    setSelectedJobForModal(null);
    setFormData({
      name: "",
      email: "",
      contact: "",
      address: "",
      experience: "",
      projectLink: "",
      skills: "",
      message: "",
      resume: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Resume file size must be less than 2MB.");
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.contact?.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Contact Number)");
      return;
    }
    const cleanContact = (formData.contact || "").replace(/\D/g, "");
    if (cleanContact.length < 10 || cleanContact.length > 12) {
      toast.error("Contact number must be between 10 and 12 digits (numeric only)");
      return;
    }
    if (!formData.resume) {
      toast.error("Please upload your resume (PDF or DOC, max 2MB)");
      return;
    }

    setIsSubmitting(true);
    try {
      let expYears = 0;
      if (formData.experience !== undefined && formData.experience !== "") {
        const parsed = parseInt(String(formData.experience).replace(/[^\d]/g, ""), 10);
        expYears = isNaN(parsed) ? 0 : parsed;
      }

      const defaultCareerId = jobs && jobs.length > 0 && jobs[0]?.id ? String(jobs[0].id) : "2";
      const careerId = selectedJobForModal?.id ? String(selectedJobForModal.id) : defaultCareerId;

      let projectUrl = (formData.projectLink || "").trim();
      if (projectUrl) {
        if (!/^https?:\/\//i.test(projectUrl)) {
          projectUrl = "https://" + projectUrl;
        }
      } else {
        // Backend MySQL column 'project_link' has NOT NULL constraint
        projectUrl = "https://digitalnawab.com";
      }

      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("contact_number", cleanContact);
      data.append("address", formData.address?.trim() || "Lucknow, Uttar Pradesh");
      data.append("year_of_experience", expYears);
      data.append("project_link", projectUrl);

      if (formData.message && formData.message.trim()) {
        data.append("message", formData.message.trim().substring(0, 1000));
      } else {
        data.append(
          "message",
          "Application for " + (selectedJobForModal?.title || "Career Opportunity")
        );
      }
      data.append("career_id", careerId);

      // Send skills as array
      const skillsList = formData.skills
        ? formData.skills
            .split(/[,]+/)
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const finalSkills =
        skillsList.length > 0
          ? skillsList
          : [selectedJobForModal?.title || "Web Development", "Teamwork"];
      finalSkills.forEach((skill, idx) => {
        data.append(`skills[${idx}]`, skill);
      });

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      await axios.post("https://dashboard.digitalnawab.com/api/career_form", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application submitted successfully! Our talent team will review your profile.");
      closeApplyModal();
    } catch (err) {
      console.error("Failed to submit career form:", err);
      const backendErrors = err.response?.data?.errors;
      let errorMsg = "Failed to submit application. Please check your inputs.";
      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        errorMsg = backendErrors.join(" ");
      } else if (typeof backendErrors === "string") {
        errorMsg = backendErrors;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter jobs based on search query and category
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = (job.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const desigMatch = (job.desig || "").toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatch = (job.city || "").toLowerCase().includes(searchQuery.toLowerCase());
    const textMatches = titleMatch || desigMatch || cityMatch;

    if (!textMatches) return false;

    if (selectedFilter === "all") return true;
    if (selectedFilter === "remote") {
      return (job.work_mode || "").toLowerCase().includes("remote");
    }
    if (selectedFilter === "hybrid") {
      return (job.work_mode || "").toLowerCase().includes("hybrid");
    }
    if (selectedFilter === "onsite") {
      return (job.work_mode || "").toLowerCase().includes("onsite");
    }
    if (selectedFilter === "full-time") {
      return (job.job_type || "").toLowerCase().includes("full");
    }
    return true;
  });

  // FAQs List for Career
  const careerFaqs = [
    {
      question: "Do you hire freshers or only experienced candidates?",
      answer:
        "We actively hire both! While senior positions require past agency or product experience, we continuously look for passionate freshers who demonstrate high curiosity, strong problem-solving skills, and a solid portfolio or GitHub track record.",
    },
    {
      question: "What is your typical recruitment turnaround time?",
      answer:
        "Our process moves rapidly. Expect an application review within 48 hours, followed by a 20-minute discovery call, a practical assignment walkthrough, and an offer letter within 7 to 10 business days.",
    },
    {
      question: "Can I work remotely from anywhere across India?",
      answer:
        "Yes, absolutely. For roles listed as 'Remote' or 'Hybrid', you can work from anywhere. We provide modern async collaboration tools, Slack, Zoom, and remote hardware support.",
    },
    {
      question: "What compensation and perks can I expect?",
      answer:
        "We offer above-market base compensation, quarterly milestone bonuses, flexible work hours, paid leaves, annual learning budgets, and team retreats.",
    },
    {
      question: "What should I include in my application for the best chance?",
      answer:
        "A clear, concise resume, links to your live projects (GitHub, live websites, Figma prototypes, or case studies), and a short summary of how your skills solve business problems.",
    },
    {
      question: "Can I re-apply if I was not selected in the past?",
      answer:
        "Definitely! We encourage candidates to re-apply after 3 to 6 months once you have acquired new skills, completed more projects, or updated your portfolio.",
    },
  ];

  return (
    <div className="min-h-screen selection:bg-purple-600 selection:text-white">
      <Toaster position="top-right" />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black text-white pt-24 pb-16 px-4 md:px-8 overflow-hidden">
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
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              Careers
            </span>
          </nav>

          {/* 2-Column Hero */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 cols): Content & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-950/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium">
                  We're Hiring • Remote &amp; Lucknow Active
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  WHERE AMBITION MEETS{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    CREATIVE EXCELLENCE
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-200">
                  BUILD PRODUCTS THAT REACH MILLIONS.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed pt-1 max-w-xl">
                  Digital Nawab is where top engineers, media buyers, SEO strategists, and UI/UX designers come to do their career-defining work. High autonomy, top compensation, zero micromanagement.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToPositions}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View Open Positions</span>
                </button>

                <button
                  onClick={() => openApplyModal(null)}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-semibold backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Drop General Resume</span>
                </button>

                <a
                  href="https://wa.me/919335621987?text=Hello%20Digital%20Nawab%20HR,%20I%20am%20interested%20in%20career%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold backdrop-blur-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp HR</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">&lt; 48h</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Resume Review</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">4.9 / 5.0 ★</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Culture Score</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">100% Remote</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">&amp; Hybrid Freedom</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">Merit First</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Rapid Promotion</div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-indigo-600/30 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
                <img
                  src="/assets/images/about/team-office.jpg"
                  alt="Team Digital Nawab"
                  className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Floating Chips */}
                <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-semibold text-white">Actively Hiring</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shrink-0">
                      <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                        <Users className="w-5 h-5 text-pink-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Life at Digital Nawab</div>
                      <div className="text-[11px] text-zinc-400">Collaboration &amp; Craft</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-400 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                    Join Us
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CORE VALUES & CULTURE (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 text-zinc-900 py-20 px-4 md:px-8 border-y border-zinc-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" /> Our Operating Principles
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              The Values That Drive Everything We Do
            </h2>
            <p className="text-zinc-600 text-base md:text-lg mt-3">
              We operate without corporate politics. Here is what we expect from each other and what you can expect from us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Extreme Ownership</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                You own your outcomes from day one. No micromanagement. If you see a way to innovate or elevate a project, you have total autonomy.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Relentless Craft</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We don't do 'average'. Clean code, high-converting ad copy, pixel-perfect Figma screens — we obsess over the fine details of our craft.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Speed &amp; Velocity</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Speed is a competitive moat. We move quickly, test hypotheses with real market data, iterate, and ship without red tape.
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Radical Candor</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Direct, respectful feedback given openly. We leave egos at the door and focus solely on what makes the team and client win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PERKS & WELL-BEING (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative bg-zinc-950 text-white py-20 px-4 md:px-8 border-b border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Comprehensive Benefits
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Built To Empower Ambitious Builders
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mt-3">
              We invest heavily in the people who power our success. Here is what you get as a team member.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Perk 1 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top-Tier Compensation</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Competitive salaries benchmarked against top product agencies, plus quarterly performance incentives and project completion bonuses.
              </p>
            </div>

            {/* Perk 2 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-pink-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Remote &amp; Hybrid Freedom</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Work from our modern Lucknow office or remotely across India. Flexible hours with a focus on output rather than clock-watching.
              </p>
            </div>

            {/* Perk 3 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upskilling &amp; Learning Fund</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We fund your specialized courses, tech certifications, book purchases, and attendance at top developer and growth conferences.
              </p>
            </div>

            {/* Perk 4 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Hardware &amp; AI Tools</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Access to modern dev workstations, premium AI tools (ChatGPT Team, Claude, Midjourney), Figma seats, and modern cloud infrastructure.
              </p>
            </div>

            {/* Perk 5 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Flexible Paid Time Off</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Rest and recovery matter. Generous paid time off, public holidays, mental recharge days, and flexible bereavement leave.
              </p>
            </div>

            {/* Perk 6 */}
            <div className="p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-rose-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-950/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 p-0.5 mb-5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Smile className="w-6 h-6 text-rose-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Team Dinners &amp; Offsites</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Project launch celebrations, monthly team dinners, Friday gaming sessions, hackathons, and our annual team getaway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: LIFE AT DIGITAL NAWAB & TEAM VOICES (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-white text-zinc-900 py-20 px-4 md:px-8 border-b border-zinc-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" /> Inside Digital Nawab
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              Life At Digital Nawab
            </h2>
            <p className="text-zinc-600 text-base md:text-lg mt-3">
              Meet the real minds engineering scalable software, launching viral ad campaigns, and building digital brands.
            </p>
          </div>

          {/* Photo & Testimonial Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Visual Mosaic (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/assets/images/about/social-media.jpg"
                  alt="Team collaboration"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md mt-6">
                <img
                  src="/assets/images/about/website-design.jpg"
                  alt="Design Sprints"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/assets/images/ppc/hero-expert.jpg"
                  alt="PPC & Strategy"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md mt-6">
                <img
                  src="/assets/images/about/team-office.jpg"
                  alt="Lucknow Office"
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Team Testimonials & Culture Highlights (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm md:text-base italic leading-relaxed">
                  "At Digital Nawab, your ideas are never ignored because of hierarchy. You are given direct ownership of client deliverables and modern tech stacks that push your engineering skills to the highest level."
                </p>
                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm">
                    SW
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Senior Web Engineer</h4>
                    <p className="text-xs text-zinc-500">Full-Stack Development Team</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm md:text-base italic leading-relaxed">
                  "The growth velocity here is unmatched. Within 6 months, you get hands-on experience managing high-intent ad spend, ranking difficult competitive keywords, and solving real brand challenges."
                </p>
                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center text-sm">
                    PM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Performance Marketing Lead</h4>
                    <p className="text-xs text-zinc-500">Growth &amp; Media Buying Team</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Team Members Avatars */}
              {teamMembers.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Meet A Few Of Your Future Colleagues
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-bold">{member.name}</span>
                        <span className="text-zinc-500">• {member.designation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CURRENT OPEN POSITIONS / JOB BOARD (DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section
        id="open-positions"
        ref={positionsRef}
        className="relative bg-black text-white py-20 px-4 md:px-8 border-b border-white/5"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" /> Job Board
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Current Open Roles
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mt-3">
              Explore open positions across engineering, marketing, SEO, and creative design. Managed directly by our recruitment desk.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-zinc-950 p-3 rounded-2xl border border-white/10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or skill..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: "all", label: "All Roles" },
                { id: "remote", label: "Remote" },
                { id: "hybrid", label: "Hybrid" },
                { id: "onsite", label: "Onsite" },
                { id: "full-time", label: "Full Time" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === filter.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-zinc-400 text-sm">Fetching active career opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center bg-zinc-950/60 rounded-3xl border border-white/10 p-8">
              <Briefcase className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No active roles match your search</h3>
              <p className="text-zinc-400 text-xs mt-1 max-w-md mx-auto">
                Try searching with different keywords, or submit a spontaneous application and we'll reach out as soon as a role opens.
              </p>
              <button
                onClick={() => openApplyModal(null)}
                className="mt-5 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Submit Spontaneous Application
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-purple-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/30 hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Top Row: Department & Status */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold capitalize">
                        {job.desig || "Open Role"}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Actively Hiring
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {job.title}
                    </h3>

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span className="capitalize">{job.job_type || "Full Time"}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-pink-400" />
                        <span className="capitalize">{job.work_mode || "Hybrid"}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{job.city || "Lucknow"}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm mt-4 leading-relaxed line-clamp-3">
                      {job.about_role ||
                        "Join our high-performing team and build modern digital experiences for clients globally."}
                    </p>

                    {/* Responsibilities Chips */}
                    {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.responsibilities.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-zinc-300"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                    {/* Link to detail page if real numeric ID exists */}
                    {typeof job.id === "number" || !isNaN(Number(job.id)) ? (
                      <Link
                        href={`/job-detail/${job.id}`}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/20"
                      >
                        <span>View Role &amp; Apply</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => openApplyModal(job)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/20 cursor-pointer"
                      >
                        <span>Apply For Position</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => openApplyModal(job)}
                      className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Don't See Your Role Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-pink-950/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Don't see your exact role listed?</h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
                We are constantly expanding our engineering, SEO, performance media, and creative design teams. Drop your CV and we will reach out as soon as a fitting spot opens.
              </p>
            </div>
            <button
              onClick={() => openApplyModal(null)}
              className="px-6 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors shrink-0 shadow-lg cursor-pointer"
            >
              Submit Spontaneous Application
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: OUR 4-STEP HIRING PROCESS (LIGHT BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 text-zinc-900 py-20 px-4 md:px-8 border-y border-zinc-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5" /> Transparent Timeline
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
              Our 4-Step Hiring Journey
            </h2>
            <p className="text-zinc-600 text-base md:text-lg mt-3">
              No endless rounds, no ghosting. Fast, transparent, and completely respectful of your time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Application Review</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Our talent lead reviews your resume and portfolio within 48 hours to assess role relevance and potential.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Discovery Call</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                A casual 20-minute conversation to learn about your passions, past work, career goals, and team cultural alignment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Practical Assessment</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                A short, real-world task or portfolio walkthrough that mirrors what you'll actually do day-to-day. No trick riddles.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Offer &amp; Onboarding</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                A competitive offer letter, transparent growth expectations, and an instant welcome into the Digital Nawab family!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: HIRING FAQS (DARK BACKGROUND - 2 COLUMNS) */}
      {/* ========================================================================= */}
      <section className="relative bg-zinc-950 text-white py-20 px-4 md:px-8 border-b border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Hiring FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2">
              Everything you need to know about our recruitment process, culture, and career development.
            </p>
          </div>

          {/* 2-Column Grid FAQ Accordion */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5 items-start">
            {careerFaqs.map((faq, index) => {
              const isOpen = !!openFaqs[index];
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all duration-200"
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
            })}
          </div>

          {/* Questions prompt box */}
          <div className="mt-12 p-6 rounded-2xl bg-zinc-900/80 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-base font-bold text-white">Have a question regarding recruitment?</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Reach out to our talent acquisition desk directly.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:careers@digitalnawab.com"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> careers@digitalnawab.com
              </a>
              <a
                href="https://wa.me/919335621987"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp HR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FINAL HIGH-IMPACT CAREER CTA (RADIANT DARK BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="relative bg-black py-24 px-4 md:px-8 overflow-hidden text-white">
        {/* Glowing Background Radial */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[350px] bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Start Your Journey
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready To Accelerate Your <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Professional Growth?
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Step into an environment where your ideas matter, your skills are stretched, and your contribution creates real, measurable impact.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollToPositions}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-purple-600/40 transform hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View All Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openApplyModal(null)}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-base border border-white/20 backdrop-blur-md transform hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-5 h-5 text-purple-400" />
              <span>Submit General Resume</span>
            </button>

            <a
              href="https://wa.me/919335621987?text=Hello%20Digital%20Nawab%20HR,%20I%20would%20like%20to%20apply%20for%20a%20role."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quick Direct HR Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-zinc-400 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <a href="mailto:careers@digitalnawab.com" className="hover:text-white transition-colors">
                careers@digitalnawab.com
              </a>
            </div>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <a href="tel:+919335621987" className="hover:text-white transition-colors">
                +91 93356 21987
              </a>
            </div>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Mahanagar, Lucknow, UP (Open Globally)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK APPLY MODAL POPUP */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            {/* Close Button */}
            <button
              onClick={closeApplyModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Send className="w-3 h-3" /> Job Application
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {selectedJobForModal ? `Apply for ${selectedJobForModal.title}` : "Spontaneous Career Application"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Share your details and upload your resume. Our talent team reviews every submission.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="10 digit mobile"
                    required
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 years (or 0 for Fresher)"
                    required
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Lucknow, Delhi, Remote"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Portfolio / GitHub / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Key Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. React, Next.js, SEO, Meta Ads, Figma"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
                />
              </div>

              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Upload Resume (PDF or Word, max 2MB) *
                </label>
                <div className="relative border-2 border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl p-4 text-center bg-white/[0.02] transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-400 mb-1" />
                    {formData.resume ? (
                      <p className="text-xs font-bold text-emerald-400">{formData.resume.name}</p>
                    ) : (
                      <>
                        <p className="text-xs text-zinc-300 font-medium">Click to upload or drag &amp; drop</p>
                        <p className="text-[11px] text-zinc-500">Supported formats: PDF, DOCX</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Note / Message */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Cover Note / Pitch (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Briefly tell us why you are a great fit..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
