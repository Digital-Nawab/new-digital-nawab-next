"use client";

import React from "react";
import TechServicesHero from "./Hero";
import OrbitingLogos from "./TechOrbitHeroSection";
// import TechServicesOverview from "./TechServicesOverview ";
import WebDevelopmentSection from "./WebDevelopmentSection ";
import ComprehensiveServicesSection from "./ComprehensiveServicesSection";
import EcommerceTimeline from "./EcommerceTimeline ";
import MaintenanceSupport from "./MaintenanceSupport ";
import MobileAppDevelopment from "./MobileAppDevelopment ";
import ToolsAndTechnologies from "@/components/TechWeUse";
import TechServicesSection from "./TechServicesSection ";
import RotatingCircles from "./RotatingCircles";
import WebsiteDesignCornerstones from "./WebsiteDesignCornerstones";
import CornerstonesWebsite from "./CornerstonesWebsite";
import WebsiteDevProcess from "./WebsiteDevProcess";
import WebsitePortfolioCaseStudies from "./WebsitePortfolioCaseStudies";
import WebsiteFaqSection from "./WebsiteFaqSection";
import WebsiteConsultationSection from "./WebsiteConsultationSection";

const Technology = () => {
  return (
    <div>
      <TechServicesHero />
      {/* <RotatingCircles/> */}
      {/* <OrbitingLogos/> */}
      {/* <TechServicesOverview /> */}
      
      {/* Section 1: Website Development Company in Lucknow */}
      <section id="web-development">
        <WebDevelopmentSection />
      </section>

      {/* Section 2: Our Comprehensive Services */}
      <section id="comprehensive-services">
        <ComprehensiveServicesSection />
      </section>
      <WebsiteDesignCornerstones />
      <CornerstonesWebsite />

      {/* 07 Our Website Development Process */}
      <section id="website-process">
        <WebsiteDevProcess />
      </section>

      <EcommerceTimeline />
      <MaintenanceSupport />

      {/* 08 Website Portfolio & Case Studies */}
      <section id="website-portfolio">
        <WebsitePortfolioCaseStudies />
      </section>

      {/* 13 Frequently Asked Questions */}
      <section id="website-faq">
        <WebsiteFaqSection />
      </section>

      {/* 14 Get Free Consultation */}
      <section id="website-consultation">
        <WebsiteConsultationSection />
      </section>
    </div>
  );
};

export default Technology;
