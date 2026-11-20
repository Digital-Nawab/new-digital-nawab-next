import BlogDetailPageClient from "./BlogDetailPageClient";
import { getBlogByUrl, getRecentBlogs } from "@/../backend/services/pageService.js";
import { getPageMeta } from '@/lib/getPageMeta';

// --- Metadata for SEO ---
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    // Check if an admin tag exists for this specific blog page
    const adminMeta = await getPageMeta(`/blog/${slug}`);
    if (adminMeta && (adminMeta.title || adminMeta.description)) {
      return adminMeta;
    }

    const data = await getBlogByUrl(slug);

    if (!data) {
      return {
        title: "",
        description: "",
      };
    }

    const bannerUrl = data.banner_img
      ? `/${data.banner_img.replace(/^\/+/, "")}`
      : "/images/fallback.jpg";

    return {
      title: data.meta_key || data.title,
      description:
        data.meta_desc ||
        (data.description
          ? data.description.replace(/<[^>]+>/g, "").slice(0, 160)
          : ""),
      keywords: Array.isArray(data.keyword)
        ? data.keyword.filter(Boolean).join(", ")
        : "",
      alternates: {
        canonical: `https://www.digitalnawab.com/blog/${data.url}`,
      },
      openGraph: {
        title: data.meta_key || data.title,
        description: data.meta_desc,
        url: `https://www.digitalnawab.com/blog/${data.url}`,
        type: "article",
        authors: [data.author],
        publishedTime: data.published,
        images: [
          {
            url: bannerUrl,
            width: 1200,
            height: 600,
            alt: data.meta_key || data.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.meta_key || data.title,
        description: data.meta_desc,
        images: [bannerUrl],
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

// --- Page Component (Server Fetch + Client Shell) ---
export default async function BlogDetailWrapper({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const [initialData, initialRecentBlogs] = await Promise.all([
    getBlogByUrl(slug),
    getRecentBlogs(10),
  ]);

  return (
    <BlogDetailPageClient
      params={slug}
      initialData={initialData}
      initialRecentBlogs={initialRecentBlogs}
    />
  );
}
