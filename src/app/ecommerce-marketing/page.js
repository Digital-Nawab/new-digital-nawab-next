import EcommerceMarketingPage from "@/components/Ecommerce/EcommerceMarketingPage";
import React from "react";

export const metadata = {
  title: "Ecommerce Marketing Services | Ecommerce Digital Marketing Agency | Digital Nawab",
  description:
    "Scale your online store with proven ecommerce digital marketing solutions. Expert Ecommerce SEO, Google Shopping, Meta Ads, Email Marketing & Conversion Optimization. Increase sales and maximize ROAS.",
  alternates: {
    canonical: "https://www.digitalnawab.com/service/ecommerce-marketing",
  },
  openGraph: {
    title: "Ecommerce Marketing Agency | Scale Online Sales | Digital Nawab",
    description:
      "Boost your ecommerce store sales with full-funnel marketing strategies. Top-ranking SEO, Google Shopping, Meta Ads, and automated customer retention.",
    url: "https://www.digitalnawab.com/service/ecommerce-marketing",
    siteName: "Digital Nawab",
    type: "website",
  },
};

export default function Page() {
  return <EcommerceMarketingPage />;
}
