import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

function parseJsonField(val, fallback = []) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const citySlug = searchParams.get('city_slug');

    let sql = 'SELECT * FROM pricing_sections';
    const params = [];

    const sections = await query(sql, params);
    const cities = await query('SELECT * FROM cities');
    const cityMap = new Map(cities.map((c) => [c.id, c]));

    let result = sections.map((sec) => {
      const city = cityMap.get(sec.city_id) || null;
      return {
        ...sec,
        packages: parseJsonField(sec.packages, []),
        city: city
          ? {
              ...city,
              market_areas: parseJsonField(city.market_areas, []),
            }
          : null,
      };
    });

    if (citySlug) {
      result = result.filter((item) => item.city && item.city.slug === citySlug);
    }

    return NextResponse.json({
      status: true,
      message: 'Pricing sections fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('pricing-sections-list error:', error);
    return NextResponse.json({ status: false, message: error.message, data: [] }, { status: 500 });
  }
}
