import { connectToRedis, createQueue } from '@autoposts/shared/config';
import { Queues, JobDefaults } from '@autoposts/shared';
import type { Queue } from '@autoposts/shared/config';
import { env } from './env';

const redis = connectToRedis(env.redisUrl);

export const postEngineQueue: Queue = createQueue(Queues.PostEngine, redis, {
  attempts: JobDefaults.MAX_ATTEMPTS,
  backoff: { type: 'exponential', delay: JobDefaults.BACKOFF_DELAY_MS },
  removeOnComplete: true,
  removeOnFail: false,
});
