export const dynamic = 'force-dynamic';
export const revalidate = 0;

import MobileAppPage from "@/components/mobile/MobileAppPage";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/mobile-application-development');
}

export default function Page() {
  return <MobileAppPage />;
}
