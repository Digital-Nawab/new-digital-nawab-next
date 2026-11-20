export const dynamic = 'force-dynamic';
export const revalidate = 0;

import RefundCancellationPolicy from '@/components/policy/Refund';
import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  return await getPageMeta('/refund-cancellation');
}

const page = () => {
  return (
    <div>
      <RefundCancellationPolicy />
    </div>
  );
};

export default page;
