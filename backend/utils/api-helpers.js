import fs from 'fs';
import path from 'path';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
};

export function jsonResponse(data, status = 200, additionalHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      ...corsHeaders,
      ...additionalHeaders,
    },
  });
}

export function errorResponse(message = 'An error occurred', status = 500, errors = null) {
  const payload = {
    status: false,
    message,
  };
  if (errors) {
    payload.errors = errors;
  }
  return Response.json(payload, {
    status,
    headers: corsHeaders,
  });
}

export function parseJsonSafely(val, fallback = null) {
  if (typeof val !== 'string') return val ?? fallback;
  const trimmed = val.trim();
  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return fallback !== null ? fallback : val;
    }
  }
  return val;
}

const JSON_FIELDS = new Set([
  'keyword',
  'keywords',
  'tech_used',
  'items',
  'market_areas',
  'skills',
  'features',
  'faqs',
  'reasons',
  'packages',
]);

export function formatRow(row) {
  if (!row || typeof row !== 'object') return row;
  const formatted = { ...row };
  for (const [key, value] of Object.entries(formatted)) {
    if (JSON_FIELDS.has(key)) {
      formatted[key] = parseJsonSafely(value, []);
    } else if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
      formatted[key] = parseJsonSafely(value, value);
    }
  }
  return formatted;
}

export function formatRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(formatRow);
}

export async function saveUploadedFile(file, subDir = 'uploads', baseFolder = 'admin-assets') {
  if (!file || typeof file.arrayBuffer !== 'function') {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const originalName = file.name || 'file.bin';
  const ext = path.extname(originalName) || '.bin';
  const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}${ext}`;

  // Primary folder: public/admin-assets/images/<subDir>
  const targetDir = path.join(process.cwd(), 'public', baseFolder, 'images', subDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Dual-write fallback folder: public/assets/images/<subDir> to avoid breaking any legacy views
  const fallbackDir = path.join(process.cwd(), 'public', 'assets', 'images', subDir);
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, filename), buffer);
  try {
    fs.writeFileSync(path.join(fallbackDir, filename), buffer);
  } catch {}

  // Returns relative asset path
  return `${baseFolder}/images/${subDir}/${filename}`;
}

export async function parseRequestBody(request) {
  if (!request) return {};
  
  // If request has already parsed body or is a plain object with fields
  if (typeof request.body === 'object' && request.body !== null && !('getReader' in request.body)) {
    return request.body;
  }

  let contentType = '';
  if (request.headers) {
    if (typeof request.headers.get === 'function') {
      contentType = request.headers.get('content-type') || '';
    } else if (typeof request.headers['content-type'] === 'string') {
      contentType = request.headers['content-type'];
    }
  }

  if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
    if (typeof request.formData === 'function') {
      try {
        const formData = await request.formData();
        const body = {};
        for (const [key, val] of formData.entries()) {
          body[key] = val;
        }
        return body;
      } catch {
        return {};
      }
    }
  }

  if (typeof request.json === 'function') {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  return {};
}

