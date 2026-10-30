"use client";

import BlogDetailPageClient from "@/app/blog-detail/[slug]/BlogDetailPageClient";

export default function BlogDetailPage({ params }) {
  const slug = params?.slug || params;
  return <BlogDetailPageClient params={slug} />;
}
