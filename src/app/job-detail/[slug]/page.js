// app/career/[slug]/page.js
import JobDetailPageClient from "./JobDetailPageClient";
import { getCareerDetail } from "@/backend/controllers/apiController";

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const res = await getCareerDetail(resolvedParams.slug);
    const response = await res.json();
    const job = response?.data;

    if (!job) {
      return {
        title: "Career Opportunities | Digital Nawab",
        description: "Explore exciting job opportunities at Digital Nawab.",
      };
    }

    return {
      title: job.title || job.desig,
      description:
        job.about_role?.slice(0, 160) ||
        `Apply now for ${job.desig} at Digital Nawab in ${job.city}.`,
      alternates: {
        canonical: `https://www.digitalnawab.com/career/${resolvedParams.slug}`,
      },
      openGraph: {
        title: job.title || job.desig,
        description:
          job.about_role?.slice(0, 160) ||
          `Apply now for ${job.desig} at Digital Nawab in ${job.city}.`,
        url: `https://www.digitalnawab.com/career/${resolvedParams.slug}`,
        type: "website",
        locale: "en_US",
        siteName: "Digital Nawab",
      },
      twitter: {
        card: "summary_large_image",
        title: job.title || job.desig,
        description:
          job.about_role?.slice(0, 160) ||
          `Apply now for ${job.desig} at Digital Nawab in ${job.city}.`,
      },
    };
  } catch (err) {
    console.error("Error fetching job metadata:", err);
    return {
      title: "Career Opportunities | Digital Nawab",
      description: "Explore exciting job opportunities at Digital Nawab.",
    };
  }
}

export default async function JobDetailWrapper({ params }) {
  const resolvedParams = await params;
  return <JobDetailPageClient slug={resolvedParams.slug} />;
}
