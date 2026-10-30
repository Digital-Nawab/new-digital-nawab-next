import React, { useState, useEffect } from 'react';
import { ShoppingCart, Smartphone, Globe, CreditCard, BarChart3, Users, Package, Zap } from 'lucide-react';

const EcommerceTimeline = () => {
 const [visibleItems, setVisibleItems] = useState(new Set());
  const [services, setServices] = useState([]);

  const iconMap = {
    custom: ShoppingCart,
    shopify: Package,
    wordpress: Globe,
    headless: Zap,
    mobile: Smartphone,
    enterprise: Users,
    default: Globe,
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/getdev_commerce");
        const json = await res.json();

        if (json.data) {
          const formatted = json.data.map((item) => ({
            year: item.tag?.toUpperCase() || "N/A",
            title: item.heading,
            description: item.description,
            icon: iconMap[item.tag?.toLowerCase()] || iconMap.default,
             image: item.image ? `https://dashboard.digitalnawab.com/${item.image}` : "/fallback.jpg", 
            stats: item.label || "",
            platforms: item.skills || [],
            approach: item.approach || "Scalable solutions with modern frameworks",
          }));
          setServices(formatted);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, parseInt(entry.target.dataset.index)]));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [services]);
  
  return (
    <section className="relative py-14 lg:py-18 bg-gradient-to-br from-black via-gray-900 to-purple-900/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl xl:container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-5 py-1.5 mb-4">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium tracking-wider">E-COMMERCE EXCELLENCE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            DIGITAL COMMERCE
            <br />
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">EVOLUTION</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Transform your business with cutting-edge e-commerce solutions that drive growth, 
            enhance user experience, and maximize conversions in the digital marketplace.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 hidden lg:block"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative transition-all duration-200 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                
              >
                <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
                  {/* Content Side */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                    <div className="group">
                      {/* Year Badge */}
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-4 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-purple-600/30`}>
                        <service.icon className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-semibold tracking-wider">{service.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Approach & Stats */}
                      <div className="space-y-4 mb-6">
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30">
                          <p className="text-gray-300 text-sm leading-relaxed italic">
                            "{service.approach}"
                          </p>
                        </div>
                        
                        {/* Platform Tags */}
                        <div className="flex flex-wrap gap-2">
                          {service.platforms.map((platform, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs font-medium text-purple-200 hover:border-purple-400/50 transition-colors duration-300"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-300 text-sm font-medium">{service.stats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 z-20">
                    <div className={`w-full h-full rounded-full border-4 transition-all duration-500 ${
                      visibleItems.has(index)
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-white shadow-lg shadow-purple-500/50 scale-110'
                        : 'bg-gray-700 border-gray-600 scale-100'
                    }`}>
                      <div className={`absolute inset-0 rounded-full animate-ping ${
                        visibleItems.has(index) ? 'bg-purple-400 opacity-20' : 'opacity-0'
                      }`}></div>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="flex-1">
                    <div className={`relative group overflow-hidden rounded-2xl ${index % 2 === 0 ? 'lg:ml-12' : 'lg:mr-12'}`}>
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-64 md:h-80 object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <service.icon className="w-12 h-12 text-white/80" />
                          </div>
                        </div>
                      </div>

                      {/* Floating Icon */}
                      <div className={`absolute -top-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all duration-500 ${
                        visibleItems.has(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                      }`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Timeline Line */}
                <div className="lg:hidden w-px h-12 bg-gradient-to-b from-purple-500 to-blue-500 mx-auto mt-8"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>
  );
};

export default EcommerceTimeline;