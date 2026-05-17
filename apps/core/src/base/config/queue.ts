import { Queue } from 'bullmq';
import { QueueName, JobDefaults } from '@base/const';
import { env } from './env';

const connection = { url: env.redisUrl };

export const postGenerationQueue = new Queue(QueueName.PostGeneration, {
  connection,
  defaultJobOptions: {
    attempts: JobDefaults.MAX_ATTEMPTS,
    backoff: { type: 'exponential', delay: JobDefaults.BACKOFF_DELAY_MS },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
