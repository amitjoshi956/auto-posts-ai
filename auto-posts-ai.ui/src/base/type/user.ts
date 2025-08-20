export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  email: string;
  fullName: string;
  permissions: string[];
};
