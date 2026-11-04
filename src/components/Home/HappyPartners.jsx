import React from "react";
import WaveyPattern from "../../components/WaveyPattern";

const HappyPartners = () => {
  return (
    <>
      <WaveyPattern backgroundColor="#0b0b0f" />
      <section className="py-12 px-4 sm:px-6 lg:px-20 bg-white text-center">
        <p className="text-orange-600 text-xs sm:text-sm tracking-widest uppercase font-semibold">
          For whom we work
        </p>
        <h2 className="text-2xl sm:text-4xl custom-black font-bold text-gray-900 mt-2">
          Our Happy Partners
        </h2>
        <p className="text-gray-600 mt-3 mb-10 text-sm sm:text-base">
          We work for some great companies and freelancers
        </p>

        <div className="space-y-14">
          {/* Row 1 */}
          <div className="flex justify-center items-center flex-wrap gap-8 sm:gap-12 lg:gap-20">
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/6.webp"
              alt="EQ"
              className="h-14 sm:h-16 lg:h-20 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/7.webp"
              alt="Webexcellis"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/8.webp"
              alt="Bring"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/9.webp"
              alt="S"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
          </div>

          {/* Row 2 */}
          <div className="flex justify-center items-center flex-wrap gap-8 sm:gap-12 lg:gap-20">
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/2.webp"
              alt="JGM"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/3.webp"
              alt="The Tailors"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/4.webp"
              alt="Niransoft"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/5.webp"
              alt="Robox"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
          </div>

          {/* Centered logo */}
          <div className="flex justify-center">
            <img loading="lazy" decoding="async"
              src="./assets/images/clients/1.webp"
              alt="A1"
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
          </div>
        </div>
        <div className="mt-12">
          <p className="text-gray-600 text-sm">
            and many more happy partners...
          </p>
        </div>
      </section>
      {/* <WaveyPattern backgroundColor="#fff" waveColor="#0a0a0a" /> */}
      
    </>
  );
};

export default HappyPartners;
