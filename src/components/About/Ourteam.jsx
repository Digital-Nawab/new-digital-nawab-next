"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Sparkles,
  Linkedin,
  Mail,
  Calendar,
  ArrowRight,
  UserCheck,
  Briefcase,
} from "lucide-react";
import { Carousel } from "@/components/ui/apple-cards-carousel";

// Fallback verified team members from API in case network is slow or offline
const defaultTeam = [
  {
    id: 4,
    name: "Navyanshi Gulati",
    designation: "Junior Social Media Manager",
    image:
      "https://dashboard.digitalnawab.com/assets/images/our_team/1759126276_68da2304df5ca.webp",
    joining_date: "2025-07-11",
  },
  {
    id: 6,
    name: "Tanu Kashyap",
    designation: "Junior Web Developer",
    image:
      "https://dashboard.digitalnawab.com/assets/images/our_team/1759129939_68da315325e80.webp",
    joining_date: "2025-09-06",
  },
  {
    id: 9,
    name: "Monika Singh",
    designation: "Full Stack Developer",
    image:
      "https://dashboard.digitalnawab.com/assets/images/our_team/1784719423_6a60a83fd16e0.webp",
    joining_date: "2026-07-22",
  },
];

const TeamMemberCard = ({ member }) => {
  const yearJoined = member.joining_date
    ? new Date(member.joining_date).getFullYear()
    : "2025";

  return (
    <div className="w-[300px] sm:w-[340px] md:w-[360px] lg:w-[375px] h-full group relative rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/90 shadow-lg hover:shadow-2xl hover:border-purple-400 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top accent light on hover */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Portrait Container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-6 border border-gray-200 group-hover:border-purple-300 transition-all shadow-sm">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Department / Experience Pill */}
          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 border border-gray-200 shadow-md backdrop-blur-md flex items-center gap-1.5 text-[11px] font-bold text-gray-800">
            <UserCheck className="w-3 h-3 text-[#C73673]" />
            <span>Certified Specialist</span>
          </div>
        </div>

        {/* Member Name */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mb-2 group-hover:text-purple-700 transition-colors leading-snug">
          {member.name}
        </h3>

        {/* Designation Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Briefcase className="w-3 h-3 text-[#8F5AFF]" />
          <span>{member.designation}</span>
        </div>
      </div>

      {/* Footer with joining info and social icons */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1.5 text-gray-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#C73673]" />
          <span>Since {yearJoined}</span>
        </span>

        <div className="flex items-center gap-2">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-purple-100 hover:text-purple-700 border border-gray-200 flex items-center justify-center transition-colors text-gray-600"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:contact@digitalnawab.com"
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-pink-100 hover:text-pink-600 border border-gray-200 flex items-center justify-center transition-colors text-gray-600"
            aria-label="Email team member"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState(defaultTeam);
  const [loading, setLoading] = useState(false);

  // Fetch live team from API: https://dashboard.digitalnawab.com/api/getourteam
  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dashboard.digitalnawab.com/api/getourteam",
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 7000,
          }
        );

        if (
          isMounted &&
          response.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const mapped = response.data.data.map((m) => ({
            id: m.id,
            name: m.name.replace(/test$/i, "").trim(),
            designation: m.designation || "Digital Strategist",
            image: m.img
              ? `https://dashboard.digitalnawab.com/${m.img}`
              : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
            joining_date: m.joining_date,
          }));
          setTeamMembers(mapped);
        }
      } catch (err) {
        console.warn("Using default team list (API slow/offline):", err?.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const cards = teamMembers.map((member, index) => (
    <TeamMemberCard key={member.id || index} member={member} />
  ));

  return (
    <section
      id="team"
      className="relative w-full bg-[#f8f9fc] border-y border-gray-200/90 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-gray-900 overflow-hidden scroll-mt-24"
    >
      {/* Background Soft Glows & Texture */}
      <div className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#8F5AFF]/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#C73673]/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200/80 text-purple-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C73673]" />
            <span>The Minds Behind Digital Nawab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mb-4 leading-tight tracking-tight">
            Meet Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF1F6D]">
              Best Team
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
            A dynamic squad of performance marketers, technical SEO specialists,
            and software engineers committed to your business success.
          </p>
        </div>

        {/* Carousel Slider (Uses Project's Apple Cards Carousel) */}
        <div className="w-full">
          <Carousel items={cards} />
        </div>

        {/* Career / Join Us Banner Strip */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white border border-gray-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
          <div className="text-center md:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C73673] mb-1 block">
              We&apos;re Growing Rapidly
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2">
              Want to Join Our Performance Squad?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              Passionate about SEO, high-conversion PPC, graphic design, or full-stack
              engineering? Explore exciting opportunities at Digital Nawab.
            </p>
          </div>

          <Link
            href="/career"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] text-white font-semibold text-sm transition-transform hover:scale-105 shadow-xl shadow-[#C73673]/30 shrink-0"
          >
            <span>Explore Open Careers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;