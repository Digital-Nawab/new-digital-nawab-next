import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Shield, Recycle, Award, Users } from "lucide-react";
import Image from 'next/image'
const PackagingDesignsSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Creative Excellence",
      description:
        "Award-winning designs that capture attention and drive sales with innovative visual storytelling.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      description:
        "From concept to completion in record time without compromising on quality or attention to detail.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Premium Protection",
      description:
        "Advanced materials and structural engineering ensure your products arrive safely every time.",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Solutions",
      description:
        "Sustainable packaging options that protect the environment while maintaining premium aesthetics.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description:
        "Trusted by Fortune 500 companies and startups alike for exceptional design and reliability.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Customer Success",
      description:
        "98% client satisfaction rate with dedicated support throughout your packaging journey.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Industry Awards" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="relative bg-black overflow-hidden">
      {/* What is Package Designing Section */}
      <div className="relative min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto xl:container px-6 py-20">
          <div className=" mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full mb-6">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20">
                  Digital Marketing Excellence 
                </Badge>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Package Designing
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h2>

              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Where strategic digital marketing meets innovative packaging
                design to create brands that don't just sell—they captivate,
                convert, and dominate markets.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    What is Package Designing by a
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {" "}
                      Digital Marketing Company?
                    </span>
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    Package designing in the digital marketing realm goes far
                    beyond traditional aesthetics. It's a strategic fusion of
                    psychology, branding, and consumer behavior analysis that
                    creates packaging solutions designed to perform in both
                    physical and digital environments.
                  </p>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    We don't just create beautiful packages—we engineer brand
                    experiences that drive engagement, boost conversions, and
                    create viral moments across social media platforms. Every
                    design decision is backed by market research, consumer
                    insights, and digital performance metrics.
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-4">
                  {[
                    "Strategic brand positioning through visual storytelling",
                    "Data-driven design decisions based on consumer psychology",
                    "Instagram-ready packaging that generates organic social buzz",
                    "Cross-platform brand consistency from shelf to screen",
                  ].map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {/* Main Image */}
                  <div className="col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-1 hover:scale-105 transition-transform duration-500">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80"
                      alt="Package Design Process"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">
                        Strategic Design Process
                      </h3>
                      <p className="text-sm text-gray-300">
                        Data-driven creative solutions
                      </p>
                    </div>
                  </div>

                  {/* Small Images */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-1 hover:scale-105 transition-transform duration-500">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&q=80"
                      alt="Brand Strategy"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-1 hover:scale-105 transition-transform duration-500">
                    <img loading="lazy" decoding="async"
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80"
                      alt="Creative Design"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000" />
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  step: "01",
                  title: "Research & Analysis",
                  desc: "Market insights and competitor analysis",
                },
                {
                  step: "02",
                  title: "Strategy Development",
                  desc: "Brand positioning and target audience mapping",
                },
                {
                  step: "03",
                  title: "Creative Execution",
                  desc: "Design concepts and digital optimization",
                },
                {
                  step: "04",
                  title: "Performance Tracking",
                  desc: "Analytics and continuous improvement",
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Transition Element */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 text-gray-400">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
                <span className="text-sm font-medium">
                  Discover Our Advantages
                </span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagingDesignsSection;
