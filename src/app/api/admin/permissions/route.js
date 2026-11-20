import { NextResponse } from 'next/server';
import { query, insert } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user || (!user.roles.includes('admin') && !user.roles.includes('Super Admin'))) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const perms = await query('SELECT * FROM permissions ORDER BY name ASC');
    return NextResponse.json({ status: true, data: perms });
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
    if (!body.name) {
      return NextResponse.json({ status: false, message: 'Permission name is required' }, { status: 400 });
    }

    const id = await insert('permissions', {
      name: body.name.trim(),
      guard_name: 'web',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ status: true, message: 'Permission created', id });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
