export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TermsAndConditions from "@/components/policy/TandC";
import React from "react";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/term-condition');
}

const page = () => {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
};

export default page;
