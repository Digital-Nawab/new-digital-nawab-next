import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  MonitorPlay,
  Smartphone,
  Globe,
  TrendingUp,
  Eye,
  MousePointer,
  BarChart3,
  Clock,
  ArrowRight,
  Target,
  Zap,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThreeDMarqueeDemoSecond } from "../Home/ThreeDMarqueeDemoSecond";
import Image from 'next/image';
import ContactPopup from "../ContactPopup";
// Aceternity UI Background Components (Modified for Light Mode)
const GridBackground = () => (
  <div className="absolute inset-0 opacity-20">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
      }}
    />
  </div>
);

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-40"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}
    <style jsx>{`
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(180deg);
        }
      }
    `}</style>
  </div>
);

const GradientBlur = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
  </div>
);

// Card Component with Hover Effects (Modified for Light Mode)
const GlassCard = ({ children, className = "", ...props }) => (
  <div
    className={`backdrop-blur-md bg-white/80 border border-gray-200/50 rounded-2xl hover:bg-white/90 hover:border-gray-300/50 transition-all duration-500 shadow-sm hover:shadow-md ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Animated Counter
const AnimatedCounter = ({ value, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const target = parseFloat(value.replace(/[^0-9.]/g, ""));
          let current = 0;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 20);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, isVisible]);

  return (
    <span ref={counterRef}>
      {prefix}
      {isVisible ? (value.includes(".") ? value : count) : 0}
      {suffix}
    </span>
  );
};

// Sample data for ad creatives
const adCreatives = {
  social: [
    {
      id: 1,
      title: "E-commerce Flash Sale",
      platform: "Instagram Stories",
      type: "Animated Story",
      performance: { ctr: "3.2%", conversions: "12.5%" },
      gradient: "from-pink-300 to-rose-400",
      size: "Stories (9:16)",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
      description:
        "Dynamic flash sale campaign with countdown timer and product showcase",
    },
    {
      id: 2,
      title: "SaaS Product Launch",
      platform: "LinkedIn Sponsored",
      type: "Carousel Ad",
      performance: { ctr: "2.8%", conversions: "8.9%" },
      gradient: "from-blue-300 to-indigo-400",
      size: "Square (1:1)",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
      description:
        "Professional B2B carousel showcasing key product features and benefits",
    },
    {
      id: 3,
      title: "Food Delivery App",
      platform: "Facebook Feed",
      type: "Video Ad",
      performance: { ctr: "4.1%", conversions: "15.2%" },
      gradient: "from-orange-300 to-red-400",
      size: "Landscape (16:9)",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      description:
        "Appetizing food delivery ad with mouth-watering visuals and quick ordering CTA",
    },
    {
      id: 4,
      title: "Fashion Brand Campaign",
      platform: "TikTok Ads",
      type: "Native Video",
      performance: { ctr: "5.7%", conversions: "18.3%" },
      gradient: "from-purple-300 to-pink-400",
      size: "Vertical (9:16)",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      description:
        "Trendy fashion showcase with lifestyle content and brand storytelling",
    },
  ],
  display: [
    {
      id: 5,
      title: "Tech Conference Banner",
      platform: "Website Header",
      type: "Leaderboard",
      performance: { ctr: "1.8%", conversions: "5.4%" },
      gradient: "from-cyan-300 to-blue-400",
      size: "728x90",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=200&fit=crop",
      description:
        "Professional tech conference banner with speaker lineup and registration CTA",
    },
    {
      id: 6,
      title: "Travel Agency Promo",
      platform: "Sidebar Display",
      type: "Skyscraper",
      performance: { ctr: "2.3%", conversions: "7.1%" },
      gradient: "from-green-300 to-teal-400",
      size: "160x600",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=600&fit=crop",
      description:
        "Exotic destination showcase with limited-time offers and booking incentives",
    },
    {
      id: 7,
      title: "Finance App Billboard",
      platform: "Digital Billboard",
      type: "Large Format",
      performance: { ctr: "0.9%", conversions: "3.2%" },
      gradient: "from-yellow-300 to-orange-400",
      size: "1200x628",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
      description:
        "Trust-building finance app ad with security features and user testimonials",
    },
  ],
  video: [
    {
      id: 8,
      title: "Brand Story Film",
      platform: "YouTube Pre-roll",
      type: "30s Commercial",
      performance: { ctr: "6.2%", conversions: "22.1%" },
      gradient: "from-indigo-300 to-purple-400",
      size: "1920x1080",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      description:
        "Emotional brand storytelling with customer journey and brand values",
    },
    {
      id: 9,
      title: "Product Demo",
      platform: "Social Media",
      type: "Explainer Video",
      performance: { ctr: "4.8%", conversions: "16.7%" },
      gradient: "from-emerald-300 to-green-400",
      size: "1080x1080",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop",
      description:
        "Clear product demonstration with step-by-step features and benefits",
    },
  ],
  print: [
    {
      id: 10,
      title: "Magazine Ad Campaign",
      platform: "Print Magazine",
      type: "Full Page",
      performance: { reach: "150k", engagement: "8.5%" },
      gradient: "from-slate-300 to-gray-400",
      size: "8.5x11 in",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop",
      description:
        "Premium magazine ad with sophisticated design and brand positioning",
    },
    {
      id: 11,
      title: "Outdoor Billboard",
      platform: "Highway Billboard",
      type: "Large Format",
      performance: { reach: "2.3M", engagement: "12.1%" },
      gradient: "from-red-300 to-pink-400",
      size: "14x48 ft",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop",
      description:
        "High-impact outdoor billboard with bold messaging and memorable visuals",
    },
  ],
};

const adTypes = [
  {
    id: "social",
    name: "Social Media Graphic Design",
    icon: <Smartphone className="w-5 h-5" />,
    count: 15,
    color: "from-pink-300 to-rose-400",
  },
  {
    id: "display",
    name: "Advertising Creative Design",
    icon: <MonitorPlay className="w-5 h-5" />,
    count: 12,
    color: "from-blue-300 to-indigo-400",
  },
  {
    id: "video",
    name: "Video & Motion Campaigns",
    icon: <Play className="w-5 h-5" />,
    count: 8,
    color: "from-green-300 to-emerald-400",
  },
  {
    id: "print",
    name: "Brochure & Print Media",
    icon: <Globe className="w-5 h-5" />,
    count: 6,
    color: "from-purple-300 to-violet-400",
  },
];

const timelineItems = [
  {
    id: 1,
    phase: "Discovery & Strategy",
    duration: "Week 1",
    description:
      "Deep dive into your brand, target audience, and campaign objectives. We analyze competitor strategies and market trends to create a winning approach.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    color: "from-blue-300 to-indigo-400",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 2,
    phase: "Creative Concept Development",
    duration: "Week 2",
    description:
      "Our creative team brainstorms and develops compelling concepts that align with your brand voice and resonate with your target audience.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
    color: "from-purple-300 to-pink-400",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 3,
    phase: "Design & Production",
    duration: "Week 3-4",
    description:
      "Professional designers create stunning visuals, while our video team produces engaging motion graphics and video content optimized for each platform.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    color: "from-orange-300 to-red-400",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: 4,
    phase: "Testing & Optimization",
    duration: "Week 5+",
    description:
      "We A/B test different variations, analyze performance metrics, and continuously optimize campaigns for maximum ROI and engagement.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-green-300 to-teal-400",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const adServices = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Performance-Driven Design",
    description:
      "Every creative is crafted with conversion optimization in mind, using data-driven design principles and psychological triggers that compel action.",
    gradient: "from-green-300 to-emerald-400",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Multi-Platform Optimization",
    description:
      "We adapt your creative assets for optimal performance across all platforms, ensuring consistent brand messaging while maximizing platform-specific features.",
    gradient: "from-blue-300 to-indigo-400",
  },
  {
    icon: <MousePointer className="w-6 h-6" />,
    title: "Interactive Elements",
    description:
      "Engage your audience with dynamic animations, interactive carousels, and immersive experiences that increase dwell time and engagement rates.",
    gradient: "from-purple-300 to-pink-400",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "A/B Testing Ready",
    description:
      "We deliver multiple creative variations optimized for different audience segments, enabling comprehensive testing and performance optimization.",
    gradient: "from-orange-300 to-red-400",
  },
];

// Animation variants for the section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AdCreativesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAdType, setActiveAdType] = useState("social");
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % timelineItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentAds = adCreatives[activeAdType] || [];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background Effects */}
      <GridBackground />
      <FloatingElements />
      <GradientBlur />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-200/50 to-blue-200/50 border border-cyan-300/50 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span className="text-cyan-600 font-semibold text-sm">
                    ADVERTISING & SOCIAL MEDIA CREATIVES
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Advertising Creative Design & Social Media Graphics
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                In today&apos;s fast-moving digital feed, your ads have less than three seconds to stop the scroll. At Digital Nawab, our creative design team crafts high-converting advertising creative design and social media graphic design that command immediate attention, communicate powerful value propositions, and drive qualified leads for businesses in Lucknow and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div
          initial="hidden"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mb-16"
        >
          <GlassCard className="p-6 sm:p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12 flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-500" />
              Campaign Performance That Speaks Volumes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                {
                  metric: "Average CTR",
                  value: "4.2",
                  suffix: "%",
                  change: "+125%",
                  desc: "vs industry average",
                },
                {
                  metric: "Conversion Rate",
                  value: "12.8",
                  suffix: "%",
                  change: "+89%",
                  desc: "improvement achieved",
                },
                {
                  metric: "ROAS",
                  value: "5.6",
                  suffix: "x",
                  change: "+203%",
                  desc: "return on ad spend",
                },
                {
                  metric: "Campaigns Launched",
                  value: "500",
                  suffix: "+",
                  change: "98%",
                  desc: "success rate",
                },
              ].map((stat, index) => (
                <div key={stat.metric} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-gray-600 mb-2 font-medium">
                      {stat.metric}
                    </div>
                    <div className="text-green-600 text-sm font-bold mb-1">
                      {stat.change}
                    </div>
                    <div className="text-gray-500 text-xs">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Creative Process Timeline */}
        <div
          initial="hidden"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8 text-cyan-500" />
              Our Creative Process
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              From concept to conversion, we follow a proven methodology that
              ensures every campaign delivers exceptional results.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-3 p-2 bg-gray-100/50 border border-gray-200/50 rounded-full">
                {timelineItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTimelineItem(index)}
                    className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
                      activeTimelineItem === index
                        ? "bg-gradient-to-r from-cyan-400 to-blue-400 w-12 shadow-lg shadow-cyan-400/30"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {activeTimelineItem === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-50" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Timeline Item */}
            <GlassCard className="overflow-hidden border-gray-200/50">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-96 overflow-hidden">
                  <img
                    src={timelineItems[activeTimelineItem].image}
                    alt={timelineItems[activeTimelineItem].phase}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${timelineItems[activeTimelineItem].color} opacity-60`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                        {timelineItems[activeTimelineItem].icon}
                      </div>
                      <div className="text-sm font-medium bg-gray-900/40 px-3 py-1 rounded-full">
                        {timelineItems[activeTimelineItem].duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-12 flex flex-col justify-center">
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    {timelineItems[activeTimelineItem].phase}
                  </h4>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    {timelineItems[activeTimelineItem].description}
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold">
                    <Clock className="w-5 h-5 mr-3" />
                    Duration: {timelineItems[activeTimelineItem].duration}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Ad Services */}
        <div
          initial="hidden"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {adServices.map((service, index) => (
            <GlassCard
              key={service.title}
              className={`p-6 group hover:scale-105 cursor-pointer transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  {service.icon}
                  {hoveredCard === index && (
                    <div className="absolute inset-0 bg-gray-200/50 rounded-2xl animate-pulse" />
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Call to Action */}
        <div
          initial="hidden"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardContent>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Ready to Amplify Your Ad Performance?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Let&apos;s create high-converting social media creatives and advertising campaigns that elevate your brand. Speak with our design team today.
              </p>
              <div className="flex justify-center">
                <ContactPopup
                  buttonText="Request a Design Quote"
                  buttonClassName="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-base hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdCreativesSection;