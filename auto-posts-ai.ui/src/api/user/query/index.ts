import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@api/user/user-service';
import { LazyQuery, Query, User } from '@base/type';
import { QueryCacheKey } from '@base/const';

export const useLazyUserProfile: LazyQuery<User> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: [QueryCacheKey.UserProfile],
    queryFn: fetchUserProfile,
    enabled: false,
  });

  return [refetch, rest];
};

export const useUserProfile: Query<User> = () => {
  return useQuery({
    queryKey: [QueryCacheKey.UserProfile],
    queryFn: fetchUserProfile,
    enabled: true,
  });
};
