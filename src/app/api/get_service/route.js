import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET() {
  try {
    const services = await query('SELECT * FROM services WHERE is_deleted = 0 OR is_deleted IS NULL ORDER BY id ASC');
    const subservices = await query('SELECT * FROM subservices WHERE is_deleted = 0 OR is_deleted IS NULL ORDER BY id ASC');

    const result = services.map((svc) => {
      const relatedSubs = subservices.filter((sub) => sub.service_id === svc.id);
      return {
        id: svc.id,
        name: svc.name,
        description: svc.description,
        image: svc.image ? `/${svc.image.replace(/^\/+/, '')}` : null,
        subservices: relatedSubs.map((sub) => ({
          id: sub.id,
          name: sub.name,
          description: sub.description,
          image: sub.image ? `/${sub.image.replace(/^\/+/, '')}` : null,
        })),
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('get_service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
