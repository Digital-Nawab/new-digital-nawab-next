import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const data = await query('SELECT * FROM seo_forms ORDER BY id DESC');
    return NextResponse.json({ message: 'Getting data successfully.', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, data: [] }, { status: 500 });
  }
}
