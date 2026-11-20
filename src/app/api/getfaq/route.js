import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const faqs = await query('SELECT * FROM faqs ORDER BY id ASC');
    return NextResponse.json({
      data: faqs,
      msg: 'getting data successfully',
    });
  } catch (error) {
    console.error('getfaq error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
