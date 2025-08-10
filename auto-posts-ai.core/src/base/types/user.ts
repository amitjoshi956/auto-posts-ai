import { BasePermission } from '@base/enums/user';
import { Document } from 'mongoose';

export type User = Document & {
  email: string;
  fullName: string;
  password: string;
  permissions: BasePermission[];
  generateAuthToken?: () => string;
};
