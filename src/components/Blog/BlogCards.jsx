"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowUpRight,
  ArrowRight,
  Tag,
  Sparkles,
  X,
  Mail,
  CheckCircle2,
  BookOpen,
  Flame,
  TrendingUp,
} from "lucide-react";

// Safe HTML stripper for clean card excerpts
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

// Calculate approximate reading time
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// Format image URL with fallback placeholder
const getImageUrl = (imgPath) => {
  if (!imgPath) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";
  }
  if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
    return imgPath;
  }
  const cleanPath = imgPath.replace(/^\/+/, "");
  return `https://dashboard.digitalnawab.com/${cleanPath}`;
};

// Category badge color mapper
const getCategoryStyle = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("seo") || cat.includes("search")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
  }
  if (cat.includes("market") || cat.includes("digital")) {
    return "bg-blue-50 text-blue-700 border-blue-200/60";
  }
  if (cat.includes("design") || cat.includes("ui") || cat.includes("creative")) {
    return "bg-purple-50 text-purple-700 border-purple-200/60";
  }
  if (cat.includes("tech") || cat.includes("web") || cat.includes("code")) {
    return "bg-amber-50 text-amber-800 border-amber-200/60";
  }
  return "bg-slate-100 text-slate-800 border-slate-200";
};

// Fallback image handler
const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src =
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";
};

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "/api/getblog"
        );
        if (isMounted) {
          const list = Array.isArray(response.data) ? response.data : [];
          setBlogs(list);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch blogs:", err);
          setError("Unable to load latest articles right now.");
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Collect all unique keywords/tags from blogs + standard industry tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    const curated = [
      "Digital Marketing",
      "SEO",
      "PPC Advertising",
      "Web Development",
      "Social Media",
      "Branding",
      "ROI Growth",
    ];
    curated.forEach((t) => tagSet.add(t));

    blogs.forEach((b) => {
      if (Array.isArray(b.keyword)) {
        b.keyword.forEach((k) => {
          if (
            k &&
            k.trim() &&
            k.length >= 3 &&
            k.length <= 22 &&
            !/^(keyword|keywords|test|add+|temp)$/i.test(k.trim())
          ) {
            tagSet.add(k.trim());
          }
        });
      }
    });

    return Array.from(tagSet).slice(0, 8);
  }, [blogs]);

  // Extract primary category for a blog
  const getPrimaryCategory = (blog) => {
    if (Array.isArray(blog.keyword) && blog.keyword.length > 0) {
      const valid = blog.keyword.find((k) => k && k.trim().length > 2);
      if (valid) return valid.trim();
    }
    return "Marketing";
  };

  // Filtered blogs based on search query and selected tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchQuery.trim() ||
        (blog.title &&
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (blog.description &&
          blog.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (blog.author &&
          blog.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === "All" ||
        (Array.isArray(blog.keyword) &&
          blog.keyword.some(
            (k) => k && k.toLowerCase() === selectedTag.toLowerCase()
          )) ||
        (blog.title &&
          blog.title.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  // Recent blogs (latest 4)
  const recentBlogs = useMemo(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0))
      .slice(0, 4);
  }, [blogs]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setIsSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Insights & Trends
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-['custom-bold']">
            Growth Strategies, SEO & Marketing Insights
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay ahead with actionable digital marketing blueprints, SEO best
            practices, and technology solutions crafted by the specialists at
            Digital Nawab.
          </p>
        </div>

        {/* Filter Pills / Categories */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            onClick={() => setSelectedTag("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              selectedTag === "All"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            All Articles ({blogs.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedTag === tag
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active Filter Notice if applied */}
        {(selectedTag !== "All" || searchQuery) && (
          <div className="mb-8 flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-900">
            <div className="flex items-center gap-2">
              <span className="font-medium">Filtering by:</span>
              {selectedTag !== "All" && (
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-blue-700 border border-blue-200">
                  Tag: {selectedTag}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-blue-700 border border-blue-200">
                  Search: "{searchQuery}"
                </span>
              )}
              <span className="text-slate-500 text-xs">
                ({filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"} found)
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Main Content Layout: Left 8 Cols (Articles), Right 4 Cols (Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN: Main Articles Stream */}
          <div className="lg:col-span-8 space-y-8">
            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
                  <div className="h-64 bg-slate-200 rounded-xl w-full" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse space-y-3"
                    >
                      <div className="h-44 bg-slate-200 rounded-xl w-full" />
                      <div className="h-5 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-700 font-medium mb-3">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                >
                  Retry Loading
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredBlogs.length === 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['custom-bold']">
                  No articles found
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  We couldn't find any articles matching your search query. Try
                  searching for different keywords or explore our topics.
                </p>
                <button
                  onClick={() => {
                    setSelectedTag("All");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
                >
                  View All Articles
                </button>
              </div>
            )}

            {/* ALL ARTICLES IN UNIFORM 2-COLUMN CARD GRID */}
            {!loading && !error && filteredBlogs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => {
                  const category = getPrimaryCategory(blog);
                  return (
                    <article
                      key={blog.id || blog.url}
                      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                    >
                      <Link
                        href={`/blog-detail/${blog.url}`}
                        className="relative h-48 w-full overflow-hidden bg-slate-100 block"
                      >
                        <img
                          src={getImageUrl(blog.card_img || blog.banner_img)}
                          alt={blog.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md bg-white/95 ${getCategoryStyle(
                              category
                            )}`}
                          >
                            {category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {formatPublishedDate(blog.published)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {getReadingTime(blog.description)}
                            </span>
                          </div>

                          <Link href={`/blog-detail/${blog.url}`}>
                            <h1 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 font-['custom-bold'] leading-snug">
                              {blog.title}
                            </h1>
                          </Link>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                            {stripHtml(blog.description).slice(0, 110)}...
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">
                            By {blog.author || "Digital Nawab"}
                          </span>
                          <Link
                            href={`/blog-detail/${blog.url}`}
                            className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:text-blue-800 transition-colors"
                          >
                            Read More
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (Search, Recent Blogs, Tags, CTA, Newsletter) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            {/* 1. Search Box Widget */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 font-['custom-bold'] flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Search Articles
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, topic..."
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Recent Blogs Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-['custom-bold'] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Recent Articles
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Latest updates
                </span>
              </div>

              <div className="space-y-4">
                {recentBlogs.length === 0 && !loading && (
                  <p className="text-xs text-slate-500">No recent articles available.</p>
                )}
                {recentBlogs.map((item) => (
                  <Link
                    href={`/blog-detail/${item.url}`}
                    key={item.id || item.url}
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

            {/* 3. Latest / Popular Tags Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-['custom-bold'] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Popular Topics
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(selectedTag === t ? "All" : t)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                      selectedTag === t
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Digital Nawab Growth CTA Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-neutral-900 to-blue-950 text-white p-6 sm:p-7 shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-semibold mb-3 border border-blue-500/30">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Digital Nawab Services
              </div>
              <h3 className="text-xl font-extrabold mb-2 font-['custom-bold'] leading-snug">
                Accelerate Your Business Growth Today
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Need more high-intent organic traffic, top search rankings, or
                high-ROI PPC campaigns? Speak with our digital marketing
                strategists.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 5. Stay Updated / Newsletter Widget */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1.5 font-['custom-bold']">
                <Mail className="w-4 h-4 text-blue-600" />
                Newsletter Updates
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Get our freshest digital marketing insights and SEO strategies
                delivered directly to your inbox.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 bg-emerald-100/90 text-emerald-800 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Thanks for subscribing! Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogCards };