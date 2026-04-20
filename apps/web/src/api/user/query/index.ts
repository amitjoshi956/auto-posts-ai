import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@api/user/user-service';
import type { LazyQuery, Query } from '@base/type';
import type { UserProfile } from '@autoposts/shared';
import { QueryCacheKey } from '@base/const';

export const useLazyUserProfile: LazyQuery<UserProfile> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: [QueryCacheKey.UserProfile],
    queryFn: fetchUserProfile,
    enabled: false,
    retry: false,
  });

  return [refetch, rest];
};

export const useUserProfile: Query<UserProfile> = () => {
  return useQuery({
    queryKey: [QueryCacheKey.UserProfile],
    queryFn: fetchUserProfile,
    enabled: true,
    retry: false,
  });
};
