import { execute } from '../database/db.js';
import { jsonResponse } from '../utils/api-helpers.js';

export class RevokePermissionController {
  static async revoke(roleId, permissionId) {
    await execute('DELETE FROM role_has_permissions WHERE role_id = ? AND permission_id = ?', [roleId, permissionId]);
    return jsonResponse({ status: true, message: 'Permission revoked from role successfully' });
  }
}

export default RevokePermissionController;

