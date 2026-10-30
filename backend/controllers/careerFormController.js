import { query, execute } from '../database/db.js';
import {
  jsonResponse,
  errorResponse,
  formatRow,
  formatRows,
  saveUploadedFile,
} from '../utils/api-helpers.js';

export async function getCareerForms() {
  const forms = await query('SELECT * FROM careerform ORDER BY created_at DESC');
  const careers = await query('SELECT * FROM careers');
  const careerMap = new Map(careers.map((c) => [c.id, c]));

  const result = forms.map((f) => ({
    ...formatRow(f),
    career: careerMap.get(f.career_id) || null,
  }));

  return jsonResponse({
    status: true,
    data: result,
  });
}

export async function storeCareerFormData(request) {
  let body = {};
  let resumePath = null;

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    for (const [key, val] of formData.entries()) {
      if (key === 'resume' && typeof val === 'object' && val.name) {
        resumePath = await saveUploadedFile(val, 'career_form');
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
  const email = (body.email || '').trim().toLowerCase();
  const address = body.address || '';
  const yearOfExp = Number(body.year_of_experience || 0);
  let careerId = Number(body.career_id || 0);
  const contactNumber = body.contact_number || body.phone || '';
  const projectLink = body.project_link || '';
  const message = body.message || '';

  let skills = body.skills || [];
  if (typeof skills === 'string') {
    try {
      skills = JSON.parse(skills);
    } catch {
      skills = skills.split(',').map((s) => s.trim());
    }
  }

  if (!name || !email) {
    return errorResponse('Validation Error', 422, [
      'The name and email fields are required.',
    ]);
  }

  if (!careerId) {
    const firstCareer = await query('SELECT id FROM careers LIMIT 1');
    careerId = firstCareer.length ? firstCareer[0].id : 1;
  }

  const result = await execute(
    `INSERT INTO careerform (
      name, email, address, year_of_experience, career_id,
      resume, contact_number, project_link, skills, message, status,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW(), NOW())`,
    [
      name,
      email,
      address,
      yearOfExp,
      careerId,
      resumePath || body.resume || null,
      contactNumber,
      projectLink,
      JSON.stringify(skills),
      message,
    ]
  );

  return jsonResponse(
    {
      message: 'Career form submitted successfully',
      data: {
        id: result.insertId,
        name,
        email,
        career_id: careerId,
        resume: resumePath,
        status: 'new',
      },
    },
    201
  );
}

export async function updateCareerFormStatus(id, status) {
  await execute('UPDATE careerform SET status = ?, updated_at = NOW() WHERE id = ?', [
    status,
    id,
  ]);
  return jsonResponse({
    status: true,
    message: 'Status updated successfully',
  });
}

export async function deleteCareerForm(id) {
  await execute('DELETE FROM careerform WHERE id = ?', [id]);
  return jsonResponse({
    status: true,
    message: 'Career form deleted successfully',
  });
}
