import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import { generateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

export async function login(request) {
  const body = await parseRequestBody(request);
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!email || !password) {
    return errorResponse('Email and password are required', 400);
  }

  const users = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  if (!users.length) {
    return errorResponse('Invalid email or password', 401);
  }

  const user = users[0];
  let isMatch = false;

  const normalizedHash = (user.password || '').replace(/^\$2y\$/, '$2a$');

  try {
    isMatch = await bcrypt.compare(password, normalizedHash);
  } catch {
    isMatch = user.password === password;
  }

  if (!isMatch && user.password !== password) {
    return errorResponse('Invalid email or password', 401);
  }

  const token = generateToken(user);

  return jsonResponse({
    status: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

export async function register(request) {
  const body = await parseRequestBody(request);
  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!name || !email || !password) {
    return errorResponse('Name, email, and password are required', 400);
  }

  const existing = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
  if (existing.length > 0) {
    return errorResponse('Email is already registered', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await execute(
    'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [name, email, hashedPassword]
  );

  const newUser = { id: result.insertId, name, email };
  const token = generateToken(newUser);

  return jsonResponse(
    {
      status: true,
      message: 'User registered successfully',
      token,
      user: newUser,
    },
    201
  );
}

export async function getCurrentUser(request) {
  const users = await query('SELECT id, name, email, created_at FROM users LIMIT 1');
  return jsonResponse({
    user: users.length ? users[0] : null,
  });
}
