import apiClient from '@base/config/axios';
import { AuthResponse } from '@base/type/user';

export const loginUser = (email: string, password: string): Promise<AuthResponse> => {
  return apiClient.post('/auth/login', { email, password });
};
