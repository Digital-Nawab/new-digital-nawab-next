import React from "react";
import CityPageClient from "@/components/City/CityPageClient";
import * as cityCtrl from "@/backend/controllers/cityController";

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
      cityCtrl.getCities().then((r) => r.json()),
      cityCtrl.getApproaches(citySlug).then((r) => r.json()),
      cityCtrl.getStrategicApproaches(citySlug).then((r) => r.json()),
      cityCtrl.getCityServices(citySlug).then((r) => r.json()),
      cityCtrl.getPricingSections(citySlug).then((r) => r.json()),
      cityCtrl.getHowWeWorks(citySlug).then((r) => r.json()),
      cityCtrl.getCityProjects(citySlug).then((r) => r.json()),
      cityCtrl.getWhyChooseUs(citySlug).then((r) => r.json()),
      cityCtrl.getCityFaqs(citySlug).then((r) => r.json()),
      cityCtrl.getCityTestimonials(citySlug).then((r) => r.json()),
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
  title: "Top Digital Marketing Company in Lucknow & Major Indian Cities | Digital Nawab",
  description:
    "Explore Digital Nawab's city-level digital marketing services. From SEO to PPC, web development, and social media, find dedicated solutions tailored to your location.",
  alternates: {
    canonical: "https://www.digitalnawab.com/city",
  },
};

export default async function CityIndexPage() {
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
