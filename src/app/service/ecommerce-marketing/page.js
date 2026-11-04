import EcommerceMarketingPage from "@/components/Ecommerce/EcommerceMarketingPage";
import React from "react";

export const metadata = {
  title: "Ecommerce Marketing Agency for Online Business Growth | Digital Nawab",
  description:
    "Grow your online store with strategic ecommerce marketing services from Digital Nawab. Expert Ecommerce SEO, Google Ads, Meta Ads, and conversion optimization to scale sales.",
  alternates: {
    canonical: "https://www.digitalnawab.com/service/ecommerce-marketing",
  },
  openGraph: {
    title: "Ecommerce Marketing Agency for Online Business Growth | Digital Nawab",
    description:
      "Grow your online store with strategic ecommerce marketing services designed to attract the right audience, increase product visibility and generate more sales.",
    url: "https://www.digitalnawab.com/service/ecommerce-marketing",
    siteName: "Digital Nawab",
    type: "website",
  },
};

export default function Page() {
  return <EcommerceMarketingPage />;
}
