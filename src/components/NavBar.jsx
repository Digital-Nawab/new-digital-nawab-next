"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// 🔗 ActiveLink wrapper
function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "text-white truncate text-[15px] lg:text-base transition-colors duration-400",
        isActive
          ? "!text-black font-bold bg-white px-2 py-0.5 rounded-full"
          : "hover:text-cyan-400"
      )}
    >
      {children}
    </Link>
  );
}

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities");
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          setCities(result.data.filter((city) => city.is_active));
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const handleBurgerClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-md p-2">
      <div className="w-full xl:container mx-auto flex justify-between items-center">
        <div className="w-full min-h-[82px] flex items-center rounded-full bg-[#191b24] pr-[20px] pl-[40px] shadow-lg">
          <div className="grid grid-cols-7 w-full items-center">
            {/* Logo */}
            <Link
              href="/"
              className="max-w-[90px] flex justify-center items-center"
              rel="noopener noreferrer"
            >
              <img loading="lazy" src="/assets/logo/logo.png" alt="Logo" />
            </Link>

            {/* Desktop / Mobile Nav */}
            <div
              className={clsx(
                "col-span-5 flex items-center justify-center",
                isNavOpen ? "flex-col" : "hidden md:flex"
              )}
            >
              <nav
                className={clsx(
                  "flex w-full md:w-auto items-center",
                  isNavOpen ? "flex-col items-center" : "items-center"
                )}
              >
                <ul
                  className={clsx(
                    "flex gap-5 m-0 p-0 w-full md:w-auto items-center",
                    isNavOpen ? "flex-col items-center" : "items-center"
                  )}
                >
                  {/* Home */}
                  <li>
                    <ActiveLink href="/">Home</ActiveLink>
                  </li>

                  {/* About Us */}
                  <li>
                    <ActiveLink href="/about-us">About Us</ActiveLink>
                  </li>

                  {/* Services Dropdown */}
                  <li>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>
                          <h2 className="text-white truncate text-[15px] lg:text-base flex items-center gap-1 transition-colors duration-400 cursor-pointer">
                            Services{" "}
                            <span className="text-xs">
                              <ChevronDown size={20} />
                            </span>
                          </h2>
                        </MenubarTrigger>
                        <MenubarContent className="bg-[#191b24] border-gray-800 text-white min-w-[14rem]">
                          <MenubarItem asChild>
                            <Link href="/service/seo-company-in-lucknow" className="text-sm hover:text-cyan-400">
                              SEO Marketing
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/pay-per-click-services" className="text-sm hover:text-cyan-400">
                              Google Ads Services
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/social-media-marketing" className="text-sm hover:text-cyan-400">
                              Social Media Marketing
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/direct-marketing" className="text-sm hover:text-cyan-400">
                              Direct Marketing
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/ecommerce-marketing" className="text-sm hover:text-cyan-400">
                              E-Commerce Marketing
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/graphic-designing-services" className="text-sm hover:text-cyan-400">
                              Graphic Design Services
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/website-design-and-development" className="text-sm hover:text-cyan-400">
                              Website Development
                            </Link>
                          </MenubarItem>
                          <MenubarSeparator className="bg-gray-800" />
                          <MenubarItem asChild>
                            <Link href="/service/mobile-application-development" className="text-sm hover:text-cyan-400">
                              App Development
                            </Link>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </li>

                  {/* Portfolio */}
                  <li>
                    <ActiveLink href="/portfolio">Portfolio</ActiveLink>
                  </li>

                  {/* Package */}
                  <li>
                    <ActiveLink href="/package">Package</ActiveLink>
                  </li>

                  {/* Blogs */}
                  <li>
                    <ActiveLink href="/blog">Blogs</ActiveLink>
                  </li>

                  {/* Career */}
                  <li>
                    <ActiveLink href="/career">Career</ActiveLink>
                  </li>

                  {/* City Dropdown */}
                  <li>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>
                          <h2 className="text-white truncate text-[15px] lg:text-base flex items-center gap-1 transition-colors duration-400 cursor-pointer">
                            City{" "}
                            <span className="text-xs">
                              <ChevronDown size={20} />
                            </span>
                          </h2>
                        </MenubarTrigger>
                        <MenubarContent className="bg-[#191b24] border-gray-800 text-white min-w-[12rem]">
                          {loadingCities ? (
                            <MenubarItem disabled className="text-sm text-gray-400">
                              Loading...
                            </MenubarItem>
                          ) : cities.length === 0 ? (
                            <MenubarItem disabled className="text-sm text-gray-400">
                              No cities found
                            </MenubarItem>
                          ) : (
                            cities.map((city, idx) => (
                              <React.Fragment key={city.id}>
                                <MenubarItem asChild>
                                  <Link href={`/city/${city.slug}`} className="text-sm hover:text-cyan-400">
                                    {city.name}
                                  </Link>
                                </MenubarItem>
                                {idx !== cities.length - 1 && <MenubarSeparator className="bg-gray-800" />}
                              </React.Fragment>
                            ))
                          )}
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact Button */}
            <div className="hidden md:flex items-center ml-auto">
              <Link
                href="/contact-us"
                className="relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-green-400 transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
              >
                <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
                  <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]" />
                  <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-green-400 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black">
                    <div className="size-[0.8rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                        height="100%"
                        width="100%"
                      >
                        <path
                          fill="currentColor"
                          d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white text-[15px]">
                  Contact Us
                </div>
              </Link>
            </div>

            {/* Burger Menu */}
            <div
              className="md:hidden flex flex-col items-end gap-1 w-6 cursor-pointer"
              onClick={handleBurgerClick}
            >
              <div
                className={clsx(
                  "w-full h-0.5 bg-white rounded-2xl transition-all duration-400",
                  isNavOpen && "rotate-45 translate-y-2"
                )}
              />
              <div
                className={clsx(
                  "w-full h-0.5 bg-white rounded-2xl transition-all duration-400",
                  isNavOpen && "opacity-0"
                )}
              />
              <div
                className={clsx(
                  "w-full h-0.5 bg-white rounded-2xl transition-all duration-400",
                  isNavOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavBar);
