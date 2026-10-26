import React from "react";
import { Palette, Lightbulb, Target, Sparkles } from "lucide-react";

const BrandingSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-100/30 to-yellow-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-100/20 to-cyan-100/20 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Floating design elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 animate-float">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float delay-300">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-50"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-700">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute bottom-48 right-16 animate-float delay-1000">
          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl xl:container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Main heading with enhanced styling */}
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-lg">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
                Creative Excellence
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Leading Graphic Design
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Company in Lucknow
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Strategic Brand Identity Design
                    </h3>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                      As a premier graphic design company in Lucknow, Digital Nawab delivers strategic visual assets that elevate market credibility and inspire customer action. In today&apos;s crowded digital landscape, professional graphic designing services provide your business with the distinct visual identity needed to outshine competitors, establish trust, and drive sustainable growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Full-Service Graphic Designing Solutions
                    </h3>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                      From custom logo development and complete brand identity guidelines to sales brochures and digital ad campaigns, our talented graphic designers in Lucknow translate your core value proposition into stunning visual experiences. We blend artistic brilliance with consumer psychology to ensure every asset drives tangible ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Design Section */}
            <div className="relative">
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-100/50">
                <div className="text-center space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                      <Palette className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Brand Identity Design
                    </h3>
                    <p className="text-gray-600">
                      Transforming business ideas into high-converting visual brand assets
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">ID</div>
                      <p className="text-xs font-medium text-gray-700">
                        Brand Identity
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-100">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">AD</div>
                      <p className="text-xs font-medium text-gray-700">
                        Ad Creatives
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl border border-pink-100">
                      <div className="w-8 h-8 bg-pink-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">PKG</div>
                      <p className="text-xs font-medium text-gray-700">
                        Packaging
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl rotate-45 opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandingSection;
