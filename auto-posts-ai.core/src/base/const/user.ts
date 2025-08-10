export const BasePermissions = {
  READ: 'user.read',
  CREATE: 'user.create',
  UPDATE: 'user.update',
  SUPER: 'user.super',
};

export const UserRole = {
  GUEST_USER: [BasePermissions.READ],
  USER: [BasePermissions.READ, BasePermissions.CREATE, BasePermissions.UPDATE],
  SUPER_USER: [
    BasePermissions.SUPER,
    BasePermissions.READ,
    BasePermissions.UPDATE,
    BasePermissions.CREATE,
  ],
};
