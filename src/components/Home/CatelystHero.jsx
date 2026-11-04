import React from "react";
import WaveyPattern from "../../components/WaveyPattern";
import ContactPopup from "../ContactPopup";
import Link from "next/link";

const InnovateHero = () => {
  return (
    <>
      <WaveyPattern backgroundColor="#0a0a0a" />
      <div className="min-h-screen bg-white">
        {/* Green top bar */}

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header text */}
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl 2xl:text-6xl custom-bold text-black mb-4 lg:mb-8 tracking-tight">
              <span className="inline-block">Is It</span>
              <span className="text-pink-600 mx-4">✦</span>
              <span className="inline-block">You’re Looking For ?</span>
            </h2>

            {/* Decorative lines with star */}
            <div className="flex items-center justify-center mb-6 lg:mb-12">
              <div className="w-96 h-px bg-black"></div>
              <div className="mx-4 text-pink-800 text-xl">✦</div>
              <div className="w-96 h-px bg-black"></div>
            </div>
          </div>

          {/* Gray placeholder box */}
          <div className="w-full h-70 bg-gray-300 rounded-lg mb-8 overflow-hidden flex items-center justify-center">
            <img loading="lazy" decoding="async" src="/assets/images/cta.png" alt="Digital Nawab Call To Action" className="object-cover" />
          </div>

          {/* Description text */}
          <p className="text-center text-black text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Grow your business or refresh your brand image, starting with a new
            business or renovating the old one. Making your business go online
            is the most efficient way of growing your business in today's world.
            Be it Social media marketing or ranking your website on google,
            trust our digital marketing company
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            {/* <button className="bg-black text-white px-3 lg:px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
              Discuss Your Project
            </button> */}
            <ContactPopup
              buttonText="Discuss Your Project"
              buttonClassName=" cursor-pointer bg-black text-white px-3 lg:px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
            />
            <Link href="/contact-us">
              <button className="border-2 border-black text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-black hover:text-white transition-colors">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default InnovateHero;
