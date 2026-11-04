
import { ArrowUpRight, Rocket } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
  // Line pattern component
  const LinePattern = () => (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="seo-lines" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M 0,20 l 20,-20 M -5,5 l 10,-10 M 15,25 l 10,-10" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seo-lines)" />
      </svg>
    </div>
  );

const HiringCTASection = () => {
  return (
    <div className="bg-gradient-to-br relative from-black via-gray-900 to-black text-white  flex items-center">
        {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <LinePattern />
        
        {/* Subtle background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl z-30 mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-sm font-medium text-gray-300 mb-6">
                <Rocket className="w-4 h-4" />
                GROW YOUR BUSINESS TODAY 🚀
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                READY TO MAKE<br />
                AN <span className="text-lime-400">IMPACT?</span>
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Are you ready to bring your skills and passion to a company 
                where your work truly makes a difference? Join us and take the 
                next step in your career with a team dedicated to growth.
              </p>

              <Link href="/career/#apply">
              
              
              <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors duration-300">
                Apply Now
                <ArrowUpRight className="w-5 h-5" />
              </button>
              </Link>
            </div>
          </div>

          {/* Right Images */}
          <div className="lg:block hidden relative">
            <div className="relative">
              {/* First team image with "We Are Hiring!" bubble */}
              <div className="relative mb-6 transform rotate-3 hover:rotate-1 transition-transform duration-300">
                <img loading="lazy" decoding="async" 
                  src="/assets/images/services/2.webp" 
                  alt="Team collaboration" 
                  className="rounded-2xl shadow-2xl h-[200px]"
                />
                <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  We Are Hiring!!
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6">
                  <div className="w-full h-full bg-lime-400 rounded-full transform rotate-45"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-lime-400 rounded-full transform -rotate-45"></div>
                </div>
              </div>

              {/* Second team image with "Open Position" bubble */}
              <div className="relative ml-16 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img loading="lazy" decoding="async" 
                  src="/assets/images/services/1.webp" 
                  alt="Team working together" 
                  className="rounded-2xl shadow-2xl h-[200px]"
                />
                <div className="absolute -bottom-4 -left-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Open Position
                </div>
              </div>

              {/* Third team image with "Apply Now" bubble */}
              <div className="absolute top-32 right-0 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img loading="lazy" decoding="async" 
                  src="/assets/images/services/3.webp" 
                  alt="Team celebration" 
                  className="rounded-2xl shadow-2xl h-[150px]"
                />
                <div className="absolute -top-4 -right-4 bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Apply Now
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8">
                <div className="w-full h-full bg-lime-400 rounded-full opacity-60"></div>
                <div className="absolute top-1 left-1 w-6 h-6 bg-lime-400 rounded-full opacity-80"></div>
                <div className="absolute top-2 left-2 w-4 h-4 bg-lime-400 rounded-full"></div>
              </div>

              <div className="absolute top-0 right-16 w-6 h-6">
                <div className="w-full h-full bg-orange-400 rounded-full opacity-60"></div>
                <div className="absolute top-1 left-1 w-4 h-4 bg-orange-400 rounded-full opacity-80"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringCTASection;