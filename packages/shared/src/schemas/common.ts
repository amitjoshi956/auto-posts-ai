import { z } from 'zod';
import { EmailRegex, PasswordRegex } from '../constants';

export const EmailSchema = z.string().regex(EmailRegex, 'Invalid email format');

export const PasswordSchema = z
  .string()
  .regex(PasswordRegex, 'Password must be 8-64 characters with no spaces.');
