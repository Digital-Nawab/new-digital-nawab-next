export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import SocialMarketing from '@/components/SocialMarketing/SocialMarketing';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/service/social-media-marketing');
}

const page = () => {
  return (
    <div>
      <SocialMarketing />
    </div>
  );
};

export default page;
