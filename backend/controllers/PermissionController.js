import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import { PermissionResource } from '../resources/index.js';

export class PermissionController {
  static async index() {
    try {
      const permissions = await query('SELECT * FROM permissions ORDER BY id ASC');
      return jsonResponse({
        status: true,
        data: PermissionResource.collection(permissions),
      });
    } catch (err) {
      console.error('PermissionController index error:', err);
      return errorResponse('Failed to fetch permissions', 500);
    }
  }

  static async show(id) {
    try {
      const permissions = await query('SELECT * FROM permissions WHERE id = ? LIMIT 1', [id]);
      if (!permissions.length) return errorResponse('Permission not found', 404);
      return jsonResponse({
        status: true,
        data: PermissionResource.toArray(permissions[0]),
      });
    } catch (err) {
      console.error('PermissionController show error:', err);
      return errorResponse('Failed to fetch permission', 500);
    }
  }

  static async store(request) {
    try {
      const body = await parseRequestBody(request);
      if (!body.name) return errorResponse('Permission name is required', 400);

      const existing = await query('SELECT id FROM permissions WHERE name = ? LIMIT 1', [body.name]);
      if (existing.length > 0) {
        return errorResponse('Permission already exists', 422);
      }

      const result = await execute(
        'INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [body.name, body.guard_name || 'web']
      );
      return jsonResponse({ status: true, message: 'Permission created', id: result.insertId }, 201);
    } catch (err) {
      console.error('PermissionController store error:', err);
      return errorResponse('Failed to create permission', 500);
    }
  }

  static async update(id, request) {
    try {
      const body = await parseRequestBody(request);
      if (!body.name) return errorResponse('Permission name is required', 400);

      await execute('UPDATE permissions SET name = ?, updated_at = NOW() WHERE id = ?', [body.name, id]);
      return jsonResponse({ status: true, message: 'Permission updated' });
    } catch (err) {
      console.error('PermissionController update error:', err);
      return errorResponse('Failed to update permission', 500);
    }
  }

  static async destroy(id) {
    try {
      await execute('DELETE FROM role_has_permissions WHERE permission_id = ?', [id]);
      await execute('DELETE FROM model_has_permissions WHERE permission_id = ?', [id]);
      await execute('DELETE FROM permissions WHERE id = ?', [id]);
      return jsonResponse({ status: true, message: 'Permission deleted' });
    } catch (err) {
      console.error('PermissionController destroy error:', err);
      return errorResponse('Failed to delete permission', 500);
    }
  }
}

export default PermissionController;
