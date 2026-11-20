export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import Contact from '@/components/Contact/Contact';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/contact-us');
}

const page = () => {
  return (
    <div>
      <Contact />
    </div>
  );
};

export default page;
