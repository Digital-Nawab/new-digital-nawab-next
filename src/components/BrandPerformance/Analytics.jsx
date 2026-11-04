import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Zap, 
  Eye, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Settings, 
  Globe, 
  Smartphone,
  Monitor,
  Activity,
  PieChart,
  LineChart,
  Users,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image'
const AnalyticsIntegrationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const integrations = [
    {
      icon: BarChart3,
      name: "Google Analytics",
      description: "Comprehensive website analytics and user behavior tracking with advanced reporting capabilities.",
      features: ["Real-time Traffic", "Conversion Tracking", "Audience Insights", "Custom Reports"],
      gradient: "from-blue-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format",
      status: "Connected"
    },
    {
      icon: TrendingUp,
      name: "Google Tag Manager",
      description: "Streamlined tag management system for tracking codes and marketing pixels across your website.",
      features: ["Tag Management", "Event Tracking", "Version Control", "Testing Tools"],
      gradient: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format",
      status: "Connected"
    },
    {
      icon: Target,
      name: "Facebook Pixel",
      description: "Advanced social media tracking for optimized ad campaigns and audience retargeting strategies.",
      features: ["Pixel Tracking", "Custom Audiences", "Conversion Optimization", "Attribution Modeling"],
      gradient: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop&auto=format",
      status: "Connected"
    },
    {
      icon: Database,
      name: "Custom Analytics",
      description: "Tailored analytics solutions designed specifically for your business needs and KPIs.",
      features: ["Custom Dashboards", "API Integration", "Data Warehousing", "Automated Reports"],
      gradient: "from-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&auto=format",
      status: "Available"
    }
  ];

  const metrics = [
    {
      icon: Users,
      title: "Active Users",
      value: "45,231",
      change: "+12.5%",
      positive: true
    },
    {
      icon: Eye,
      title: "Page Views",
      value: "125,847",
      change: "+8.2%",
      positive: true
    },
    {
      icon: Target,
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      positive: true
    },
    {
      icon: Clock,
      title: "Avg. Session",
      value: "2:45",
      change: "-0.3%",
      positive: false
    }
  ];

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'traffic', label: 'Traffic', icon: TrendingUp },
    { id: 'conversions', label: 'Conversions', icon: Target },
    { id: 'devices', label: 'Devices', icon: Smartphone }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Get instant access to your website and campaign performance data as it happens."
    },
    {
      icon: Settings,
      title: "Automated Reporting",
      description: "Receive comprehensive reports automatically delivered to your inbox on schedule."
    },
    {
      icon: Globe,
      title: "Cross-platform Tracking",
      description: "Track user journeys across all devices and platforms for complete visibility."
    },
    {
      icon: PieChart,
      title: "Custom Dashboards",
      description: "Build personalized dashboards that focus on the metrics that matter most to you."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-purple-500/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-10 w-36 h-36 bg-orange-500/25 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Analytics Integration</span>
            <Database className="w-4 h-4" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text  leading-tight">
            Powerful Analytics
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Integration & Insights
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect all your data sources and get comprehensive insights that drive smarter business decisions with our advanced analytics integration platform.
          </p>
        </div>

        {/* Analytics Dashboard Preview */}
        <div className={`mb-20 transition-all duration-300 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            {/* Dashboard Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-400 text-sm">Real-time performance overview</p>
                </div>
                <div className="flex gap-2">
                  {dashboardTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id 
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg' 
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        metric.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-400">{metric.title}</div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="relative h-64 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <img loading="lazy" decoding="async" 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop&auto=format" 
                  alt="Analytics chart"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-white font-medium">Live Analytics Data</p>
                    <p className="text-gray-400 text-sm">Updated in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className={`mb-20 transition-all duration-300 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text ">
            Seamless Integrations
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-105 cursor-pointer ${
                  activeIntegration === index ? 'ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-500/20 scale-105 bg-white/10' : ''
                }`}
                onMouseEnter={() => setActiveIntegration(index)}
              >
                {/* Integration Image */}
                <div className="relative h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src={integration.image} 
                    alt={integration.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${integration.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Icon and Status */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-r ${integration.gradient} rounded-2xl text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <integration.icon className="w-6 h-6" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      integration.status === 'Connected' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {integration.status}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                    {integration.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-6">
                    {integration.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {integration.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 group/feature">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300" />
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`mb-20 transition-all duration-300 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop&auto=format" 
              alt="Data analytics workspace"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-blue-700/90 backdrop-blur-sm"></div>
            
            <div className="relative p-8 md:p-12 text-white">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Why Choose Our Analytics Integration?
                </h3>
                <p className="text-emerald-100 max-w-2xl mx-auto">
                  Transform raw data into actionable insights with our comprehensive analytics platform
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="w-8 h-8 text-emerald-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-200 transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="text-emerald-100 text-sm group-hover:text-white transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="group bg-gradient-to-r from-white to-emerald-50 text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:from-emerald-50 hover:to-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 flex items-center gap-2 mx-auto">
                  Start Integration
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Process */}
        <div className={`transition-all duration-300 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text ">
            Simple Setup Process
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Platforms",
                description: "Link your existing analytics tools and platforms with our secure integration system.",
                gradient: "from-emerald-500 to-teal-500",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&auto=format"
              },
              {
                step: "02",
                title: "Configure Tracking",
                description: "Set up custom tracking parameters and define the metrics that matter most to your business.",
                gradient: "from-blue-500 to-indigo-500",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format"
              },
              {
                step: "03",
                title: "Start Analyzing",
                description: "Access comprehensive dashboards and reports with real-time insights and automated alerts.",
                gradient: "from-purple-500 to-pink-500",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop&auto=format"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10">
                  <img loading="lazy" decoding="async" 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${step.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  <div className={`absolute top-4 left-4 w-10 h-10 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-400/50 to-blue-400/50 group-hover:from-emerald-400 group-hover:to-blue-400 transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsIntegrationSection;