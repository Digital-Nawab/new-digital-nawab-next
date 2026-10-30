"use client";

import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Play,
  Pause,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye,
  Globe,
} from "lucide-react";
import ContactPopup from "../ContactPopup";

const defaultCaseStudies = [
  {
    id: 3,
    title: "Dr Scrubs E-Commerce Platform",
    category: "ecommerce",
    categoryLabel: "Global E-Commerce Platform",
    client: "Dr Scrubs International",
    url: "https://drscrubs.in/",
    video: "assets/videos/projects/1757745120.webm",
    poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    description:
      "Engineered an international medical apparel e-commerce store with multi-currency checkout, dynamic size recommendation engine, and automated international logistics integration.",
    tech_used: [
      "React JS",
      "TailwindCSS",
      "Laravel",
      "Razorpay",
      "Material Tailwind",
      "SQL",
    ],
    outcomes: [
      { label: "Online Sales Growth", value: "+280%", trend: "up" },
      { label: "Mobile Conversion Rate", value: "3.8x", trend: "up" },
      { label: "Average Page Load", value: "1.2s", trend: "down" },
      { label: "Global Gateway Support", value: "100%", trend: "up" },
    ],
    challenge:
      "High drop-off on mobile devices and fragmented international currency processing.",
    solution:
      "Developed a headless React frontend with one-click Razorpay payment and automated shipping calculations.",
  },
  {
    id: 5,
    title: "Babu Group Of Institutions",
    category: "corporate",
    categoryLabel: "Higher Education Portal",
    client: "Babu Group",
    url: "https://www.babuinstitute.digitalnawab.com/",
    video: null,
    poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    description:
      "Developed a comprehensive academic portal managing 25,000+ monthly students, online admissions, live result portals, faculty directory, and multi-campus course catalogues.",
    tech_used: ["Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "Cloudflare CDN"],
    outcomes: [
      { label: "Admission Enquiries", value: "+450%", trend: "up" },
      { label: "Uptime During Peak", value: "99.99%", trend: "up" },
      { label: "Active Student Users", value: "25,000+", trend: "up" },
      { label: "First Contentful Paint", value: "0.8s", trend: "down" },
    ],
    challenge:
      "Severe server crashes during annual admission windows and disjointed course applications.",
    solution:
      "Engineered a Next.js server-side rendered application with edge caching and automated applicant tracking.",
  },
  {
    id: 6,
    title: "ParvatiAs E-Commerce",
    category: "ecommerce",
    categoryLabel: "D2C Fashion & Apparel",
    client: "ParvatiAs Retail",
    url: "https://www.parvatias.com/",
    video: null,
    poster: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description:
      "Bespoke high-fashion retail storefront with sub-second catalog filtering, high-resolution product zooms, customer wishlists, and automated inventory sync with brick-and-mortar stores.",
    tech_used: ["React JS", "Laravel", "MySQL", "TailwindCSS", "REST APIs"],
    outcomes: [
      { label: "Bounce Rate Reduction", value: "-65%", trend: "down" },
      { label: "Organic Search Reach", value: "+190%", trend: "up" },
      { label: "Repeat Purchase Rate", value: "42%", trend: "up" },
      { label: "Checkout Completion", value: "94.2%", trend: "up" },
    ],
    challenge:
      "Slow-loading visual lookbooks causing 60%+ bounce rates on mobile networks.",
    solution:
      "Implemented next-gen WebP responsive image pipelines and predictive cart pre-fetching.",
  },
  {
    id: 12,
    title: "Digital Nawab Enterprise SaaS Portal",
    category: "webapp",
    categoryLabel: "Custom Web Application & CRM",
    client: "Digital Nawab Enterprise",
    url: "https://www.digitalnawab.com/",
    video: null,
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description:
      "Scalable agency resource management portal with dynamic client project tracking, invoice generation, API integrations, and real-time marketing analytics dashboards.",
    tech_used: ["Next.js 14", "TailwindCSS", "Framer Motion", "REST API", "Docker"],
    outcomes: [
      { label: "Lead Capture Speed", value: "10x", trend: "up" },
      { label: "Client Portal Adoption", value: "98%", trend: "up" },
      { label: "Lighthouse Score", value: "98/100", trend: "up" },
      { label: "Annual Availability", value: "100%", trend: "up" },
    ],
    challenge:
      "Manual client onboarding and delayed proposal cycles.",
    solution:
      "Custom self-serve client dashboard with automated invoicing and real-time project milestone tracking.",
  },
];

export default function WebsitePortfolioCaseStudies() {
  const [projects, setProjects] = useState(defaultCaseStudies);
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingVideo, setPlayingVideo] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  useEffect(() => {
    const fetchApiProjects = async () => {
      try {
        const res = await fetch("/api/getproject");
        const json = await res.json();
        if (json?.websites && json.websites.length > 0) {
          // Merge API data with rich verified outcomes
          const merged = defaultCaseStudies.map((fallback) => {
            const apiMatch = json.websites.find(
              (w) =>
                w.url?.includes(fallback.url.replace("https://", "").replace("www.", "")) ||
                w.id === fallback.id ||
                w.title?.toLowerCase().includes(fallback.title.toLowerCase().slice(0, 8))
            );
            if (apiMatch) {
              return {
                ...fallback,
                title: apiMatch.title || fallback.title,
                url: apiMatch.url || fallback.url,
                video: apiMatch.video || fallback.video,
                description: apiMatch.description || fallback.description,
              };
            }
            return fallback;
          });
          setProjects(merged);
        }
      } catch (err) {
        console.error("Failed to fetch projects, using rich fallback data:", err);
      }
    };

    fetchApiProjects();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filterTabs = [
    { id: "all", label: "All Case Studies" },
    { id: "ecommerce", label: "E-Commerce Stores" },
    { id: "corporate", label: "Corporate & Education" },
    { id: "webapp", label: "Custom Web Apps" },
  ];

  return (
    <section
      id="website-portfolio-case-studies"
      className="relative py-16 lg:py-20 bg-[#090518] text-white overflow-hidden selection:bg-purple-500 selection:text-white"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-purple-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-lg shadow-purple-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 uppercase">
              08 / Proven Track Record
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
            Website Portfolio &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">
              Case Studies
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Discover real website projects designed, developed, and deployed by Digital Nawab. Every build is accompanied by verified, measurable business outcomes and high commercial impact.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white border-white/30 shadow-lg shadow-purple-500/25 scale-[1.02]"
                  : "bg-white/[0.04] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {filteredProjects.map((project) => {
            const isPlaying = playingVideo === project.id;
            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-purple-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header / Video Container */}
                  <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/60 shadow-inner">
                    {project.video ? (
                      <video
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        poster={project.poster}
                        muted
                        loop
                        playsInline
                        autoPlay
                        onPlay={() => setPlayingVideo(project.id)}
                        onPause={() => setPlayingVideo(null)}
                      >
                        <source
                          src={
                            project.video.startsWith("http")
                              ? project.video
                              : `https://dashboard.digitalnawab.com/${project.video}`
                          }
                          type="video/webm"
                        />
                        <source
                          src={
                            project.video.startsWith("http")
                              ? project.video
                              : `https://dashboard.digitalnawab.com/${project.video}`
                          }
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <img
                        src={project.poster}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#090518] via-black/30 to-transparent pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 text-cyan-300 border border-white/15 backdrop-blur-md shadow">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Bottom Title Bar Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-xs text-gray-300 font-medium bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md">
                        Client: {project.client}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Live in Production
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  {/* Verifiable Outcomes Metrics Strip */}
                  <div className="mb-6 p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                    <div className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Verifiable Commercial Outcomes
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.outcomes.map((item, oIdx) => (
                        <div key={oIdx} className="text-center p-2 rounded-xl bg-white/[0.03]">
                          <div className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                            {item.value}
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_used.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.06] text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white !text-slate-950 text-xs sm:text-sm font-extrabold hover:bg-slate-100 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                    style={{ color: "#090518" }}
                  >
                    <span className="!text-slate-950 font-extrabold" style={{ color: "#090518" }}>View Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5 !text-slate-950" style={{ color: "#090518" }} />
                  </a>

                  <button
                    onClick={() => setSelectedCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white font-semibold transition-colors cursor-pointer py-2 px-3 rounded-xl hover:bg-white/5"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Stats Callout Strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/40 border border-white/15 backdrop-blur-xl mb-12">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black text-lg">
              250+
            </div>
            <div>
              <div className="text-white font-bold text-sm">Websites Deployed</div>
              <div className="text-gray-400 text-xs">Active across 15+ industries</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-black text-lg">
              99.8%
            </div>
            <div>
              <div className="text-white font-bold text-sm">Client Satisfaction</div>
              <div className="text-gray-400 text-xs">Verified 5-star reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-black text-lg">
              1.2s
            </div>
            <div>
              <div className="text-white font-bold text-sm">Avg. Load Speed</div>
              <div className="text-gray-400 text-xs">Core Web Vitals optimized</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 font-black text-lg">
              3.5x
            </div>
            <div>
              <div className="text-white font-bold text-sm">Avg. Conversion Surge</div>
              <div className="text-gray-400 text-xs">Within 90 days of redesign</div>
            </div>
          </div>
        </div>

        {/* Bottom Portfolio CTA */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Want to see how we would architect your specific website project?
          </p>
          <ContactPopup
            buttonText="Request a Customized Case Study & Quote"
            buttonClassName="cursor-pointer px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl bg-[#0f0926] border border-white/20 p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                  {selectedCaseStudy.categoryLabel}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedCaseStudy.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  The Challenge
                </h4>
                <p className="text-gray-300 leading-relaxed bg-white/[0.04] p-3.5 rounded-xl border border-white/10">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  The Engineering Solution
                </h4>
                <p className="text-gray-300 leading-relaxed bg-white/[0.04] p-3.5 rounded-xl border border-white/10">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Measured Commercial Results
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCaseStudy.outcomes.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 text-center"
                    >
                      <div className="text-xl font-black text-emerald-400">
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/10">
                <a
                  href={selectedCaseStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white !text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-slate-100 transition-all shadow-md cursor-pointer"
                  style={{ color: "#090518" }}
                >
                  <span className="!text-slate-950 font-extrabold" style={{ color: "#090518" }}>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5 !text-slate-950" style={{ color: "#090518" }} />
                </a>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
