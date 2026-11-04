"use client";
import Image from 'next/image'

import React from "react";
import ContactPopup from '../ContactPopup';

function MobileBanner() {
  return (
    <section className="relative  pt-[90px]  w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Right: Mobile Image + Floating Icons */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              {/* Main mobile image with increased size */}
              <img loading="lazy" decoding="async"
                src="https://www.digitalnawab.com/assets/images/1mobi.png"
                alt="Mobile App"
                className="w-80 h-auto sm:w-96 lg:w-[500px] drop-shadow-2xl animate-float z-10 relative"
              />

              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl opacity-20 blur-3xl scale-110 animate-pulse"></div>
            </div>

            {/* Enhanced Floating Tech Icons with better positioning */}
            <div className="absolute top-8 left-8 animate-float-slow">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl p-3 hover:scale-110 transition-transform cursor-pointer">
                <img loading="lazy" decoding="async"
                  src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                  alt="React"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="absolute bottom-16 left-4 animate-float">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl p-2.5 hover:scale-110 transition-transform cursor-pointer">
                <img loading="lazy" decoding="async"
                  src="https://cdn.worldvectorlogo.com/logos/javascript-1.svg"
                  alt="JavaScript"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="absolute top-16 right-12 animate-float-slow">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl p-3 hover:scale-110 transition-transform cursor-pointer">
                <img loading="lazy" decoding="async"
                  src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
                  alt="Tailwind"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="absolute bottom-8 right-8 animate-float">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl p-2.5 hover:scale-110 transition-transform cursor-pointer">
                <img loading="lazy" decoding="async"
                  src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                  alt="Node.js"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Additional floating elements for visual appeal */}
            <div className="absolute top-1/3 left-0 animate-float-slow delay-1000">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute top-1/2 right-4 animate-float delay-500">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-1/3 right-0 animate-float-slow delay-700">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60"></div>
            </div>
          </div>
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-2xl lg:text-5xl font-black leading-tight text-gray-900">
                Mobile App {" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  Development Company
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dont't have mobile app? Or you have a mobile app but don't know how to advertise it. We understand your vision and use efficient marketing techniques to assist you to achieve your goal. Mobile application marketing demands planning; we (renowned mobile app development company) are here to assist you in developing your strategy and putting it into action.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
              <span className="px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium">
                ✨ Modern Design
              </span>
              <span className="px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium">
                🚀 Fast Performance
              </span>
              <span className="px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium">
                📱 Cross Platform
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start py-4">
              

               <ContactPopup
              buttonText=" Get Started Today"
              buttonClassName=" cursor-pointer group px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 hover:shadow-2xl relative overflow-hidden"
            />

              
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(2deg);
          }
          66% {
            transform: translateY(-20px) rotate(-2deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}

export default MobileBanner;
