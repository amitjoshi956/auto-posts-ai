import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Request, Response } from 'express';

export type GenericAPIResponse<D> = {
  hasErrors?: boolean;
  error?: string;
  status: number;
  data: D;
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
  idToken: string;
  email: string;
  displayName?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};

export type QParams = {
  [key: string]: string;
};

export type Req<ReqB, ResB = any> = Request<QParams, ResB, ReqB>;
export type Res<ResB = unknown> = Response<GenericAPIResponse<ResB>>;
