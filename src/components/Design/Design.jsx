"use client";
import Image from 'next/image'

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { NewHero } from "./NewHero";
import BrandingSection from "./BrandingSection ";
import LogoDesignSection from "./LogoDesignSection ";
import AdCreativesSection from "./AdCreativesSection ";
import { ThreeDMarqueeDemoSecond } from "../Home/ThreeDMarqueeDemoSecond";
import PackagingAndPackagesSection from "./PackagingAndPackagesSection";

// 👇 Extract your hook usage into a child component wrapped by Suspense
const DesignContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, searchParams]);

  return (
    <div>
      <NewHero />

      <section id="brand-design">
        <BrandingSection />
      </section>

      <ThreeDMarqueeDemoSecond />
      <AdCreativesSection />

      <LogoDesignSection />

      <section id="packaging-design">
        <PackagingAndPackagesSection />
      </section>
    </div>
  );
};

const Design = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignContent />
    </Suspense>
  );
};

export default Design;
