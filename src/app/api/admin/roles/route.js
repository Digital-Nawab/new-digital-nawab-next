import { NextResponse } from 'next/server';
import { query, insert, deleteById } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const roles = await query('SELECT * FROM roles ORDER BY id ASC');
    const rolePermissions = await query(
      `SELECT rhp.role_id, p.id as perm_id, p.name as perm_name 
       FROM role_has_permissions rhp 
       JOIN permissions p ON rhp.permission_id = p.id`
    );

    const result = roles.map((r) => {
      const perms = rolePermissions.filter((rp) => rp.role_id === r.id).map((rp) => rp.perm_name);
      return { ...r, permissions: perms };
    });

    return NextResponse.json({ status: true, data: result });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { name, permissions } = body;

    if (!name) {
      return NextResponse.json({ status: false, message: 'Role name is required' }, { status: 400 });
    }

    const roleId = await insert('roles', {
      name: name.trim(),
      guard_name: 'web',
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (Array.isArray(permissions)) {
      for (const permName of permissions) {
        const [perm] = await query('SELECT id FROM permissions WHERE name = ?', [permName]);
        if (perm) {
          await query(
            'INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)',
            [perm.id, roleId]
          );
        }
      }
    }

    return NextResponse.json({ status: true, message: 'Role created successfully', id: roleId });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
