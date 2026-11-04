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
        url: "https://dashboard.digitalnawab.com/api/getblog",
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

  // Define category colors (you can customize these based on your needs)
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "technology":
        return "bg-blue-100 text-blue-800";
      case "design":
        return "bg-purple-100 text-purple-800";
      case "marketing":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          {blogs.map((blog) => (
            <Link
              href={`/blog-detail/${blog.url}`}
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`https://dashboard.digitalnawab.com/${blog.card_img}`}
                alt={blog.title}
                loading="lazy"
                decoding="async"
                className="w-full h-56 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg"; // Fallback image if the API image fails
                }}
              />
              <div className="p-6">
                {/* Category */}
                <div
                  className={`inline-block ${getCategoryColor(
                    blog.keyword?.[2] || "Technology" // Assuming keyword[2] is the category, e.g., "Web Development"
                  )} px-3 py-1 rounded-full text-sm font-medium mb-4`}
                >
                  {blog.keyword?.[2] || "Technology"} {/* Fallback to "Technology" if no category */}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export { BlogCards };