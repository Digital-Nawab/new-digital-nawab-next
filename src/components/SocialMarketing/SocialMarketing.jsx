"use client";

import React from "react";
import SocialMediaHero from "./Hero";
import DigitalNawabSections from "./SocialMediaMarketingSection";
import YouTubeProcessSection from "./YouTubeProcessSection";
import FacebookMarketingSection from "./FacebookMarketingSection ";
import SocialPackagesUnified from "./SocialPackagesUnified";
import SocialFAQ from "./SocialFAQ";

const SocialMarketing = () => {
  return (
    <div className="overflow-hidden">
      {/* 1. DARK: Social Media Marketing Hero */}
      <SocialMediaHero />

      {/* 2. LIGHT: SMM Agency Benefits (Dynamic from Admin: /api/getsmmbenefit) */}
      <DigitalNawabSections />

      {/* 3. DARK: YouTube Video & Channel Marketing (Dynamic from Admin: /api/getsmmyoutube & /api/getsmmService) */}
      <YouTubeProcessSection />

      {/* 4. LIGHT: Meta & Facebook Ads Strategy (Dynamic from Admin: /api/getsmmfacebook) */}
      <FacebookMarketingSection />

      {/* 5. DARK: Unified Social Media Packages (SMO Organic + SMM Paid Ads) */}
      <SocialPackagesUnified />

      {/* 6. LIGHT: SMM Frequently Asked Questions & Consultation */}
      <SocialFAQ />
    </div>
  );
};

export default SocialMarketing;
