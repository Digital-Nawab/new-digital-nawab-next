import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, formatRow, formatRows } from '../utils/api-helpers.js';

export async function getEnquiries() {
  const enquiries = await query(
    'SELECT * FROM enquiries WHERE isDeleted = 0 OR isDeleted IS NULL ORDER BY created_at DESC'
  );
  const services = await query('SELECT * FROM services');
  const subservices = await query('SELECT * FROM subservices');

  const serviceMap = new Map(services.map((s) => [s.id, s]));
  const subserviceMap = new Map(subservices.map((s) => [s.id, s]));

  const data = enquiries.map((enq) => {
    const s = serviceMap.get(enq.service_id);
    const sub = subserviceMap.get(enq.subservice_id);
    return {
      _id: String(enq.id),
      id: enq.id,
      name: enq.name || 'N/A',
      phone: enq.number || 'N/A',
      email: enq.email || 'N/A',
      city: enq.city || 'N/A',
      addedFor: s ? `Course: ${s.name}` : 'N/A',
      enquiryFor: {
        title: sub ? sub.name : 'N/A',
      },
      createdAt: enq.created_at ? new Date(enq.created_at).toISOString() : new Date().toISOString(),
      leadStatus: enq.status || 'new_lead',
      status: enq.status || 'new_lead',
      addedBy: enq.addedBy || 'User',
      source: enq.source || 'Website',
      message: enq.message || '',
    };
  });

  return jsonResponse({
    status: true,
    data,
  });
}

export async function postEnquiry(body) {
  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const number = (body.number || body.phone || '').trim();
  const city = (body.city || 'N/A').trim();
  const message = body.message ? String(body.message).trim() : null;

  if (!name || !email || !number) {
    return errorResponse('Validation Error', 422, {
      name: !name ? ['The name field is required.'] : [],
      email: !email ? ['The email field is required.'] : [],
      number: !number ? ['The number field is required.'] : [],
    });
  }

  // Ensure valid service_id and subservice_id
  let serviceId = body.service_id ? Number(body.service_id) : null;
  let subserviceId = body.subservice_id ? Number(body.subservice_id) : null;

  if (!serviceId) {
    const defaultServices = await query('SELECT id FROM services LIMIT 1');
    serviceId = defaultServices.length ? defaultServices[0].id : 1;
  }
  if (!subserviceId) {
    const defaultSub = await query(
      'SELECT id FROM subservices WHERE service_id = ? LIMIT 1',
      [serviceId]
    );
    subserviceId = defaultSub.length
      ? defaultSub[0].id
      : (await query('SELECT id FROM subservices LIMIT 1'))[0]?.id || 1;
  }

  const result = await execute(
    `INSERT INTO enquiries (
      name, email, number, city, service_id, subservice_id, message,
      isDeleted, status, created_at, updated_at, addedBy, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'new_lead', NOW(), NOW(), ?, ?)`,
    [
      name,
      email,
      number,
      city,
      serviceId,
      subserviceId,
      message,
      body.addedBy || 'User',
      body.source || 'Website',
    ]
  );

  return jsonResponse(
    {
      status: true,
      message: 'Enquiry created successfully! We will contact the customer soon.',
      data: {
        id: result.insertId,
        name,
        email,
        number,
        city,
        service_id: serviceId,
        subservice_id: subserviceId,
        message,
        status: 'new_lead',
        isDeleted: false,
      },
    },
    201
  );
}

export async function updateEnquiryStatus(id, status) {
  if (!status) {
    return errorResponse('Status is required', 400);
  }
  await execute('UPDATE enquiries SET status = ?, updated_at = NOW() WHERE id = ?', [
    status,
    id,
  ]);
  return jsonResponse({
    status: true,
    message: 'Enquiry status updated successfully',
  });
}

export async function deleteEnquiry(id) {
  await execute('UPDATE enquiries SET isDeleted = 1, updated_at = NOW() WHERE id = ?', [
    id,
  ]);
  return jsonResponse({
    status: true,
    message: 'Enquiry deleted successfully',
  });
}
