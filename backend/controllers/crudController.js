import { query, execute } from '../database/db.js';
import {
  jsonResponse,
  errorResponse,
  formatRow,
  formatRows,
  saveUploadedFile,
} from '../utils/api-helpers.js';

export async function parseRequest(request) {
  let body = {};
  const files = {};

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    for (const [key, val] of formData.entries()) {
      if (typeof val === 'object' && val && val.name) {
        files[key] = val;
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

  return { body, files };
}

// Service CRUD
export async function postService(request) {
  const { body, files } = await parseRequest(request);
  let imagePath = body.image || null;
  if (files.image) {
    imagePath = await saveUploadedFile(files.image, 'services');
  }

  const result = await execute(
    'INSERT INTO services (name, description, image, is_deleted, created_at, updated_at) VALUES (?, ?, ?, 0, NOW(), NOW())',
    [body.name || 'Untitled Service', body.description || '', imagePath]
  );
  return jsonResponse({
    status: true,
    message: 'Service created successfully',
    id: result.insertId,
  }, 201);
}

export async function updateService(id, request) {
  const { body, files } = await parseRequest(request);
  let imagePath = body.image || undefined;
  if (files.image) {
    imagePath = await saveUploadedFile(files.image, 'services');
  }

  await execute(
    `UPDATE services SET
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      image = COALESCE(?, image),
      updated_at = NOW()
     WHERE id = ?`,
    [body.name, body.description, imagePath, id]
  );
  return jsonResponse({ status: true, message: 'Service updated successfully' });
}

export async function deleteService(id) {
  await execute('UPDATE services SET is_deleted = 1, updated_at = NOW() WHERE id = ?', [id]);
  return jsonResponse({ status: true, message: 'Service deleted successfully' });
}

// SubService CRUD
export async function postSubservice(request) {
  const { body, files } = await parseRequest(request);
  let imagePath = body.image || null;
  if (files.image) {
    imagePath = await saveUploadedFile(files.image, 'subservices');
  }

  const result = await execute(
    'INSERT INTO subservices (service_id, name, description, image, is_deleted, created_at, updated_at) VALUES (?, ?, ?, ?, 0, NOW(), NOW())',
    [Number(body.service_id) || 1, body.name || 'Subservice', body.description || '', imagePath]
  );
  return jsonResponse({
    status: true,
    message: 'Subservice created successfully',
    id: result.insertId,
  }, 201);
}

export async function deleteSubservice(id) {
  await execute('UPDATE subservices SET is_deleted = 1, updated_at = NOW() WHERE id = ?', [id]);
  return jsonResponse({ status: true, message: 'Subservice deleted successfully' });
}

// Blog CRUD
export async function postBlog(request) {
  const { body, files } = await parseRequest(request);
  let bannerImg = body.banner_img || null;
  let cardImg = body.card_img || null;

  if (files.banner_img) {
    bannerImg = await saveUploadedFile(files.banner_img, 'blog');
  }
  if (files.card_img) {
    cardImg = await saveUploadedFile(files.card_img, 'blog');
  }

  let keywords = body.keyword || body.keywords || [];
  if (typeof keywords === 'string') {
    try {
      keywords = JSON.parse(keywords);
    } catch {
      keywords = keywords.split(',').map((k) => k.trim());
    }
  }

  const slug = body.url || (body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const result = await execute(
    `INSERT INTO blogs (
      meta_key, meta_desc, title, url, keyword, description, author, published, card_img, banner_img, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      body.meta_key || body.title || '',
      body.meta_desc || '',
      body.title || 'Untitled Blog',
      slug,
      JSON.stringify(keywords),
      body.description || '',
      body.author || 'Admin',
      body.published || new Date().toISOString().split('T')[0],
      cardImg,
      bannerImg,
    ]
  );
  return jsonResponse({
    status: true,
    message: 'Blog created successfully',
    id: result.insertId,
  }, 201);
}

export async function updateBlog(id, request) {
  const { body, files } = await parseRequest(request);
  let bannerImg = body.banner_img || undefined;
  let cardImg = body.card_img || undefined;

  if (files.banner_img) {
    bannerImg = await saveUploadedFile(files.banner_img, 'blog');
  }
  if (files.card_img) {
    cardImg = await saveUploadedFile(files.card_img, 'blog');
  }

  let keywordJson = undefined;
  if (body.keyword || body.keywords) {
    const k = body.keyword || body.keywords;
    keywordJson = typeof k === 'string' ? k : JSON.stringify(k);
  }

  await execute(
    `UPDATE blogs SET
      title = COALESCE(?, title),
      url = COALESCE(?, url),
      meta_key = COALESCE(?, meta_key),
      meta_desc = COALESCE(?, meta_desc),
      description = COALESCE(?, description),
      author = COALESCE(?, author),
      published = COALESCE(?, published),
      card_img = COALESCE(?, card_img),
      banner_img = COALESCE(?, banner_img),
      keyword = COALESCE(?, keyword),
      updated_at = NOW()
     WHERE id = ?`,
    [
      body.title,
      body.url,
      body.meta_key,
      body.meta_desc,
      body.description,
      body.author,
      body.published,
      cardImg,
      bannerImg,
      keywordJson,
      id,
    ]
  );
  return jsonResponse({ status: true, message: 'Blog updated successfully' });
}

export async function deleteBlog(id) {
  await execute('DELETE FROM blogs WHERE id = ?', [id]);
  return jsonResponse({ status: true, message: 'Blog deleted successfully' });
}

// Generic Table Helpers for remaining routes
export async function genericInsert(tableName, data, folder = 'uploads') {
  const keys = Object.keys(data).filter((k) => data[k] !== undefined);
  if (keys.length === 0) {
    return errorResponse('Empty data', 400);
  }
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map((k) => {
    const val = data[k];
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }
    return val;
  });

  const sql = `INSERT INTO ${tableName} (${keys.join(', ')}, created_at, updated_at) VALUES (${placeholders}, NOW(), NOW())`;
  const result = await execute(sql, values);
  return jsonResponse({
    status: true,
    message: `${tableName} created successfully`,
    id: result.insertId,
  }, 201);
}

export async function genericUpdate(tableName, id, data) {
  const keys = Object.keys(data).filter((k) => data[k] !== undefined && k !== 'id');
  if (keys.length === 0) {
    return jsonResponse({ status: true, message: 'No changes provided' });
  }
  const setClauses = keys.map((k) => `${k} = ?`).join(', ');
  const values = keys.map((k) => {
    const val = data[k];
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }
    return val;
  });
  values.push(id);

  const sql = `UPDATE ${tableName} SET ${setClauses}, updated_at = NOW() WHERE id = ?`;
  await execute(sql, values);
  return jsonResponse({ status: true, message: `${tableName} updated successfully` });
}

export async function genericDelete(tableName, id) {
  await execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
  return jsonResponse({ status: true, message: `${tableName} deleted successfully` });
}
