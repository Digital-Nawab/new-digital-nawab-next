export class PermissionResource {
  static toArray(permission) {
    if (!permission) return null;
    return {
      id: permission.id,
      name: permission.name,
    };
  }

  static collection(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => PermissionResource.toArray(item));
  }
}

export default PermissionResource;

