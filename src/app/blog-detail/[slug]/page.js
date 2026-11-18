import { redirect } from "next/navigation";

export default async function BlogDetailRedirect({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (slug) {
    redirect(`/blog/${slug}`);
  }
  redirect("/blog");
}
