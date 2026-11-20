import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const citySlug = searchParams.get('city_slug');

    const projects = await query('SELECT * FROM city_projects ORDER BY sort_order ASC, id ASC');
    const cities = await query('SELECT * FROM cities');
    const cityMap = new Map(cities.map((c) => [c.id, c]));

    let result = projects.map((p) => ({
      ...p,
      city: cityMap.get(p.city_id) || null,
    }));

    if (citySlug) {
      result = result.filter((item) => item.city && item.city.slug === citySlug);
    }

    return NextResponse.json({
      status: true,
      message: 'City projects fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('city-projects-list error:', error);
    return NextResponse.json({ status: false, message: error.message, data: [] }, { status: 500 });
  }
}
