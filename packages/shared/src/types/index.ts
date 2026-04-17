import { z } from 'zod';
import { loginSchema, signupSchema } from '../schemas/user.schema';
import { createPostSchema, updatePostSchema, postResponseSchema } from '../schemas/post.schema';
import { CreateTopicSchema, UpdateTopicSchema, TopicResponseSchema } from '../schemas/topic.schema';
import { BasePermission } from '../enums/permissions';

// ─── Auth Types ───────────────────────────────────────────────────────────────

export type LoginPayload = z.infer<typeof loginSchema>;
export type SignupPayload = z.infer<typeof signupSchema>;

// ─── User Types ───────────────────────────────────────────────────────────────

export type UserProfile = {
  email: string;
  fullName: string;
  permissions: BasePermission[];
};

// JWT payload stored in cookie
export type JwtPayload = {
  _id: string;
  email: string;
};

// ─── Post Types ───────────────────────────────────────────────────────────────

export type PostContent = z.infer<typeof createPostSchema>;
export type UpdatePostPayload = z.infer<typeof updatePostSchema>;
export type Post = z.infer<typeof postResponseSchema>;

// ─── Topic Types ──────────────────────────────────────────────────────────────

export type CreateTopicPayload = z.infer<typeof CreateTopicSchema>;
export type UpdateTopicPayload = z.infer<typeof UpdateTopicSchema>;
export type Topic = z.infer<typeof TopicResponseSchema>;

// ─── Generic API Types ────────────────────────────────────────────────────────

export type APIResponse<T> = {
  hasErrors?: boolean;
  error?: string;
  data?: T;
};

export type APIError = {
  hasErrors: true;
  error: string;
};
