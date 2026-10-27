"use client";

import React from "react";
import AboutHero from "./AboutHero";
import AboutIntro from "./AboutIntro";
import AboutTimeline from "./AboutTimeline";
import AboutVisionMission from "./AboutVisionMission";
import AboutWhyChooseUs from "./AboutWhyChooseUs";
import TeamSection from "./Ourteam";
import FAQSection from "../FAQSec";

const About = () => {
  return (
    <main className="w-full bg-[#05040a] min-h-screen text-white selection:bg-purple-500 selection:text-white">
      {/* 1. Hero Section with Breadcrumb & Key Metrics */}
      <AboutHero />

      {/* 2. Who We Are / Brand Narrative & Proven Statistics */}
      <AboutIntro />

      {/* 3. Our Milestone - A Decade of Growth (2015-2025+) */}
      <AboutTimeline />

      {/* 4. Vision & Mission (Connected directly to Live Admin API) */}
      <AboutVisionMission />

      {/* 5. Why Choose Us - Distinctive Strategic Advantage */}
      <AboutWhyChooseUs />

      {/* 6. Meet Our Best Team (Connected directly to Live Admin API) */}
      <TeamSection />

      {/* 7. Frequently Asked Questions (2-Column Layout) */}
      <FAQSection />
    </main>
  );
};

export default About;
