import React, { useState, useEffect } from "react";
import {
  Play,
  Video,
  Film,
  Monitor,
  Lightbulb,
  Palette,
  Settings,
  Volume2,
  ArrowRight,
  Star,
  Zap,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import Image from 'next/image'
const MotionGraphicsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const videoTypes = [
    {
      type: "Animated",
      icon: <Film className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      description:
        "Animated objects create illusion of movement and evoke emotions",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80",
      stats: "85% engagement boost",
    },
    {
      type: "Whiteboard",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      description: "Drawing on whiteboard while explaining features",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80",
      stats: "70% retention rate",
    },
    {
      type: "Live-action",
      icon: <Video className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      description: "Camera recorded for personal relationships",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
      stats: "90% trust increase",
    },
    {
      type: "Screencast",
      icon: <Play className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      description: "Screen capture with audio narrations",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      stats: "60% faster learning",
    },
  ];

  const processSteps = [
    {
      title: "Brainstorming",
      icon: <Lightbulb className="w-6 h-6" />,
      detail: "Concept Discussion",
      desc: "We understand what exactly you wish to accomplish using your video. We discuss the concepts with you and note down all your requirements.",
    },
    {
      title: "Scripting",
      icon: <Settings className="w-6 h-6" />,
      detail: "Storyboard Creation",
      desc: "The script will be written. It is the heart and soul of creating an explainer video. The quality of the script will determine what the end product looks like.",
    },
    {
      title: "Animation",
      icon: <Palette className="w-6 h-6" />,
      detail: "Style & Motion",
      desc: "We decide on the style that will completely depend on your personal choices. We employ different animated objects, illustrations, and storyboards.",
    },
    {
      title: "Production",
      icon: <Volume2 className="w-6 h-6" />,
      detail: "Voiceover & Sound",
      desc: "Voice-over artists determine the length and pace of animation. We add sounds and audio clips to make videos interactive.",
    },
  ];

  const services = [
    {
      title: "Whiteboard Animation",
      description: "Create meaningful stories by drawing items on a whiteboard",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/20",
      badge: "Most Popular",
      badgeColor: "text-cyan-400",
      features: [
        "Hand-drawn illustrations",
        "Custom storytelling",
        "Engaging narratives",
      ],
    },
    {
      title: "3D Animation",
      description:
        "Connect with your audience in a highly memorable way with stunning 3D visuals",
      icon: Film,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/20",
      highlight: "Perfect for product demonstrations",
      highlightColor: "bg-pink-500/20 text-pink-300",
      features: [
        "Photorealistic renders",
        "Dynamic camera work",
        "Advanced lighting",
      ],
    },
    {
      title: "Product Videos",
      description: "Advertise your products in unique and interactive ways",
      icon: Video,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/20",
      features: [
        "Product showcases",
        "Feature highlights",
        "Call-to-action focus",
      ],
    },
    {
      title: "Corporate Videos",
      description:
        "Reach out to audience and spread your brand message effectively",
      icon: Play,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/20",
      tags: ["Brand Storytelling", "Training", "Internal Comms"],
      features: [
        "Professional presentation",
        "Brand consistency",
        "Message clarity",
      ],
    },
  ];

  const stats = [
    { number: "500+", label: "Videos Created", icon: Video },
    { number: "98%", label: "Client Satisfaction", icon: Award },
    { number: "80%", label: "Conversion Boost", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Users },
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] animate-pulse" />

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Floating Elements */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follow Effect */}
      <div
        className="absolute pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          background:
            "radial-gradient(300px circle at center, rgba(168,85,247,0.1), transparent 70%)",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div
            className={`transform transition-all duration-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-20 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
                    Motion Graphics
                  </span>
                  <div className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full text-xs text-pink-300 border border-pink-500/30">
                    Award Winning
                  </div>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                  Explainer
                  <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Videos
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Discard old communication methods. Embrace extraordinary explainer
              video production that
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-semibold">
                {" "}
                boosts conversion rates by 80%
              </span>{" "}
              and enhances brand visibility with cutting-edge animation
              technology.
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.slice(0, 2).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                View Portfolio
              </button>
            </div>
          </div>

          {/* Enhanced Video Player Mockup */}
          <div
            className={`relative transform transition-all duration-300 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl p-8 border border-purple-500/20 shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-500">
              <div className="bg-black rounded-2xl aspect-video mb-6 relative overflow-hidden group cursor-pointer">
                <img loading="lazy" decoding="async"
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 group-hover:from-purple-600/70 group-hover:to-pink-600/70 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-1 bg-white/20 rounded-full mb-2">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-1/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>Brand Story Explainer</span>
                    <span>2:30</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-gray-300 text-sm">4.9/5 Rating</span>
                </div>
                <div className="text-purple-400 text-sm font-medium">
                  <Zap className="w-4 h-4 inline mr-1" />
                  High Impact
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Video Types Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium tracking-wider uppercase px-4 py-2 bg-white/5 rounded-full">
                Video Solutions
              </span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">
              What is an Explainer Video?
            </h2>
            <p className="text-center text-gray-300 text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Animated explainer videos have attention-grabbing storytelling
              concepts and striking visual appeal for complex explanations that
              drive real business results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videoTypes.map((video, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img loading="lazy" decoding="async"
                    src={video.image}
                    alt={video.type}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${video.color} transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {video.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {video.stats}
                      </div>
                      <div className="text-sm text-gray-400">Performance</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {video.type}
                  </h3>

                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                    {video.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${video.color} rounded-full transition-all duration-300 group-hover:w-full`}
                      style={{ width: hoveredCard === index ? "100%" : "60%" }}
                    />
                  </div>

                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white">
                        <span className="text-sm font-medium">
                          Explore Style
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Click to preview
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Production Process */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Our Production Process
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Watch how we transform your ideas into compelling visual stories
              that captivate and convert
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
            {/* Enhanced Process Timeline */}
            <div className="flex justify-between items-center mb-12 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500/30 via-purple-500/50 to-pink-500/30 rounded-full"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                }}
              ></div>

              {processSteps.map((step, index) => (
                <div key={index} className="relative z-10">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                      activeStep === index
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125 shadow-lg shadow-purple-500/50"
                        : index <= activeStep
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-110"
                        : "bg-slate-700 hover:bg-slate-600 hover:scale-105"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div
                      className={`transition-all duration-300 ${
                        activeStep === index ? "scale-110" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h4
                      className={`font-semibold transition-colors duration-300 ${
                        activeStep === index
                          ? "text-purple-400"
                          : index <= activeStep
                          ? "text-purple-300"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Active Step Details */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {processSteps[activeStep].title}
                  </span>
                  {" & "}
                  {processSteps[activeStep].detail}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                  {processSteps[activeStep].desc}
                </p>
                <div className="flex justify-center">
                  <div className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    Step {activeStep + 1} of {processSteps.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Showcase */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Animation Services Portfolio
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Comprehensive video solutions tailored to your brand's unique
              storytelling needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-br ${service.bgColor} rounded-3xl p-8 border ${service.borderColor} hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {service.badge && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span
                          className={`text-sm font-medium ${service.badgeColor}`}
                        >
                          {service.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  {service.features && (
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.highlight && (
                    <div
                      className={`${service.highlightColor} rounded-lg p-3 mb-4`}
                    >
                      <p className="text-sm">{service.highlight}</p>
                    </div>
                  )}

                  {service.tags && (
                    <div className="flex gap-2 mb-4">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center text-white">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                      <div className="text-xs text-gray-400">View samples</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MotionGraphicsSection;