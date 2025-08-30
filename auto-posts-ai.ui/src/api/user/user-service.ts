import apiClient from '@base/config/axios';
import { User } from '@base/type/user';

export const loginUser = (email: string, password: string): Promise<User> => {
  return apiClient.post('/auth/login', { email, password });
};

export const fetchUserProfile = (): Promise<User> => {
  return apiClient.get('/user/me');
};
