/*******************************
 ******** Generic Types ********
 *******************************/

import { AxiosHeaders, AxiosRequestConfig } from "axios";

type GenericAPIResponse<D> = {
  hasErrors?: boolean;
  error?: string;
  status: number;
  data: D;
};

type GenericAPIRequest<B> = {
  headers: AxiosHeaders;
  config: AxiosRequestConfig;
  body: B;
};

type AuthRequest = {
  email: string;
  password: string;
  fullName?: string;
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
