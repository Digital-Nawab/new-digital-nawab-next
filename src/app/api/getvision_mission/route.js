import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const visions = await query('SELECT * FROM vision_mission ORDER BY id DESC');
    return NextResponse.json({
      data: visions,
      msg: 'Getting data successfully',
    });
  } catch (error) {
    console.error('getvision_mission error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
