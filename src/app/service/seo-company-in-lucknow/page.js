export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import Seo from '@/components/SEO/Seo';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/service/seo-company-in-lucknow');
}

const page = () => {
  return (
    <div>
      <Seo />
    </div>
  );
};

export default page;
