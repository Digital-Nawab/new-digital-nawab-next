import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const blogs = await query('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('getblog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
