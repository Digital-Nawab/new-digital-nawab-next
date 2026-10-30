'use client';
import React from "react";
import { useState, useEffect } from "react";

import ServicesSection from "./ServiceSec";
import WhyChooseSection from "./WhyChooseSec";
import Testimonial from "../Home/Testimonial";
import LatestWorkSection from "./WorkSec";
import FooterSection from "./FooterSec";
import PricingSection from "./PricingSection";
import Banner from "../../components/Banner";
import HeroSection from "./Hero";
import DigitalMarketingSection from "./DigitalMarketingSection";
import EmailMarketingSection from "./EmailMarketingSection";
import OurProcessSection from "./OurProcessSection";
import EnhancedLeadGenerationSection from "./LeadGenerationSection";
import OnlineReputationSection from "./OnlineReputationSection";
import PaidMarketingSection from "./PaidMarketingSection";
import WhatsAppMarketingSection from "./WhatsAppMarketingSection";
import GoogleAdsPackages from "./GoogleAdsPackages";
import ContactPopup from "../ContactPopup";

const DigialMarketing = () => {
   const [campaigns, setCampaigns] = useState([]);
  
    useEffect(() => {
      const fetchCampaigns = async () => {
        try {
          const res = await fetch(
            "/api/googlecampaigns"
          );
          const json = await res.json();
          if (json?.data) {
            setCampaigns(json.data);
          }
        } catch (err) {
          console.error("Error fetching campaigns:", err);
        }
      };
  
      fetchCampaigns();
    }, []);
    
  const gradientColors = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-teal-500 to-cyan-500",
  ];
  return (
    <>
      {/* <DigitalMarketingSection/> */}
      <HeroSection />
      <EmailMarketingSection />
      {/* <OurProcessSection/> */}
      <EnhancedLeadGenerationSection />
      <OnlineReputationSection />
      {/* <ServicesSection/> */}
      {/* Why Paid Campaigns Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Light Theme Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
              {/* <Target className="w-4 h-4" /> */}
              Campaign Benefits
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Why Paid Campaigns?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Paid advertising usually has a fee attached to it, but offers
              targeted reach and measurable results that organic methods cannot
              match.
            </p>
          </div>

          {/* Introduction Content */}
          <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-lg mb-16">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We've already discussed the differences between free and paid
                web advertising. Paid advertising usually has a fee attached to
                it. Paid advertising examples include internet collaborations,
                website takeovers, and PPC campaigns (search, display & more).
              </p>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                The majority of people associate sponsored advertising with
                pay-per-click (PPC). PPC advertising includes Google AdWords,
                Facebook, and Twitter, among other social and digital channels.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const cardGradient =
                gradientColors[index % gradientColors.length];

              return (
                <div
                  key={campaign.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative mb-6">
                    <div
                      className={`absolute -inset-2 bg-gradient-to-r ${cardGradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                    ></div>
                    <div
                      className={`relative w-16 h-16 bg-gradient-to-r ${cardGradient} rounded-2xl flex items-center justify-center shadow-lg text-2xl`}
                    >
                      {campaign.icon} {/* Render emoji or string directly */}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {campaign.heading}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {campaign.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Launch Your Campaign?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Start seeing results with targeted, measurable paid advertising
                campaigns designed for your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Campaign
                </button> */}

                <ContactPopup
                  buttonText=" Start Campaign"
                  buttonClassName=" cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                />
              
              </div>
            </div>
          </div>
        </div>
      </section>
      <GoogleAdsPackages />
      <PaidMarketingSection />
      <WhatsAppMarketingSection />
      {/* <FooterSection/> */}
    </>
  );
};

export default DigialMarketing;
