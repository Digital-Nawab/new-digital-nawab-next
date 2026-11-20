import { NextResponse } from 'next/server';
import { query, insert } from '@/../backend/database/db.js';
import { getAuthUser } from '@/../backend/middleware/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const enquiries = await query(
      `SELECT e.*, s.name as service_name, sub.name as subservice_name 
       FROM enquiries e 
       LEFT JOIN services s ON e.service_id = s.id 
       LEFT JOIN subservices sub ON e.subservice_id = sub.id 
       WHERE e.isDeleted = 0 OR e.isDeleted IS NULL 
       ORDER BY e.created_at DESC`
    );

    return NextResponse.json({ status: true, data: enquiries });
  } catch (error) {
    console.error('admin enquiries error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const body = await req.json();
    const id = await insert('enquiries', {
      name: body.name || '',
      email: body.email || '',
      number: body.number || '',
      city: body.city || '',
      service_id: body.service_id ? Number(body.service_id) : null,
      subservice_id: body.subservice_id ? Number(body.subservice_id) : null,
      message: body.message || '',
      source: body.source || 'Admin Panel',
      status: body.status || 'new',
      addedBy: user.id,
      isDeleted: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ status: true, message: 'Enquiry added successfully', id });
  } catch (error) {
    console.error('admin enquiry POST error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
