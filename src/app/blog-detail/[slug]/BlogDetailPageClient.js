// app/blog/[slug]/BlogDetailPageClient.js
"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Phone,
  ArrowRight,
  Tag,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Banner from "@/components/Banner";

export default function BlogDetailPageClient({
  params,
  initialData = null,
  initialRecentBlogs = [],
}) {
  const router = useRouter();
  const slug = decodeURIComponent(params);

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [recentBlogs, setRecentBlogs] = useState(initialRecentBlogs);

  useEffect(() => {
    let cancelled = false;
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://dashboard.digitalnawab.com/api/blogdetail`,
          { params: { url: slug } }
        );
        if (!cancelled) setData(res?.data?.data || null);
      } catch {
        if (!cancelled) {
          setError("Unable to load this article.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (slug) fetchBlog();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Fetch recent blogs for the sidebar if not preloaded
  useEffect(() => {
    if (recentBlogs.length > 0) return;
    let cancelled = false;
    const fetchRecent = async () => {
      try {
        const res = await axios.get(
          `https://dashboard.digitalnawab.com/api/getblog`
        );
        if (!cancelled && Array.isArray(res?.data)) {
          setRecentBlogs(res.data);
        }
      } catch {
        // silent fallback
      }
    };
    fetchRecent();
    return () => {
      cancelled = true;
    };
  }, [recentBlogs.length]);

  const blogTitle = useMemo(() => {
    if (data?.title) return data.title;
    const fromSlug = (slug || "").replaceAll("-", " ");
    return fromSlug
      ? fromSlug.charAt(0).toUpperCase() + fromSlug.slice(1)
      : "Blog";
  }, [data?.title, slug]);

  const publishedDisplay = useMemo(() => {
    if (!data?.published) return "";
    try {
      const d = new Date(data.published);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return data.published;
    }
  }, [data?.published]);

  const bannerImageUrl = useMemo(() => {
    const raw = data?.banner_img || data?.card_img;
    if (!raw) return null;
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw;
    }
    return `https://dashboard.digitalnawab.com/${raw.replace(/^\/+/, "")}`;
  }, [data?.banner_img, data?.card_img]);

  // Filter other blogs for sidebar
  const otherBlogs = useMemo(() => {
    if (!recentBlogs.length) return [];
    const filtered = recentBlogs.filter((b) => b.url !== slug);
    return (filtered.length ? filtered : recentBlogs).slice(0, 4);
  }, [recentBlogs, slug]);

  // Extract tags from keywords
  const tags = useMemo(() => {
    if (!data?.keyword) return [];
    const rawList = Array.isArray(data.keyword) ? data.keyword : [data.keyword];
    const extracted = [];
    rawList.forEach((item) => {
      if (typeof item === "string") {
        item.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed && !extracted.includes(trimmed)) {
            extracted.push(trimmed);
          }
        });
      }
    });
    return extracted.slice(0, 8);
  }, [data?.keyword]);

  // Sanitize description: convert any <h1> inside article body to <h2> to maintain single H1 in hero
  const sanitizedDescription = useMemo(() => {
    if (!data?.description) return "";
    return data.description
      .replace(/<h1(\b[^>]*)>/gi, "<h2$1>")
      .replace(/<\/h1>/gi, "</h2>");
  }, [data?.description]);

  return (
    <>
      <Banner
        as="p"
        title={blogTitle}
        subtitle="We'd love to hear from you!"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Blog */}
            <div className="lg:col-span-2">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blogs
              </button>

              {/* Title */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">
                {blogTitle}
              </h1>

              {/* Loading/Error */}
              {loading && !data && (
                <p className="text-slate-600 mb-4">Loading article…</p>
              )}
              {!loading && error && (
                <p className="text-red-600 mb-4">{error}</p>
              )}

              {/* Blog Meta */}
              <div className="flex items-center gap-4 text-slate-600 text-sm mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-blue-500" />
                  <span>{data?.author || "Digital Nawab"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>5 min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{publishedDisplay || "—"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>Viewed</span>
                </div>
              </div>

              {/* Blog Banner Image (1200x600) */}
              {bannerImageUrl ? (
                <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-xl border border-blue-100 bg-slate-900/10">
                  <img
                    src={bannerImageUrl}
                    alt={blogTitle}
                    width={1200}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                    onError={(e) => {
                      if (data?.card_img) {
                        const fallbackCard = data.card_img.startsWith("http")
                          ? data.card_img
                          : `https://dashboard.digitalnawab.com/${data.card_img.replace(/^\/+/, "")}`;
                        if (e.currentTarget.src !== fallbackCard) {
                          e.currentTarget.src = fallbackCard;
                          return;
                        }
                      }
                      e.currentTarget.src = "/images/fallback.jpg";
                    }}
                  />
                </div>
              ) : loading ? (
                <div className="w-full aspect-[2/1] rounded-2xl bg-slate-200/80 animate-pulse mb-8 border border-blue-100" />
              ) : null}

              {/* About Blog */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  About This Blog
                </h2>
                <div className="bg-white/85 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 border border-blue-100 shadow-lg">
                  {sanitizedDescription ? (
                    <div
                      className="blog-content ck-content"
                      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                    />
                  ) : (
                    <div className="blog-content ck-content">
                      <p>
                        We are exploring the latest trends in digital
                        marketing...
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <aside className="sticky top-24 space-y-6">
                {/* Consultation CTA Card */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-6 text-white shadow-xl border border-blue-500/20 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> Free Strategy Call
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Scale Your Business With Digital Nawab
                  </h3>
                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                    Get data-driven SEO, Google Ads & high-converting websites tailored for your business goals.
                  </p>
                  <div className="space-y-2.5">
                    <Link
                      href="/contact-us"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-blue-500/25 transform hover:-translate-y-0.5 text-sm"
                    >
                      <span className="text-white">Get Free Consultation</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                    <a
                      href="tel:8860757649"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-2.5 px-4 rounded-xl font-medium transition-colors border border-white/10 text-sm"
                    >
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-white">Call +91 8860757649</span>
                    </a>
                  </div>
                </div>

                {/* Recent Articles Card */}
                {otherBlogs.length > 0 && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        Recent Articles
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {otherBlogs.map((b) => {
                        const imgUrl = b.card_img || b.banner_img;
                        const fullImg = imgUrl
                          ? imgUrl.startsWith("http")
                            ? imgUrl
                            : `https://dashboard.digitalnawab.com/${imgUrl.replace(/^\/+/, "")}`
                          : "/images/fallback.jpg";

                        let dateStr = "";
                        if (b.published) {
                          try {
                            dateStr = new Date(b.published).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            );
                          } catch {
                            dateStr = b.published;
                          }
                        }

                        return (
                          <Link
                            key={b.id || b.url}
                            href={`/blog-detail/${b.url}`}
                            className="blog-sidebar-recent-link group flex gap-3 items-center p-2 rounded-xl hover:bg-blue-50/70 transition-all duration-200"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                              <img
                                src={fullImg}
                                alt={b.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = "/images/fallback.jpg";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                style={{ color: "#0f172a" }}
                                className="text-sm font-semibold text-slate-900 group-hover:!text-blue-600 transition-colors line-clamp-2 leading-snug"
                              >
                                {b.title}
                              </h4>
                              {dateStr && (
                                <span
                                  style={{ color: "#64748b" }}
                                  className="text-xs text-slate-500 mt-1 block font-medium"
                                >
                                  {dateStr}
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Article Topics / Tags */}
                {tags.length > 0 && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        Related Topics
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t, idx) => (
                        <span
                          key={idx}
                          style={{ color: "#1e293b" }}
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-blue-100 hover:!text-blue-700 transition-colors cursor-default border border-slate-200/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
