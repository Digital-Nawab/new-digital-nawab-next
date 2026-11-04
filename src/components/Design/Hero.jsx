import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Eye, Zap, Layers, Sparkles } from "lucide-react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Image from 'next/image'
const DesignServicesHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const portfolioSlides = [
    {
      title: "Brand Identity",
      subtitle: "Tech Startup",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Mobile App UI",
      subtitle: "E-commerce Platform",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Motion Graphics",
      subtitle: "Product Launch",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Packaging Design",
      subtitle: "Premium Brand",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      color: "from-orange-500 to-red-500",
    },
  ];

  const creativityWords = [
    "Creativity",
    "Innovation",
    "Vision",
    "Design",
    "Art",
  ];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % creativityWords.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                transform: `translateY(${Math.sin(i) * 20}px)`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                top: `${i * 6.67}%`,
                animationDelay: `${i * 0.15}s`,
                transform: `translateX(${Math.cos(i) * 20}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-screen flex">
        {/* Left Content Panel */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-2xl">
            {/* Studio Badge */}
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm mb-8 transform transition-all duration-300 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Design Studio • Available for Projects
            </div>

            {/* Main Headline with Word Animation */}
            <div className="mb-4">
              <h1
                className={`text-4xl lg:text-6xl 2xl:text-8xl font-black text-white leading-none mb-2 transform transition-all duration-300 delay-200 `}
              >
                <div className="overflow-hidden ">
                  <div className="transition-transform duration-700 ease-in-out ">
                    <ContainerTextFlip
                      words={[
                        "Design",
                        "Innovation",
                        "Vision",
                        "Creativity",
                        "Art",
                      ]}
                    />{" "}
                    Meets
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Communication
                </div>
              </h1>
            </div>

            {/* Description */}
            <p
              className={`text-xl text-gray-300 mb-6 leading-relaxed transform transition-all duration-300 delay-400 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              We craft visual experiences that don't just look beautiful—they
              communicate, engage, and drive results. From brand identity to
              digital interfaces, every pixel has purpose.
            </p>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-8 transform transition-all duration-300 delay-600 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <button className="group relative px-8 py-4 bg-white text-black rounded-none font-bold text-lg overflow-hidden transition-all duration-300 hover:bg-gray-100">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
              <button className="group flex items-center gap-3 px-8 py-4 border border-white/30 text-white rounded-none font-bold text-lg hover:bg-white/10 transition-all duration-300">
                <Play className="w-5 h-5" />
                Watch Our Process
              </button>
            </div>

            {/* Quick Stats */}
            <div
              className={`grid grid-cols-3 gap-8 transform transition-all duration-300 delay-800 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              {[
                { number: "500+", label: "Projects" },
                { number: "150+", label: "Clients" },
                { number: "99%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-black text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center p-10">
            {/* Main Portfolio Showcase */}
            <div className="relative w-full max-w-lg flex items-center justify-center">
              {/* Background Cards */}
              <div className="relative w-full h-96">
                {portfolioSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      index === currentSlide
                        ? "opacity-100 scale-100 rotate-0"
                        : index === (currentSlide + 1) % portfolioSlides.length
                        ? "opacity-60 scale-95 rotate-3 translate-x-4 translate-y-4"
                        : index === (currentSlide + 2) % portfolioSlides.length
                        ? "opacity-30 scale-90 rotate-6 translate-x-8 translate-y-8"
                        : "opacity-0 scale-85 rotate-12"
                    }`}
                    style={{
                      zIndex:
                        portfolioSlides.length -
                        Math.abs(
                          (index - currentSlide + portfolioSlides.length) %
                            portfolioSlides.length
                        ),
                    }}
                  >
                    <div
                      className={`w-full h-96 bg-gradient-to-br ${slide.color} rounded-2xl p-1`}
                    >
                      <div className="w-full h-full bg-black rounded-xl overflow-hidden relative">
                        <img loading="lazy" decoding="async"
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white font-bold text-xl mb-1">
                            {slide.title}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {slide.subtitle}
                          </p>
                        </div>
                        <div className="absolute top-6 right-6">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-bounce">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Zap className="w-10 h-10 text-white" />
              </div>

              <div className="absolute top-1/2 -right-12 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-spin">
                <Layers className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Portfolio Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {portfolioSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Teaser Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="h-full flex items-center justify-center">
          <div className="flex items-center gap-8 text-white/60 text-sm uppercase tracking-wider">
            <span>Branding</span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span>UI/UX Design</span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span>Ad Creatives</span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span>Motion Graphics</span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span>Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignServicesHero;
