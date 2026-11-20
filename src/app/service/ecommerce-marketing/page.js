export const dynamic = 'force-dynamic';
export const revalidate = 0;

import EcommerceMarketingPage from "@/components/Ecommerce/EcommerceMarketingPage";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/service/ecommerce-marketing');
}

export default function Page() {
  return <EcommerceMarketingPage />;
}
