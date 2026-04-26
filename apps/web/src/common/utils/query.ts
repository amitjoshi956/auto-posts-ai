import {
  useMutation,
  useQuery,
  QueryFunction,
  MutationFunction,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import type { LazyQuery, PMutation, Query } from '@base/type';

// ─── Query Factory ────────────────────────────────────────────────────────────
// Creates an auto-fetching query hook (enabled by default).
// Accepts hook-level overrides so consumers can customise per call-site.

export const createQuery = <D>(
  queryKey: string[],
  queryFn: QueryFunction<D>,
  defaults?: Omit<UseQueryOptions<D, Error>, 'queryKey' | 'queryFn'>
): Query<D> => {
  return (options?: Omit<UseQueryOptions<D, Error>, 'queryKey' | 'queryFn'>) =>
    useQuery({
      queryKey,
      queryFn,
      ...defaults,
      ...options,
    });
};

// ─── Lazy Query Factory ──────────────────────────────────────────────────────
// Creates a manually-triggered query hook (enabled: false).

export const createLazyQuery = <D>(
  queryKey: string[],
  queryFn: QueryFunction<D>,
  defaults?: Omit<UseQueryOptions<D, Error>, 'queryKey' | 'queryFn' | 'enabled'>
): LazyQuery<D> => {
  return (options?: Omit<UseQueryOptions<D, Error>, 'queryKey' | 'queryFn' | 'enabled'>) => {
    const { refetch, ...rest } = useQuery({
      queryKey,
      queryFn,
      enabled: false,
      ...defaults,
      ...options,
    });

    return [refetch, rest];
  };
};

// ─── Mutation Factory ────────────────────────────────────────────────────────
// Creates a mutation hook with predictable [mutate, rest] return shape.

export const createMutation = <D, P>(
  mutationFn: MutationFunction<D, P>,
  defaults?: Omit<UseMutationOptions<D, Error, P>, 'mutationFn'>
): PMutation<P, D> => {
  return (options?: Omit<UseMutationOptions<D, Error, P>, 'mutationFn'>) => {
    const { mutate, ...rest } = useMutation({
      mutationFn,
      ...defaults,
      ...options,
    });

    return [mutate, rest];
  };
};
