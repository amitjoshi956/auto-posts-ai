import {
  QueryObserverResult,
  UseMutateFunction,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// ─── Common API Types ─────────────────────────────────────────────────────────

export type GenericAPIError = {
  hasErrors?: boolean;
  error?: string;
};

export type GenericAPIResponse<T> = AxiosResponse<T, InternalAxiosRequestConfig> & {
  hasErrors?: boolean;
  error?: string;
};

export type GenericAPIRequest<B> = {
  headers: Record<string, string>;
  config: InternalAxiosRequestConfig;
  body: B;
};

// ─── React Query Helper Types ─────────────────────────────────────────────────

export type ReturnLazyQuery<R> = [
  () => Promise<QueryObserverResult<R, Error>>,
  Omit<UseQueryResult<R, Error>, 'refetch'>,
];

export type ReturnMutation<R, P> = [
  UseMutateFunction<R, Error, P>,
  Omit<UseMutationResult<R, Error, P>, 'mutate'>,
];

export type Query<R> = () => UseQueryResult<R, Error>;
export type LazyQuery<R> = () => ReturnLazyQuery<R>;
export type PLazyQuery<P, R> = (params: P) => ReturnLazyQuery<R>;
export type PMutation<P, R> = () => ReturnMutation<R, P>;

// ─── Re-exports from Shared Module ───────────────────────────────────────────
// Domain types come from @autoposts/shared to avoid duplication

export type {
  Post,
  UserProfile,
  LoginPayload,
  SignupPayload,
  APIResponse,
  APIError,
} from '@autoposts/shared';
