import { HugeiconsProps } from '@hugeicons/react';
import {
  QueryObserverResult,
  UseMutateFunction,
  UseMutationResult,
  UseQueryResult,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

// ─── React Query Helper Types ─────────────────────────────────────────────────

export type ReturnLazyQuery<R> = [
  () => Promise<QueryObserverResult<R, Error>>,
  Omit<UseQueryResult<R, Error>, 'refetch'>,
];

export type ReturnMutation<R, P> = [
  UseMutateFunction<R, Error, P>,
  Omit<UseMutationResult<R, Error, P>, 'mutate'>,
];

export type Query<R> = (
  options?: Omit<UseQueryOptions<R, Error>, 'queryKey' | 'queryFn'>
) => UseQueryResult<R, Error>;

export type LazyQuery<R> = (
  options?: Omit<UseQueryOptions<R, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) => ReturnLazyQuery<R>;

export type PLazyQuery<P, R> = (params: P) => ReturnLazyQuery<R>;

export type PMutation<P, R> = (
  options?: Omit<UseMutationOptions<R, Error, P>, 'mutationFn'>
) => ReturnMutation<R, P>;

// ─── Icon Props Type ─────────────────────────────────────────────────────────
export type IconSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

export type IconProps = HugeiconsProps & {
  size?: IconSize;
};

// ─── Re-exports from Shared Module ───────────────────────────────────────────
// Domain types come from @autoposts/shared to avoid duplication

export type {
  Post,
  UserProfile,
  LoginPayload,
  SignupPayload,
  ApiResponse,
  ApiRequest,
  Topic,
  CreateTopicPayload,
} from '@autoposts/shared';

export * from './config';
