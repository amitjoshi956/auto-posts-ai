import { z } from 'zod';
import { TopicDefaults, HexColorRegex } from '../constants';

export const TopicPayloadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z
    .string()
    .max(
      TopicDefaults.DESCRIPTION_MAX_LENGTH,
      `Description cannot exceed ${TopicDefaults.DESCRIPTION_MAX_LENGTH} characters`
    )
    .optional(),
  parentId: z.string().nullable().optional(),
  color: z.string().regex(HexColorRegex, 'Invalid color hex code').optional().nullable(),
});

export const UpdateTopicSchema = TopicPayloadSchema.partial();

export const TopicResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  parentId: z.string().nullable(),
  userId: z.string(),
  color: z.string().regex(HexColorRegex, 'Invalid color hex code').optional().nullable(),
  createdAt: z.union([z.string(), z.date()]),
});
