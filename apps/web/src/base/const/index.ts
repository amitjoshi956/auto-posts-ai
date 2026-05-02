import { isDevEnv } from '@base/config/env';
import type { IconSize } from '@base/type';

export const API_BASE_URL = isDevEnv ? import.meta.env.VITE_API_BASE_URL : '/api';

export const API_TIMEOUT = 10000;

export const ICON_SIZE: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  base: 18,
  md: 24,
  lg: 32,
  xl: 48,
};

export * from './routes';
export * from './storage';
export * from './api';
