/*******************************
 ******** Generic Types ********
 *******************************/

import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';

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

type QParams = {
  [key: string]: string;
};

type Req<ReqB, ResB = any> = Request<QParams, ResB, ReqB>;
type Res<ResB = unknown> = Response<GenericAPIResponse<ResB>>;
