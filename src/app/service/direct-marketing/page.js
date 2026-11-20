export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import DigialMarketing from "@/components/DigitalMarketing/DigialMarketing";
import React from "react";
import MediaBuyingSection from '@/components/BrandPerformance/MediaBuying';
import ABTestingSection from '@/components/BrandPerformance/Testing';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/service/direct-marketing');
}

const page = () => {
  return (
    <div>
      <DigialMarketing />
      <ABTestingSection />
      <MediaBuyingSection />
    </div>
  );
};

export default page;
