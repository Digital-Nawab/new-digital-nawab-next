import { NextResponse } from 'next/server';
import { insert } from '@/../backend/database/db.js';

export async function POST(req) {
  try {
    let body;
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    }

    const { name, email, number, phone, city, service_id, subservice_id, message, source } = body;

    const contactNumber = number || phone || '';

    const id = await insert('enquiries', {
      name: name || '',
      email: email || '',
      number: contactNumber,
      city: city || '',
      service_id: service_id ? Number(service_id) : null,
      subservice_id: subservice_id ? Number(subservice_id) : null,
      message: message || '',
      source: source || 'Website Enquiry',
      status: 'new',
      isDeleted: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({
      status: true,
      message: 'Enquiry submitted successfully',
      id,
    });
  } catch (error) {
    console.error('post_enquiry error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
