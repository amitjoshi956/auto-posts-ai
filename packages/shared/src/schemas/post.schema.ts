import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  article: z.string().min(1, 'Article content is required'),
  topicId: z.string().min(1, 'Topic ID is required'),
  tags: z.array(z.string()).optional().default([]),
});

export const GetPostsQuerySchema = z.object({
  topicId: z.string().optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();

export const PostResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  article: z.string(),
  tags: z.array(z.string()),
  userId: z.string(),
  topicId: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
