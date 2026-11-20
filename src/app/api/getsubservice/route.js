import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const subservices = await query(
      `SELECT s.*, svc.name as service_name 
       FROM subservices s 
       LEFT JOIN services svc ON s.service_id = svc.id 
       WHERE s.is_deleted = 0 OR s.is_deleted IS NULL 
       ORDER BY s.id ASC`
    );

    const formatted = subservices.map((sub) => ({
      id: sub.id,
      service_id: sub.service_id,
      name: sub.name,
      description: sub.description,
      image: sub.image ? `/${sub.image.replace(/^\/+/, '')}` : null,
      service_name: sub.service_name,
    }));

    return NextResponse.json({
      data: formatted,
      msg: 'Getting data successfully',
    });
  } catch (error) {
    console.error('getsubservice error:', error);
    return NextResponse.json({ data: [], msg: error.message }, { status: 500 });
  }
}
