import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const careers = await query('SELECT * FROM careers ORDER BY id DESC');
    return NextResponse.json({
      data: careers,
      msg: 'Data get successfully',
    });
  } catch (error) {
    console.error('getcareer error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
