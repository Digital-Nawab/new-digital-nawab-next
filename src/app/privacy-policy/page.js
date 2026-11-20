export const dynamic = 'force-dynamic';
export const revalidate = 0;

import PrivacyPolicy from '@/components/policy/PrivacyPolicy';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/privacy-policy');
}

const page = () => {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
};

export default page;
