import apiClient from '@base/config/axios';
import type { Post } from '@autoposts/shared';

export const getLatestPost = (): Promise<Post> => {
  return apiClient.get('/posts/latest');
};

export const getAllPosts = (): Promise<Post[]> => {
  return apiClient.get('/posts');
};
