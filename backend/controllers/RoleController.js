import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import { RoleResource } from '../resources/index.js';

export class RoleController {
  static async index() {
    try {
      const roles = await query('SELECT * FROM roles ORDER BY id ASC');
      const rolePerms = await query(`
        SELECT rhp.role_id, p.id, p.name 
        FROM role_has_permissions rhp 
        JOIN permissions p ON p.id = rhp.permission_id
      `);

      const mapped = roles.map((r) => ({
        ...r,
        permissions: rolePerms.filter((rp) => rp.role_id === r.id).map((p) => ({ id: p.id, name: p.name })),
      }));

      return jsonResponse({
        status: true,
        data: RoleResource.collection(mapped),
      });
    } catch (err) {
      console.error('RoleController index error:', err);
      return errorResponse('Failed to fetch roles', 500);
    }
  }

  static async show(id) {
    try {
      const roles = await query('SELECT * FROM roles WHERE id = ? LIMIT 1', [id]);
      if (!roles.length) return errorResponse('Role not found', 404);
      const role = roles[0];

      const permissions = await query(`
        SELECT p.id, p.name 
        FROM role_has_permissions rhp 
        JOIN permissions p ON p.id = rhp.permission_id 
        WHERE rhp.role_id = ?
      `, [id]);

      role.permissions = permissions;

      return jsonResponse({
        status: true,
        data: RoleResource.toArray(role),
      });
    } catch (err) {
      console.error('RoleController show error:', err);
      return errorResponse('Failed to fetch role', 500);
    }
  }

  static async store(request) {
    try {
      const body = await parseRequestBody(request);
      if (!body.name) return errorResponse('Role name is required', 400);

      const existing = await query('SELECT id FROM roles WHERE name = ? LIMIT 1', [body.name]);
      if (existing.length > 0) {
        return errorResponse('Role already exists', 422);
      }

      const result = await execute(
        'INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [body.name, body.guard_name || 'web']
      );
      const roleId = result.insertId;

      if (Array.isArray(body.permissions)) {
        for (const permItem of body.permissions) {
          let permId = typeof permItem === 'number' ? permItem : null;
          if (!permId && typeof permItem === 'string') {
            const foundPerm = await query('SELECT id FROM permissions WHERE name = ? LIMIT 1', [permItem]);
            if (foundPerm.length > 0) permId = foundPerm[0].id;
          } else if (permItem && typeof permItem === 'object' && permItem.id) {
            permId = permItem.id;
          }
          if (permId) {
            await execute(
              'INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)',
              [permId, roleId]
            );
          }
        }
      }

      return jsonResponse({ status: true, message: 'Role created', id: roleId }, 201);
    } catch (err) {
      console.error('RoleController store error:', err);
      return errorResponse('Failed to create role', 500);
    }
  }

  static async update(id, request) {
    try {
      const body = await parseRequestBody(request);
      if (body.name) {
        await execute('UPDATE roles SET name = ?, updated_at = NOW() WHERE id = ?', [body.name, id]);
      }

      if (Array.isArray(body.permissions)) {
        await execute('DELETE FROM role_has_permissions WHERE role_id = ?', [id]);
        for (const permItem of body.permissions) {
          let permId = typeof permItem === 'number' ? permItem : null;
          if (!permId && typeof permItem === 'string') {
            const foundPerm = await query('SELECT id FROM permissions WHERE name = ? LIMIT 1', [permItem]);
            if (foundPerm.length > 0) permId = foundPerm[0].id;
          } else if (permItem && typeof permItem === 'object' && permItem.id) {
            permId = permItem.id;
          }
          if (permId) {
            await execute(
              'INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)',
              [permId, id]
            );
          }
        }
      }

      return jsonResponse({ status: true, message: 'Role updated' });
    } catch (err) {
      console.error('RoleController update error:', err);
      return errorResponse('Failed to update role', 500);
    }
  }

  static async destroy(id) {
    try {
      await execute('DELETE FROM role_has_permissions WHERE role_id = ?', [id]);
      await execute('DELETE FROM model_has_roles WHERE role_id = ?', [id]);
      await execute('DELETE FROM roles WHERE id = ?', [id]);
      return jsonResponse({ status: true, message: 'Role deleted' });
    } catch (err) {
      console.error('RoleController destroy error:', err);
      return errorResponse('Failed to delete role', 500);
    }
  }
}

export default RoleController;
