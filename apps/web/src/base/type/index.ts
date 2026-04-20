import {
  QueryObserverResult,
  UseMutateFunction,
  UseMutationResult,
  UseQueryResult,
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
  ApiResponse,
  ApiRequest,
} from '@autoposts/shared';
