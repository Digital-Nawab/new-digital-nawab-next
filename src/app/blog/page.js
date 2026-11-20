export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import { BlogPage } from '@/components/Blog/Blog';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/blog');
}

const page = () => {
  return (
    <div>
      <BlogPage />
    </div>
  );
};

export default page;
