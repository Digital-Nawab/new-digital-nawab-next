import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const team = await query('SELECT * FROM our_team ORDER BY id DESC');
    return NextResponse.json({
      data: team,
      msg: 'getting data successfully',
    });
  } catch (error) {
    console.error('getourteam error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
