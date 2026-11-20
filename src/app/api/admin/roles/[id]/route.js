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
    const { name, permissions } = body;

    await query('UPDATE roles SET name = ?, updated_at = NOW() WHERE id = ?', [name.trim(), id]);

    if (Array.isArray(permissions)) {
      await query('DELETE FROM role_has_permissions WHERE role_id = ?', [id]);
      for (const permName of permissions) {
        const [p] = await query('SELECT id FROM permissions WHERE name = ?', [permName]);
        if (p) {
          await query('INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)', [p.id, id]);
        }
      }
    }

    return NextResponse.json({ status: true, message: 'Role updated successfully' });
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
    await query('DELETE FROM role_has_permissions WHERE role_id = ?', [id]);
    await query('DELETE FROM model_has_roles WHERE role_id = ?', [id]);
    await query('DELETE FROM roles WHERE id = ?', [id]);

    return NextResponse.json({ status: true, message: 'Role deleted successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
