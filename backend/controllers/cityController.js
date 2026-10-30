import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, formatRow, formatRows } from '../utils/api-helpers.js';

async function fetchWithCity(tableName, citySlug = null, orderBy = 'id ASC') {
  const cities = await query('SELECT * FROM cities');
  const cityMap = new Map();
  cities.forEach((c) => cityMap.set(c.id, formatRow(c)));

  let rows = await query(`SELECT * FROM ${tableName} ORDER BY ${orderBy}`);
  rows = formatRows(rows).map((row) => ({
    ...row,
    city: cityMap.get(row.city_id) || null,
  }));

  if (citySlug) {
    const slugLower = citySlug.toLowerCase();
    const filtered = rows.filter(
      (r) =>
        r.city &&
        (r.city.slug?.toLowerCase() === slugLower || r.city.name?.toLowerCase() === slugLower)
    );
    if (filtered.length > 0) {
      return filtered;
    }
  }

  return rows;
}

export async function getCities() {
  const cities = await query('SELECT * FROM cities ORDER BY id ASC');
  return jsonResponse({
    status: true,
    message: 'Cities fetched successfully',
    data: formatRows(cities),
  });
}

export async function getApproaches(citySlug = null) {
  const approaches = await fetchWithCity('approaches', citySlug);
  return jsonResponse({
    status: true,
    message: 'Approaches fetched successfully',
    data: approaches,
  });
}

export async function getStrategicApproaches(citySlug = null) {
  const strategic = await fetchWithCity('strategic_approaches', citySlug);
  return jsonResponse({
    status: true,
    message: 'Strategic approaches fetched successfully',
    data: strategic,
  });
}

export async function getCityServices(citySlug = null) {
  const services = await fetchWithCity('city_services', citySlug);
  return jsonResponse({
    status: true,
    message: 'City services fetched successfully',
    data: services,
  });
}

export async function getPricingSections(citySlug = null) {
  const pricing = await fetchWithCity('pricing_sections', citySlug);
  return jsonResponse({
    status: true,
    message: 'Pricing sections fetched successfully',
    data: pricing,
  });
}

export async function getHowWeWorks(citySlug = null) {
  const works = await fetchWithCity('how_we_works', citySlug);
  return jsonResponse({
    status: true,
    message: 'How We Work sections fetched successfully',
    data: works,
  });
}

export async function getCityProjects(citySlug = null) {
  const projects = await fetchWithCity('city_projects', citySlug, 'city_id ASC, sort_order ASC');
  return jsonResponse({
    status: true,
    message: 'Projects fetched successfully',
    data: projects,
  });
}

export async function getWhyChooseUs(citySlug = null) {
  const why = await fetchWithCity('why_choose_us', citySlug);
  return jsonResponse({
    status: true,
    message: 'Why Choose Us sections fetched successfully',
    data: why,
  });
}

export async function getCityFaqs(citySlug = null) {
  const faqs = await fetchWithCity('city_faqs', citySlug);
  return jsonResponse({
    status: true,
    message: 'City FAQs fetched successfully',
    data: faqs,
  });
}

export async function getCityTestimonials(citySlug = null) {
  const testimonials = await fetchWithCity('city_testimonials', citySlug, 'city_id ASC, sort_order ASC');
  return jsonResponse({
    status: true,
    message: 'Testimonials fetched successfully',
    data: testimonials,
  });
}

export async function createCity(body) {
  const name = body.name || 'City';
  const slug = body.slug || name.toLowerCase().replace(/\s+/g, '-');
  const result = await execute(
    `INSERT INTO cities (
      name, slug, badge_text, heading_prefix, heading_suffix, description,
      phone_number, whatsapp_number, meta_title, meta_description, is_active,
      stat_years_value, stat_campaigns_value, stat_clients_value, stat_retention_value,
      stat_support_value, stat_reporting_value, market_description, market_areas,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      name,
      slug,
      body.badge_text || null,
      body.heading_prefix || 'Grow Your',
      body.heading_suffix || 'Business with',
      body.description || '',
      body.phone_number || null,
      body.whatsapp_number || null,
      body.meta_title || null,
      body.meta_description || null,
      body.is_active !== undefined ? (body.is_active ? 1 : 0) : 1,
      body.stat_years_value || null,
      body.stat_campaigns_value || null,
      body.stat_clients_value || null,
      body.stat_retention_value || null,
      body.stat_support_value || null,
      body.stat_reporting_value || null,
      body.market_description || null,
      JSON.stringify(body.market_areas || []),
    ]
  );
  return jsonResponse({
    status: true,
    message: 'City created successfully',
    id: result.insertId,
  }, 201);
}

export async function updateCity(id, body) {
  const fields = [];
  const values = [];

  const updateable = [
    'name',
    'slug',
    'badge_text',
    'heading_prefix',
    'heading_suffix',
    'description',
    'phone_number',
    'whatsapp_number',
    'meta_title',
    'meta_description',
    'is_active',
    'stat_years_value',
    'stat_campaigns_value',
    'stat_clients_value',
    'stat_retention_value',
    'stat_support_value',
    'stat_reporting_value',
    'market_description',
    'market_areas',
  ];

  for (const key of updateable) {
    if (body[key] !== undefined) {
      fields.push(`${key} = ?`);
      if (key === 'market_areas' && (Array.isArray(body[key]) || (typeof body[key] === 'object' && body[key] !== null))) {
        values.push(JSON.stringify(body[key]));
      } else if (key === 'is_active') {
        values.push(body[key] ? 1 : 0);
      } else {
        values.push(body[key]);
      }
    }
  }

  if (fields.length === 0) {
    return jsonResponse({ status: true, message: 'No fields to update' });
  }

  fields.push('updated_at = NOW()');
  values.push(id);

  await execute(`UPDATE cities SET ${fields.join(', ')} WHERE id = ?`, values);
  return jsonResponse({ status: true, message: 'City updated successfully' });
}

export async function deleteCity(id) {
  await execute('DELETE FROM cities WHERE id = ?', [id]);
  return jsonResponse({ status: true, message: 'City deleted successfully' });
}
