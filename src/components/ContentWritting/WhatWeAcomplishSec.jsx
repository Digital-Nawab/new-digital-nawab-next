import { FileText, Edit, Search, FileEdit, PenTool, Globe, Target, ArrowRight, Award, Users, Star, Zap } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";
import Image from 'next/image'
const WhatWeAccomplishSection = () => {
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      number: "500+",
      label: "Content Pieces Published",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "100+",
      label: "Happy Clients",
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: "98%",
      label: "Client Satisfaction",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: "2x",
      label: "Average Traffic Increase",
    },
  ];

  const services = [
    {
      icon: <PenTool className="w-8 h-8 text-white" />,
      title: "Blog Writing Excellence",
      description: "Craft compelling blog posts that engage your audience and establish your authority. Our expert writers blend creativity with SEO best practices.",
      features: [
        "SEO-optimized content",
        "Industry-specific expertise",
        "Engaging storytelling",
        "Custom research",
      ],
      stats: {
        averageWordCount: "2000+",
        turnaroundTime: "48-72 hours",
        revisions: "Unlimited",
      },
      link: "#",
      image: "https://placehold.co/600x400/FF6B6B/FFFFFF/png?text=Blog+Writing",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Guest Post Outreach",
      description: "Expand your reach through strategic guest posting on high-authority websites.",
      features: ["High DA/DR websites", "Natural link building", "Niche placement", "Traffic boost"],
      stats: { number: "80+", label: "Partner Sites" },
      image: "https://placehold.co/600x400/4ECDC4/FFFFFF/png?text=Guest+Posts"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Industry Research",
      description: "Stay ahead with in-depth industry research and expert insights.",
      features: ["Competitor analysis", "Trend monitoring", "Market insights", "Data reports"],
      stats: { number: "100%", label: "Data-Driven" },
      image: "https://placehold.co/600x400/45B7D1/FFFFFF/png?text=Research"
    },
    {
      icon: <FileEdit className="w-8 h-8 text-white" />,
      title: "Content Strategy",
      description: "Develop a comprehensive content strategy that aligns with your business goals.",
      features: ["Editorial calendar", "Content planning", "Performance tracking", "ROI focus"],
      stats: { number: "45%", label: "ROI Increase" },
      image: "https://placehold.co/600x400/96CEB4/FFFFFF/png?text=Strategy"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-black text-white py-24 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Elevate Your Content Game
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From engaging blog posts to strategic guest contributions, we help you create content that resonates and drives results.
          </p>
        </div>

        {/* Achievement Statistics */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                {achievement.number}
              </h3>
              <p className="text-gray-400">{achievement.label}</p>
            </div>
          ))}
        </div>

        {/* Services Overview */}
        <HoverEffect
          items={services.map(service => ({
            title: service.title,
            description: service.description,
            icon: service.icon,
            link: service.link
          }))}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        />

        {/* Detailed Service Sections */}
        {services.map((service, index) => (
          <div
            key={index}
            className="mb-20 p-8 rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-orange-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.stats && (
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5">
                    {Object.entries(service.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xl font-bold text-orange-400">{value}</div>
                        <div className="text-sm text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative group">
                <img loading="lazy" decoding="async" 
                  src={service.image} 
                  alt={service.title}
                  className="rounded-xl w-full transform transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Content Strategy?</h3>
            <p className="text-gray-300 mb-8">Join hundreds of satisfied clients who have elevated their online presence with our expert content services.</p>
          </div>
          <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300">
            Start Your Content Journey 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeAccomplishSection;