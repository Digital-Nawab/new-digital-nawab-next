import React from "react";

const logos = [
  { src: "https://img.icons8.com/color/48/react-native.png", alt: "React" },
  { src: "https://img.icons8.com/color/48/typescript.png", alt: "TypeScript" },
  { src: "https://img.icons8.com/color/48/javascript.png", alt: "JavaScript" },
  {
    src: "https://img.icons8.com/ios-filled/50/000000/nextjs.png",
    alt: "Next.js",
  },
  {
    src: "https://img.icons8.com/color/48/tailwind_css.png",
    alt: "Tailwind CSS",
  },
  { src: "https://img.icons8.com/ios/50/jquery.png", alt: "jQuery" },
  { src: "https://img.icons8.com/color/48/wordpress.png", alt: "WordPress" },
  { src: "https://img.icons8.com/color/48/figma--v1.png", alt: "Figma" },
  {
    src: "https://img.icons8.com/color/48/adobe-photoshop--v1.png",
    alt: "Photoshop",
  },
  {
    src: "https://img.icons8.com/color/48/adobe-illustrator--v1.png",
    alt: "Illustrator",
  },
  { src: "https://img.icons8.com/color/48/adobe-xd.png", alt: "Adobe XD" },
  {
    src: "https://img.icons8.com/color/48/adobe-indesign--v1.png",
    alt: "InDesign",
  },
  { src: "https://img.icons8.com/ios/50/sketch.png", alt: "Sketch" },
  { src: "https://img.icons8.com/color/48/android-os.png", alt: "Android" },
];

const OrbitingLogos = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute z-10">
        <img loading="lazy" decoding="async"
          src="https://img.icons8.com/ios-filled/100/000000/source-code.png"
          alt="Center Logo"
          width={100}
          height={100}
        />
      </div>

      <div className="absolute w-[300px] h-[300px] border border-gray-300 rounded-full animate-spin-slow flex items-center justify-center">
        {logos.slice(0, 7).map((logo, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${(360 / 7) * i}deg) translateX(150px)`,
            }}
          >
            <img loading="lazy" decoding="async" src={logo.src} alt={logo.alt} width={40} height={40} />
          </div>
        ))}
      </div>

      <div className="absolute w-[420px] h-[420px] border border-gray-300 rounded-full animate-spin-slower flex items-center justify-center">
        {logos.slice(7).map((logo, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${(360 / 7) * i}deg) translateX(210px)`,
            }}
          >
            <img loading="lazy" decoding="async" src={logo.src} alt={logo.alt} width={40} height={40} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitingLogos;
