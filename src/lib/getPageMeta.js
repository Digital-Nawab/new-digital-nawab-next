// lib/getPageMeta.js
import { getTag } from "@/backend/controllers/apiController";

export async function getPageMeta(currentUrl) {
  try {
    const res = await getTag();
    const json = await res.json();

    // find the matching page by URL
    const meta = json.data?.find((item) => item.page_url === currentUrl);

    if (!meta) {
      return {
        title: 'Digital Nawab',
        description: 'Default description for Digital Nawab.',
        alternates: { canonical: 'https://www.digitalnawab.com' },
        openGraph: {
          title: 'Digital Nawab',
          description: 'Default description for Digital Nawab.',
          url: 'https://www.digitalnawab.com',
          images: ['https://www.digitalnawab.com/default-og.png'],
        },
      };
    }

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keyword ? (typeof meta.keyword === 'string' ? meta.keyword.split(',') : meta.keyword) : [],
      alternates: { canonical: meta.page_url },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: meta.page_url,
        images: [
          meta.image?.startsWith('http') ? meta.image : `/${meta.image}`,
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: [
          meta.image?.startsWith('http') ? meta.image : `/${meta.image}`,
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Digital Nawab',
      description: 'Default description for Digital Nawab.',
      alternates: { canonical: 'https://www.digitalnawab.com' },
    };
  }
}
