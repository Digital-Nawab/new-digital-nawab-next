"use client";

import React from "react";
import Link from "next/link";
import { BlogCards } from "./BlogCards";

const BlogPage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-black pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-gray-100 dark:border-neutral-800">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium mb-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-pink-600 dark:text-pink-400 font-semibold">
              Blogs
            </span>
          </div>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-gray-800 dark:text-white mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>Digital Nawab Knowledge Hub</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-gray-900 dark:text-white tracking-tight leading-[1.2] mb-6 max-w-4xl mx-auto">
            Digital Marketing Insights,{" "}
            <span className="bg-gradient-to-r from-[#C73673] via-[#8F5AFF] to-[#FF6FD8] bg-clip-text text-transparent">
              SEO Guides &amp; AI Search Strategies
            </span>
          </h1>

          {/* Introductory Content */}
          <div className="max-w-3xl mx-auto text-center pb-2">
            <p className="text-white text-base sm:text-lg leading-relaxed font-normal">
              Digital marketing is constantly evolving, and staying informed can help businesses make smarter decisions online. Explore the Digital Nawab blog for practical insights, expert guidance and actionable strategies covering Search Engine Optimization (SEO), Google Ads, social media marketing, website design and development, content marketing, local SEO and AI-powered search.
            </p>
          </div>
        </div>
      </section>

      <BlogCards />
    </>
  );
};

export { BlogPage };
