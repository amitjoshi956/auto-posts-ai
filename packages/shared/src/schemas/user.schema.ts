import { z } from 'zod';
import { EmailSchema, PasswordSchema } from './common';

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignupSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50),
});

export const UpdatePreferencesSchema = z.object({
  generationFrequency: z.object({
    enabled: z.boolean(),
    cron: z.string().nullable().default(null),
    timezone: z.string().default('UTC'),
  }),
});
