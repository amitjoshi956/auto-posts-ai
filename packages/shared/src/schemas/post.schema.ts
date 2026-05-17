import { z } from 'zod';
import { PostDefaults, PostStatus } from '../constants/';

export const SchedulePostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  plan: z.string().max(PostDefaults.PLAN_MAX_LENGTH).optional().default(''),
  plannedFor: z.iso.datetime().nullable().default(null),
  topicId: z.string().min(1, 'Topic ID is required'),
  tags: z.array(z.string()).optional().default([]),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  article: z.string().max(PostDefaults.LINKEDIN_POST_MAX_LENGTH).optional().default(''),
  plan: z.string().max(PostDefaults.PLAN_MAX_LENGTH).optional().default(''),
  plannedFor: z.iso.datetime().nullable().default(null),
  topicId: z.string().min(1, 'Topic ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  status: z.enum(PostStatus).optional().default(PostStatus.Draft),
  tags: z.array(z.string()).optional().default([]),
});

export const GetPostsQuerySchema = z.object({
  topicId: z.string().optional(),
  status: z.enum(PostStatus).optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();

export const PostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  article: z.string(),
  plan: z.string(),
  status: z.string(),
  plannedFor: z.string().nullable(),
  tags: z.array(z.string()),
  userId: z.string(),
  topicId: z.string(),
});
