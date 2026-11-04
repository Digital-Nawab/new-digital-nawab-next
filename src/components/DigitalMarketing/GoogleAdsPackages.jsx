import React, { useState } from 'react';
import { Check, X, Star, Zap, Crown, Rocket } from 'lucide-react';

const GoogleAdsPackages = () => {
  const [currency, setCurrency] = useState('INR');
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      name: 'Ignite',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      price: { INR: '₹8,000', USD: '$100' },
      adSpend: { INR: '₹15k–30k', USD: '$200–400' },
      popular: false,
      features: {
        'Campaign Types': 'Search Only',
        'Ad Platforms': 'Google Search',
        'Campaigns Managed': '1–2',
        'Keyword Research': 'Basic',
        'Ad Creatives': '2 Search Variants',
        'Ad Copywriting': '2 Sets (Search Only)',
        'Conversion Tracking': 'Basic (Form & CTA)',
        'Landing Page': 'Basic Review',
        'Remarketing Ads': false,
        'Shopping Feed': false,
        'Video Ads': false,
        'Performance Max': false,
        'A/B Testing': false,
        'Optimization': 'Weekly',
        'Targeting': 'Basic',
        'Dashboard': false,
        'Reporting': 'Standard PDF',
        'Consultation': 'Monthly'
      }
    },
    {
      name: 'Thrive',
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      price: { INR: '₹22,000', USD: '$275' },
      adSpend: { INR: '₹30k–70k', USD: '$400–850' },
      popular: true,
      features: {
        'Campaign Types': 'Search + Display',
        'Ad Platforms': 'Search + Display Network',
        'Campaigns Managed': 'Up to 4',
        'Keyword Research': 'In-depth + Negative Keywords',
        'Ad Creatives': '4 Text + 4 Display Banners',
        'Ad Copywriting': '4 Sets',
        'Conversion Tracking': 'Conversion Tags + Google Analytics',
        'Landing Page': 'Optimization Guidance',
        'Remarketing Ads': 'Basic (Display Only)',
        'Shopping Feed': false,
        'Video Ads': false,
        'Performance Max': false,
        'A/B Testing': true,
        'Optimization': 'Twice a Week',
        'Targeting': 'Refined',
        'Dashboard': false,
        'Reporting': 'Performance Overview + Insights',
        'Consultation': 'Bi-weekly'
      }
    },
    {
      name: 'Pinnacle',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40',
      price: { INR: '₹38,000', USD: '$475' },
      adSpend: { INR: '₹70k–150k', USD: '$850–1800' },
      popular: false,
      features: {
        'Campaign Types': 'Search + Display + YouTube + Shopping',
        'Ad Platforms': 'Search, Display, YouTube, Shopping',
        'Campaigns Managed': 'Up to 7',
        'Keyword Research': 'Advanced Intent-Based',
        'Ad Creatives': '6 Text + 8 Display + Video Thumbnails',
        'Ad Copywriting': '6+ Multi-Intent Variants',
        'Conversion Tracking': 'GA4 + Enhanced Conversions',
        'Landing Page': 'Strategic Funnel Mapping',
        'Remarketing Ads': 'Dynamic Remarketing',
        'Shopping Feed': 'Basic Feed',
        'Video Ads': '2 Bumper/In-Stream Ads',
        'Performance Max': 'Optional',
        'A/B Testing': 'Advanced Multivariate + Performance Reporting',
        'Optimization': 'Every 3 Days',
        'Targeting': 'Granular Segmentation',
        'Dashboard': 'Optional',
        'Reporting': 'Visual KPIs + Recommendations',
        'Consultation': 'Weekly'
      }
    },
    {
      name: 'Dominance',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
      price: { INR: '₹55,000+', USD: '$695+' },
      adSpend: { INR: '₹150k+', USD: '$1800+' },
      popular: false,
      features: {
        'Campaign Types': 'All Campaign Types incl. Performance Max',
        'Ad Platforms': 'Full Google Ecosystem (incl. Discovery, Gmail)',
        'Campaigns Managed': 'Unlimited (Custom strategy)',
        'Keyword Research': 'Full Semantic Strategy + Geo Targeting',
        'Ad Creatives': 'Unlimited A/B Variants',
        'Ad Copywriting': 'Full-Funnel + Retargeting Copy',
        'Conversion Tracking': 'Advanced Setup (Multi-Funnel Goals)',
        'Landing Page': 'Landing Page Copy & Design (Optional Add-On)',
        'Remarketing Ads': 'Custom Funnel Retargeting',
        'Shopping Feed': 'Optimized Feed + Merchant Center Setup',
        'Video Ads': 'Full Video Campaign Strategy',
        'Performance Max': 'Full Management & Creative Setup',
        'A/B Testing': 'Advanced Multivariate + Performance Reporting',
        'Optimization': 'Daily Monitoring + Scaling',
        'Targeting': 'Hyper-Personalized Targeting',
        'Dashboard': 'Live KPI Tracking',
        'Reporting': 'Strategic Growth Report + Call',
        'Consultation': 'Weekly + Strategic Scaling Plan'
      }
    }
  ];

  const FeatureRow = ({ label, values, index }) => (
    <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 py-4 border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-900/50' : ''}`}>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            Google Ads Management
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Get found. Get clicked. Get results.
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From high-intent search traffic to eye-catching video and shopping ads — we turn your ad spend into tangible business growth.
          </p>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${currency === 'INR' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}`}>INR (₹)</span>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md transition-transform duration-200 ${currency === 'USD' ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm ${currency === 'USD' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}`}>USD ($)</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 ${pkg.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 ${hoveredCard === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${pkg.color} text-white`}>
                  {pkg.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.name}</h3>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {pkg.price[currency]}<span className='text-sm font-normal'>/month</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    (Management Only) + Ad Spend
                  </div>
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    Recommended: {pkg.adSpend[currency]}
                  </div>
                </div>

                <button className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r ${pkg.color} text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Feature Comparison
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Compare all features across our packages
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="font-bold text-lg text-gray-900 dark:text-white md:col-span-1 px-4">
                  Features / Packages
                </div>
                {packages.map((pkg, idx) => (
                  <div key={idx} className="md:col-span-1 px-4 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${pkg.color} text-white font-medium`}>
                      {pkg.icon}
                      {pkg.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {Object.keys(packages[0].features).map((feature, index) => (
                <FeatureRow
                  key={feature}
                  label={feature}
                  values={packages.map(pkg => pkg.features[feature])}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Scale Your Business?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose the package that fits your goals and let our experts handle your Google Ads while you focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Schedule Consultation
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPackages;