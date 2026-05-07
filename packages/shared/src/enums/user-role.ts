import { BasePermission } from './permissions';

export const UserRole = {
  GUEST_USER: [BasePermission.READ],
  USER: [BasePermission.READ, BasePermission.CREATE, BasePermission.UPDATE, BasePermission.DELETE],
  SUPER_USER: [
    BasePermission.SUPER,
    BasePermission.READ,
    BasePermission.CREATE,
    BasePermission.UPDATE,
    BasePermission.DELETE,
  ],
};
