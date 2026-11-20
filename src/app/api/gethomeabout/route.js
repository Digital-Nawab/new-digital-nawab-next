import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const homeAbouts = await query('SELECT * FROM home_abouts ORDER BY id DESC');
    return NextResponse.json({
      data: homeAbouts,
      msg: 'Getting data successfully',
    });
  } catch (error) {
    console.error('gethomeabout error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
