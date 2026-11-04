import React, { useState } from 'react';
import { Search, Smartphone, BarChart3, ArrowRight, TrendingUp, Globe, Target } from 'lucide-react';

const LocalSEO = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      icon: Search,
      title: "Advanced Structured Data SEO Implementation",
      description: "Technical SEO enhances the performance of content's readability and presentation in search engines. The reuse of structured data improves visibility regarding rich snippets, featured results, and product features. This action ensures high positioning, increased click-through rates, and a more streamlined presentation of Google's changes in SERP features, applicable to both e-commerce and service businesses.",
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
      bgGradient: "from-blue-50 to-purple-50",
      accentColor: "text-blue-600"
    },
    {
      id: 2,
      icon: Smartphone,
      title: "App Store Optimisation Services",
      description: "The App Store Optimisation services of the best digital marketing company in Lucknow can help make an application more noticeable and increase the likelihood of being downloaded from the App Store. The list of apps is marketed with the help of specific word usage, enhanced descriptions, and user interaction.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 to-teal-50",
      accentColor: "text-emerald-600"
    },
    {
      id: 3,
      icon: BarChart3,
      title: "Comprehensive SEO Analysis & Reporting",
      description: "To address performance, traffic patterns, and ranking issues, the SEO audit services in Lucknow offer comprehensive expertise in this area.",
      gradient: "from-orange-600 via-red-600 to-pink-700",
      bgGradient: "from-orange-50 to-red-50",
      accentColor: "text-orange-600"
    }
  ];

  const highlightKeywords = (text) => {
    const keywords = [
      'best digital marketing company in Lucknow',
      'SEO audit services in Lucknow'
    ];
    
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\*\\*(${keyword})\\*\\*`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="font-bold text-indigo-700 bg-gradient-to-r from-indigo-100 to-purple-100 px-2 py-1 rounded-md">$1</span>`);
    });
    
    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-indigo-700 mb-6">
            <TrendingUp className="w-4 h-4" />
            Professional Digital Services
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6">
            Expert SEO & Digital Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital marketing services designed to enhance your online presence and drive measurable results
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;
            
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description - Using the exact content writer text */}
                  <div 
                    className="text-slate-600 text-base leading-relaxed mb-8 group-hover:text-slate-700 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightKeywords(service.description) 
                    }}
                  />

                  
                  <div className="flex items-center justify-between">
                    {/* <button className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-xl`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button> */}
                    
                    
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${service.gradient} opacity-100  flex items-center justify-center transition-all duration-500 transform group-hover:rotate-45`}>
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700" />
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
};

export default LocalSEO;