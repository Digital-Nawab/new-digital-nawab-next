export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import Technology from "@/components/Technology/Technology";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/technology');
}

const page = () => {
  return (
    <div>
      <Technology />
    </div>
  );
};

export default page;
