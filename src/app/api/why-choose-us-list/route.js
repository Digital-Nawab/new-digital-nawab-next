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

    const list = await query('SELECT * FROM why_choose_us');
    const cities = await query('SELECT * FROM cities');
    const cityMap = new Map(cities.map((c) => [c.id, c]));

    let result = list.map((w) => ({
      ...w,
      reasons: parseJsonField(w.reasons, []),
      city: cityMap.get(w.city_id) || null,
    }));

    if (citySlug) {
      result = result.filter((item) => item.city && item.city.slug === citySlug);
    }

    return NextResponse.json({
      status: true,
      message: 'Why choose us fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('why-choose-us-list error:', error);
    return NextResponse.json({ status: false, message: error.message, data: [] }, { status: 500 });
  }
}
