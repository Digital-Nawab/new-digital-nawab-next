import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const technologies = await query('SELECT * FROM technology ORDER BY id ASC');
    return NextResponse.json({
      data: technologies,
      msg: 'Getting data successfully',
    });
  } catch (error) {
    console.error('gettechnlogies error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
