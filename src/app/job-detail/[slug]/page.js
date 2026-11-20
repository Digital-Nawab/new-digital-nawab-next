import JobDetailPageClient from "./JobDetailPageClient";
import { getCareerById } from "@/../backend/services/pageService.js";
import { getPageMeta } from '@/lib/getPageMeta';

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    const adminMeta = await getPageMeta(`/job-detail/${slug}`);
    if (adminMeta && (adminMeta.title || adminMeta.description)) {
      return adminMeta;
    }

    const job = await getCareerById(slug);

    if (!job) {
      return {
        title: "",
        description: "",
      };
    }

    return {
      title: job.title || job.desig,
      description:
        job.about_role?.slice(0, 160) ||
        `Apply now for ${job.desig} at Digital Nawab in ${job.city}.`,
      alternates: {
        canonical: `https://www.digitalnawab.com/career/${slug}`,
      },
      openGraph: {
        title: job.title || job.desig,
        description:
          job.about_role?.slice(0, 160) ||
          `Apply now for ${job.desig} at Digital Nawab in ${job.city}.`,
        url: `https://www.digitalnawab.com/career/${slug}`,
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

export default async function JobDetailPage({ params }) {
  const resolvedParams = await params;
  return <JobDetailPageClient params={resolvedParams} />;
}
