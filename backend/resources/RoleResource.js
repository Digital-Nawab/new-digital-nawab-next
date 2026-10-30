import { PermissionResource } from './PermissionResource.js';

export class RoleResource {
  static toArray(role) {
    if (!role) return null;
    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions ? PermissionResource.collection(role.permissions) : [],
    };
  }

  static collection(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => RoleResource.toArray(item));
  }
}

export default RoleResource;

