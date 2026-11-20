import React, { useState, useEffect } from 'react';
import { Cloud, Code, Smartphone, Database, Shield, Globe, ChevronRight, Zap } from 'lucide-react';

const TechServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [services, setServices] = useState([]);

  const iconMap = {
    web: Code,
    app: Smartphone,
    cloud: Cloud,
    data: Database,
    security: Shield,
    default: Globe,
  };
const staticColors = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-red-400",
  "from-violet-500 to-purple-400"
];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getdev_innovation");
        const json = await res.json();
        if (json.data) {
          const formatted = json.data.map((item, idx) => ({
            id: item.id,
            icon: iconMap[item.icon] || iconMap.default,
            title: item.heading,
            subtitle: item.sub_heading,
            description: item.description,
            services: item.features || [],
           color: staticColors[idx % staticColors.length],
            delay: idx * 200,
          }));
          setServices(formatted);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (services.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [services]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-7xl xl:container mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/70">Technology Services</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Innovation
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Delivered
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Empowering businesses with cutting-edge technology solutions that drive growth and digital transformation
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isVisible = visibleItems.has(service.id.toString());
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  data-id={service.id}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-16`}
                  style={{
                    animationDelay: `${service.delay}ms`
                  }}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r ${service.color} rounded-full transform -translate-x-1/2 transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} z-20`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-full animate-ping opacity-20`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500 hover:scale-105 hover:border-white/20">
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                      
                      {/* Icon */}
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {service.title}
                        </h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
                          {service.subtitle}
                        </p>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Services List */}
                        <div className="space-y-2 mb-6">
                          {service.services.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                              <ChevronRight className="w-4 h-4 text-emerald-400" />
                              <span className="text-sm font-medium">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <button className={`group/btn relative bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-current/25 overflow-hidden`}>
                          <span className="relative z-10 flex items-center gap-2">
                            Learn More
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-300 mb-6">Let's discuss how our technology solutions can accelerate your digital journey.</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechServicesSection;