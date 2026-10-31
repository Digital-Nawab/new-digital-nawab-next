"use client";
import Image from 'next/image'

import React from "react";

// Sections
// import HeroSection from "@/components/home/Hero";
// import StatsSection from "@/components/home/AboutUsSec";
// import WhyChooseUsSection from "@/components/home/WhychooseUs";
// import VisionMissionSection from "@/components/home/Vision&Mission";
// import { TimelineDemo } from "@/components/home/Timeline";
// import ToolsAndTechnologies from "@/components/TechWeUse";
// import { ThreeDMarqueeDemoSecond } from "@/components/home/ThreeDMarqueeDemoSecond";
// import InnovateHero from "@/components/home/CatelystHero";
// import ContactUs from "@/components/home/ContactUS";
import HeroSection from "./Hero";
import { TimelineDemo } from "./Timeline";
import ToolsAndTechnologies from "../../components/TechWeUse";

import HappyPartners from "./HappyPartners";
import Testimonial from "./Testimonial";
import InnovateHero from "./CatelystHero";
import FAQSection from "./FAQSec";
import ContactUs from "./ContactUS";
import VisionMissionSection from "./VIsion&Mission";
import { ThreeDMarqueeDemoSecond } from "./ThreeDMarqueeDemoSecond";
import WhyChooseUsSection from "./WhychooseUs";
import BlogSection from "./Blogs";
import StatsSection from "./AboutUsSec"
import MaksedVideo from "../MaskedVideo";

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <VisionMissionSection />
      {/* <MaksedVideo /> */}
      {/* <EnquiryModalDemo /> */}
      <TimelineDemo />
      <InnovateHero />
      <ThreeDMarqueeDemoSecond />
      <ToolsAndTechnologies />
      {/* <Testimonial /> */}
      <ContactUs isHomePage={true} />
      <FAQSection />
      {/* <BlogSection /> */}
    </>
  );
};

export default Home;
