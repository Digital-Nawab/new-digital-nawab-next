import { RoleResource } from './RoleResource.js';
import { PermissionResource } from './PermissionResource.js';

export class UserResources {
  static toArray(user) {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles ? RoleResource.collection(user.roles) : [],
      permissions: user.permissions ? PermissionResource.collection(user.permissions) : [],
    };
  }

  static collection(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => UserResources.toArray(item));
  }
}

export default UserResources;

