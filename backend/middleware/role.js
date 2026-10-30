import { query } from '../database/db.js';
import { errorResponse } from '../utils/api-helpers.js';
import { requireAuth } from './auth.js';

export async function getUserRoles(userId) {
  if (!userId) return [];
  const rows = await query(
    `SELECT r.name 
     FROM model_has_roles m 
     JOIN roles r ON m.role_id = r.id 
     WHERE m.model_id = ?`,
    [userId]
  );
  return rows.map((r) => r.name.toLowerCase());
}

export function requireRole(allowedRoles = []) {
  const allowed = Array.isArray(allowedRoles)
    ? allowedRoles.map((r) => r.toLowerCase())
    : [allowedRoles.toLowerCase()];

  return async function checkRole(request) {
    const { error, user } = await requireAuth(request);
    if (error) return { error, user: null };

    const roles = await getUserRoles(user.id);

    // If user has admin role, allow access unconditionally
    if (roles.includes('admin') || roles.includes('super admin') || roles.includes('superadmin')) {
      return { error: null, user, roles };
    }

    const hasPermission = allowed.some((role) => roles.includes(role));
    if (!hasPermission) {
      return {
        error: errorResponse('Forbidden: You do not have the required role to access this resource', 403),
        user,
        roles,
      };
    }

    return { error: null, user, roles };
  };
}

