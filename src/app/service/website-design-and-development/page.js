import Image from 'next/image'
import Technology from "@/components/Technology/Technology";
import React from "react";
export const metadata = {
  title: 'Website Designing & Development Company in Lucknow, India | Digital Nawab',
  description:
    'Best website designing and development company in Lucknow. Get responsive, SEO-friendly, modern websites with on-time delivery. Trusted by 250+ clients. Get your free quote today!',
  alternates: {
    canonical: 'https://www.digitalnawab.com/service/website-design-and-development',
  },
}
const page = () => {
  return (
    <div>
      <Technology isWebsiteDesignService={true} />
    </div>
  );
};

export default page;
