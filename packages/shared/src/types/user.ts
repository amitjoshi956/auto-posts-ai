import { BasePermission } from '../enums/permissions';

export type UserProfile = {
  email: string;
  fullName: string;
  permissions: BasePermission[];
};

export type JwtPayload = {
  _id: string;
  email: string;
};
