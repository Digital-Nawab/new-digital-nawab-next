"use client";
import React from 'react';
import BrandPerformanceHero from './Hero';
import WhatIsPPC from './WhatIsPPC';
import PPCServicesSection from './PPcSection';
import WhyPaidCampaigns from './WhyPaidCampaigns';
import MediaBuyingSection from './MediaBuying';
import HowPPCWorks from './HowPPCWorks';
import ABTestingSection from './Testing';
import PPCAuditCTA from './PPCAuditCTA';

const BrandPerformance = () => {
  return (
    <div className="overflow-x-hidden">
      <BrandPerformanceHero />
      <WhatIsPPC />
      <PPCServicesSection />
      <WhyPaidCampaigns />
      <MediaBuyingSection theme="dark" />
      <HowPPCWorks />
      <ABTestingSection theme="dark" />
      <PPCAuditCTA />
    </div>
  );
};

export default BrandPerformance;