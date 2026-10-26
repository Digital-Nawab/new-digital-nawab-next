import React from "react";
import BrandPerformanceHero from "@/components/BrandPerformance/Hero";
import WhatIsPPC from "@/components/BrandPerformance/WhatIsPPC";
import PPCServicesSection from "@/components/BrandPerformance/PPcSection";
import WhyPaidCampaigns from "@/components/BrandPerformance/WhyPaidCampaigns";
import MediaBuyingSection from "@/components/BrandPerformance/MediaBuying";
import HowPPCWorks from "@/components/BrandPerformance/HowPPCWorks";
import ABTestingSection from "@/components/BrandPerformance/Testing";
import PPCAuditCTA from "@/components/BrandPerformance/PPCAuditCTA";

export const metadata = {
  title: "PPC Services in Lucknow | Google Ads & Paid Campaign Experts",
  description:
    "Maximize ROI with expert PPC services in Lucknow. Target quality leads, appear on Google’s 1st page, and achieve cost-effective results with our paid marketing solutions.",
  alternates: {
    canonical: "https://www.digitalnawab.com/service/pay-per-click-services",
  },
};

const page = () => {
  return (
    <main className="overflow-x-hidden">
      {/* 1. Hero Section - Value Proposition, Trust Metrics & Main CTAs [DARK] */}
      <BrandPerformanceHero />

      {/* 2. Core Foundation - What is PPC & Search Marketing Overview [LIGHT] */}
      <WhatIsPPC />

      {/* 3. Tailored PPC Ad Formats & Managed Services (API Data) [DARK] */}
      <PPCServicesSection />

      {/* 4. Strategic Advantages - Why Paid Advertising Campaigns (API Data) [LIGHT] */}
      <WhyPaidCampaigns />

      {/* 5. Programmatic Reach - Strategic Media Buying Channels (API Data) [DARK] */}
      <MediaBuyingSection theme="dark" />

      {/* 6. Transparency - How PPC Ads Work & Real-Time Auction Mechanism [LIGHT] */}
      <HowPPCWorks />

      {/* 7. Data-Driven CRO - A/B Testing & Sales Funnel Optimization [DARK] */}
      <ABTestingSection theme="dark" />

      {/* 8. Conversion & Social Proof - PPC FAQ & Free 30-Min Account Audit [LIGHT] */}
      <PPCAuditCTA />
    </main>
  );
};

export default page;
