import React from "react";
import {
  Users,
  Award,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ColourfulText from "../../components/ui/colourful-text";
import { WobbleCard } from "@/components/ui/wobble-card";
import ContactPopup from "../ContactPopup";

export default function WhyChooseUsSection() {
  return (
    <>
      <div>
        {/* <WaveyPattern backgroundColor="#fff" waveColor="#000" /> */}
      </div>
      <div className="relative bg-black py-20 px-4 overflow-hidden">
        {/* Background Pattern */}

        <div className="relative xl:container max-w-7xl mx-auto">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-8 transform hover:scale-105 transition-all duration-300">
            <div className="w-2 h-2 bg-pink-900 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-semibold tracking-wide">
              WHY CHOOSE US
            </span>
          </div>

          {/* Main Heading with enhanced typography */}
          {/* <h1 className="text-4xl lg:text-6xl custom-bold text-white mb-16 max-w-4xl leading-tight">
            Expert Digital Marketing Team with{" "}
            <span className="">
              <ColourfulText text="Proven Results" />
            </span>
          </h1> */}

          <div className=" ">
            <div className="grid z-30 transition-all grid-cols-1 lg:grid-cols-3 gap-4  mx-auto w-full">
              <WobbleCard
                containerClassName="col-span-1 z-30 lg:col-span-2 h-full bg-pink-800 "
                className=""
              >
                <div className="lg:max-w-2xl">
                  <div className="w-8 lg:w-10 2xl:w-16 lg:h-10 h-8 2xl:h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400 transition-colors duration-300">
                    <Users className="2xl:w-8 2xl:h-8 lg:w-6 w-4 h-4 lg:h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Expert Digital Marketing Team with Proven Results
                  </h3>
                  <p className="text-gray-100 leading-relaxed">
                    Digital Nawab unites a team of professionals with extensive
                    experience in Google Ads marketing and using
                    performance-based techniques. Every professional is
                    concerned about the measurable outcome, ad-spend
                    optimisation, and sustainable growth. The campaigns are
                    tailored, data-driven, and regularly optimised to ensure
                    clients achieve maximum ROI at every stage of their online
                    experience.
                  </p>
                  <div className="mt-6 flex items-center text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span>Certified Professionals</span>
                  </div>
                </div>
                <img loading="lazy" decoding="async"
                  src="https://ui.aceternity.com/linear.webp"
                  width={500}
                  height={500}
                  alt="linear demo image"
                  className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain lg:block hidden rounded-2xl"
                />
              </WobbleCard>
              <WobbleCard containerClassName="col-span-1 z-30 min-h-[300px]">
                <div className="w-8 lg:w-10 2xl:w-16 lg:h-10 h-8 2xl:h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center  group-hover:bg-white/20 transition-colors duration-300">
                  <Clock className="2xl:w-8 2xl:h-8 lg:w-6 w-4 h-4 lg:h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Flexible Branding and Custom Digital Solutions
                </h3>
                <p className="text-blue-100  leading-relaxed mb-6">
                  Digital Nawab builds custom digital solutions by offering
                  Website design and development. We utilise even the identity
                  of the brand we are dealing with to create a seamless
                  functionality, a stimulating visual representation, and a user
                  experience that fosters trust, retention, and measurable
                  online success.
                </p>

                {/* <button className="group bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-3">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button> */}
                {/* <ContactPopup
                  buttonText="Get Started Now"
                  buttonClassName=" cursor-pointer group bg-lime-400 z-50 hover:bg-lime-500 text-gray-900 font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-3"
                /> */}
              </WobbleCard>
              <WobbleCard containerClassName="col-span-1 z-30 lg:col-span-3 bg-blue-900  xl:min-h-[600px] xl:min-h-[300px]">
                <div className="group bg-transparent rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 lg:col-span-3 transform hover:-translate-y-1">
                  <div className="w-8 lg:w-10 2xl:w-16 lg:h-10 h-8 2xl:h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400 transition-colors duration-300">
                    <Target className="2xl:w-8 2xl:h-8 lg:w-6 w-4 h-4 lg:h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Complete Digital Marketing Solutions for Business Growth
                    </h3>
                    <p className="text-gray-100 leading-relaxed">
                      Digital Nawab is the renowned local SEO agency in Lucknow.
                      We offer comprehensive online marketing solutions to drive
                      business growth. The combination of strategy, creativity,
                      and technology in our solutions is used to increase
                      visibility, generate qualified leads, and create a lasting
                      brand impression through multiple digital touchpoints.
                    </p>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "SEO Optimization",
                        "Web Development",
                        "Social Media",
                        "Content Marketing",
                      ].map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center text-white font-medium"
                        >
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <img loading="lazy" decoding="async"
                  src="https://ui.aceternity.com/linear.webp"
                  width={500}
                  height={500}
                  alt="linear demo image"
                  className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain lg:block hidden rounded-2xl"
                /> */}
              </WobbleCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
