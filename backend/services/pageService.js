import { query, queryOne } from '../database/db.js';

function parseJsonField(val, fallback = []) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
}

export async function getBlogByUrl(url) {
  try {
    return await queryOne('SELECT * FROM blogs WHERE url = ? LIMIT 1', [url]);
  } catch (err) {
    console.error('getBlogByUrl error:', err);
    return null;
  }
}

export async function getRecentBlogs(limit = 10) {
  try {
    return await query('SELECT * FROM blogs ORDER BY created_at DESC LIMIT ?', [limit]);
  } catch (err) {
    console.error('getRecentBlogs error:', err);
    return [];
  }
}

export async function getCareerById(id) {
  try {
    return await queryOne('SELECT * FROM careers WHERE id = ? LIMIT 1', [id]);
  } catch (err) {
    console.error('getCareerById error:', err);
    return null;
  }
}

export async function getPageTags() {
  try {
    return await query('SELECT * FROM tags');
  } catch (err) {
    console.error('getPageTags error:', err);
    return [];
  }
}

export async function getActiveCities() {
  try {
    return await query('SELECT * FROM cities WHERE is_active = 1 OR is_active IS NULL ORDER BY name ASC');
  } catch (err) {
    console.error('getActiveCities error:', err);
    return [];
  }
}

export async function getCityCompleteData(slug) {
  try {
    const citySlug = slug?.toLowerCase() || 'agra';

    const cities = await query('SELECT * FROM cities');
    const city =
      cities.find(
        (c) =>
          c.slug?.toLowerCase() === citySlug ||
          c.name?.toLowerCase() === citySlug
      ) || cities[0] || null;

    if (!city) {
      return null;
    }

    const cityId = city.id;

    const [
      approaches,
      strategic,
      services,
      pricing,
      howWeWork,
      projects,
      whyChooseUs,
      faqs,
      testimonials,
    ] = await Promise.all([
      query('SELECT * FROM approaches WHERE city_id = ?', [cityId]),
      query('SELECT * FROM strategic_approaches WHERE city_id = ?', [cityId]),
      query('SELECT * FROM city_services WHERE city_id = ?', [cityId]),
      query('SELECT * FROM pricing_sections WHERE city_id = ?', [cityId]),
      query('SELECT * FROM how_we_works WHERE city_id = ?', [cityId]),
      query('SELECT * FROM city_projects WHERE city_id = ? ORDER BY sort_order ASC, id ASC', [cityId]),
      query('SELECT * FROM why_choose_us WHERE city_id = ?', [cityId]),
      query('SELECT * FROM city_faqs WHERE city_id = ?', [cityId]),
      query('SELECT * FROM city_testimonials WHERE city_id = ? ORDER BY sort_order ASC, id ASC', [cityId]),
    ]);

    const parsedCity = {
      ...city,
      market_areas: parseJsonField(city.market_areas, []),
    };

    return {
      city: parsedCity,
      allCities: cities.filter((c) => c.is_active || c.is_active === null),
      approaches: approaches.map((a) => ({ ...a, items: parseJsonField(a.items, []), city: parsedCity })),
      strategic: strategic.map((s) => ({ ...s, items: parseJsonField(s.items, []), city: parsedCity })),
      services: services.map((s) => ({ ...s, items: parseJsonField(s.items, []), city: parsedCity })),
      pricing: pricing.map((p) => ({ ...p, packages: parseJsonField(p.packages, []), city: parsedCity })),
      howWeWork: howWeWork.map((h) => ({ ...h, steps: parseJsonField(h.steps, []), city: parsedCity })),
      projects: projects.map((p) => ({ ...p, city: parsedCity })),
      whyChooseUs: whyChooseUs.map((w) => ({ ...w, reasons: parseJsonField(w.reasons, []), city: parsedCity })),
      faqs: faqs.map((f) => ({ ...f, faqs: parseJsonField(f.faqs, []), city: parsedCity })),
      testimonials: testimonials.map((t) => ({ ...t, city: parsedCity })),
    };
  } catch (err) {
    console.error('getCityCompleteData error:', err);
    return null;
  }
}
