"use client";

import React from "react";
import dynamic from "next/dynamic";

// Critical above-the-fold sections: imported directly for instant render
import HeroSection from "./Hero";
import StatsSection from "./AboutUsSec";
import WhyChooseUsSection from "./WhychooseUs";
import VisionMissionSection from "./VIsion&Mission";

// Below-the-fold sections: dynamically loaded to code-split JS chunks and optimize TTI / LCP
const TimelineDemo = dynamic(
  () => import("./Timeline").then((mod) => mod.TimelineDemo),
  { ssr: true }
);

const InnovateHero = dynamic(() => import("./CatelystHero"), {
  ssr: true,
});

const ThreeDMarqueeDemoSecond = dynamic(
  () => import("./ThreeDMarqueeDemoSecond").then((mod) => mod.ThreeDMarqueeDemoSecond),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px] w-full" />,
  }
);

const ToolsAndTechnologies = dynamic(() => import("../../components/TechWeUse"), {
  ssr: true,
});

const ContactUs = dynamic(() => import("./ContactUS"), {
  ssr: true,
});

const FAQSection = dynamic(() => import("./FAQSec"), {
  ssr: true,
});

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <VisionMissionSection />
      <TimelineDemo />
      <InnovateHero />
      <ThreeDMarqueeDemoSecond />
      <ToolsAndTechnologies />
      <ContactUs isHomePage={true} />
      <FAQSection />
    </>
  );
};

export default Home;
