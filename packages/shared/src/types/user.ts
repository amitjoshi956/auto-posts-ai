import { z } from 'zod';
import { UpdatePreferencesSchema } from '../schemas/user.schema';
import { BasePermission } from '../enums/permissions';

export type UserProfile = {
  email: string;
  fullName: string;
  permissions: BasePermission[];
};

export type JwtPayload = {
  _id: string;
  email: string;
  permissions: BasePermission[];
};

export type UpdatePreferencesPayload = z.infer<typeof UpdatePreferencesSchema>;
