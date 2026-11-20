import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const contactDetails = await query('SELECT * FROM contact_details ORDER BY id DESC');
    return NextResponse.json({
      data: contactDetails,
      msg: 'Getting data successfully',
    });
  } catch (error) {
    console.error('getcontactdetail error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
