export type AuthPayload = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  fullName: string;
  permissions: string[];
};
