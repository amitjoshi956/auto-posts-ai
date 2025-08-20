import apiClient from '@base/config/axios';
import { AuthResponse } from '@src/base/type/user';

export const loginUser = (username: string, password: string): Promise<AuthResponse> => {
  return apiClient.post('/auth/login', { username, password });
};
