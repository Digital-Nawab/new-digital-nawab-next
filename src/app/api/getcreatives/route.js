import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const creatives = await query('SELECT * FROM creatives ORDER BY id DESC');
    return NextResponse.json({
      data: creatives,
      msg: 'getting data successfully',
    });
  } catch (error) {
    console.error('getcreatives error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
