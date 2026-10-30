export class UserSharedResource {
  static toArray(user) {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: Array.isArray(user.roles)
        ? user.roles.map((r) => (typeof r === 'string' ? r : r.name))
        : [],
      permissions: Array.isArray(user.permissions)
        ? user.permissions.map((p) => (typeof p === 'string' ? p : p.name))
        : [],
    };
  }

  static collection(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => UserSharedResource.toArray(item));
  }
}

export default UserSharedResource;

