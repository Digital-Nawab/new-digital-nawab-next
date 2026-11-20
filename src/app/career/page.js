export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import Career from '@/components/carrer/Career';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/career');
}

const page = () => {
  return (
    <div>
      <Career />
    </div>
  );
};

export default page;
