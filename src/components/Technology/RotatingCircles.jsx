import React from 'react';

const RotatingCircles = () => {
  // Icon data for each circle
  const innerCircleIcons = [
    { name: "/assets/Logos/adobe-photoshop.png" , bg: 'bg-blue-600', text: 'text-white' },
    { name: "/assets/Logos/figma.png", bg: 'bg-purple-600', text: 'text-white' },
    { name: "/assets/Logos/adobe-xd.png", bg: 'bg-orange-600', text: 'text-white' },
    { name: "/assets/Logos/google-fonts-1.webp", bg: 'bg-red-500', text: 'text-white', isSpecial: true },
    { name: "/assets/Logos/adobe-illustrator.png", bg: 'bg-pink-600', text: 'text-white' },
    { name: "/assets/Logos/google-fonts-1.webp", bg: 'bg-red-500', text: 'text-white', isSpecial: true },
    
  ];

  const technologies = [
    // Row 1
    [
      { name: "React JS", logo: "./assets/Logos/react-js.png" },
      { name: "Next JS", logo: "./assets/Logos/Next.js.png" },
      { name: "Javascript", logo: "./assets/Logos/javascript.png" },
      { name: "Typescript", logo: "./assets/Logos/typescript.png" },
      { name: "HTML5", logo: "./assets/Logos/html-5.png" },
      { name: "CSS3", logo: "./assets/Logos/css3.png" },
      { name: "Shopify", logo: "./assets/Logos/shopify.png" },
      { name: "Tailwind Css", logo: "./assets/Logos/tailwindcss-icon.png" },
    ],
    // Row 2
    [
      { name: "jQuery", logo: "./assets/Logos/jquery.png" },
      { name: "MongoDB", logo: "./assets/Logos/MongoDB.png" },
      { name: "GSAP", logo: "./assets/Logos/gsap-greensock.png" },
      { name: "WordPress", logo: "./assets/Logos/wordpress.png" },
      { name: "GitHub", logo: "./assets/Logos/GitHub.png" },
      { name: "PHP", logo: "./assets/Logos/php-logo.png" },
      { name: "Laravel", logo: "./assets/Logos/Laravel.png" },
      { name: "Aws", logo: "./assets/Logos/AWS.png" },
    ],
    // Row 3
    [
      { name: "Photoshop", logo: "./assets/Logos/adobe-photoshop.png" },
      { name: "Illustrator", logo: "./assets/Logos/adobe-illustrator.png" },
      { name: "XD", logo: "./assets/Logos/adobe-xd.png" },
      { name: "Figma", logo: "./assets/Logos/figma.png" },
      { name: "Google Fonts", logo: "./assets/Logos/google-fonts-1.webp" },
      { name: "Visual Studio", logo: "./assets/Logos/vs.png" },
      { name: "Node", logo: "./assets/Logos/Node.png" },
      { name: "Git", logo: "./assets/Logos/Git.png" },
    ],
  ];

  const outerCircleIcons = [
    { name: "/assets/Logos/Node.png", bg: 'bg-blue-500', text: 'text-white' },
    { name: "/assets/Logos/MongoDB.png", bg: 'bg-cyan-400', text: 'text-white', isSpecial: true },
    { name: "/assets/Logos/php-logo.png", bg: 'bg-black', text: 'text-white' },
    { name: "/assets/Logos/AWS.png", bg: 'bg-yellow-400', text: 'text-black' },
    { name: "/assets/Logos/react-js.png", bg: 'bg-teal-400', text: 'text-white', isSpecial: true },
    { name: "/assets/Logos/javascript.png", bg: 'bg-gray-800', text: 'text-white', isSpecial: true },
    { name: "/assets/Logos/tailwindcss-icon.png", bg: 'bg-blue-700', text: 'text-white', isSpecial: true },
    { name: "/assets/Logos/Laravel.png", bg: 'bg-green-600', text: 'text-white', isSpecial: true }
  ];

  const IconCircle = ({ icon, index, total, radius, reverse = false }) => {
    const angle = (index * 360) / total;
    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
    
    return (
      <div
        className={`absolute w-12 h-12 bg-white p-1 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:shadow-xl`}
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
        }}
      >
        <img loading="lazy" decoding="async" src={icon.name} alt="" />
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="relative w-[500px] h-[500px]">
        {/* Central Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-orange-400 via-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl z-10">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="text-white text-2xl font-bold">A</div>
          </div>
        </div>

        {/* Visible Orbit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <radialGradient id="orbitGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="50%" stopColor="rgba(234, 231, 236, 0.61)" />
              <stop offset="100%" stopColor="rgba(218, 218, 218, 0.48)" />
            </radialGradient>
          </defs>
          {/* Inner Orbit */}
          <circle
            cx="50%"
            cy="50%"
            r="130"
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.6"
          />
          {/* Outer Orbit */}
          <circle
            cx="50%"
            cy="50%"
            r="230"
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.4"
          />
        </svg>

        {/* Inner Circle - Clockwise Rotation */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '45s' }}>
          {innerCircleIcons.map((icon, index) => (
            <IconCircle
              key={`inner-${index}`}
              icon={icon}
              index={index}
              total={innerCircleIcons.length}
              radius={130}
            />
          ))}
        </div>

        {/* Outer Circle - Counterclockwise Rotation */}
        <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '65s' }}>
          {outerCircleIcons.map((icon, index) => (
            <IconCircle
              key={`outer-${index}`}
              icon={icon}
              index={index}
              total={outerCircleIcons.length}
              radius={230}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingCircles;