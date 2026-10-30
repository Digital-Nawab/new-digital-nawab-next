"use client";
import Image from "next/image";

import React, { useState } from "react";
import {
  IconHome,
  IconTerminal2,
  IconGraph,
  IconCode,
  IconPhoto,
  IconMessage,
} from "@tabler/icons-react";
import { Contact } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ContactPopup from "./ContactPopup";

// 🔗 ActiveLink wrapper
function ActiveLink({ href, children, activeClass, inactiveClass }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "transition-all duration-200",
        isActive ? activeClass : inactiveClass
      )}
    >
      {children}
    </Link>
  );
}

const FloatingDock = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cities, setCities] = useState([]);

  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const json = await res.json();
        if (json.status && Array.isArray(json.data)) {
          setCities(json.data.filter((c) => c.is_active));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCities();
  }, []);

  const services = [
    {
      title: "SEO Marketing",
      icon: (
        <IconGraph className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/seo-company-in-lucknow",
    },
    {
      title: "Google Ads Services",
      icon: (
        <IconMessage className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/pay-per-click-services",
    },
    {
      title: "Social Media Marketing",
      icon: (
        <IconMessage className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/social-media-marketing",
    },
    {
      title: "Ecommerce Marketing",
      icon: (
        <IconGraph className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/ecommerce-marketing",
    },
    {
      title: "Graphic Design",
      icon: (
        <IconPhoto className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/graphic-designing-services",
    },
    {
      title: "Website Development",
      icon: (
        <IconCode className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/website-design-and-development",
    },
    {
      title: "App Development",
      icon: (
        <IconCode className="h-6 w-6 text-neutral-300 group-hover:text-blue-400" />
      ),
      href: "/service/mobile-application-development",
    },
  ];

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Services",
      icon: null, // we'll handle it separately below
      href: "#",
    },
    {
      title: "Packages",
      icon: (
        <IconTerminal2 className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/packages",
    },
    {
      title: "Portfolio",
      icon: (
        <IconPhoto className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/portfolio",
    },
    {
      title: "Contact",
      icon: (
        <Contact className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact-us",
    },
  ];

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center  p-2">
      <div className="w-full xl:container mx-auto flex justify-between items-center">
        <div className="w-full min-h-[72px] flex items-center rounded-full bg-[#191b24] px-5 shadow-lg">
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link
              href="/"
              className="max-w-[90px] flex justify-center items-center"
              rel="noopener noreferrer"
            >
              <img loading="lazy" src="/assets/logo/logo.png" alt="Logo" />
            </Link>

            

            {/* Contact Button */}
            <div className="flex items-center ml-auto">
              
                  <ContactPopup
                  buttonText="Get Started Now"
                  buttonClassName=" cursor-pointer group bg-lime-400 z-50 hover:bg-lime-500 text-gray-900 font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-[inset_1px_2px_5px_#00000080]"
                />
            </div>
            
          </div>
        </div>
      </div>
    </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-2 shadow-lg flex z-50 items-center">
        <div className="flex justify-around w-full h-full">
          {links.map((link, index) => {
            if (link.title === "Services") {
              return (
                <Drawer
                  key={index}
                  open={drawerOpen}
                  onOpenChange={setDrawerOpen}
                >
                  <DrawerTrigger asChild>
                    <button className="p-2 rounded-full flex flex-col items-center justify-center gap-1 text-neutral-300 hover:bg-gray-700">
                      <IconGraph className="h-6 w-6" />
                      <span className="text-xs font-extralight">Services</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-gray-900 border-gray-800">
                    <DrawerHeader className="pb-2">
                      <DrawerTitle className="text-white text-xl font-semibold text-center">
                        Our Services
                      </DrawerTitle>
                      <DrawerDescription className="text-gray-400 text-center">
                        Explore our marketing, design, and development solutions
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((service, index) => (
                          <ActiveLink
                            key={index}
                            href={service.href}
                            activeClass="group flex flex-col items-center p-4 rounded-xl border bg-blue-500/20 border-blue-500/40 text-blue-400"
                            inactiveClass="group flex flex-col items-center p-4 rounded-xl border bg-gray-800/50 border-gray-700/50 text-neutral-300 hover:bg-gray-800 hover:border-gray-600"
                          >
                            <div
                              onClick={() => setDrawerOpen(false)}
                              className="w-full flex flex-col items-center"
                            >
                              <div className="mb-2 p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-600/50 transition-colors">
                                {service.icon}
                              </div>
                              <p className="text-sm font-medium text-center leading-tight">
                                {service.title}
                              </p>
                            </div>
                          </ActiveLink>
                        ))}
                      </div>

                      {cities.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-800">
                          <p className="text-xs uppercase tracking-wider text-lime-400 font-semibold mb-2 text-center">
                            Cities We Serve
                          </p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {cities.map((c) => (
                              <Link
                                key={c.id}
                                href={`/city/${c.slug}`}
                                onClick={() => setDrawerOpen(false)}
                                className="px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-lime-400 hover:text-black text-xs font-medium text-gray-200 border border-gray-700 transition-colors"
                              >
                                {c.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <DrawerFooter className="pt-2">
                      <DrawerClose>
                        <div className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors">
                          Close
                        </div>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              );
            }

            return (
              <ActiveLink
                key={index}
                href={link.href}
                activeClass="p-2 rounded-full flex flex-col items-center justify-center gap-1 bg-gray-700 text-blue-400"
                inactiveClass="p-2 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-gray-700 text-neutral-300"
              >
                {link.icon}
                <span className="text-xs font-extralight">{link.title}</span>
              </ActiveLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FloatingDock;
