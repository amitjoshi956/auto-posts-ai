import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/validation';

export const loginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Invalid email format'),
  password: z.string().regex(PASSWORD_REGEX, 'Password must be 8-64 characters with no spaces.'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50),
});
