import apiClient from '@base/config/axios';
import type { Post, UpdatePostPayload } from '@autoposts/shared';
import { ApiRoutes } from '@base/const/api';

const PostRoutes = ApiRoutes.Posts;

export const getLatestPost = (): Promise<Post> => {
  return apiClient.get(PostRoutes.Latest);
};

export const getAllPosts = (topicId?: string): Promise<Post[]> => {
  const params = topicId ? { topicId } : undefined;
  return apiClient.get(PostRoutes.Base, { params });
};

export const getPostById = (id: string): Promise<Post> => {
  return apiClient.get(PostRoutes.ById(id));
};

export const updatePost = (id: string, payload: UpdatePostPayload): Promise<Post> => {
  return apiClient.put(PostRoutes.ById(id), payload);
};

export const deletePost = (id: string): Promise<{ deleted: boolean }> => {
  return apiClient.delete(PostRoutes.ById(id));
};
