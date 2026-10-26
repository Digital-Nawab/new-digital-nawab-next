import React from "react";
import CityPageClient from "@/components/City/CityPageClient";

// Fetch city data dynamically from API
async function getCityData(slug) {
  try {
    const res = await fetch("https://dashboard.digitalnawab.com/api/cities", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status && Array.isArray(json.data)) {
      const city = json.data.find(
        (c) =>
          c.slug?.toLowerCase() === slug?.toLowerCase() ||
          c.name?.toLowerCase() === slug?.toLowerCase()
      );
      return { city, allCities: json.data.filter((c) => c.is_active) };
    }
  } catch (err) {
    console.error("Failed to fetch city data:", err);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getCityData(slug);
  const city = data?.city;

  if (!city) {
    return {
      title: "City Services | Digital Nawab",
      description: "Leading digital marketing solutions across top Indian cities.",
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
    alternates: {
      canonical: `https://www.digitalnawab.com/city/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }) {
  const { slug } = params;
  const data = await getCityData(slug);

  return (
    <CityPageClient
      city={data?.city || null}
      allCities={data?.allCities || []}
      slug={slug}
    />
  );
}
