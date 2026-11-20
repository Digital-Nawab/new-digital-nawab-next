import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const data = await query('SELECT * FROM dev_innovations ORDER BY id ASC');
    return NextResponse.json({ message: 'Getting data sucessfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, data: [] }, { status: 500 });
  }
}
