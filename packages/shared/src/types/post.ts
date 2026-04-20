import { z } from 'zod';
import { CreatePostSchema, UpdatePostSchema, PostResponseSchema } from '../schemas/post.schema';

export type PostContent = z.infer<typeof CreatePostSchema>;

export type UpdatePostPayload = z.infer<typeof UpdatePostSchema>;

export type Post = z.infer<typeof PostResponseSchema>;
