import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Request, Response } from 'express';
import { User } from './user';

export * from './user';
export * from './posts';

export type GenericAPIResponse<D> = {
  hasErrors?: boolean;
  error?: string;
  data?: D;
};

export type GenericAPIRequest<B> = {
  headers: AxiosRequestHeaders;
  config: AxiosRequestConfig;
  body: B;
};

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

export type Req<ReqB, ResB = any> = Request<QParams, ResB, ReqB> & {
  user?: User;
};
export type Res<ResB = unknown> = Response<GenericAPIResponse<ResB>>;
