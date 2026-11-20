export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import React from 'react';
import './globals.css';
import Home from '@/components/Home/Home';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/');
}
const page = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default page