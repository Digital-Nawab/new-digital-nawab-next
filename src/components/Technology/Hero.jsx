"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Smartphone,
  Cloud,
  Database,
  Cpu,
  Zap,
  ArrowRight,
  Monitor,
  Layers,
  Globe,
} from "lucide-react";
import RotatingCircles from "./RotatingCircles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TechServicesHero = ({ isWebsiteDesignService = false }) => {
  const pathname = usePathname();
  const isWebDev =
    isWebsiteDesignService ||
    pathname === "/service/website-design-and-development" ||
    pathname?.startsWith("/service/website-design-and-development");

  const [currentService, setCurrentService] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      desc: "Modern web solutions",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: Smartphone,
      title: "App Development",
      desc: "Native & cross-platform",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      desc: "Scalable infrastructure",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: Database,
      title: "Database Solutions",
      desc: "Data management",
      gradient: "from-orange-500 to-red-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  const defaultTechStack = [
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "MongoDB",
  ];

  const webDevTechStack = [
    "WordPress",
    "React",
    "Next.js",
    "Shopify",
    "WooCommerce",
    "Tailwind CSS",
    "PHP",
    "Node.js",
    "MongoDB",
    "Figma",
  ];

  const techStack = isWebDev ? webDevTechStack : defaultTechStack;

  return (
    <section
      ref={containerRef}
      className="relative pt-[90px] md:pt-[100px] min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                rgba(59, 130, 246, 0.3) 0%, 
                rgba(147, 51, 234, 0.2) 25%, 
                rgba(16, 185, 129, 0.1) 50%, 
                transparent 70%
              ),
              linear-gradient(45deg, 
                rgba(59, 130, 246, 0.1) 0%, 
                rgba(147, 51, 234, 0.1) 25%, 
                rgba(16, 185, 129, 0.1) 50%, 
                rgba(239, 68, 68, 0.1) 75%, 
                transparent 100%
              )
            `,
            animation: "gradientShift 8s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(30deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent),
            linear-gradient(-30deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animation: `float ${
                particle.speed * 3
              }s ease-in-out infinite alternate`,
              animationDelay: `${particle.id * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl xl:container 2xl:px-16 xl:px-12 lg:px-8 md:px-6 px-4 py-8 lg:py-14 my-auto flex items-center">
        <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 2xl:gap-16 xl:gap-14 lg:gap-10 md:gap-8 gap-8 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-7">
            {/* Eyebrow Badge */}
            {isWebDev ? (
              <div
                className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-pink-500/15 backdrop-blur-md border border-purple-500/30 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-pink-400" />
                </div>
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent font-bold">
                  WEBSITE DESIGN &amp; DEVELOPMENT · DIGITAL NAWAB
                </span>
              </div>
            ) : (
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 text-sm font-medium transition-all duration-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Innovation Hub • Live Projects
                </span>
              </div>
            )}

            {/* Main Headline & Description */}
            <div className="space-y-4 sm:space-y-5">
              {isWebDev ? (
                <>
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-black leading-[1.14] tracking-tight transition-all duration-300 delay-200 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <span className="text-white block sm:inline">
                      Website Design &amp; Development{" "}
                    </span>
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient block sm:inline">
                      Services for Growing Businesses
                    </span>
                  </h1>

                  <p
                    className={`text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl transition-all duration-300 delay-400 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    Build a professional online presence with custom website
                    design and development tailored to your business goals. From
                    responsive business websites and WordPress development to
                    e-commerce stores and custom web solutions, we create
                    user-friendly, mobile-ready websites designed to support
                    your brand and business growth.
                  </p>

                  {/* 4 Key Pillars / Pills */}
                  <div
                    className={`flex flex-wrap gap-2 sm:gap-2.5 pt-1 transition-all duration-300 delay-500 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    {[
                      "Custom Website Development",
                      "WordPress Websites",
                      "E-commerce Websites",
                      "Responsive Web Design",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-zinc-200 font-medium hover:border-purple-400/40 hover:bg-purple-500/10 transition-all duration-200 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 animate-pulse" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1
                    className={`text-3xl md:text-4xl xl:text-6xl 2xl:text-8xl font-black leading-none transition-all duration-300 delay-200 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <span className="block">
                      <span className="text-white">Build</span>
                      <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text animate-gradient">
                        {" "}
                        Tomorrow
                      </span>
                    </span>
                    <span className="block text-white">Today</span>
                  </h1>

                  <div
                    className={`text-lg lg:text-xl 2xl:text-2xl text-gray-400 font-light transition-all duration-300 delay-400 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    Transforming ideas into digital reality with cutting-edge
                    technology
                  </div>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-1 transition-all duration-300 delay-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {isWebDev ? (
                <>
                  <Link href="/contact-us">
                    <button className="w-full sm:w-auto group cursor-pointer relative px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                  </Link>

                  <a href="#website-portfolio">
                    <button className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                      Explore Our Work
                    </button>
                  </a>
                </>
              ) : (
                <>
                  <Link href="/contact-us">
                    <button className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                      <span className="relative z-10 flex items-center gap-2">
                        Start Building
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                  </Link>

                  <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    Explore Solutions
                  </button>
                </>
              )}
            </div>

            {/* Tech Stack Marquee */}
            <div
              className={`transition-all duration-300 delay-900 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="text-xs sm:text-sm text-gray-500 mb-2.5">
                {isWebDev
                  ? "Technologies & frameworks we work with:"
                  : "Technologies we master:"}
              </div>
              <div className="flex gap-4 overflow-hidden max-w-xl">
                <div className="flex gap-4 animate-scroll">
                  {[...techStack, ...techStack].map((tech, index) => {
                    const randomColor = `#${Math.floor(
                      ((index * 137.5) % 360) * 1000
                    )
                      .toString(16)
                      .padStart(6, "0")}`;
                    return (
                      <div
                        key={index}
                        className="flex-shrink-0 px-3.5 py-1.5 rounded-full border text-gray-300 text-xs sm:text-sm font-medium bg-white/[0.03] backdrop-blur-sm"
                        style={{
                          borderColor: `${randomColor}40`,
                        }}
                      >
                        {tech}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual - Tech Stack Orbit */}
          <div className="relative hidden lg:flex items-center justify-center">
            <RotatingCircles />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 w-full h-16 sm:h-20 bg-gradient-to-r from-black/50 via-black/80 to-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>500+ Projects Delivered</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Technical Support</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-20px);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes animate-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default TechServicesHero;
