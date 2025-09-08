import { useMutation, useQuery, QueryFunction, MutationFunction } from '@tanstack/react-query';
import { LazyQuery, PMutation, Query } from '@base/type';

export const createQuery = <D>(queryFn: QueryFunction<D>, queryKey?: string[]): Query<D> => {
  return () =>
    useQuery({
      queryKey: queryKey || [],
      queryFn,
    });
};

export const createLazyQuery = <D>(
  queryFn: QueryFunction<D>,
  queryKey?: string[]
): LazyQuery<D> => {
  return () => {
    const { refetch, ...rest } = useQuery({
      queryKey: queryKey || [],
      queryFn,
      enabled: false,
    });

    return [refetch, rest];
  };
};

export const createMutation = <D, P>(
  mutationFn: MutationFunction<D, P>,
  mutationKey?: string[]
): PMutation<P, D> => {
  return () => {
    const { mutate, ...rest } = useMutation({
      mutationKey: mutationKey || [],
      mutationFn,
    });

    return [mutate, rest];
  };
};
