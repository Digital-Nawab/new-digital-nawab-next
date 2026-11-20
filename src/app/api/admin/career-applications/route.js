import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });

    const applications = await query(
      `SELECT cf.*, c.title as job_title, c.desig 
       FROM careerform cf 
       LEFT JOIN careers c ON cf.career_id = c.id 
       ORDER BY cf.created_at DESC`
    );

    return NextResponse.json({ status: true, data: applications });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
