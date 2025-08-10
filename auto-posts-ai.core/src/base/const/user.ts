import { BasePermission } from '@base/enums/user';

export const UserRole = {
  GUEST_USER: [BasePermission.READ],
  USER: [BasePermission.READ, BasePermission.CREATE, BasePermission.UPDATE],
  SUPER_USER: [
    BasePermission.SUPER,
    BasePermission.READ,
    BasePermission.UPDATE,
    BasePermission.CREATE,
  ],
};
