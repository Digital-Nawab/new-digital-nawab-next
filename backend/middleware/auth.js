import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '../database/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'digital_nawab_jwt_secret_2026_super_secure_key';

export function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export async function comparePassword(plain, hashed) {
  if (!plain || !hashed) return false;
  // Replace $2y$ with $2a$ if needed for bcryptjs compatibility
  const normalizedHash = hashed.startsWith('$2y$') ? '$2a$' + hashed.slice(4) : hashed;
  try {
    return await bcrypt.compare(plain, normalizedHash);
  } catch (err) {
    return false;
  }
}

export async function hashPassword(plain) {
  return await bcrypt.hash(plain, 12);
}

export async function getUserWithRolesAndPermissions(userId) {
  const user = await queryOne('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);
  if (!user) return null;

  // Fetch roles
  const roles = await query(
    `SELECT r.id, r.name 
     FROM roles r 
     INNER JOIN model_has_roles mhr ON r.id = mhr.role_id 
     WHERE mhr.model_id = ?`,
    [userId]
  );
  user.roles = roles.map((r) => r.name);

  // Fetch permissions via roles and direct model permissions
  const rolePermissions = await query(
    `SELECT DISTINCT p.name 
     FROM permissions p 
     INNER JOIN role_has_permissions rhp ON p.id = rhp.permission_id 
     INNER JOIN model_has_roles mhr ON rhp.role_id = mhr.role_id 
     WHERE mhr.model_id = ?`,
    [userId]
  );

  const directPermissions = await query(
    `SELECT DISTINCT p.name 
     FROM permissions p 
     INNER JOIN model_has_permissions mhp ON p.id = mhp.permission_id 
     WHERE mhp.model_id = ?`,
    [userId]
  );

  const allPerms = new Set([
    ...rolePermissions.map((p) => p.name),
    ...directPermissions.map((p) => p.name),
  ]);
  user.permissions = Array.from(allPerms);

  return user;
}

export async function getAuthUser(req) {
  let token = null;

  // 1. Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // 2. Check cookies
  if (!token) {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/admin_token=([^;]+)/);
    if (match) {
      token = match[1];
    }
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) return null;

  return await getUserWithRolesAndPermissions(decoded.id);
}

export function requireAuth(handler, options = {}) {
  const { roles = [], permissions = [] } = options;

  return async (req, context) => {
    try {
      const user = await getAuthUser(req);
      if (!user) {
        return Response.json(
          { status: false, message: 'Unauthenticated. Please log in.' },
          { status: 401 }
        );
      }

      const isAdmin = user.roles.includes('admin') || user.roles.includes('Super Admin');

      if (!isAdmin) {
        if (roles.length > 0) {
          const hasRole = roles.some((r) => user.roles.includes(r));
          if (!hasRole) {
            return Response.json(
              { status: false, message: 'Forbidden. Insufficient role permissions.' },
              { status: 403 }
            );
          }
        }

        if (permissions.length > 0) {
          const hasPerm = permissions.some((p) => user.permissions.includes(p));
          if (!hasPerm) {
            return Response.json(
              { status: false, message: 'Forbidden. Required permission missing.' },
              { status: 403 }
            );
          }
        }
      }

      req.user = user;
      return await handler(req, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Response.json(
        { status: false, message: 'Internal server error in authorization' },
        { status: 500 }
      );
    }
  };
}
