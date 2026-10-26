import Image from 'next/image'
import Design from "@/components/Design/Design";
import React from "react";
export const metadata = {
  title: 'Graphic Design Services in Lucknow | Digital Nawab',
  description:
    'Need graphic design services in Lucknow? Get logo design, branding, social media creatives, advertising graphics and packaging design from Digital Nawab.',
  alternates: {
    canonical: 'https://www.digitalnawab.com/service/graphic-designing-services',
  },
  openGraph: {
    title: 'Graphic Design Services in Lucknow | Digital Nawab',
    description:
      'Need graphic design services in Lucknow? Get logo design, branding, social media creatives, advertising graphics and packaging design from Digital Nawab.',
    url: 'https://www.digitalnawab.com/service/graphic-designing-services',
    siteName: 'Digital Nawab',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Graphic Design Services in Lucknow',
  provider: {
    '@type': 'Organization',
    name: 'Digital Nawab',
    url: 'https://www.digitalnawab.com',
    telephone: '+919369996767',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
  },
  serviceType: 'Graphic Designing Services',
  areaServed: {
    '@type': 'City',
    name: 'Lucknow',
  },
  description:
    'Need graphic design services in Lucknow? Get logo design, branding, social media creatives, advertising graphics and packaging design from Digital Nawab.',
};

const page = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Design />
    </div>
  );
};

export default page;

