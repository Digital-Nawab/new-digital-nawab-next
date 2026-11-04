import React, { useState, useEffect } from 'react';
import { Smartphone, Apple, Bot, Code, Zap, Rocket, Users, Star, Download, Play, ChevronRight, Layers, Target, Globe } from 'lucide-react';

const MobileAppDevelopment = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [phoneRotation, setPhoneRotation] = useState(0);

  const platforms = [
    {
      name: "iOS Development",
      icon: Apple,
      description: "Native iOS apps built with Swift and SwiftUI for optimal performance and seamless Apple ecosystem integration.",
      technologies: ["Swift", "SwiftUI", "UIKit", "Core Data", "CloudKit", "Xcode"],
      features: [
        "App Store Optimization",
        "Push Notifications",
        "Apple Pay Integration",
        "Face ID / Touch ID",
        "Core ML Integration",
        "HealthKit & HomeKit"
      ],
      stats: "100M+ iOS Users Reached",
      color: "from-gray-600 to-gray-800",
      gradient: "from-gray-400 to-gray-600",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop"
    },
    {
      name: "Android Development",
      icon: Bot,
      description: "High-performance Android applications using Kotlin and Jetpack Compose for modern, scalable mobile solutions.",
      technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Room", "Firebase", "Android Studio"],
      features: [
        "Google Play Store Optimization",
        "Material Design 3",
        "Google Services Integration",
        "Biometric Authentication",
        "ML Kit Integration",
        "Wear OS Compatibility"
      ],
      stats: "2.5B+ Android Devices Supported",
      color: "from-green-600 to-green-800",
      gradient: "from-green-400 to-green-600",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop"
    },
    {
      name: "Flutter Development",
      icon: Layers,
      description: "Cross-platform apps with Flutter for consistent UI/UX across iOS and Android with single codebase efficiency.",
      technologies: ["Flutter", "Dart", "Provider", "Bloc", "Firebase", "VS Code"],
      features: [
        "Single Codebase",
        "Hot Reload Development",
        "Custom Widgets",
        "Platform Channels",
        "State Management",
        "Web & Desktop Support"
      ],
      stats: "50% Faster Development",
      color: "from-blue-600 to-blue-800",
      gradient: "from-blue-400 to-blue-600",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop"
    },
    {
      name: "React Native",
      icon: Code,
      description: "JavaScript-based cross-platform development with React Native for rapid deployment and code reusability.",
      technologies: ["React Native", "JavaScript", "TypeScript", "Redux", "Expo", "Metro"],
      features: [
        "Code Reusability",
        "Live Reloading",
        "Third-party Integrations",
        "Native Module Access",
        "Over-the-Air Updates",
        "Expo Managed Workflow"
      ],
      stats: "90% Code Sharing",
      color: "from-purple-600 to-purple-800",
      gradient: "from-purple-400 to-purple-600",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=600&fit=crop"
    }
  ];

  const developmentProcess = [
    {
      phase: "01",
      title: "Discovery & Strategy",
      description: "Market research, user persona development, and strategic planning to define your app's vision and roadmap.",
      icon: Target,
      duration: "1-2 weeks"
    },
    {
      phase: "02",
      title: "UI/UX Design",
      description: "User-centric design with wireframing, prototyping, and visual design that ensures exceptional user experience.",
      icon: Layers,
      duration: "2-3 weeks"
    },
    {
      phase: "03",
      title: "Development",
      description: "Agile development with regular updates, code reviews, and continuous integration for robust app creation.",
      icon: Code,
      duration: "6-12 weeks"
    },
    {
      phase: "04",
      title: "Testing & QA",
      description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing for quality assurance.",
      icon: Star,
      duration: "2-3 weeks"
    },
    {
      phase: "05",
      title: "Deployment",
      description: "App store submission, approval process management, and launch strategy execution for successful market entry.",
      icon: Rocket,
      duration: "1-2 weeks"
    },
    {
      phase: "06",
      title: "Maintenance",
      description: "Ongoing support, updates, performance monitoring, and feature enhancements to keep your app competitive.",
      icon: Zap,
      duration: "Ongoing"
    }
  ];

  const appStats = [
    { label: "Apps Developed", value: "200+", icon: Smartphone },
    { label: "App Store Rating", value: "4.8★", icon: Star },
    { label: "Total Downloads", value: "10M+", icon: Download },
    { label: "Client Satisfaction", value: "98%", icon: Users }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, parseInt(entry.target.dataset.index)]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    // Phone rotation animation
    const rotationInterval = setInterval(() => {
      setPhoneRotation(prev => (prev + 1) % 360);
    }, 50);

    // Auto-switch tabs
    const tabInterval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % platforms.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(rotationInterval);
      clearInterval(tabInterval);
    };
  }, [platforms.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 left-20 animate-bounce delay-300">
          <Smartphone className="w-8 h-8 text-blue-400/30" />
        </div>
        <div className="absolute bottom-32 right-32 animate-bounce delay-700">
          <Apple className="w-8 h-8 text-gray-400/30" />
        </div>
        <div className="absolute top-1/3 right-20 animate-bounce delay-1000">
          <Bot className="w-8 h-8 text-green-400/30" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl xl:container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20 animate-on-scroll" data-index="0">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium tracking-wider">MOBILE APP DEVELOPMENT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Build Apps That
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Users Love
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From ideation to deployment, we build intuitive and feature-rich mobile apps 
            for all platforms with cutting-edge technology and user-centric design.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-on-scroll" data-index="1">
          {appStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 ${
                visibleItems.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Tabs */}
        <div className="mb-16 animate-on-scroll" data-index="2">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {platforms.map((platform, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <platform.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Active Platform Content */}
          <div className={`transition-all duration-500 ${visibleItems.has(2) ? 'opacity-100' : 'opacity-0'}`}>
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`${activeTab === index ? 'block' : 'hidden'}`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                        <platform.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{platform.name}</h3>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-cyan-300 text-sm font-medium">{platform.stats}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {platform.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-white font-semibold mb-4">Technologies & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {platform.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-gradient-to-r ${platform.gradient} bg-opacity-20 backdrop-blur-sm border border-gray-600/30 rounded-full text-sm font-medium text-gray-200 hover:border-blue-400/50 transition-colors duration-300`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">Key Features</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {platform.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                              <ChevronRight className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="relative">
                    <div className="relative mx-auto w-80 h-96">
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-700">
                        {/* Screen */}
                        <div className="absolute inset-4 bg-black rounded-[2.5rem] overflow-hidden">
                          <img loading="lazy" decoding="async"
                            src={platform.image}
                            alt={platform.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                        </div>
                        {/* Notch */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                        {/* Home Indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                        <platform.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Process */}
        <div className="animate-on-scroll" data-index="3">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Development Process
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A proven methodology that ensures your app is delivered on time, within budget, and exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentProcess.map((step, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${
                  visibleItems.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
                  {/* Phase Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{step.phase}</span>
                    </div>
                    <div className="text-sm text-gray-400">{step.duration}</div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line */}
                {index < developmentProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default MobileAppDevelopment;