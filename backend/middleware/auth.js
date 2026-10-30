import { query } from '../database/db.js';
import { errorResponse } from '../utils/api-helpers.js';
import crypto from 'crypto';

const AUTH_SECRET = process.env.AUTH_SECRET || 'dn_secret_key_2026_digitalnawab';

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    timestamp: Date.now(),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('hex');
  return `${data}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [data, signature] = token.split('.');
  const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('hex');
  if (signature !== expectedSignature) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
    return payload;
  } catch {
    return null;
  }
}

export async function authenticateRequest(request) {
  const authHeader = request.headers.get('authorization') || '';
  let token = null;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else {
    // Check cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/(?:^|;\s*)(?:auth_token|token|session_token)=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token) {
    // Optional fallback: if in development and has a mock header
    const devUserId = request.headers.get('x-dev-user-id');
    if (devUserId && process.env.NODE_ENV !== 'production') {
      const users = await query('SELECT id, name, email FROM users WHERE id = ?', [devUserId]);
      if (users.length) return users[0];
    }
    return null;
  }

  const payload = verifyToken(token);
  if (!payload || !payload.id) return null;

  const users = await query('SELECT id, name, email FROM users WHERE id = ? LIMIT 1', [payload.id]);
  return users.length ? users[0] : null;
}

export async function requireAuth(request) {
  const user = await authenticateRequest(request);
  if (!user) {
    return { error: errorResponse('Unauthenticated', 401), user: null };
  }
  return { error: null, user };
}

