import { z } from 'zod';
import {
  CreatePostSchema,
  UpdatePostSchema,
  PostSchema,
  SchedulePostSchema,
} from '../schemas/post.schema';

export type PostContent = z.infer<typeof CreatePostSchema>;

export type UpdatePostPayload = z.infer<typeof UpdatePostSchema>;

export type Post = z.infer<typeof PostSchema>;

export type SchedulePostPayload = z.infer<typeof SchedulePostSchema>;
