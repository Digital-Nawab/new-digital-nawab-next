"use client";
import Image from 'next/image'

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { BlogCards } from "./BlogCards";
import Banner from "../../components/Banner";

const BlogPage = () => {
  return (
    <>
      <Banner
        as="h1"
        title="Our Blogs"
        subtitle="We'd love to hear from you!"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blog" },
        ]}
      />
      <BlogCards />
    </>
  );
};

export { BlogPage };
