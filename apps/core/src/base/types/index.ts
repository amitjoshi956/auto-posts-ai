export * from './user';
export * from './posts';

export type AuthRequest = {
  email: string;
  password: string;
  fullName?: string;
};

export type AuthResponse = {
  email?: string;
  fullName?: string;
  permissions?: string[];
};

export type QParams = Record<string, string | string[]>;
