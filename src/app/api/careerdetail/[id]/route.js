import { NextResponse } from 'next/server';
import { queryOne } from '@/../backend/database/db.js';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const career = await queryOne('SELECT * FROM careers WHERE id = ?', [id]);

    return NextResponse.json({
      data: career,
      msg: career ? 'Getting data successfully' : 'Career not found',
    });
  } catch (error) {
    console.error('careerdetail error:', error);
    return NextResponse.json({ data: null, msg: error.message }, { status: 500 });
  }
}
