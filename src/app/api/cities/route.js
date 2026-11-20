import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const cities = await query('SELECT * FROM cities WHERE is_active = 1 OR is_active IS NULL ORDER BY name ASC');
    return NextResponse.json({
      status: true,
      message: 'Cities fetched successfully',
      data: cities,
    });
  } catch (error) {
    console.error('cities error:', error);
    return NextResponse.json({ status: false, message: error.message, data: [] }, { status: 500 });
  }
}
