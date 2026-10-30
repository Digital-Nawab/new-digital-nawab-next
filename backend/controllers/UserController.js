import { query, execute } from '../database/db.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import { UserIndexResource, UserResources } from '../resources/index.js';
import bcrypt from 'bcryptjs';

export class UserController {
  static async index() {
    try {
      const users = await query('SELECT id, name, email, created_at, updated_at FROM users ORDER BY id DESC');
      const userRoles = await query(`
        SELECT mr.model_id as user_id, r.id, r.name 
        FROM model_has_roles mr 
        JOIN roles r ON r.id = mr.role_id
      `);
      const userPerms = await query(`
        SELECT DISTINCT mp.model_id as user_id, p.id, p.name 
        FROM model_has_permissions mp 
        JOIN permissions p ON p.id = mp.permission_id
      `);

      const mapped = users.map((u) => ({
        ...u,
        roles: userRoles.filter((r) => r.user_id === u.id).map((r) => ({ id: r.id, name: r.name })),
        permissions: userPerms.filter((p) => p.user_id === u.id).map((p) => ({ id: p.id, name: p.name })),
      }));

      return jsonResponse({
        status: true,
        data: UserIndexResource.collection(mapped),
      });
    } catch (err) {
      console.error('UserController index error:', err);
      return errorResponse('Failed to fetch users', 500);
    }
  }

  static async show(id) {
    try {
      const users = await query('SELECT id, name, email, created_at, updated_at FROM users WHERE id = ? LIMIT 1', [id]);
      if (!users.length) return errorResponse('User not found', 404);
      const user = users[0];

      const roles = await query(`
        SELECT r.id, r.name 
        FROM model_has_roles mr 
        JOIN roles r ON r.id = mr.role_id 
        WHERE mr.model_id = ?
      `, [id]);

      const permissions = await query(`
        SELECT DISTINCT p.id, p.name 
        FROM model_has_permissions mp 
        JOIN permissions p ON p.id = mp.permission_id 
        WHERE mp.model_id = ?
      `, [id]);

      user.roles = roles;
      user.permissions = permissions;

      return jsonResponse({
        status: true,
        data: UserResources.toArray(user),
      });
    } catch (err) {
      console.error('UserController show error:', err);
      return errorResponse('Failed to fetch user', 500);
    }
  }

  static async store(request) {
    try {
      const body = await parseRequestBody(request);
      if (!body.name || !body.email || !body.password) {
        return errorResponse('Name, email, and password are required', 400);
      }

      // Check duplicate email
      const existing = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [body.email]);
      if (existing.length > 0) {
        return errorResponse('Email already exists', 422);
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);
      const result = await execute(
        'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [body.name, body.email, hashedPassword]
      );
      const userId = result.insertId;

      // Sync roles
      if (Array.isArray(body.roles) && body.roles.length > 0) {
        for (const roleItem of body.roles) {
          let roleId = typeof roleItem === 'number' ? roleItem : null;
          if (!roleId && typeof roleItem === 'string') {
            const foundRole = await query('SELECT id FROM roles WHERE name = ? LIMIT 1', [roleItem]);
            if (foundRole.length > 0) roleId = foundRole[0].id;
          } else if (roleItem && typeof roleItem === 'object' && roleItem.id) {
            roleId = roleItem.id;
          }
          if (roleId) {
            await execute(
              'INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES (?, ?, ?)',
              [roleId, 'App\\Models\\User', userId]
            );
          }
        }
      }

      // Sync permissions
      if (Array.isArray(body.permissions) && body.permissions.length > 0) {
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
              'INSERT INTO model_has_permissions (permission_id, model_type, model_id) VALUES (?, ?, ?)',
              [permId, 'App\\Models\\User', userId]
            );
          }
        }
      }

      return jsonResponse(
        { status: true, message: 'User created successfully', id: userId },
        201
      );
    } catch (err) {
      console.error('UserController store error:', err);
      return errorResponse('Failed to create user', 500);
    }
  }

  static async update(id, request) {
    try {
      const body = await parseRequestBody(request);
      const updates = [];
      const params = [];

      if (body.name) {
        updates.push('name = ?');
        params.push(body.name);
      }
      if (body.email) {
        updates.push('email = ?');
        params.push(body.email);
      }
      if (body.password) {
        updates.push('password = ?');
        params.push(await bcrypt.hash(body.password, 10));
      }

      if (updates.length > 0) {
        updates.push('updated_at = NOW()');
        params.push(id);
        await execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
      }

      // Sync roles if provided
      if (Array.isArray(body.roles)) {
        await execute('DELETE FROM model_has_roles WHERE model_id = ? AND model_type = ?', [id, 'App\\Models\\User']);
        for (const roleItem of body.roles) {
          let roleId = typeof roleItem === 'number' ? roleItem : null;
          if (!roleId && typeof roleItem === 'string') {
            const foundRole = await query('SELECT id FROM roles WHERE name = ? LIMIT 1', [roleItem]);
            if (foundRole.length > 0) roleId = foundRole[0].id;
          } else if (roleItem && typeof roleItem === 'object' && roleItem.id) {
            roleId = roleItem.id;
          }
          if (roleId) {
            await execute(
              'INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES (?, ?, ?)',
              [roleId, 'App\\Models\\User', id]
            );
          }
        }
      }

      // Sync permissions if provided
      if (Array.isArray(body.permissions)) {
        await execute('DELETE FROM model_has_permissions WHERE model_id = ? AND model_type = ?', [id, 'App\\Models\\User']);
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
              'INSERT INTO model_has_permissions (permission_id, model_type, model_id) VALUES (?, ?, ?)',
              [permId, 'App\\Models\\User', id]
            );
          }
        }
      }

      return jsonResponse({ status: true, message: 'User updated successfully' });
    } catch (err) {
      console.error('UserController update error:', err);
      return errorResponse('Failed to update user', 500);
    }
  }

  static async destroy(id) {
    try {
      await execute('DELETE FROM model_has_roles WHERE model_id = ?', [id]);
      await execute('DELETE FROM model_has_permissions WHERE model_id = ?', [id]);
      await execute('DELETE FROM users WHERE id = ?', [id]);
      return jsonResponse({ status: true, message: 'User deleted successfully' });
    } catch (err) {
      console.error('UserController destroy error:', err);
      return errorResponse('Failed to delete user', 500);
    }
  }
}

export default UserController;
