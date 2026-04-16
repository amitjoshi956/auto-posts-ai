import { useQuery } from '@tanstack/react-query';
import { getLatestPost, getAllPosts } from '../post-service';
import type { PLazyQuery, LazyQuery } from '@base/type';
import type { Post } from '@autoposts/shared';

export const useGetLatestPost: LazyQuery<Post> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: ['latestPost'],
    queryFn: () => getLatestPost(),
    enabled: false,
  });
  return [refetch, rest];
};

export const useGetPosts: PLazyQuery<void, Post[]> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
    enabled: false,
  });
  return [refetch, rest];
};
