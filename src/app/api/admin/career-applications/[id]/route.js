import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    await query('UPDATE careerform SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);

    return NextResponse.json({ status: true, message: 'Application updated successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });

    const { id } = await params;
    await query('DELETE FROM careerform WHERE id = ?', [id]);

    return NextResponse.json({ status: true, message: 'Application deleted successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
