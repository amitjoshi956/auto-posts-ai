import { z } from 'zod';
import { CreateTopicSchema, UpdateTopicSchema, TopicResponseSchema } from '../schemas/topic.schema';

export type CreateTopicPayload = z.infer<typeof CreateTopicSchema>;

export type UpdateTopicPayload = z.infer<typeof UpdateTopicSchema>;

export type Topic = z.infer<typeof TopicResponseSchema>;
