export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import CityPageClient from "@/components/City/CityPageClient";
import { getCityCompleteData } from "@/../backend/services/pageService.js";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata() {
  const adminMeta = await getPageMeta('/city');
  if (adminMeta && (adminMeta.title || adminMeta.description)) {
    return adminMeta;
  }

  const data = await getCityCompleteData("agra");
  const city = data?.city;

  if (!city) {
    return {
      title: "",
      description: "",
    };
  }

  return {
    title:
      city.meta_title ||
      `Best Digital Marketing Company in ${city.name} | SEO, PPC & Web Solutions`,
    description:
      city.meta_description ||
      city.description ||
      `Digital Nawab delivers results-driven digital marketing in ${city.name}. Boost your online visibility with expert SEO, PPC, and web development.`,
  };
}

export default async function CityDefaultPage() {
  const data = await getCityCompleteData("agra");

  return (
    <CityPageClient
      city={data?.city || null}
      allCities={data?.allCities || []}
      slug="agra"
      approaches={data?.approaches}
      strategic={data?.strategic}
      services={data?.services}
      pricing={data?.pricing}
      howWeWork={data?.howWeWork}
      projects={data?.projects}
      whyChooseUs={data?.whyChooseUs}
      faqs={data?.faqs}
      testimonials={data?.testimonials}
    />
  );
}
