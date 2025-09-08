import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getGeneratedPost } from '../post-service';
import { PLazyQuery, Post } from '@base/type';

const useGetPosts: PLazyQuery<void, Post[]> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
    enabled: false,
  });

  return [refetch, rest];
};

const useGetGeneratedPost: PLazyQuery<void, Post> = () => {
  const { refetch, ...rest } = useQuery({
    queryKey: ['generatedPost'],
    queryFn: () => getGeneratedPost(),
    enabled: false,
  });

  return [refetch, rest];
};

export { useGetPosts, useGetGeneratedPost };
