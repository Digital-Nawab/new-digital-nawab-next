export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/portfolio');
}

const page = () => {
  return (
    <div>
      <PortfolioShowcase />
    </div>
  );
};

export default page;
