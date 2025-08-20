import apiClient from '@base/config/axios';
import { Post } from '@base/type';

export const getAllPosts = (): Promise<Post[]> => {
  return apiClient.get('/posts');
};

export const getGeneratedPost = (): Promise<Post> => {
  return apiClient.get('/posts/generated');
};
