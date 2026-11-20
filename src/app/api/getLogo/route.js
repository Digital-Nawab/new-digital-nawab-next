import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const graphic_logo = await query('SELECT * FROM graphic_logo ORDER BY created_at DESC');
    return NextResponse.json({
      msg: 'Get data successfully',
      data: graphic_logo,
    });
  } catch (error) {
    console.error('getLogo error:', error);
    return NextResponse.json({ msg: error.message, data: [] }, { status: 500 });
  }
}
