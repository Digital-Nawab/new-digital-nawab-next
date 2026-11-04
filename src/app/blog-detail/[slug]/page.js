// ✅ this file is still a Server Component by default
import axios from "axios";
import BlogDetailPageClient from "./BlogDetailPageClient";

// --- Metadata for SEO ---
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const res = await axios.get(
      `https://dashboard.digitalnawab.com/api/blogdetail`,
      { params: { url: slug } }
    );

    const data = res?.data?.data;

    if (!data) {
      return {
        title: "Blog | Digital Nawab",
        description: "Read the latest blogs from Digital Nawab.",
      };
    }

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
            url: data.banner_img
              ? `https://dashboard.digitalnawab.com/${data.banner_img.replace(/^\/+/, "")}`
              : `https://dashboard.digitalnawab.com/${(data.card_img || "").replace(/^\/+/, "")}`,
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
        images: [
          data.banner_img
            ? `https://dashboard.digitalnawab.com/${data.banner_img.replace(/^\/+/, "")}`
            : `https://dashboard.digitalnawab.com/${(data.card_img || "").replace(/^\/+/, "")}`,
        ],
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
  let initialData = null;
  let initialRecentBlogs = [];

  try {
    const [detailRes, blogsRes] = await Promise.allSettled([
      axios.get(`https://dashboard.digitalnawab.com/api/blogdetail`, {
        params: { url: slug },
      }),
      axios.get(`https://dashboard.digitalnawab.com/api/getblog`),
    ]);

    if (detailRes.status === "fulfilled") {
      initialData = detailRes.value?.data?.data || null;
    }
    if (blogsRes.status === "fulfilled" && Array.isArray(blogsRes.value?.data)) {
      initialRecentBlogs = blogsRes.value.data;
    }
  } catch (err) {}

  return (
    <BlogDetailPageClient
      params={slug}
      initialData={initialData}
      initialRecentBlogs={initialRecentBlogs}
    />
  );
}
