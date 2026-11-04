"use client";
import Image from 'next/image'

import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from "../components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React from "react";

export default function Banner({
  title = "Connected World",
  subtitle = "",
  as = "p",
  breadcrumb = [{
    label: "",
    href: "#"
  }]
}) {
  const HeadingTag = as === "h1" ? "h1" : "p";

  return (
    <div className="relative flex h-[50vh] w-full items-center justify-center bg-white dark:bg-black">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial mask fade */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <HeadingTag className="relative z-20 bg-gradient-to-b uppercase from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl custom-black text-transparent 2xl:text-7xl">
          {title}
        </HeadingTag>

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem key={index}>
                <Link
                  href={item.href}
                  className="text-black dark:text-white hover:underline font-semibold"
                >
                  {item.label}
                </Link>
                {index < breadcrumb.length - 1 && (
                  <span className="mx-1 text-neutral-400">/</span>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
