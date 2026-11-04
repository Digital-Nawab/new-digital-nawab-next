import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ContactPopup from "../ContactPopup";

const HeroSection = () => {
  return (
    <>
      <div className="relative lg:pt-[80px] flex h-full w-full items-center justify-center bg-gradient-to-r from-[rgba(5,5,5,1)] via-[#050946] to-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        
        <div className="lg:min-h-screen z-30 flex items-center justify-center lg:py-0 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full grid grid-cols-5 gap-8 lg:gap-14 items-center">
            {/* Left Text Section */}
            <div className="text-center lg:text-left col-span-5 lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Section 01 · Strategic Direct Marketing</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold text-white leading-[1.18] tracking-tight">
                Direct Marketing Services That Connect Your Business with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Customers
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Reach your target audience with strategic direct marketing campaigns designed to build customer relationships, generate qualified enquiries and encourage meaningful responses. Digital Nawab helps businesses connect with potential customers through targeted communication, personalized campaigns and measurable marketing strategies.
              </p>
              
              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ContactPopup
                  buttonText="Get a Free Consultation"
                  buttonClassName="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
                />

                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
                >
                  <span>Discuss Your Marketing Goals</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            {/* Right Graphic Section */}
            <div className="mt-8 lg:mt-0 col-span-5 lg:col-span-2 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                <img
                  fetchPriority="high"
                  src="/assets/images/bg/seoBanner.png"
                  alt="Direct Marketing Services"
                  className="max-w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(6,182,212,0.25)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeroSection;
