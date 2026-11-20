import { NextResponse } from 'next/server';
import { query, insert } from '@/../backend/database/db.js';
import { getAuthUser, hashPassword } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const users = await query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
    const roles = await query(
      `SELECT mhr.model_id as user_id, r.id as role_id, r.name as role_name 
       FROM model_has_roles mhr 
       JOIN roles r ON mhr.role_id = r.id`
    );

    const result = users.map((u) => {
      const uRoles = roles.filter((r) => r.user_id === u.id).map((r) => r.role_name);
      return { ...u, roles: uRoles };
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
    const { name, email, password, roles } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ status: false, message: 'Name, email and password are required' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const userId = await insert('users', {
      name,
      email: email.trim(),
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Assign roles if provided
    if (Array.isArray(roles) && roles.length > 0) {
      for (const roleName of roles) {
        const [role] = await query('SELECT id FROM roles WHERE name = ?', [roleName]);
        if (role) {
          await insert('model_has_roles', {
            role_id: role.id,
            model_type: 'App\\Models\\User',
            model_id: userId,
          });
        }
      }
    }

    return NextResponse.json({ status: true, message: 'User created successfully', id: userId });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
