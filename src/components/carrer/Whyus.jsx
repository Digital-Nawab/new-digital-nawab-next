import React from "react";
import { Users, Lightbulb, TrendingUp } from "lucide-react";
import Image from 'next/image'
const CompanyCultureSection = () => {
  return (
    <div className="max-w-7xl bg-white mx-auto px-4 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative order-2 lg:order-1">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img loading="lazy" decoding="async"
              src="/assets/images/career.png"
              alt="Team collaboration - two people working together at a whiteboard in a modern office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="order-1 lg:order-2">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6">
              <Users className="w-4 h-4" />
              Why Us
            </div>
            <h2 className="text-4xl lg:text-5xl custom-black font-bold text-gray-900 mb-8 tracking-tight">
              COMPANY CULTURE
            </h2>
          </div>

          <div className="space-y-8">
            {/* Innovative Spirit */}
            <div className="group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovative Spirit
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We thrive on creativity and encourage out-of-the-box thinking.
                Our team is dedicated to pushing boundaries and exploring new
                possibilities in digital marketing.
              </p>
            </div>

            {/* Collaborative Environment */}
            <div className="group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaborative Environment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Collaboration is at the heart of everything we do. We believe
                that diverse perspectives lead to the best solutions, and we
                foster an inclusive environment where everyone's voice is heard.
              </p>
            </div>

            {/* Growth-Oriented */}
            <div className="group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Growth-Oriented
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Personal and professional growth is important to us. We offer
                continuous learning opportunities and support career development
                to help you reach your full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCultureSection;
