import apiClient from '@base/config/axios';
import type { UserProfile } from '@autoposts/shared';

export const loginUser = (email: string, password: string): Promise<UserProfile> => {
  return apiClient.post('/auth/login', { email, password });
};

export const signupUser = (
  email: string,
  password: string,
  fullName: string
): Promise<UserProfile> => {
  return apiClient.post('/auth/signup', { email, password, fullName });
};

export const logoutUser = (): Promise<void> => {
  return apiClient.post('/auth/logout');
};

export const fetchUserProfile = (): Promise<UserProfile> => {
  return apiClient.get('/user/me');
};
