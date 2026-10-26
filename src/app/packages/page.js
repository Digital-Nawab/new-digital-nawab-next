import PackagesPage from "@/components/packages/PackagesPage";
import React from "react";

export const metadata = {
  title: "Service Packages & Pricing | SEO & PPC Plans | Digital Nawab",
  description:
    "Explore transparent digital marketing packages from Digital Nawab. SEO packages, Paid Advertising (PPC & Meta Ads) plans, and All-in-One Digital Growth Combos with INR and USD currency options. No hidden fees.",
  alternates: {
    canonical: "https://www.digitalnawab.com/packages",
  },
  openGraph: {
    title: "Service Packages & Pricing | Digital Nawab",
    description:
      "Explore transparent digital marketing packages from Digital Nawab. SEO packages, Paid Advertising plans, and full-stack digital combos.",
    url: "https://www.digitalnawab.com/packages",
    siteName: "Digital Nawab",
    type: "website",
  },
};

export default function Page() {
  return <PackagesPage />;
}
