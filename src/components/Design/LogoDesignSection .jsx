import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Zap, Sparkles, Target, Compass, Link } from "lucide-react";
import Image from "next/image";
import ContactPopup from "../ContactPopup";
const LogoDesignSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [clickedLogo, setClickedLogo] = useState(null); // Track clicked logo for overlay
  const [visibleLogos, setVisibleLogos] = useState(12); // Show 12 logos initially
  const [logoPortfolio, setLogoPortfolio] = useState([]); // State for dynamic logos
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const sectionRef = useRef(null);

  // Static logo portfolio (fallback)
  const staticLogoPortfolio = [
    {
      id: 1,
      title: "Academy 1",
      category: "education",
      type: "Wordmark",
      height: "h-48",
      img: "/assets/Logos/logo/academy 1.webp",
    },
    {
      id: 4,
      title: "Divyanjali Logo",
      category: "fashion",
      type: "Wordmark",
      height: "h-54",
      img: "/assets/Logos/logo/Divyanjali LOGO .webp",
    },
    {
      id: 5,
      title: "Jaya Logo 1",
      category: "personal",
      type: "Script Logo",
      height: "h-50",
      img: "/assets/Logos/logo/JAYA LOGO1 (4) copy.webp",
    },
    {
      id: 6,
      title: "KNK Logo Golden",
      category: "luxury",
      type: "Symbol",
      height: "h-58",
      img: "/assets/Logos/logo/KNK LOGO GOLDEN.webp",
    },
    {
      id: 8,
      title: "ICS Logo",
      category: "tech",
      type: "Monogram",
      height: "h-48",
      img: "/assets/Logos/logo/LCS LOGO.webp",
    },
    {
      id: 9,
      title: "Logo Final 1",
      category: "general",
      type: "Wordmark",
      height: "h-52",
      img: "/assets/Logos/logo/logo final (1) (1).webp",
    },
    {
      id: 10,
      title: "Logo Final",
      category: "general",
      type: "Symbol",
      height: "h-52",
      img: "/assets/Logos/logo/lOGO FINAL.webp",
    },
    {
      id: 11,
      title: "Logo High",
      category: "tech",
      type: "Symbol + Text",
      height: "h-64",
      img: "/assets/Logos/logo/logo high.webp",
    },
    {
      id: 12,
      title: "Logo Thia Pink",
      category: "fashion",
      type: "Wordmark",
      height: "h-50",
      img: "/assets/Logos/logo/LOGO thia pink.webp",
    },
    {
      id: 13,
      title: "Logo TTK Black",
      category: "business",
      type: "Monogram",
      height: "h-48",
      img: "/assets/Logos/logo/Logo TTK ( black).webp",
    },
    {
      id: 14,
      title: "Logo DND",
      category: "gaming",
      type: "Symbol",
      height: "h-56",
      img: "/assets/Logos/logo/LOGO_DNdd.webp",
    },
    {
      id: 15,
      title: "Logo AA",
      category: "general",
      type: "Wordmark",
      height: "h-48",
      img: "/assets/Logos/logo/logoaa.webp",
    },
    {
      id: 16,
      title: "Logo 2",
      category: "general",
      type: "Symbol",
      height: "h-52",
      img: "/assets/Logos/logo/logo2.webp",
    },
    {
      id: 17,
      title: "Miqh Logo",
      category: "business",
      type: "Monogram",
      height: "h-54",
      img: "/assets/Logos/logo/Miqh Logoj.webp",
    },
    {
      id: 18,
      title: "MK Black Logo",
      category: "fashion",
      type: "Wordmark",
      height: "h-50",
      img: "/assets/Logos/logo/MK black logo .webp",
    },
    {
      id: 19,
      title: "MK Logo Copy",
      category: "personal",
      type: "Symbol + Text",
      height: "h-48",
      img: "/assets/Logos/logo/MK_Logo_ (1) - Copy.webp",
    },
    {
      id: 20,
      title: "Mrs India Logo",
      category: "fashion",
      type: "Wordmark",
      height: "h-56",
      img: "/assets/Logos/logo/Mrs India Logo.webp",
    },
    {
      id: 21,
      title: "Pardehi Logo PNG",
      category: "personal",
      type: "Symbol",
      height: "h-58",
      img: "/assets/Logos/logo/pardehi logo png.webp",
    },
    {
      id: 23,
      title: "Prerna Singh Logo",
      category: "personal",
      type: "Script Logo",
      height: "h-54",
      img: "/assets/Logos/logo/prerna singh logo.webp",
    },
    {
      id: 24,
      title: "Rambler",
      category: "travel",
      type: "Symbol + Text",
      height: "h-52",
      img: "/assets/Logos/logo/rambler.webp",
    },
    {
      id: 25,
      title: "Ritu Roy Logo",
      category: "personal",
      type: "Wordmark",
      height: "h-50",
      img: "/assets/Logos/logo/ritu roy logo.webp",
    },
    {
      id: 26,
      title: "SBSB Logo",
      category: "business",
      type: "Monogram",
      height: "h-48",
      img: "/assets/Logos/logo/SBSB logo.webp",
    },
    {
      id: 27,
      title: "Season 3 Logo",
      category: "entertainment",
      type: "Symbol",
      height: "h-56",
      img: "/assets/Logos/logo/season-3 logo.WEBP",
    },
    {
      id: 28,
      title: "Signex Logo",
      category: "tech",
      type: "Wordmark",
      height: "h-64",
      img: "/assets/Logos/logo/signex logo.webp",
    },
    {
      id: 29,
      title: "Skin Art Logo",
      category: "healthcare",
      type: "Symbol + Text",
      height: "h-52",
      img: "/assets/Logos/logo/skin art logo.webp",
    },
    {
      id: 30,
      title: "Sri Venu",
      category: "personal",
      type: "Monogram",
      height: "h-48",
      img: "/assets/Logos/logo/sri venu.webp",
    },
    {
      id: 31,
      title: "Tender Hearts School Logo",
      category: "education",
      type: "Wordmark",
      height: "h-54",
      img: "/assets/Logos/logo/tender hearts school logo png.webp",
    },
    {
      id: 32,
      title: "Tiska Logo Mail",
      category: "business",
      type: "Symbol",
      height: "h-50",
      img: "/assets/Logos/logo/TISKA LOGO MAIL.webp",
    },
    {
      id: 33,
      title: "Vinod Sharraf",
      category: "personal",
      type: "Script Logo",
      height: "h-56",
      img: "/assets/Logos/logo/vinod sharraf png.webp",
    },
    {
      id: 34,
      title: "WhatsApp Image",
      category: "general",
      type: "Symbol + Text",
      height: "h-46",
      img: "/assets/Logos/logo/WhatsApp Image 2023-06-21 at 3.35.37 PM.webp",
    },
  ];

  // Fetch logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dashboard.digitalnawab.com/api/getLogo"
        );
        const apiLogos = response.data.data.map((logo) => ({
          id: logo.id,
          title: logo.name,
          category: "general",
          type: "Symbol",
          height: "h-48",
          img: `https://dashboard.digitalnawab.com/${logo.img}`,
          url: logo.url,
        }));

        // Use API logos, fallback to static if API returns empty
        setLogoPortfolio(apiLogos.length > 0 ? apiLogos : staticLogoPortfolio);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch logos from the API.");
        setLoading(false);
        setLogoPortfolio(staticLogoPortfolio);
      }
    };

    fetchLogos();
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const logoServices = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Brand Marks & Emblems",
      description:
        "Distinctive symbolic marks designed to capture your brand's core essence.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Wordmarks & Typography",
      description:
        "Custom typography-focused logo designs that make your business name memorable.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Combination Marks",
      description:
        "Harmonious integration of iconic symbols and tailored text typography.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Compass className="w-7 h-7" />,
      title: "Monograms & Lettermarks",
      description:
        "Refined, minimalist letter-based logos for modern corporate and luxury brands.",
      gradient: "from-green-400 to-teal-500",
    },
  ];

  const handleLoadMore = () => {
    setVisibleLogos((prev) => prev + 6);
  };

  const handleLogoClick = (logo) => {
    setClickedLogo(logo.id === clickedLogo ? null : logo.id); // Toggle overlay
  };

  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setClickedLogo(null); // Close overlay after redirect
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-sm font-semibold mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-amber-600 to-orange-600"></div>
            LOGO DESIGN SERVICES
            <div className="w-8 h-px bg-gradient-to-r from-amber-600 to-orange-600"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Custom Logo Design Services{" "}
            <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              That Define Iconic Brands
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every great brand starts with a memorable mark. Our bespoke logo design services in Lucknow combine artistic craftsmanship, strategic brand storytelling, and modern typography to build logos that connect with audiences and endure the test of time.
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-gray-600">Loading logos...</div>
        )}
        {error && <div className="text-center text-red-600">{error}</div>}

        {/* Logo Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {logoServices.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
              <div
                className={`relative w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="relative text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="relative text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Masonry Logo Portfolio */}
        {!loading && (
          <div
            className={`transition-all duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-6 gap-6 space-y-6">
              {logoPortfolio.slice(0, visibleLogos).map((logo, index) => (
                <div
                  key={logo.id}
                  className={`break-inside-avoid group cursor-pointer transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onMouseEnter={() => setHoveredLogo(logo.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  onClick={() => handleLogoClick(logo)}
                >
                  <div
                    className={`relative bg-white rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 ${logo.height}`}
                  >
                    {/* Logo Display Area */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img
                        src={logo.img}
                        alt={logo.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Click Overlay with Link Icon */}
                    {clickedLogo === logo.id && logo.url && (
                      <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                        onClick={() => handleLinkClick(logo.url)}
                      >
                        <div className="text-white p-4">
                          <Link className="w-8 h-8" />
                          <span className="text-sm mt-2 block">
                            Visit Website
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                        {logo.type}
                      </span>
                    </div>
                  </div>
                  {/* Brand Name */}
                  <div className="mt-2 text-center text-sm font-medium text-gray-900">
                    {logo.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Load More Button */}
        {!loading && visibleLogos < logoPortfolio.length && (
          <div
            className={`text-center mt-12 transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Load More
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Create Your Iconic Brand Identity?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Partner with Lucknow's dedicated graphic design team to craft a distinctive logo that commands attention and builds customer trust.
            </p>
            <ContactPopup
              buttonText="Get Free Consultation"
              buttonClassName=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoDesignSection;
