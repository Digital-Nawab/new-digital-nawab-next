import { query } from '@/../backend/database/db.js';

export const revalidate = 3600; // Auto-revalidate sitemap cache every hour

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitalnawab.com').replace(/\/+$/, '');

  // 1. Core Internal Pages (Canonical Only - No duplicate root services)
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/packages', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/career', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact-us', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/technology', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/term-condition', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/refund-cancellation', priority: 0.5, changeFrequency: 'yearly' },
    // Core Services (Canonical paths matching navbar & footer)
    { path: '/service/direct-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/ecommerce-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/graphic-designing-services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/mobile-application-development', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/pay-per-click-services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/seo-company-in-lucknow', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/service/social-media-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service/website-design-and-development', priority: 0.8, changeFrequency: 'monthly' },
  ].map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Dynamic Blog Detail Pages (/blog/[url])
  let blogRoutes = [];
  try {
    const blogs = await query('SELECT url, updated_at, created_at FROM blogs WHERE url IS NOT NULL AND TRIM(url) != ""');
    if (Array.isArray(blogs)) {
      blogRoutes = blogs
        .filter((b) => b && b.url && b.url.trim())
        .map((b) => ({
          url: `${baseUrl}/blog/${b.url.trim().replace(/^\/+/, '')}`,
          lastModified: b.updated_at || b.created_at || new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Sitemap dynamic blog query error:', error);
  }

  // 3. Dynamic City Landing Pages (/city/[slug])
  let cityRoutes = [];
  try {
    const cities = await query('SELECT slug, updated_at, created_at FROM cities WHERE is_active = 1 AND slug IS NOT NULL AND TRIM(slug) != ""');
    if (Array.isArray(cities)) {
      cityRoutes = cities
        .filter((c) => c && c.slug && c.slug.trim())
        .map((c) => ({
          url: `${baseUrl}/city/${c.slug.trim().replace(/^\/+/, '')}`,
          lastModified: c.updated_at || c.created_at || new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error('Sitemap dynamic city query error:', error);
  }

  // 4. Dynamic Career/Job Detail Pages (/job-detail/[id])
  let careerRoutes = [];
  try {
    const careers = await query('SELECT id, updated_at, created_at FROM careers WHERE id IS NOT NULL');
    if (Array.isArray(careers)) {
      careerRoutes = careers
        .filter((job) => job && job.id)
        .map((job) => ({
          url: `${baseUrl}/job-detail/${job.id}`,
          lastModified: job.updated_at || job.created_at || new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
    }
  } catch (error) {
    console.error('Sitemap dynamic career query error:', error);
  }

  // 5. Strict Deduplication Filter (Ensures no URL can EVER repeat)
  const allRoutes = [...staticRoutes, ...blogRoutes, ...cityRoutes, ...careerRoutes];
  const seenUrls = new Set();
  const uniqueRoutes = [];

  for (const route of allRoutes) {
    if (!route || !route.url) continue;
    const normalizedUrl = route.url.trim().toLowerCase().replace(/\/+$/, '');
    if (!seenUrls.has(normalizedUrl)) {
      seenUrls.add(normalizedUrl);
      uniqueRoutes.push(route);
    }
  }

  return uniqueRoutes;
}
