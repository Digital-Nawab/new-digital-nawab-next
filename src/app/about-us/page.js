export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import About from "@/components/About/About";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/about-us');
}

const page = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default page;
