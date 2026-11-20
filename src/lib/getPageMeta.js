import { query } from '../../backend/database/db.js';

/**
 * Normalizes a URL or path to a clean pathname (e.g., 'https://www.digitalnawab.com/about-us/' -> '/about-us')
 */
export function normalizePath(urlStr) {
  if (!urlStr) return '/';
  let cleaned = String(urlStr).trim();
  try {
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      const parsed = new URL(cleaned);
      cleaned = parsed.pathname || '/';
    }
  } catch (e) {
    // fallback
  }
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  if (cleaned.length > 1 && cleaned.endsWith('/')) cleaned = cleaned.slice(0, -1);
  return cleaned.toLowerCase();
}

/**
 * Fetches SEO metadata for a given path or URL from the tags table.
 * If no admin metadata is found, returns empty metadata (no hardcoded defaults).
 */
export async function getPageMeta(currentPathOrUrl) {
  try {
    let tags = [];
    try {
      tags = await query('SELECT * FROM tags ORDER BY id DESC');
    } catch (dbErr) {
      try {
        const res = await fetch('http://localhost:3000/api/gettag', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          tags = json.data || [];
        }
      } catch (fetchErr) {
        tags = [];
      }
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return {
        title: '',
        description: '',
      };
    }

    const targetNorm = normalizePath(currentPathOrUrl);

    // Look for exact match or normalized path match
    const meta = tags.find((item) => {
      if (!item || !item.page_url) return false;
      if (item.page_url === currentPathOrUrl) return true;
      return normalizePath(item.page_url) === targetNorm;
    });

    // If no admin metadata is configured, return empty
    if (!meta) {
      return {
        title: '',
        description: '',
      };
    }

    const canonicalUrl = meta.page_url?.startsWith('http')
      ? meta.page_url
      : `https://www.digitalnawab.com${normalizePath(meta.page_url)}`;

    let imageUrl = null;
    if (meta.image) {
      imageUrl = meta.image.startsWith('http')
        ? meta.image
        : `https://www.digitalnawab.com/${meta.image.replace(/^\/+/, '')}`;
    }

    const metadata = {
      title: meta.title || '',
      description: meta.description || '',
    };

    if (meta.keyword) {
      metadata.keywords = meta.keyword;
    }

    if (canonicalUrl) {
      metadata.alternates = { canonical: canonicalUrl };
    }

    if (meta.title || meta.description || imageUrl) {
      metadata.openGraph = {
        title: meta.title || '',
        description: meta.description || '',
        url: canonicalUrl || '',
        siteName: 'Digital Nawab',
        ...(imageUrl ? { images: [{ url: imageUrl, alt: meta.title || 'Digital Nawab' }] } : {}),
      };

      metadata.twitter = {
        card: 'summary_large_image',
        title: meta.title || '',
        description: meta.description || '',
        ...(imageUrl ? { images: [imageUrl] } : {}),
      };
    }

    return metadata;
  } catch (err) {
    console.error('getPageMeta error:', err);
    return {
      title: '',
      description: '',
    };
  }
}
