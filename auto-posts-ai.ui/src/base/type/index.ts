import {
  QueryObserverResult,
  UseMutateFunction,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// common types
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

// Query types
export type PQuery<P, R> = (
  params: P
) => [() => Promise<QueryObserverResult<R, Error>>, Omit<UseQueryResult<R, Error>, 'refetch'>];

export type PMutation<P, R> = () => [
  UseMutateFunction<R, Error, P>,
  Omit<UseMutationResult<R, Error, P>, 'mutate'>
];

export * from './post';
export * from './user';
