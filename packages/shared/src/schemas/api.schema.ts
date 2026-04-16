import { z } from 'zod';

export const apiErrorSchema = z.object({
  hasErrors: z.literal(true),
  error: z.string(),
});

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    hasErrors: z.boolean().optional(),
    error: z.string().optional(),
    data: dataSchema.optional(),
  });
