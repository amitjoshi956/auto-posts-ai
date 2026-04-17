import { z } from 'zod';
import { TopicDefaults } from '../constants/values';
import { TopicStatus, USER_SETTABLE_TOPIC_STATUSES } from '../enums/topic-status';

// ISO 8601 datetime with timezone offset required (e.g. "2026-05-02T18:00:00.000Z")
const DateTimeSchema = z.string().datetime({ offset: true });

export const CreateTopicSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  plan: z
    .string()
    .max(
      TopicDefaults.PLAN_MAX_LENGTH,
      `Plan cannot exceed ${TopicDefaults.PLAN_MAX_LENGTH} characters`
    )
    .optional(),
  generationDateTime: DateTimeSchema,
  parentId: z.string().nullable().optional(),
});

export const UpdateTopicSchema = z.object({
  plan: z
    .string()
    .max(
      TopicDefaults.PLAN_MAX_LENGTH,
      `Plan cannot exceed ${TopicDefaults.PLAN_MAX_LENGTH} characters`
    )
    .optional(),
  // Required when status = 'draft'; cleared server-side when status = 'thinking' | 'archived'
  generationDateTime: DateTimeSchema.optional(),
  status: z.enum(USER_SETTABLE_TOPIC_STATUSES).optional(),
});

// Response schema — Topic type is fully inferred from this
export const TopicResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  plan: z.string().optional(),
  // Nullable: cleared when status transitions to THINKING or ARCHIVED
  generationDateTime: z.union([z.string(), z.date()]).nullable(),
  status: z.nativeEnum(TopicStatus),
  parentId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
