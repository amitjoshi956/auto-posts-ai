/// <reference types="vite/client" />

/****************************
 ******** POST TYPES ********
 ****************************/

type Post = string | null;

/****************************
 ******** USER TYPES ********
 ****************************/

type APIResponse = {
  hasErrors: boolean;
  email: string;
  uid?: string;
  userName: string;
};


/*******************************
 ******** Generic Types ********
 *******************************/

type GenericAPIResponse<D> = {
  hasErrors?: boolean;
  error?: string;
  status: number;
  data: D;
};

type GenericAPIError = {
  hasErrors?: boolean;
  status: number;
  error: string;
};

type AuthRequest = {
  email: string;
  password: string;
  displayName?: string;
};

type AuthResponse = {
  idToken: string;
  email: string;
  displayName?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};