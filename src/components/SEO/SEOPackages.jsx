import React, { useState } from 'react';
import { Check, X, Star, TrendingUp, Globe, ShoppingCart, MapPin } from 'lucide-react';
import ContactPopup from '../ContactPopup';

const SEOPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currency, setCurrency] = useState('INR');

  const packages = [
    {
      id: 'local',
      name: 'Local Starter',
      icon: <MapPin className="w-6 h-6" />,
      emoji: '📍',
      priceINR: '10,000',
      priceUSD: '125',
      popular: false,
      description: 'Perfect for local businesses looking to dominate their neighborhood',
      targetAudience: 'Local Service Providers, Clinics, Restaurants',
      features: {
        'Target Locations': '1–2 Cities',
        'Website Pages Optimized': 'Up to 10',
        'Keyword Research': 'Local Keyword Focus',
        'On-Page SEO': 'Meta, H1, URL, Alt Text',
        'Technical SEO': 'Basic Audit & Fixes',
        'Local Listings': 'Google My Business + 3 Citations',
        'Content Optimization': 'Existing Content',
        'Monthly Blogs': '2 SEO Blogs',
        'Backlink Building': '5 Local Links',
        'E-commerce Features': false,
        'International SEO': false,
        'SEO Tools Setup': 'Google Search Console + Analytics',
        'SEO Reporting': 'Monthly Rank Report',
        'Consultation Call': 'Monthly'
      }
    },
    {
      id: 'standard',
      name: 'Standard Growth',
      icon: <TrendingUp className="w-6 h-6" />,
      emoji: '🚀',
      priceINR: '20,000',
      priceUSD: '250',
      popular: true,
      description: 'Accelerate your growth with comprehensive SEO strategies',
      targetAudience: 'National SMEs, Corporates',
      features: {
        'Target Locations': 'Country-wide',
        'Website Pages Optimized': 'Up to 20',
        'Keyword Research': 'Competitive & Industry',
        'On-Page SEO': 'Advanced Tags + Internal Linking',
        'Technical SEO': 'Full Audit + Speed & Crawl Fixes',
        'Local Listings': 'GMB + 10+ Citations',
        'Content Optimization': 'Blogs + Landing Pages',
        'Monthly Blogs': '5 Blogs',
        'Backlink Building': '10 Authority Links',
        'E-commerce Features': false,
        'International SEO': false,
        'SEO Tools Setup': 'GSC, GA4, Bing + SE-Ranking',
        'SEO Reporting': 'Visual Analytics Dashboard',
        'Consultation Call': 'Bi-weekly'
      }
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce SEO',
      icon: <ShoppingCart className="w-6 h-6" />,
      emoji: '🛒',
      priceINR: '35,000',
      priceUSD: '450',
      popular: false,
      description: 'Specialized SEO for online stores and e-commerce platforms',
      targetAudience: 'Online Stores (Shopify, WooCommerce, Magento)',
      features: {
        'Target Locations': 'Country + Regions',
        'Website Pages Optimized': 'Up to 50',
        'Keyword Research': 'Product-based + Category Targeting',
        'On-Page SEO': 'Schema + Product Optimization',
        'Technical SEO': 'Mobile + Product Schema',
        'Local Listings': 'GMB + Rich Snippets',
        'Content Optimization': 'Product Descriptions + Blogs',
        'Monthly Blogs': '8-10 Blogs',
        'Backlink Building': '15 Niche + Influencer Links',
        'E-commerce Features': 'Category SEO, Filters, Search Tags',
        'International SEO': false,
        'SEO Tools Setup': 'MS Clarity + Merchant Center, GTM',
        'SEO Reporting': 'Conversion + Traffic Insights',
        'Consultation Call': 'Weekly'
      }
    },
    {
      id: 'global',
      name: 'Global SEO',
      icon: <Globe className="w-6 h-6" />,
      emoji: '🌐',
      priceINR: '50,000+',
      priceUSD: '625+',
      popular: false,
      description: 'Enterprise-level SEO for global reach and multilingual sites',
      targetAudience: 'SaaS, Global Brands, Multilingual Sites',
      features: {
        'Target Locations': 'Multi-Country / Language',
        'Website Pages Optimized': '50+',
        'Keyword Research': 'Multilingual/Geo-based Research',
        'On-Page SEO': 'Region-specific Optimization',
        'Technical SEO': 'Multi-Domain/Language Structuring',
        'Local Listings': 'Global Directory Submissions',
        'Content Optimization': 'Multilingual / Geo-Localized',
        'Monthly Blogs': '8-10 Geo/Language Blogs',
        'Backlink Building': '20+ Global/Niche Outreach',
        'E-commerce Features': 'Global Product Feed Optimization',
        'International SEO': 'Hreflang, Regional Targeting, Geo Sitemap',
        'SEO Tools Setup': 'Ahrefs/SEMrush',
        'SEO Reporting': 'Strategic KPI-based Reports',
        'Consultation Call': 'Weekly + Quarterly Strategy Call'
      }
    }
  ];

  const formatPrice = (inr, usd) => {
    return currency === 'INR' ? `₹${inr}` : `$${usd}`;
  };

  return (
    <section id="packages" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            SEO Packages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Rank higher. Grow faster.
            <span className="block text-blue-600 mt-2">Dominate your niche.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect SEO package tailored to your business needs and watch your rankings soar
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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative h-full bg-white rounded-2xl shadow-lg border transition-all duration-500 overflow-hidden ${
                pkg.popular 
                  ? 'border-blue-200 shadow-xl' 
                  : 'border-gray-200 group-hover:border-blue-200 group-hover:shadow-xl'
              }`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
                  pkg.id === 'local' ? 'from-cyan-500/5 to-blue-500/5' :
                  pkg.id === 'standard' ? 'from-blue-500/5 to-indigo-500/5' :
                  pkg.id === 'ecommerce' ? 'from-purple-500/5 to-pink-500/5' :
                  'from-orange-500/5 to-red-500/5'
                } ${hoveredCard === pkg.id ? 'opacity-100' : ''}`} />

                <div className="relative p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      pkg.id === 'local' ? 'bg-cyan-100 text-cyan-600' :
                      pkg.id === 'standard' ? 'bg-blue-100 text-blue-600' :
                      pkg.id === 'ecommerce' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
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

                  {/* Target Audience */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Target Audience
                    </div>
                    <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
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
                            pkg.id === 'local' ? 'text-cyan-600' :
                            pkg.id === 'standard' ? 'text-blue-500' :
                            pkg.id === 'ecommerce' ? 'text-purple-500' :
                            'text-orange-500'
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

                  {/* CTA Button */}
                  <ContactPopup
                  buttonText="Get Started"
                  buttonClassName={`w-full py-3 px-4 cursor-pointer rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : `border-2 hover:text-white ${
                          pkg.id === 'local' ? 'border-cyan-500 text-cyan-600 hover:bg-cyan-500' :
                          pkg.id === 'standard' ? 'border-blue-500 text-blue-600 hover:bg-blue-500' :
                          pkg.id === 'ecommerce' ? 'border-purple-500 text-purple-600 hover:bg-purple-500' :
                          'border-orange-500 text-orange-600 hover:bg-orange-500'
                        }`
                  }`}
                />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a detailed comparison? All packages include comprehensive SEO reporting and dedicated support.
          </p>
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            View Full Feature Comparison
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SEOPackages;