const fs = require('fs');
const filePath = 'src/components/Design/NewHero.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `            {/* Main Headline H1 with Word Animation */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h1
                className={\`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[38px] font-extrabold text-white leading-tight tracking-tight mb-2 sm:mb-3 transform transition-all duration-300 delay-200\`}
              >
                <span className="block text-white">Graphic Design Services in Lucknow</span>
                <span className="flex items-center flex-wrap gap-2 text-lime-400 mt-2 text-base sm:text-lg md:text-xl lg:text-2xl">
                  <ContainerTextFlip
                    words={creativityWords}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold py-1 px-3 text-white dark:text-white"
                    textClassName="text-white"
                  />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Meets Strategic Growth</span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className={\`text-xs sm:text-sm md:text-sm lg:text-base text-gray-300/90 mb-6 sm:mb-8 max-w-xl leading-relaxed transform transition-all duration-300 delay-400 \${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }\`}
            >
              Elevate your brand presence with premier graphic design services in Lucknow by Digital Nawab. From custom logo design and brand identity systems to high-converting social media creatives and packaging, we create visuals that captivate audiences and drive measurable business results.
            </p>

            {/* Action Buttons */}
            <div
              className={\`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 transform transition-all duration-300 delay-600 \${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }\`}
            >
              <Link href="/portfolio">
                <button className="w-full sm:w-auto group cursor-pointer relative px-6 sm:px-7 py-3 bg-white text-black font-bold text-sm overflow-hidden transition-all duration-300 hover:bg-gray-100 rounded-lg">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Our Portfolio
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </Link>
              <ContactPopup
                buttonText="Get Free Consultation"
                buttonClassName="w-full sm:w-auto px-6 sm:px-7 py-3 bg-lime-400 hover:bg-lime-500 text-black font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] cursor-pointer text-center rounded-lg"
              />
            </div>`;

const replacement = `            {/* Main Headline H1 */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h1
                className={\`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[38px] font-extrabold text-white leading-tight tracking-tight mb-2 sm:mb-3 transform transition-all duration-300 delay-200\`}
              >
                <span className="block text-white">Professional Graphic Design Services</span>
                <span className="bg-gradient-to-r from-lime-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mt-1 inline-block">
                  for Growing Businesses
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className={\`text-xs sm:text-sm md:text-sm lg:text-base text-gray-300/90 mb-6 sm:mb-8 max-w-xl leading-relaxed transform transition-all duration-300 delay-400 \${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }\`}
            >
              Digital Nawab provides professional graphic designing services in Lucknow and across India, helping startups, small businesses and established brands communicate their identity through creative, consistent and impactful visuals. From logo design and brand identity to social media creatives, brochures, banners and packaging, we create custom designs aligned with your business goals and target audience.
            </p>

            {/* Action Buttons */}
            <div
              className={\`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 transform transition-all duration-300 delay-600 \${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }\`}
            >
              <ContactPopup
                buttonText="Get Free Design Consultation"
                buttonClassName="w-full sm:w-auto px-6 sm:px-7 py-3 bg-lime-400 hover:bg-lime-500 text-black font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] cursor-pointer text-center rounded-lg"
              />
              <Link href="#brand-design">
                <button className="w-full sm:w-auto group cursor-pointer relative px-6 sm:px-7 py-3 bg-white text-black font-bold text-sm overflow-hidden transition-all duration-300 hover:bg-gray-100 rounded-lg">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Our Design Services
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </Link>
            </div>

            {/* Trust Line */}
            <div
              className={\`mb-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 transform transition-all duration-300 delay-700 \${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }\`}
            >
              <span className="text-white font-medium">Creative Designs</span>
              <span className="text-lime-400 font-bold">|</span>
              <span className="text-white font-medium">Custom Branding</span>
              <span className="text-lime-400 font-bold">|</span>
              <span className="text-white font-medium">Business-Focused Visual Communication</span>
            </div>`;

// Normalize line endings for replacement
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');
const normalizedReplacement = replacement.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCrlf = content.includes('\r\n');
  const result = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  fs.writeFileSync(filePath, isCrlf ? result.replace(/\n/g, '\r\n') : result, 'utf8');
  console.log('Successfully updated NewHero.jsx');
} else {
  console.error('Target not found in NewHero.jsx');
}

