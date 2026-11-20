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

    const strategicApproaches = await query('SELECT * FROM strategic_approaches');
    const cities = await query('SELECT * FROM cities');
    const cityMap = new Map(cities.map((c) => [c.id, c]));

    let result = strategicApproaches.map((sa) => ({
      ...sa,
      items: parseJsonField(sa.items, []),
      city: cityMap.get(sa.city_id) || null,
    }));

    if (citySlug) {
      result = result.filter((item) => item.city && item.city.slug === citySlug);
    }

    return NextResponse.json({
      status: true,
      message: 'Strategic approaches fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('strategic-approaches error:', error);
    return NextResponse.json({ status: false, message: error.message, data: [] }, { status: 500 });
  }
}
