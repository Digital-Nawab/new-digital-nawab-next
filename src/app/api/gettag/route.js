import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const tags = await query('SELECT * FROM tags ORDER BY id DESC');
    return NextResponse.json({
      data: tags,
      msg: 'getting data successfully',
    });
  } catch (error) {
    console.error('gettag error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
