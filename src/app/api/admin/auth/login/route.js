import { NextResponse } from 'next/server';
import { queryOne } from '@/../backend/database/db.js';
import { comparePassword, getUserWithRolesAndPermissions, signToken } from '@/../backend/middleware/auth.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await queryOne('SELECT id, name, email, password FROM users WHERE email = ?', [email.trim()]);
    if (!user) {
      return NextResponse.json(
        { status: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { status: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const fullUser = await getUserWithRolesAndPermissions(user.id);
    const token = signToken({
      id: fullUser.id,
      email: fullUser.email,
      name: fullUser.name,
      roles: fullUser.roles,
    });

    const response = NextResponse.json({
      status: true,
      message: 'Logged in successfully',
      user: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        roles: fullUser.roles,
        permissions: fullUser.permissions,
      },
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
