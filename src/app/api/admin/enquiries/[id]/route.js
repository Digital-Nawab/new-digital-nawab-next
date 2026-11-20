import { NextResponse } from 'next/server';
import { queryOne, update } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updateData = { updated_at: new Date() };
    if (body.status !== undefined) updateData.status = body.status;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.number !== undefined) updateData.number = body.number;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.message !== undefined) updateData.message = body.message;

    await update('enquiries', updateData, 'id = ?', [id]);
    const updated = await queryOne('SELECT * FROM enquiries WHERE id = ?', [id]);

    return NextResponse.json({ status: true, message: 'Enquiry updated successfully', data: updated });
  } catch (error) {
    console.error('admin enquiry PUT error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const { id } = await params;
    // Soft delete
    await update('enquiries', { isDeleted: 1, updated_at: new Date() }, 'id = ?', [id]);

    return NextResponse.json({ status: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('admin enquiry DELETE error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
