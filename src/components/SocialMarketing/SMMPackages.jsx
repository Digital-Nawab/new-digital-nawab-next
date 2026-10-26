import React, { useState } from 'react';
import {
  Check,
  X,
  Rocket,
  Zap,
  Flame,
  Briefcase,
  Target,
  TrendingUp,
  BarChart3,
  Eye,
  Users,
  MousePointer,
  DollarSign,
  Clock,
  Settings,
  PieChart,
  Video,
  Globe,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import ContactPopup from '../ContactPopup';

const SMMPackages = () => {
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
      id: 'launch',
      name: 'Launch',
      icon: <Rocket className="w-6 h-6" />,
      emoji: '🚀',
      priceINR: '8,000',
      priceUSD: '100',
      adSpendINR: '₹10k–20k',
      adSpendUSD: '$150–300',
      popular: false,
      description: 'Perfect start for businesses new to paid advertising',
      campaignTypes: ['Awareness', 'Traffic'],
      platforms: ['Meta (FB & IG)'],
      features: {
        'Ad Creatives (Design)': 'Up to 5 Static Ads',
        'Ad Copywriting': '2 Versions',
        'Audience Targeting': 'Basic Interest-Based',
        'Pixel & Conversion Setup': false,
        'Landing Page Suggestion': false,
        'Campaign Management': 'Basic Daily Checks',
        'Ad Optimization Frequency': 'Weekly',
        'Reports & Insights': 'Performance Summary',
        'Consultation Call': 'Monthly',
        'Remarketing Ads': false,
        'Video Ads': false,
        'Custom Conversion Goals': false,
        'A/B Testing': false,
        'Multi-Language Support': false
      }
    },
    {
      id: 'accelerate',
      name: 'Accelerate',
      icon: <Zap className="w-6 h-6" />,
      emoji: '⚡',
      priceINR: '20,000',
      priceUSD: '250',
      adSpendINR: '₹20k–50k',
      adSpendUSD: '$300–600',
      popular: true,
      description: 'Scale your business with advanced targeting and optimization',
      campaignTypes: ['Engagement', 'Leads'],
      platforms: ['Meta', 'LinkedIn'],
      features: {
        'Ad Creatives (Design)': '10 Ads (Static + Carousel)',
        'Ad Copywriting': '6 Variations',
        'Audience Targeting': 'Interest + Lookalike',
        'Pixel & Conversion Setup': 'Basic Setup',
        'Landing Page Suggestion': true,
        'Campaign Management': 'Daily + A/B Testing',
        'Ad Optimization Frequency': 'Bi-weekly',
        'Reports & Insights': 'ROI/ROAS Metrics',
        'Consultation Call': 'Bi-weekly',
        'Remarketing Ads': '1 Ad Set',
        'Video Ads': 'Basic Clips',
        'Custom Conversion Goals': false,
        'A/B Testing': 'Limited',
        'Multi-Language Support': false
      }
    },
    {
      id: 'scale',
      name: 'Scale',
      icon: <Flame className="w-6 h-6" />,
      emoji: '🔥',
      priceINR: '35,000',
      priceUSD: '450',
      adSpendINR: '₹50k–100k',
      adSpendUSD: '$600–1200',
      popular: false,
      description: 'Maximum growth with comprehensive multi-platform campaigns',
      campaignTypes: ['Conversion', 'Video Views'],
      platforms: ['Meta', 'LinkedIn', 'YouTube', 'Twitter'],
      features: {
        'Ad Creatives (Design)': '20 Mixed (Image, Video, Reels, Stories)',
        'Ad Copywriting': '9 A/B Variants',
        'Audience Targeting': 'Custom + Retargeting',
        'Pixel & Conversion Setup': 'Full Funnel Tracking',
        'Landing Page Suggestion': true,
        'Campaign Management': 'Real-Time Monitoring',
        'Ad Optimization Frequency': 'Every 3–4 days',
        'Reports & Insights': 'Deep Analytics (CPC, CTR, CPL)',
        'Consultation Call': 'Weekly',
        'Remarketing Ads': 'Multi-Layered',
        'Video Ads': 'Motion Graphics / Reels',
        'Custom Conversion Goals': true,
        'A/B Testing': true,
        'Multi-Language Support': 'Available on Request'
      }
    },
    {
      id: 'dominate',
      name: 'Dominate',
      icon: <Briefcase className="w-6 h-6" />,
      emoji: '💼',
      priceINR: '50,000+',
      priceUSD: '625+',
      adSpendINR: '₹100k+',
      adSpendUSD: '$1200+',
      popular: false,
      description: 'Enterprise-level campaigns with dedicated account management',
      campaignTypes: ['Full-Funnel (Brand to Sales)'],
      platforms: ['All Platforms (Snapchat, Pinterest, Meta, LinkedIn)'],
      features: {
        'Ad Creatives (Design)': 'Unlimited Creative Variants',
        'Ad Copywriting': 'Full Funnel Copy Set',
        'Audience Targeting': 'Advanced Segmentation & Funnel Mapping',
        'Pixel & Conversion Setup': 'Advanced Custom Events',
        'Landing Page Suggestion': true,
        'Campaign Management': 'Dedicated Account Manager',
        'Ad Optimization Frequency': 'Daily & Dynamic Scaling',
        'Reports & Insights': 'Custom Dashboard + KPIs',
        'Consultation Call': 'Weekly + Funnel Strategy',
        'Remarketing Ads': 'Dynamic Retargeting Campaigns',
        'Video Ads': 'High-Impact Videos / Shorts',
        'Custom Conversion Goals': 'Multi-step Conversions',
        'A/B Testing': 'Multi-Ad Testing Strategy',
        'Multi-Language Support': true
      }
    }
  ];

  const formatPrice = (inr, usd) => {
    return currency === 'INR' ? `₹${inr}` : `$${usd}`;
  };

  const formatAdSpend = (inr, usd) => {
    return currency === 'INR' ? inr : usd;
  };

  const getCampaignIcons = (types) => {
    const iconMap = {
      'Awareness': <Eye className="w-3.5 h-3.5" />,
      'Traffic': <MousePointer className="w-3.5 h-3.5" />,
      'Engagement': <Users className="w-3.5 h-3.5" />,
      'Leads': <Target className="w-3.5 h-3.5" />,
      'Conversion': <DollarSign className="w-3.5 h-3.5" />,
      'Video Views': <Video className="w-3.5 h-3.5" />,
      'Full-Funnel (Brand to Sales)': <TrendingUp className="w-3.5 h-3.5" />
    };

    return types.map((type) => (
      <span key={type} className="inline-flex items-center gap-1">
        {iconMap[type] || <Target className="w-3.5 h-3.5" />}
      </span>
    ));
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-amber-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            <Target className="w-4 h-4" />
            Paid Advertising Packages (SMM)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Performance-Driven Paid Campaigns{" "}
            <span className="block sm:inline bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              for Maximum ROAS & Leads
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Engineered ad funnels on Meta, LinkedIn, and YouTube designed to minimize cost-per-lead and scale profitable revenue.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative group transition-all duration-300 ${
                hoveredCard === pkg.id ? 'transform -translate-y-2' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`h-full bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  pkg.popular
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-xl'
                    : 'border-gray-200 shadow-sm hover:border-orange-300 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        pkg.id === 'launch'
                          ? 'bg-blue-50 text-blue-600'
                          : pkg.id === 'accelerate'
                          ? 'bg-orange-50 text-orange-600'
                          : pkg.id === 'scale'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-purple-50 text-purple-600'
                      }`}
                    >
                      {pkg.icon}
                    </div>
                    <span className="text-2xl">{pkg.emoji}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-gray-500 text-xs min-h-[34px] leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="text-3xl font-black text-gray-900">
                      {formatPrice(pkg.priceINR, pkg.priceUSD)}
                      <span className="text-xs font-normal text-gray-500 ml-1">/month</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Management Retainer</div>
                    <div className="mt-2.5 p-2.5 bg-orange-50/70 border border-orange-100/80 rounded-xl">
                      <div className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">
                        Target Ad Spend
                      </div>
                      <div className="text-xs font-bold text-orange-700">
                        {formatAdSpend(pkg.adSpendINR, pkg.adSpendUSD)}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Focus */}
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Focus Objectives
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      {getCampaignIcons(pkg.campaignTypes)}
                      <span className="font-medium truncate">{pkg.campaignTypes.join(' / ')}</span>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-5">
                    <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Supported Channels
                    </div>
                    <div className="text-xs text-gray-700 bg-gradient-to-r from-gray-50 to-orange-50/40 px-3 py-2 rounded-lg border border-gray-100 font-medium">
                      {pkg.platforms.join(', ')}
                    </div>
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-2.5 mb-6">
                    {Object.entries(pkg.features).slice(0, 6).map(([feature, value]) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        {value === false ? (
                          <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-800">{feature}</div>
                          {value !== false && (
                            <div className="text-[11px] text-gray-500 leading-tight">{value.toString()}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSelectPlan(pkg.name)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white shadow-lg shadow-orange-500/25 hover:opacity-95'
                        : 'bg-gray-900 text-white hover:bg-orange-600'
                    }`}
                  >
                    Select {pkg.name} Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Prop 3-Card Footer */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">ROAS-Obsessed Management</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We track actual revenues and qualified leads, not just vanity impressions.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Daily Creative Iterations</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ongoing A/B copy and hook testing prevent ad fatigue and keep acquisition costs low.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Transparent Dashboards</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Live metrics on CPL, CTR, conversions, and ad spend in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={selectedPlan ? `SMM Ads Package: ${selectedPlan}` : 'SMM Paid Ads Inquiry'}
      />
    </section>
  );
};

export default SMMPackages;