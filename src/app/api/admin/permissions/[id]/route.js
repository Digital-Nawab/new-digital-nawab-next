import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name } = body;

    await query('UPDATE permissions SET name = ?, updated_at = NOW() WHERE id = ?', [name.trim(), id]);

    return NextResponse.json({ status: true, message: 'Permission updated successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    await query('DELETE FROM role_has_permissions WHERE permission_id = ?', [id]);
    await query('DELETE FROM permissions WHERE id = ?', [id]);

    return NextResponse.json({ status: true, message: 'Permission deleted successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
