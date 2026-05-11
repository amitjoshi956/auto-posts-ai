import { z } from 'zod';
import {
  TopicPayloadSchema,
  TopicResponseSchema,
  UpdateTopicSchema,
} from '../schemas/topic.schema';

export type TopicPayload = z.infer<typeof TopicPayloadSchema>;

export type UpdateTopicPayload = z.infer<typeof UpdateTopicSchema>;

export type Topic = z.infer<typeof TopicResponseSchema>;
