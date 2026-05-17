import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '@base/config/env';

export const redisConnection = new IORedis(env.redisUrl, {
  maxRetriesPerRequest: null,
});

export const postsQueue = new Queue('posts-generation', {
  connection: redisConnection,
});
