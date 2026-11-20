export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import Design from "@/components/Design/Design";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/service/graphic-designing-services');
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Graphic Designing Services in Lucknow',
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
    'Get professional graphic designing services in Lucknow from Digital Nawab. From logo design and branding to social media creatives, brochures and packaging, we create designs that help businesses stand out.',
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
