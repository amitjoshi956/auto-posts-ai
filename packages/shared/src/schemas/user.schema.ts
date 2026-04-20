import { z } from 'zod';
import { EmailRegex, PasswordRegex } from '../constants/validation';

export const LoginSchema = z.object({
  email: z.string().regex(EmailRegex, 'Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const SignupSchema = z.object({
  email: z.string().regex(EmailRegex, 'Invalid email format'),
  password: z.string().regex(PasswordRegex, 'Password must be 8-64 characters with no spaces.'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50),
});
