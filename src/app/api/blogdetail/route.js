import { NextResponse } from 'next/server';
import { queryOne } from '@/../backend/database/db.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { data: null, msg: 'URL parameter is required' },
        { status: 400 }
      );
    }

    const blog = await queryOne('SELECT * FROM blogs WHERE url = ? LIMIT 1', [url]);

    return NextResponse.json({
      data: blog,
      msg: blog ? 'Getting data successfully' : 'Blog not found',
    });
  } catch (error) {
    console.error('blogdetail error:', error);
    return NextResponse.json({ data: null, msg: error.message }, { status: 500 });
  }
}
