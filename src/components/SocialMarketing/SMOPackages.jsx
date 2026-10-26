import React, { useState } from 'react';
import { Check, X, Heart, Zap, Crown, Rocket, Instagram, Facebook, Linkedin, Youtube, Users, BarChart3, MessageCircle, Camera, Calendar, Palette, Sparkles } from 'lucide-react';
import ContactPopup from '../ContactPopup';

const SMOPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  const packages = [
    {
      id: 'starter',
      name: 'Starter Growth',
      icon: <Heart className="w-6 h-6" />,
      emoji: '💫',
      priceINR: '6,000',
      priceUSD: '75',
      popular: false,
      description: 'Perfect for small businesses starting their social media journey',
      targetAudience: 'Small Businesses, Startups, Local Services',
      platforms: ['Meta (FB & IG)'],
      features: {
        'Posts per Month': '12 (3/week)',
        'Stories per Month': '8',
        'Post Designs': 'Static Posts',
        'Content Writing': 'Captions + Hashtags',
        'Content Calendar': 'Basic',
        'Page Optimization': 'Basic Bio Setup',
        'Community Management': false,
        'Video Posts (Reels/Shorts)': false,
        'YouTube Channel Management': false,
        'Monthly Report': 'Engagement Summary',
        'Strategy Call': false,
        'Custom Hashtag Set': false,
        'Influencer Suggestions': false
      }
    },
    {
      id: 'pro',
      name: 'Pro Brand',
      icon: <Zap className="w-6 h-6" />,
      emoji: '🚀',
      priceINR: '12,000',
      priceUSD: '150',
      popular: true,
      description: 'Scale your brand with professional content and multi-platform presence',
      targetAudience: 'Growing Businesses, E-commerce, Service Providers',
      platforms: ['Meta', 'LinkedIn'],
      features: {
        'Posts per Month': '18 (4-5/week)',
        'Stories per Month': '12',
        'Post Designs': 'Static + Carousels',
        'Content Writing': 'Keyword-based SEO Optimized + Tag Strategy',
        'Content Calendar': 'Detailed',
        'Page Optimization': 'Bio + Highlights',
        'Community Management': 'Reply to Comments',
        'Video Posts (Reels/Shorts)': '2/month',
        'YouTube Channel Management': false,
        'Monthly Report': 'Engagement + Growth',
        'Strategy Call': 'Monthly',
        'Custom Hashtag Set': true,
        'Influencer Suggestions': false
      }
    },
    {
      id: 'elite',
      name: 'Elite Presence',
      icon: <Crown className="w-6 h-6" />,
      emoji: '👑',
      priceINR: '20,000',
      priceUSD: '250',
      popular: false,
      description: 'Premium brand building with advanced content and full engagement',
      targetAudience: 'Established Brands, Agencies, Content Creators',
      platforms: ['Meta', 'LinkedIn', 'YouTube'],
      features: {
        'Posts per Month': '24 (6/week)',
        'Stories per Month': '18',
        'Post Designs': 'Mixed Media (Carousels + Shorts)',
        'Content Writing': 'Advanced Copy Strategy',
        'Content Calendar': 'Pre-scheduled + Edits',
        'Page Optimization': 'Full Page Optimization',
        'Community Management': 'Comments + Limited DMs',
        'Video Posts (Reels/Shorts)': '4/month',
        'YouTube Channel Management': 'Basic Setup',
        'Monthly Report': 'Visual Report + Analytics',
        'Strategy Call': 'Bi-Weekly',
        'Custom Hashtag Set': true,
        'Influencer Suggestions': 'Basic List'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise Suite',
      icon: <Rocket className="w-6 h-6" />,
      emoji: '🌟',
      priceINR: '35,000+',
      priceUSD: '450+',
      popular: false,
      description: 'Complete social media domination with custom strategies and full management',
      targetAudience: 'Large Enterprises, Global Brands, Influencers',
      platforms: ['All Requested Platforms'],
      features: {
        'Posts per Month': '25+ Custom',
        'Stories per Month': '25',
        'Post Designs': 'Custom Concepts (motion, seasonal, campaigns)',
        'Content Writing': 'Strategic Monthly Plan',
        'Content Calendar': 'Strategic Monthly Plan',
        'Page Optimization': 'Branded Aesthetic Setup',
        'Community Management': 'Full Engagement Management',
        'Video Posts (Reels/Shorts)': '6+/month',
        'YouTube Channel Management': 'Banner, Thumbnails, Optimization',
        'Monthly Report': 'Strategic Report + Recommendations',
        'Strategy Call': 'Weekly + Brand Direction',
        'Custom Hashtag Set': true,
        'Influencer Suggestions': 'Targeted List (optional add-on)'
      }
    }
  ];

  const formatPrice = (inr, usd) => {
    return currency === 'INR' ? `₹${inr}` : `$${usd}`;
  };

  const getPlatformIcons = (platforms) => {
    const iconMap = {
      'Meta (FB & IG)': [<Facebook key="fb" className="w-4 h-4" />, <Instagram key="ig" className="w-4 h-4" />],
      'Meta': [<Facebook key="fb" className="w-4 h-4" />, <Instagram key="ig" className="w-4 h-4" />],
      'LinkedIn': [<Linkedin key="li" className="w-4 h-4" />],
      'YouTube': [<Youtube key="yt" className="w-4 h-4" />],
      'All Requested Platforms': [
        <Facebook key="fb" className="w-4 h-4" />, 
        <Instagram key="ig" className="w-4 h-4" />, 
        <Linkedin key="li" className="w-4 h-4" />, 
        <Youtube key="yt" className="w-4 h-4" />
      ]
    };
    
    return platforms.flatMap(platform => iconMap[platform] || []);
  };

  return (
    <section id="packages" className="py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-purple-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            SMO Packages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Build your brand organically
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              with creative content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Consistent, creative, and engaging social media content that builds lasting connections with your audience
          </p>
          
          {/* Currency Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currency === 'INR' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currency === 'USD' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative group transition-all duration-500 ${
                hoveredCard === pkg.id ? 'scale-105 z-10' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative h-full bg-white rounded-2xl shadow-lg border transition-all duration-500 overflow-hidden ${
                pkg.popular 
                  ? 'border-purple-200 shadow-xl' 
                  : 'border-gray-200 group-hover:border-purple-200 group-hover:shadow-xl'
              }`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
                  pkg.id === 'starter' ? 'from-pink-500/5 to-rose-500/5' :
                  pkg.id === 'pro' ? 'from-purple-500/5 to-indigo-500/5' :
                  pkg.id === 'elite' ? 'from-indigo-500/5 to-blue-500/5' :
                  'from-violet-500/5 to-purple-500/5'
                } ${hoveredCard === pkg.id ? 'opacity-100' : ''}`} />

                <div className="relative p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      pkg.id === 'starter' ? 'bg-pink-100 text-pink-600' :
                      pkg.id === 'pro' ? 'bg-purple-100 text-purple-600' :
                      pkg.id === 'elite' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-violet-100 text-violet-600'
                    }`}>
                      {pkg.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                      <span className="text-2xl">{pkg.emoji}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(pkg.priceINR, pkg.priceUSD)}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                  {/* Platforms */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Platforms
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                      {getPlatformIcons(pkg.platforms)}
                      <span className="text-sm text-gray-700 ml-2">
                        {pkg.platforms.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Perfect For
                    </div>
                    <div className="text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-3">
                      {pkg.targetAudience}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3 mb-6">
                    {Object.entries(pkg.features).slice(0, 6).map(([feature, value]) => (
                      <div key={feature} className="flex items-start gap-3">
                        {value === false ? (
                          <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            pkg.id === 'starter' ? 'text-pink-500' :
                            pkg.id === 'pro' ? 'text-purple-500' :
                            pkg.id === 'elite' ? 'text-indigo-500' :
                            'text-violet-500'
                          }`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{feature}</div>
                          {value !== false && (
                            <div className="text-xs text-gray-600 mt-1">{value.toString()}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Content Highlights */}
                  <div className="mb-6 p-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Content Included</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>• {pkg.features['Posts per Month']} Posts</div>
                      <div>• {pkg.features['Stories per Month']} Stories</div>
                      <div>• {pkg.features['Post Designs']}</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleSelectPlan(pkg.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white hover:opacity-95 shadow-lg shadow-purple-500/25 hover:shadow-xl'
                      : `border-2 hover:text-white ${
                          pkg.id === 'starter' ? 'border-pink-500 text-pink-600 hover:bg-pink-500' :
                          pkg.id === 'pro' ? 'border-purple-500 text-purple-600 hover:bg-purple-500' :
                          pkg.id === 'elite' ? 'border-indigo-500 text-indigo-600 hover:bg-indigo-500' :
                          'border-violet-500 text-violet-600 hover:bg-violet-500'
                        }`
                  }`}>
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Trust Footnote */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <Facebook className="w-5 h-5 text-blue-600" />
              <Instagram className="w-5 h-5 text-pink-600" />
              <Linkedin className="w-5 h-5 text-blue-700" />
              <Youtube className="w-5 h-5 text-red-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2 border-l border-gray-200">All Platforms Covered</span>
            </div>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            All plans include strategic content planning, custom graphic design, caption copywriting, and monthly performance analytics.
          </p>
        </div>
      </div>

      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={selectedPlan ? `SMO Package: ${selectedPlan}` : 'SMO Package Inquiry'}
      />
    </section>
  );
};

export default SMOPackages;