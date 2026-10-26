"use client";

import React from "react";
import HeroSection from "./Hero";
import WhySeoUs from "./WhySeoUs";
import AuditForm from "./AuditForm";
import SeoService from "./SeoService";
import CaseStudies from "./CaseStudies";
import SeoAiSection from "./SeoAiSection";
import BacklinkBuilding from "./BacklinkBuilding";
import SEOPackages from "./SEOPackages";
import WhyChooseSeo from "./WhyChooseSeo";

const Seo = () => {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section - Value Proposition & Main CTAs */}
      <HeroSection />

      {/* 2. Why SEO with Digital Nawab - Strategic Pillars */}
      <WhySeoUs />

      {/* 3. Core Specialized Services - 14 SEO Solutions */}
      <BacklinkBuilding />

      {/* 4. Our 8-Step SEO Process - Methodology */}
      <SeoService />

      {/* 5. Next-Gen AI Search & GEO - Modern Edge */}
      <SeoAiSection />

      {/* 6. Proven Case Studies & Verified Results - Social Proof */}
      <CaseStudies />

      {/* 7. Free SEO Audit Lead Form - High Intent Conversion */}
      <section id="audit-form">
        <AuditForm />
      </section>

      {/* 8. SEO Packages & Pricing */}
      <SEOPackages />

      {/* 9. Why Choose Us, 15k+ Rankings & Final CTA */}
      <WhyChooseSeo />
    </div>
  );
};

export default Seo;
