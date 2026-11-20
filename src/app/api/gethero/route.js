import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const heroes = await query('SELECT * FROM home_heros ORDER BY id DESC');
    return NextResponse.json({
      data: heroes,
      msg: 'getting data successfully',
    });
  } catch (error) {
    console.error('gethero error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
