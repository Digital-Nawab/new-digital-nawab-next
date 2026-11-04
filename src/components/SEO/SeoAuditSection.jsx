import React, { useState } from "react";
// Icons from lucide-react
import { 
  Globe, 
  FileText, 
  Network, 
  Shield, 
  Search,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";
// Shadcn components
import { Button } from "@/components/ui/button";

const SeoAuditSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const auditServices = [
    {
      icon: <Globe className="w-6 h-6 text-[#6B46C1]" />,
      title: "Webpage Performance",
      description:
        "Ensures feasible connectivity, better navigation, and easy use to every user.",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#6B46C1]" />,
      title: "On-site Optimization",
      description:
        "Checks the validity of the website's content and its front-end arrangement.",
    },
    {
      icon: <Network className="w-6 h-6 text-[#6B46C1]" />,
      title: "Off-site Popularity and Presence",
      description:
        "Tracks SEO activities on other virtual sites and examines their engagement.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#6B46C1]" />,
      title: "Technical SEO Issues",
      description:
        "Indicate the programs and protocols operating your website. It includes security, layout, and functioning speed.",
    },
  ];

  // Tab content for Our Complete SEO Service Suite
  const seoServiceTabs = [
    {
      id: "audit",
      label: "SEO Audit",
      icon: <Search className="w-5 h-5" />,
      title: "Comprehensive SEO Audit",
      description: "While SEO audits may differ widely, they should all look at core technical SEO \"table stakes\" including sitemaps, server issues, and metadata. An audit should address accessibility, indexation, and optimization at a high level.",
      features: [
        "Technical SEO Analysis",
        "Site Architecture Review", 
        "Metadata Optimization",
        "Accessibility Assessment"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "competitor",
      label: "Competitor Analysis", 
      icon: <Users className="w-5 h-5" />,
      title: "Strategic Competitor Analysis",
      description: "A competitive analysis is a method in which important rivals are identified and their goods, sales, and marketing methods are researched. This allows you to develop excellent business plans that outperform your competition.",
      features: [
        "Competitor Identification",
        "Marketing Strategy Analysis",
        "Performance Benchmarking", 
        "Opportunity Discovery"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "strategy",
      label: "Custom Strategy",
      icon: <Target className="w-5 h-5" />,
      title: "Tailored SEO Strategy",
      description: "A successful custom strategy discovers and captures pre-existing user intent around your key goods or services. We create and implement an on-page content strategy to obtain top ranks.",
      features: [
        "User Intent Analysis",
        "Content Strategy Development",
        "Landing Page Optimization",
        "Keyword Research & Targeting"
      ],
      color: "from-emerald-500 to-green-500"
    },
    {
      id: "onpage",
      label: "On-page SEO",
      icon: <FileText className="w-5 h-5" />,
      title: "On-page Optimization",
      description: "OnPage Optimization refers to the portion of search engine optimization that includes a website's technical and structural aspects, as well as its content. On-page SEO is critical to a website's success.",
      features: [
        "Content Optimization",
        "Technical Structure Enhancement",
        "Meta Tags & Headers",
        "Internal Linking Strategy"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      id: "offpage", 
      label: "Off-page SEO",
      icon: <Network className="w-5 h-5" />,
      title: "Off-page Optimization",
      description: "Off-page optimization refers to all activities away from your website that influence your search engine rankings. Off-page SEO accounts for more than half of the ranking considerations.",
      features: [
        "Link Building Campaigns",
        "Authority Development",
        "Social Signal Optimization",
        "Brand Mention Tracking"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "reports",
      label: "Monthly Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Comprehensive Reporting",
      description: "The monthly SEO report should begin with an executive overview of the marketing strategy's progress to date. It should describe clearly what was accomplished and future plans.",
      features: [
        "Performance Tracking",
        "Progress Analysis", 
        "Detailed Action Reports",
        "Strategic Planning"
      ],
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: "optimization",
      label: "Progressive Optimization",
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Continuous Improvement",
      description: "With Progressive Optimization, you make a modification and track its effectiveness. When your SERPs improve, you'll know what prompted the results and have better focus over time.",
      features: [
        "Incremental Testing",
        "Performance Monitoring",
        "Data-Driven Adjustments",
        "Continuous Enhancement"
      ],
      color: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Original SEO Audit Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What is SEO Auditing?
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            While SEO audits may differ widely, they should all look at core
            technical SEO "table stakes" including sitemaps, server issues, and
            metadata. An audit should address accessibility, indexation, and
            optimization at a high level.
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Because your website serves as the "hub" of your online identity,
            it's critical to conduct frequent audits to verify everything is in
            working condition. It's also worth noting that your website is a
            live digital property that doesn't stay static for lengthy periods
            of time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          {/* Left Side: Image */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img loading="lazy" decoding="async" 
                  src="/assets/images/seo/audit.png" 
                  alt="SEO Analysis Dashboard" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
          </div>
          {/* Right Side: Audit Services List */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              What do the SEO audit services cover?
            </h3>
            <div className="space-y-6">
              {auditServices.map((service, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0">{service.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h4>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button className="bg-[#6B46C1] text-white hover:bg-[#5A3AB7]">
                Learn More About SEO Audits
              </Button>
            </div>
          </div>
        </div>

        {/* New Tab Section - Our Complete SEO Service Suite */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Complete SEO Service Suite
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From auditing to optimization, we provide end-to-end SEO solutions to boost your online presence
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-100 rounded-xl p-2">
            {seoServiceTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-[#6B46C1] text-white shadow-lg transform scale-105'
                    : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${seoServiceTabs[activeTab].color} text-white`}>
                    {seoServiceTabs[activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {seoServiceTabs[activeTab].title}
                  </h3>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {seoServiceTabs[activeTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seoServiceTabs[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="relative">
                <div className={`bg-gradient-to-br ${seoServiceTabs[activeTab].color} rounded-2xl p-8 text-white text-center shadow-xl`}>
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {React.cloneElement(seoServiceTabs[activeTab].icon, { 
                      className: "w-10 h-10 text-white" 
                    })}
                  </div>
                  <h4 className="text-xl font-bold mb-4">
                    {seoServiceTabs[activeTab].label}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm opacity-90">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm opacity-90">Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm opacity-90">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm opacity-90">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white hover:from-[#5A3AB7] hover:to-[#7C3AED] px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started with Our SEO Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoAuditSection;