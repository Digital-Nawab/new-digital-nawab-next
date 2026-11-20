import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';
import { getAuthUser, hashPassword } from '@/../backend/middleware/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, email, password, roles } = body;

    let updateSql = 'UPDATE users SET name = ?, email = ?, updated_at = NOW()';
    const sqlParams = [name, email.trim()];

    if (password && password.trim()) {
      const hashed = await hashPassword(password);
      updateSql += ', password = ?';
      sqlParams.push(hashed);
    }
    updateSql += ' WHERE id = ?';
    sqlParams.push(id);

    await query(updateSql, sqlParams);

    if (Array.isArray(roles)) {
      await query("DELETE FROM model_has_roles WHERE model_id = ? AND model_type = 'App\\\\Models\\\\User'", [id]);
      for (const roleName of roles) {
        const [r] = await query('SELECT id FROM roles WHERE name = ?', [roleName]);
        if (r) {
          await query("INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES (?, 'App\\\\Models\\\\User', ?)", [
            r.id,
            id,
          ]);
        }
      }
    }

    return NextResponse.json({ status: true, message: 'User updated successfully' });
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
    if (String(id) === String(user.id)) {
      return NextResponse.json({ status: false, message: 'Cannot delete own account' }, { status: 400 });
    }

    await query('DELETE FROM model_has_roles WHERE model_id = ?', [id]);
    await query('DELETE FROM users WHERE id = ?', [id]);

    return NextResponse.json({ status: true, message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
