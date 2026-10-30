// ✅ this file is still a Server Component by default
// But your BlogDetailPage inside is marked as "use client"
import BlogDetailPageClient from "./BlogDetailPageClient";
import { getBlogDetail } from "@/backend/controllers/apiController";

// --- Metadata for SEO ---
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const res = await (await getBlogDetail(slug)).json();
    const data = res?.data;

    if (!data) {
      return {
        title: "Blog | Digital Nawab",
        description: "Read the latest blogs from Digital Nawab.",
      };
    }

    const bannerUrl = data.banner_img?.startsWith('http')
      ? data.banner_img
      : `/${data.banner_img}`;
    const cardUrl = data.card_img?.startsWith('http')
      ? data.card_img
      : `/${data.card_img}`;

    return {
      title: data.meta_key || data.title,
      description:
        data.meta_desc ||
        (data.description ? data.description.replace(/<[^>]+>/g, "").slice(0, 160) : ""),
      keywords: Array.isArray(data.keyword)
        ? data.keyword.filter(Boolean).join(", ")
        : "",
      alternates: {
        canonical: `https://www.digitalnawab.com/blog-detail/${data.url}`,
      },
      openGraph: {
        title: data.meta_key || data.title,
        description: data.meta_desc,
        url: `https://www.digitalnawab.com/blog-detail/${data.url}`,
        type: "article",
        authors: [data.author],
        publishedTime: data.published,
        images: [
          {
            url: bannerUrl,
            width: 1200,
            height: 630,
            alt: data.meta_key || data.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.meta_key || data.title,
        description: data.meta_desc,
        images: [cardUrl],
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog metadata:", error);
    return {
      title: "Blog | Digital Nawab",
      description: "Read the latest blogs from Digital Nawab.",
    };
  }
}

// --- Page Component (Client Side) ---
export default async function BlogDetailWrapper({ params }) {
  const resolvedParams = await params;
  return <BlogDetailPageClient params={resolvedParams?.slug} />;
}
