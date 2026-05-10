import { qClient } from '@api/client';
import { getLatestPost, getAllPosts, getPostById, updatePost, deletePost } from '../post-service';
import { createQuery, createMutation } from '@common/utils/query';
import { QueryCacheKey } from '@base/const';
import type { Post, UpdatePostPayload } from '@autoposts/shared';

// ─── Queries ────────────────────────────────────────────────────────────────

export const useLatestPost = createQuery<Post>(
  [QueryCacheKey.GeneratedPost],
  () => getLatestPost(),
  { retry: false }
);

export const usePosts = createQuery<Post[]>([QueryCacheKey.Posts], () => getAllPosts(), {
  retry: false,
});

export const usePostById = (id: string) =>
  createQuery<Post>([QueryCacheKey.Posts, id], () => getPostById(id), { enabled: !!id });

// ─── Mutations ──────────────────────────────────────────────────────────────

export const useUpdatePost = createMutation<Post, { id: string; payload: UpdatePostPayload }>(
  ({ id, payload }) => updatePost(id, payload),
  {
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.GeneratedPost] });
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.Posts] });
    },
  }
);

export const useDeletePost = createMutation<{ deleted: boolean }, string>((id) => deletePost(id), {
  onSuccess: () => {
    qClient.invalidateQueries({ queryKey: [QueryCacheKey.Posts] });
    qClient.invalidateQueries({ queryKey: [QueryCacheKey.GeneratedPost] });
  },
});
