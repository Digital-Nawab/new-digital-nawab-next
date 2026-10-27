import React from "react";
import CityPageClient from "@/components/City/CityPageClient";

const API_BASE = "https://dashboard.digitalnawab.com/api";

async function getCityCompleteData(slug = "agra") {
  try {
    const citySlug = slug?.toLowerCase() || "agra";

    const [
      citiesRes,
      approachesRes,
      strategicRes,
      servicesRes,
      pricingRes,
      workRes,
      projectsRes,
      whyRes,
      faqsRes,
      testimonialsRes,
    ] = await Promise.allSettled([
      fetch(`${API_BASE}/cities`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/approaches?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/strategic-approaches?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/city-services-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/pricing-sections-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/how-we-works-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/city-projects-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/why-choose-us-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/city-faqs-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
      fetch(`${API_BASE}/city-testimonials-list?city_slug=${citySlug}`, { next: { revalidate: 60 } }).then((r) => r.json()),
    ]);

    const citiesData =
      citiesRes.status === "fulfilled" && citiesRes.value?.status && Array.isArray(citiesRes.value.data)
        ? citiesRes.value.data
        : [];

    const city =
      citiesData.find(
        (c) =>
          c.slug?.toLowerCase() === citySlug ||
          c.name?.toLowerCase() === citySlug
      ) || citiesData[0] || null;

    return {
      city,
      allCities: citiesData.filter((c) => c.is_active),
      approaches: approachesRes.status === "fulfilled" && approachesRes.value?.status ? approachesRes.value.data : null,
      strategic: strategicRes.status === "fulfilled" && strategicRes.value?.status ? strategicRes.value.data : null,
      services: servicesRes.status === "fulfilled" && servicesRes.value?.status ? servicesRes.value.data : null,
      pricing: pricingRes.status === "fulfilled" && pricingRes.value?.status ? pricingRes.value.data : null,
      howWeWork: workRes.status === "fulfilled" && workRes.value?.status ? workRes.value.data : null,
      projects: projectsRes.status === "fulfilled" && projectsRes.value?.status ? projectsRes.value.data : null,
      whyChooseUs: whyRes.status === "fulfilled" && whyRes.value?.status ? whyRes.value.data : null,
      faqs: faqsRes.status === "fulfilled" && faqsRes.value?.status ? faqsRes.value.data : null,
      testimonials: testimonialsRes.status === "fulfilled" && testimonialsRes.value?.status ? testimonialsRes.value.data : null,
    };
  } catch (err) {
    console.error("Failed to fetch city complete data:", err);
    return null;
  }
}

export const metadata = {
  title: "Best Digital Marketing Agency in Agra | Digital Nawab",
  description:
    "Digital Nawab is a leading digital marketing & advertising agency in Agra. We deliver expert SEO, PPC, SMM, and web solutions to grow your business.",
  alternates: {
    canonical: "https://www.digitalnawab.com/city",
  },
};

export default async function CitiesDirectoryPage() {
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
