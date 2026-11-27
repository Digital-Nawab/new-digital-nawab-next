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

    let finalServiceId = service_id ? Number(service_id) : 4;
    let finalSubserviceId = subservice_id ? Number(subservice_id) : 3;
    if (isNaN(finalServiceId) || finalServiceId <= 0) finalServiceId = 4;
    if (isNaN(finalSubserviceId) || finalSubserviceId <= 0) finalSubserviceId = 3;

    const safeMessage = (message || '').slice(0, 250);

    const id = await insert('enquiries', {
      name: name || '',
      email: email || '',
      number: contactNumber,
      city: city || 'Lucknow',
      service_id: finalServiceId,
      subservice_id: finalSubserviceId,
      message: safeMessage,
      source: source || 'Website',
      status: 'new_lead',
      addedBy: 'User',
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
