import { NextResponse } from 'next/server';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { status: false, message: 'Unauthenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
