"use client";

import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";

// Clean HTML tags and entities to create clean plain text excerpt
const getExcerpt = (blog, maxLen = 130) => {
  if (!blog) return "";
  let text = blog.description || "";
  // Strip h1/h2 tags so heading is not repeated in excerpt
  text = text.replace(/<h[1-2][^>]*>[\s\S]*?<\/h[1-2]>/gi, " ");
  // Strip all HTML tags
  text = text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (!text && blog.meta_desc) {
    text = blog.meta_desc.trim();
  }

  if (text.length > maxLen) {
    return text.substring(0, maxLen).trim() + "...";
  }
  return text;
};

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/api/getblog",
        headers: {},
      };

      try {
        const response = await axios.request(config);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch blog data. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log("blogs Cards Data:", blogs);

  // Extract primary tag/category cleanly from keyword
  const getBlogTag = (blog) => {
    if (!blog?.keyword) return "Digital Marketing";
    let list = [];
    if (Array.isArray(blog.keyword)) {
      list = blog.keyword;
    } else if (typeof blog.keyword === "string") {
      try {
        const parsed = JSON.parse(blog.keyword);
        if (Array.isArray(parsed)) list = parsed;
        else list = [parsed];
      } catch {
        list = blog.keyword.split(",");
      }
    }
    const clean = list
      .map((k) => (typeof k === "string" ? k.replace(/[\[\]"']/g, "").trim() : ""))
      .filter(Boolean);
    return clean.length > 0 ? clean[0] : "Digital Marketing";
  };

  // Define category colors based on tag keywords
  const getCategoryColor = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("tech") || cat.includes("web") || cat.includes("dev")) {
      return "bg-blue-100 text-blue-800";
    }
    if (cat.includes("design") || cat.includes("creative") || cat.includes("brand")) {
      return "bg-purple-100 text-purple-800";
    }
    if (cat.includes("seo") || cat.includes("growth") || cat.includes("traffic") || cat.includes("online")) {
      return "bg-emerald-100 text-emerald-800";
    }
    if (cat.includes("ai")) {
      return "bg-indigo-100 text-indigo-800";
    }
    if (cat.includes("market") || cat.includes("ad") || cat.includes("social")) {
      return "bg-amber-100 text-amber-800";
    }
    return "bg-blue-50 text-blue-700";
  };

  const getBlogCardImg = (card_img) => {
    if (!card_img) return "/assets/logo.png";
    if (card_img.startsWith("http://") || card_img.startsWith("https://")) {
      return card_img;
    }
    return `/${card_img.replace(/^\/+/, "")}`;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6">
            Blog
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read our latest insights, tutorials, and industry news to stay updated.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const tag = getBlogTag(blog);
            return (
              <Link
                href={`/blog/${blog.url}`}
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={getBlogCardImg(blog.card_img)}
                  alt={blog.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 object-cover rounded-t-2xl"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.triedRemote && blog.card_img) {
                      e.currentTarget.dataset.triedRemote = "true";
                      const clean = blog.card_img.replace(/^\/+/, "");
                      e.currentTarget.src = `https://dashboard.digitalnawab.com/${clean}`;
                    } else {
                      e.currentTarget.src = "/assets/logo.png";
                    }
                  }}
                />
                <div className="p-6">
                  {/* Category */}
                  <div
                    className={`inline-block ${getCategoryColor(
                      tag
                    )} px-3 py-1 rounded-full text-sm font-medium mb-4 max-w-full truncate`}
                  >
                    {tag}
                  </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {blog.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{new Date(blog.published).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {getExcerpt(blog, 130)}
                </p>

                <button className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { BlogCards };