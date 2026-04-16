import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  article: z.string().min(1, 'Article content is required'),
});

export const updatePostSchema = createPostSchema.partial();

export const postResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  article: z.string(),
  userId: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
