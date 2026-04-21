import { isDevEnv } from '@base/config/env';

export const API_BASE_URL = isDevEnv ? import.meta.env.VITE_API_BASE_URL : '/api';

export const API_TIMEOUT = 10000;

export * from './storage';
export * from './api';
