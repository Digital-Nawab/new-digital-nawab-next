import { query, execute } from '../database/db.js';
import {
  jsonResponse,
  errorResponse,
  formatRow,
  formatRows,
  saveUploadedFile,
} from '../utils/api-helpers.js';

export async function getSeoForms() {
  const forms = await query('SELECT * FROM seo_forms ORDER BY id DESC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(forms),
  });
}

export async function storeSeoForm(request) {
  let body = {};
  let imagePath = null;

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    for (const [key, val] of formData.entries()) {
      if (key === 'image' && typeof val === 'object' && val.name) {
        imagePath = await saveUploadedFile(val, 'seo_form');
      } else {
        body[key] = val;
      }
    }
  } else {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  const name = (body.name || '').trim();
  const websiteUrl = (body.website_url || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const currentTraffic = ['Low', 'Medium', 'High'].includes(body.current_traffic)
    ? body.current_traffic
    : 'Medium';
  const message = (body.message || '').trim();
  const button = body.button || 'Analyze site';

  if (!name || !websiteUrl || !email) {
    return errorResponse('Validation Error', 422, [
      'Name, website URL, and email are required.',
    ]);
  }

  if (!imagePath) {
    const latest = await query('SELECT image FROM seo_forms WHERE image IS NOT NULL AND image != "" ORDER BY id DESC LIMIT 1');
    imagePath = latest.length ? latest[0].image : 'assets/images/seo_form/default.webp';
  }

  const result = await execute(
    `INSERT INTO seo_forms (
      image, name, website_url, email, current_traffic, message, button, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [imagePath, name, websiteUrl, email, currentTraffic, message, button]
  );

  return jsonResponse(
    {
      status: true,
      message: 'SEO form submitted successfully',
      data: {
        id: result.insertId,
        image: imagePath,
        name,
        website_url: websiteUrl,
        email,
        current_traffic: currentTraffic,
        message,
        button,
      },
    },
    201
  );
}
