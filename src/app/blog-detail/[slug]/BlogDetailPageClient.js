"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Copy,
  Check,
  Twitter,
  Linkedin,
  MessageCircle,
  Tag,
  ArrowRight,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Banner from "@/components/Banner";

// Safe HTML stripper for calculations
const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

// Calculate reading time
const getReadingTime = (content) => {
  if (!content) return "3 min read";
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
};

// Format published date
const formatPublishedDate = (dateStr) => {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// Format image URL
const getImageUrl = (imgPath) => {
  if (!imgPath) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
  }
  if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
    return imgPath;
  }
  const cleanPath = imgPath.replace(/^\/+/, "");
  return `https://dashboard.digitalnawab.com/${cleanPath}`;
};

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src =
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
};

export default function BlogDetailPageClient({ params }) {
  const router = useRouter();
  const slug = decodeURIComponent(params || "");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = `${(totalScroll / windowHeight) * 100}`;
        setScrollProgress(Number(scroll));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch article details & list of recent articles
  useEffect(() => {
    let cancelled = false;

    const fetchBlogDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `/api/blogdetail`,
          { params: { url: slug } }
        );
        if (!cancelled) {
          setData(res?.data?.data || null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blog:", err);
          setError("We couldn't load this article. Please check the URL or try again later.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const fetchOtherBlogs = async () => {
      try {
        const res = await axios.get(
          "/api/getblog"
        );
        if (!cancelled && Array.isArray(res.data)) {
          setRecentBlogs(res.data);
        }
      } catch (e) {
        // quiet fallback
      }
    };

    if (slug) {
      fetchBlogDetail();
      fetchOtherBlogs();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Clean title
  const blogTitle = useMemo(() => {
    if (data?.title) return data.title;
    const fromSlug = (slug || "").replaceAll("-", " ");
    return fromSlug
      ? fromSlug.charAt(0).toUpperCase() + fromSlug.slice(1)
      : "Article";
  }, [data?.title, slug]);

  // Clean description: remove duplicate <h1> or duplicate title at the top of content
  const cleanedContent = useMemo(() => {
    if (!data?.description) return "";
    let content = data.description.trim();

    // Strip leading <h1>...</h1> tag because the page header already has the main <h1>
    content = content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, "").trim();

    // Strip any leading empty paragraphs (<p><br></p>, <p>&nbsp;</p>, etc.)
    content = content.replace(/^(\s*<p>\s*(<br\s*\/?>|&nbsp;|\s)*<\/p>\s*)+/i, "").trim();

    // If there's an h2 that matches the blog title, strip that duplicate too
    const cleanTitle = (blogTitle || "").trim().toLowerCase();
    const matchH2 = content.match(/^\s*<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (matchH2) {
      const h2Text = stripHtml(matchH2[1]).trim().toLowerCase();
      if (h2Text === cleanTitle || cleanTitle.includes(h2Text) || h2Text.includes(cleanTitle)) {
        content = content.replace(/^\s*<h2[^>]*>[\s\S]*?<\/h2>/i, "").trim();
        content = content.replace(/^(\s*<p>\s*(<br\s*\/?>|&nbsp;|\s)*<\/p>\s*)+/i, "").trim();
      }
    }

    return content;
  }, [data?.description, blogTitle]);

  // Extract clean keywords / tags
  const tags = useMemo(() => {
    const list = [];
    if (Array.isArray(data?.keyword)) {
      data.keyword.forEach((k) => {
        if (
          k &&
          k.trim() &&
          k.length >= 3 &&
          k.length <= 22 &&
          !/^(keyword|keywords|test|add+|temp)$/i.test(k.trim()) &&
          !list.includes(k.trim())
        ) {
          list.push(k.trim());
        }
      });
    }
    if (list.length === 0) {
      return ["Digital Marketing", "SEO Strategy", "Business Growth"];
    }
    return list;
  }, [data?.keyword]);

  // Primary category
  const primaryCategory = tags[0] || "Digital Marketing";

  // Filtered recent articles (excluding the current one)
  const otherArticles = useMemo(() => {
    return recentBlogs
      .filter((b) => b.url !== slug)
      .slice(0, 4);
  }, [recentBlogs, slug]);

  // Previous and Next article navigation
  const { prevArticle, nextArticle } = useMemo(() => {
    const currentIndex = recentBlogs.findIndex((b) => b.url === slug);
    if (currentIndex === -1) return { prevArticle: null, nextArticle: null };
    return {
      prevArticle: currentIndex > 0 ? recentBlogs[currentIndex - 1] : null,
      nextArticle:
        currentIndex < recentBlogs.length - 1
          ? recentBlogs[currentIndex + 1]
          : null,
    };
  }, [recentBlogs, slug]);

  // Share handlers
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : `https://digitalnawab.com/blog-detail/${slug}`;

  const copyToClipboard = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      blogTitle
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${blogTitle} - ${currentUrl}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Scroll Progress Bar at the top of the browser */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Banner with Clean Title */}
      <Banner
        title="Article Insight"
        subtitle="Knowledge & Strategy from Digital Nawab"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: primaryCategory, href: "/blog" },
        ]}
      />

      <div className="bg-[#f8fafc] min-h-screen text-slate-800 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Bar */}
          <div className="mb-8">
            <button
              onClick={() => router.push("/blog")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="h-10 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
              <div className="h-96 bg-slate-200 rounded-2xl w-full animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-xl mx-auto bg-white border border-red-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-red-600 font-semibold mb-4 text-base">{error}</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Blog Page
              </Link>
            </div>
          )}

          {/* Article Presentation */}
          {!loading && !error && data && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT COLUMN: Main Blog Content (8 cols) */}
              <article className="lg:col-span-8">
                {/* Unified Article Container (Header + Banner Image + Body Content) */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-8">
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    {primaryCategory}
                  </div>

                  {/* Single Main Article Headline */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-['custom-bold'] leading-tight sm:leading-tight mb-6">
                    {blogTitle}
                  </h1>

                  {/* Meta Details & Social Share Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs sm:text-sm text-slate-500 mb-8">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center uppercase shadow-xs">
                          {(data.author || "DN").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">
                            {data.author || "Digital Nawab Specialist"}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Digital Strategist
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{formatPublishedDate(data.published)}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{getReadingTime(data.description)}</span>
                      </div>
                    </div>

                    {/* Inline Share Icons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={copyToClipboard}
                        title="Copy link"
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition cursor-pointer"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={shareLinkedIn}
                        title="Share on LinkedIn"
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#0077b5] transition cursor-pointer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={shareTwitter}
                        title="Share on X"
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-black transition cursor-pointer"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={shareWhatsApp}
                        title="Share on WhatsApp"
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#25D366] transition cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Featured Banner Image */}
                  {(data.banner_img || data.card_img) && (
                    <div className="relative w-full h-72 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm mb-10">
                      <img
                        src={getImageUrl(data.banner_img || data.card_img)}
                        alt={blogTitle}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Article Rich Text Content (Without Duplicate Heading) */}
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        cleanedContent ||
                        "<p>No content available for this article yet.</p>",
                    }}
                  />

                  {/* Article Tags */}
                  {tags.length > 0 && (
                    <div className="pt-8 mt-10 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        <Tag className="w-3.5 h-3.5 text-blue-600" />
                        Related Topics:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((t, idx) => (
                          <Link
                            key={idx}
                            href="/blog"
                            className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 rounded-lg text-xs font-medium transition"
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Share Callout at Bottom of Article */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl">
                    <div>
                      <div className="text-sm font-bold text-slate-900 font-['custom-bold']">
                        Found this article insightful?
                      </div>
                      <p className="text-xs text-slate-500">
                        Share it with fellow business owners, marketers, and colleagues.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 hover:text-blue-600 transition shadow-xs cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Link
                          </>
                        )}
                      </button>
                      <button
                        onClick={shareLinkedIn}
                        className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-[#0077b5] rounded-xl transition shadow-xs cursor-pointer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={shareTwitter}
                        className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-black rounded-xl transition shadow-xs cursor-pointer"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={shareWhatsApp}
                        className="p-2 bg-white border border-slate-200 text-slate-700 hover:text-[#25D366] rounded-xl transition shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Author Profile Bio Card */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white font-bold text-xl flex items-center justify-center uppercase shrink-0 shadow-lg">
                      {(data.author || "DN").slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold font-['custom-bold'] text-white">
                          {data.author || "Digital Nawab Team"}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                          Author
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Digital Marketing Strategist & Content Architect at
                        Digital Nawab. Focused on modern SEO performance,
                        high-converting copy, and helping brands capture top
                        market share.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Previous & Next Article Navigation */}
                {(prevArticle || nextArticle) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {prevArticle ? (
                      <Link
                        href={`/blog-detail/${prevArticle.url}`}
                        className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition flex flex-col justify-between"
                      >
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mb-2 group-hover:text-blue-600 transition">
                          <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                        </span>
                        <h5 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                          {prevArticle.title}
                        </h5>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {nextArticle ? (
                      <Link
                        href={`/blog-detail/${nextArticle.url}`}
                        className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition flex flex-col justify-between text-right"
                      >
                        <span className="text-xs font-semibold text-slate-400 flex items-center justify-end gap-1 mb-2 group-hover:text-blue-600 transition">
                          Next Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <h5 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                          {nextArticle.title}
                        </h5>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                  </div>
                )}
              </article>

              {/* RIGHT COLUMN: Sidebar (4 cols, sticky) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
                {/* 1. Article Summary Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 font-['custom-bold'] pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Article Information
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Published</span>
                      <span className="font-semibold text-slate-800">
                        {formatPublishedDate(data.published)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Read Time</span>
                      <span className="font-semibold text-slate-800">
                        {getReadingTime(data.description)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Author</span>
                      <span className="font-semibold text-slate-800">
                        {data.author || "Digital Nawab"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Category</span>
                      <span className="font-semibold text-blue-600">
                        {primaryCategory}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Recent & Related Articles Widget */}
                {otherArticles.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                      <h3 className="text-base font-bold text-slate-900 font-['custom-bold'] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Recent Articles
                      </h3>
                      <Link
                        href="/blog"
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        View all
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {otherArticles.map((item) => (
                        <Link
                          key={item.id || item.url}
                          href={`/blog-detail/${item.url}`}
                          className="group flex items-start gap-3.5 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img
                              src={getImageUrl(item.card_img || item.banner_img)}
                              alt={item.title}
                              onError={handleImageError}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {formatPublishedDate(item.published)}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. High-Converting Agency CTA Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-neutral-900 to-blue-950 text-white p-6 shadow-xl border border-slate-800">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-semibold mb-3 border border-blue-500/30">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    Transform Your Growth
                  </div>
                  <h3 className="text-xl font-extrabold mb-2 font-['custom-bold'] leading-snug">
                    Need Help Scaling Your Business?
                  </h3>
                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    Digital Nawab provides bespoke SEO, Website Architecture,
                    and PPC Advertising built to convert visitors into paying
                    clients.
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Book A Free Discovery Call
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 4. Popular Tags Widget */}
                {tags.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 font-['custom-bold'] pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      Explore Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t, idx) => (
                        <Link
                          key={idx}
                          href="/blog"
                          className="text-xs px-3 py-1.5 rounded-lg border border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                        >
                          #{t}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
