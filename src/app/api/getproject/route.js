import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const creatives = await query("SELECT * FROM projects WHERE type = 'creatives' ORDER BY id DESC");
    const reels = await query("SELECT * FROM projects WHERE type = 'reel' ORDER BY id DESC");
    const websites = await query("SELECT * FROM projects WHERE type = 'website' ORDER BY id DESC");

    return NextResponse.json({
      message: 'Getting data successfully',
      creatives,
      reels,
      websites,
    });
  } catch (error) {
    console.error('getproject error:', error);
    return NextResponse.json(
      { message: error.message, creatives: [], reels: [], websites: [] },
      { status: 500 }
    );
  }
}
