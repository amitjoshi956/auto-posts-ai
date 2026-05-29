import { Queue, type JobsOptions } from 'bullmq';
import Redis from 'ioredis';

export type { Queue };

export function connectToRedis(redisUrl: string): Redis {
  return new Redis(redisUrl, { maxRetriesPerRequest: null });
}

export function createQueue(
  name: string,
  connection: Redis,
  defaultJobOptions?: JobsOptions
): Queue {
  return new Queue(name, { connection, defaultJobOptions });
}
