import { Document } from 'mongoose';

export type User = Document & {
  email: string;
  fullName: string;
  password: string;
  permissions: string[];
  generateAuthToken?: () => string;
};
