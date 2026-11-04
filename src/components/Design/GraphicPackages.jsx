import React from 'react';
import { Check, Star, Zap, Building, Palette, Users } from 'lucide-react';
import ContactPopup from '../ContactPopup';

const GraphicPackages = () => {
  const logoPackages = [
    {
      name: "Logo Starter",
      icon: "💼",
      price: { inr: "₹5,000", usd: "$65" },
      concepts: "2 Concepts",
      revisions: "2 Rounds",
      deliverables: "PNG, JPEG",
      extras: "—",
      popular: false
    },
    {
      name: "Brand Essentials",
      icon: "🌍",
      price: { inr: "₹12,000", usd: "$150" },
      concepts: "4 Concepts",
      revisions: "4 Rounds",
      deliverables: "PNG, SVG, Source",
      extras: "Icon + Favicon",
      popular: true
    },
    {
      name: "Identity Pro",
      icon: "📚",
      price: { inr: "₹20,000+", usd: "$250+" },
      concepts: "6+ Custom Concepts",
      revisions: "Unlimited (within scope)",
      deliverables: "Full Branding Kit (AI, PSD, Fonts)",
      extras: "Brand Guidelines PDF",
      popular: false
    }
  ];

  const socialMediaPackages = [
    {
      name: "Social Basic",
      icon: "📱",
      price: { inr: "₹3,500", usd: "$45" },
      platforms: "Instagram + Facebook",
      designs: "8 Posts",
      templates: "Static",
      popular: false
    },
    {
      name: "Pro Social Kit",
      icon: "🌐",
      price: { inr: "₹7,000", usd: "$90" },
      platforms: "+ LinkedIn, YouTube",
      designs: "15 Posts + 5 Stories",
      templates: "Static + Carousel",
      popular: true
    },
    {
      name: "Influencer Ready",
      icon: "🤝",
      price: { inr: "₹12,000+", usd: "$150+" },
      platforms: "+ Twitter, Custom Sizes",
      designs: "20+ Posts, Stories, Covers",
      templates: "Static + Motion Graphics",
      popular: false
    }
  ];

  const corporatePackages = [
    {
      name: "Mini Kit",
      icon: "🎓",
      price: { inr: "₹7,500", usd: "$95" },
      includes: "Logo + Card",
      format: "Print Ready",
      popular: false
    },
    {
      name: "Business Pro",
      icon: "💼",
      price: { inr: "₹15,000", usd: "$185" },
      includes: "Logo, Card, Letterhead, Envelope",
      format: "Editable Source",
      popular: true
    },
    {
      name: "Enterprise Brand Pack",
      icon: "🏢",
      price: { inr: "₹30,000+", usd: "$375+" },
      includes: "Full Kit + Slide Deck, Email Signature",
      format: "All Major Formats",
      popular: false
    }
  ];

  const marketingCollateral = [
    { type: "Brochure / Catalog", price: { inr: "₹6,000", usd: "$75" } },
    { type: "Business Card", price: { inr: "₹1,500", usd: "$20" } },
    { type: "Poster / Flyer", price: { inr: "₹2,500", usd: "$30" } },
    { type: "Roll-up Standee", price: { inr: "₹4,500", usd: "$55" } },
    { type: "Pitch Deck / PPT", price: { inr: "₹7,000+", usd: "$85+" } }
  ];

  const PackageCard = ({ package: pkg, children, className = "" }) => (
    <div className={`relative bg-white rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${pkg.popular ? 'border-blue-500 shadow-md' : 'border-gray-200'} ${className}`}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Popular                                                                                                     
          </span>
        </div>                                                                                                                         
      )}
      {children}
    </div>
  );

  return (
    <div className='bg-gradient-to-br from-blue-50 to-purple-50 py-6'>
    
    <div className="container mx-auto p-6  min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900">Branding & Graphic Design Packages</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Define your identity. Build brand recognition. Leave a lasting impression.
        </p>
      </div>

      {/* Logo & Identity Design Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">1. Logo & Identity Design </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {logoPackages.map((pkg, index) => (
            <PackageCard key={index} package={pkg}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">{pkg.price.inr}</div>
                <div className="text-lg text-gray-500">{pkg.price.usd}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Logo Concepts</div>
                    <div className="text-gray-600">{pkg.concepts}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Revisions</div>
                    <div className="text-gray-600">{pkg.revisions}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Deliverables</div>
                    <div className="text-gray-600">{pkg.deliverables}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  {pkg.extras !== "—" ? (
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0"></div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">Extras</div>
                    <div className="text-gray-600">{pkg.extras}</div>
                  </div>
                </div>
              </div>
            </PackageCard>
          ))}
        </div>
      </section>

      {/* Social Media Kit Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">2. Social Media Kit Design</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {socialMediaPackages.map((pkg, index) => (
            <PackageCard key={index} package={pkg}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-pink-600 mb-1">{pkg.price.inr}</div>
                <div className="text-lg text-gray-500">{pkg.price.usd}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Platforms</div>
                    <div className="text-gray-600">{pkg.platforms}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Designs</div>
                    <div className="text-gray-600">{pkg.designs}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Templates</div>
                    <div className="text-gray-600">{pkg.templates}</div>
                  </div>
                </div>
              </div>
            </PackageCard>
          ))}
        </div>
      </section>

      {/* Corporate Branding Kit Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">3. Corporate Branding Kit </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {corporatePackages.map((pkg, index) => (
            <PackageCard key={index} package={pkg}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">{pkg.price.inr}</div>
                <div className="text-lg text-gray-500">{pkg.price.usd}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Includes</div>
                    <div className="text-gray-600">{pkg.includes}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Design Format</div>
                    <div className="text-gray-600">{pkg.format}</div>
                  </div>
                </div>
              </div>
            </PackageCard>
          ))}
        </div>
      </section>

      {/* Marketing Collateral Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">4. Marketing Collateral Design</h2>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
            <h3 className="text-xl font-bold text-white">Starting Prices</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketingCollateral.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">{item.type}</div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{item.price.inr}</div>
                    <div className="text-sm text-gray-500">{item.price.usd}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Build Your Brand?</h3>
        <p className="text-lg mb-6 opacity-90">Let's create something amazing together. Choose the package that fits your needs.</p>

         <ContactPopup
              buttonText=" Get Started Today"
              buttonClassName=" cursor-pointer bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            />
      </div>
    </div>
    </div>
  );
};

export default GraphicPackages;