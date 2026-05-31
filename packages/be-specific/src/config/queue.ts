import { Queue, type JobsOptions } from 'bullmq';
import Redis from 'ioredis';
import { QueueDefaults } from '@autoposts/shared';

export function connectToRedis(redisUrl: string): Redis {
  const isTls = redisUrl.startsWith('rediss://');

  return new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    ...(isTls && { tls: {} }),
  });
}

export function createQueue(
  name: string,
  connection: Redis,
  defaultJobOptions?: JobsOptions,
  prefix?: string
): Queue {
  const prefixName = prefix ? `${QueueDefaults.PREFIX}:${prefix}` : QueueDefaults.PREFIX;

  return new Queue(name, { connection, defaultJobOptions, prefix: prefixName });
}

export type { Queue };
