"use client";
import Image from 'next/image'

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import React from "react";
import ColourfulText from "@/components/ui/colourful-text";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Top strip */}
      <div className="w-full h-1 bg-[#b7337c]" />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <h3 className="text-xl custom-bold">
                  <img src="/assets/logo/logo.png" alt="Digital Nawab logo" />
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Digital Nawab is a digital marketing company that believes in
                bringing solutions and growth-hacking answers for our end-clients.
              </p>
            </div>

            {/* Our Services (from NavBar) */}
            <div>
              <h4 className="text-[#b7337c] custom-bold mb-4">
                <ColourfulText text="Our Services" />
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/service/seo-company-in-lucknow"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    SEO Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/pay-per-click-services"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Google Ads Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/social-media-marketing"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Social Media Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/ecommerce-marketing"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Ecommerce Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/graphic-designing-services"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Graphic Design Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/website-design-and-development"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service/mobile-application-development"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Mobile App Development
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore More (from NavBar + legal) */}
            <div>
              <h4 className="text-[#b7337c] custom-bold mb-4">
                <ColourfulText text="Explore More" />
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/packages"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <span>Our Packages & Pricing</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Plans</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/term-condition"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-cancellation"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Refund & Cancellation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-[#b7337c] custom-bold mb-4">
                <ColourfulText text="Contact Us" />
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#b7337c] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <MapPin className="text-black w-3 h-3" />
                  </div>
                  <div className="text-gray-300">
                    <p>B12 A, L Rd, Mahanagar, Lucknow</p>
                    <p>Uttar Pradesh 226006</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#b7337c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Phone className="text-black w-3 h-3" />
                  </div>
                  <a href="tel:+919335621987" className="text-gray-300 hover:text-white">
                    +91 93356 21987
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#b7337c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Smartphone className="text-black w-3 h-3" />
                  </div>
                  <a href="tel:+919335621987" className="text-gray-300 hover:text-white">
                    +91 93356 21987
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#b7337c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Mail className="text-black w-3 h-3" />
                  </div>
                  <a
                    href="mailto:wedigitalnawab@gmail.com"
                    className="text-gray-300 hover:text-white"
                  >
                    wedigitalnawab@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>Digital Nawab 2026 © All rights reserved</p>
              <Link href="/term-condition" className="hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
