import React, { useState } from 'react';
import { Check, X, Star, Zap, Crown, Rocket, Code, Megaphone, Palette, BarChart3, Globe, ShoppingCart, Camera, PenTool, Target, Sparkles } from 'lucide-react';

const ComboPackages = () => {
  const [currency, setCurrency] = useState('INR');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const comboPackages = [
    {
      name: 'Startup Launch',
      icon: <Zap className="w-7 h-7" />,
      color: 'from-blue-500 via-purple-500 to-pink-500',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      price: { INR: '₹45,000', USD: '$550' },
      originalPrice: { INR: '₹65,000', USD: '$800' },
      savings: { INR: '₹20,000', USD: '$250' },
      duration: '4-6 weeks',
      popular: false,
      description: 'Perfect for new businesses ready to make their digital debut',
      services: [
        'Website Development (5-8 pages)',
        'Basic SEO Setup',
        'Social Media Setup (3 platforms)',
        'Google My Business Setup',
        'Basic Logo & Branding',
        'Content Creation (10 posts)',
        'Domain & Hosting (1 year)',
        'SSL Certificate'
      ],
      features: {
        'Website Development': 'Responsive 5-8 page website',
        'SEO Services': 'Basic on-page optimization + keyword research',
        'Social Media Marketing': '3 platform setup + 10 posts',
        'Google Ads Management': false,
        'Branding & Design': 'Basic logo + brand guidelines',
        'Content Creation': '10 social media posts + website copy',
        'E-commerce Features': false,
        'Analytics Setup': 'Google Analytics + Search Console',
        'Support & Maintenance': '1 month free support',
        'Revisions': '3 rounds included',
        'Custom Features': false,
        'Video Content': false
      }
    },
    {
      name: 'Growth Catalyst',
      icon: <Target className="w-7 h-7" />,
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      price: { INR: '₹85,000', USD: '$1,050' },
      originalPrice: { INR: '₹125,000', USD: '$1,550' },
      savings: { INR: '₹40,000', USD: '$500' },
      duration: '6-8 weeks',
      popular: true,
      description: 'Comprehensive solution for businesses ready to scale',
      services: [
        'Custom Website Development',
        'Complete SEO Package',
        'Social Media Management (6 months)',
        'Google Ads Campaign Setup',
        'Professional Branding Package',
        'Content Marketing Strategy',
        'Email Marketing Setup',
        'WhatsApp Business Integration'
      ],
      features: {
        'Website Development': 'Custom 10-15 page website + blog',
        'SEO Services': 'Complete SEO + 50 keywords + link building',
        'Social Media Marketing': '4 platforms + 60 posts + stories',
        'Google Ads Management': '3-month campaign management',
        'Branding & Design': 'Complete brand identity + marketing materials',
        'Content Creation': '60 posts + blog articles + email templates',
        'E-commerce Features': 'Basic online store (up to 50 products)',
        'Analytics Setup': 'Advanced tracking + monthly reports',
        'Support & Maintenance': '3 months free support',
        'Revisions': '5 rounds included',
        'Custom Features': 'Contact forms + booking system',
        'Video Content': '5 short promotional videos'
      }
    },
    {
      name: 'Digital Domination',
      icon: <Crown className="w-7 h-7" />,
      color: 'from-orange-500 via-red-500 to-pink-500',
      borderColor: 'border-orange-500/30 hover:border-orange-500/60',
      price: { INR: '₹1,50,000', USD: '$1,850' },
      originalPrice: { INR: '₹2,25,000', USD: '$2,800' },
      savings: { INR: '₹75,000', USD: '$950' },
      duration: '8-12 weeks',
      popular: false,
      description: 'Premium solution for established businesses seeking market leadership',
      services: [
        'Premium Website + Mobile App',
        'Advanced SEO + Local SEO',
        'Multi-Channel Marketing',
        'Comprehensive Ad Campaigns',
        'Complete Brand Overhaul',
        'Video Marketing Package',
        'CRM Integration',
        'Marketing Automation'
      ],
      features: {
        'Website Development': 'Premium website + mobile app + PWA',
        'SEO Services': 'Advanced SEO + 100 keywords + premium backlinks',
        'Social Media Marketing': '6 platforms + 120 posts + reels + ads',
        'Google Ads Management': '6-month full campaign management',
        'Branding & Design': 'Premium rebrand + all marketing collaterals',
        'Content Creation': '120 posts + weekly blogs + email sequences',
        'E-commerce Features': 'Advanced store + payment gateway + inventory',
        'Analytics Setup': 'Custom dashboard + AI insights + weekly reports',
        'Support & Maintenance': '6 months priority support',
        'Revisions': 'Unlimited revisions',
        'Custom Features': 'CRM + automation + custom integrations',
        'Video Content': '20 videos + product shoots + testimonials'
      }
    },
    {
      name: 'Enterprise Elite',
      icon: <Rocket className="w-7 h-7" />,
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      borderColor: 'border-purple-500/30 hover:border-purple-500/60',
      price: { INR: '₹2,50,000', USD: '$3,100' },
      originalPrice: { INR: '₹3,75,000', USD: '$4,650' },
      savings: { INR: '₹1,25,000', USD: '$1,550' },
      duration: '12-16 weeks',
      popular: false,
      description: 'Ultimate package for enterprises requiring complete digital transformation',
      services: [
        'Enterprise Web Solutions',
        'International SEO',
        'Omnichannel Marketing',
        'Performance Marketing Suite',
        'Corporate Branding',
        'Video Production Studio',
        'Custom Software Development',
        'Dedicated Account Management'
      ],
      features: {
        'Website Development': 'Enterprise platform + multiple apps + admin panel',
        'SEO Services': 'International SEO + 200+ keywords + PR outreach',
        'Social Media Marketing': 'All platforms + 200+ posts + influencer partnerships',
        'Google Ads Management': '12-month enterprise campaign management',
        'Branding & Design': 'Corporate identity + brand guidelines + merchandise',
        'Content Creation': '200+ posts + daily content + thought leadership',
        'E-commerce Features': 'Multi-vendor marketplace + advanced features',
        'Analytics Setup': 'Enterprise analytics + AI predictions + real-time insights',
        'Support & Maintenance': '12 months dedicated support team',
        'Revisions': 'Unlimited revisions + regular optimizations',
        'Custom Features': 'Custom software + API integrations + automation',
        'Video Content': '50+ videos + documentary + live streaming setup'
      }
    }
  ];

  const additionalServices = [
    { name: 'Extra Revisions', price: { INR: '₹2,000', USD: '$25' }, icon: <PenTool className="w-4 h-4" /> },
    { name: 'Rush Delivery', price: { INR: '₹15,000', USD: '$200' }, icon: <Zap className="w-4 h-4" /> },
    { name: 'Additional Languages', price: { INR: '₹8,000', USD: '$100' }, icon: <Globe className="w-4 h-4" /> },
    { name: 'Advanced Analytics', price: { INR: '₹12,000', USD: '$150' }, icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Professional Photography', price: { INR: '₹20,000', USD: '$250' }, icon: <Camera className="w-4 h-4" /> },
    { name: 'Custom Integrations', price: { INR: '₹25,000', USD: '$300' }, icon: <Code className="w-4 h-4" /> }
  ];

  const FeatureRow = ({ label, values, index }) => (
    <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 py-4 border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-900/30' : ''}`}>
      <div className="font-medium text-gray-900 dark:text-gray-100 md:col-span-1 px-4">
        {label}
      </div>
      {values.map((value, idx) => (
        <div key={idx} className="md:col-span-1 px-4 flex items-center justify-center md:justify-start">
          {value === true ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : value === false ? (
            <X className="w-5 h-5 text-red-400" />
          ) : (
            <span className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left">
              {value}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const calculateAdditionalCost = () => {
    return selectedServices.reduce((total, service) => {
      const serviceObj = additionalServices.find(s => s.name === service);
      return total + (serviceObj ? (currency === 'INR' ? parseInt(serviceObj.price.INR.replace('₹', '').replace(',', '')) : parseInt(serviceObj.price.USD.replace('$', ''))) : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-[120px] from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Digital Transformation Packages
          </div>
          
          <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">>
            Complete Digital Solutions
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Transform your business with our comprehensive combo packages combining 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> web development</span>, 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> digital marketing</span>, and 
            <span className="font-semibold text-pink-600 dark:text-pink-400"> branding services</span> at unbeatable prices.
          </p>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${currency === 'INR' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}`}>INR (₹)</span>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="relative w-16 h-8 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-gray-700 dark:to-gray-600 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
            >
              <div className={`absolute top-1 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transition-all duration-300 ${currency === 'USD' ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${currency === 'USD' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}`}>USD ($)</span>
          </div>
        </div>

        {/* Combo Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {comboPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 ${pkg.borderColor} transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 ${hoveredCard === index ? 'scale-105 -rotate-1' : ''} ${pkg.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.color} text-white shadow-lg`}>
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{pkg.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-gray-400 line-through">{pkg.originalPrice[currency]}</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      Save {pkg.savings[currency]}
                    </span>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {pkg.price[currency]}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                    <span>Delivery in {pkg.duration}</span>
                  </div>
                </div>

                {/* Key Services */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-center">What's Included:</h4>
                  <div className="space-y-2">
                    {pkg.services.slice(0, 4).map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      </div>
                    ))}
                    <div className="text-center pt-2">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        +{pkg.services.length - 4} more services
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${pkg.color} hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 active:scale-95`}>
                  Choose This Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            🎯 Add-On Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                onClick={() => toggleService(service.name)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedServices.includes(service.name)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      {service.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
                  </div>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{service.price[currency]}</span>
                </div>
              </div>
            ))}
          </div>
          {selectedServices.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  Additional Services Total:
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                  {currency === 'INR' ? '₹' : '$'}{calculateAdditionalCost().toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-8 py-10 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
              📊 Complete Feature Comparison
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Compare all features and services included in each combo package
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="font-bold text-xl text-gray-900 dark:text-white md:col-span-1 px-4">
                  Features & Services
                </div>
                {comboPackages.map((pkg, idx) => (
                  <div key={idx} className="md:col-span-1 px-4 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${pkg.color} text-white font-semibold shadow-lg`}>
                      {pkg.icon}
                      {pkg.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {Object.keys(comboPackages[0].features).map((feature, index) => (
                <FeatureRow
                  key={feature}
                  label={feature}
                  values={comboPackages.map(pkg => pkg.features[feature])}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center mt-20 p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">🚀 Ready to Transform Your Business?</h3>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Choose your perfect combo package and get everything you need to dominate your market. 
            Our expert team will handle the complete digital transformation while you focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              📞 Schedule Free Consultation
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              📊 View Our Portfolio
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-blue-200">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboPackages;