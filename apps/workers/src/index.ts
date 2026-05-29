import { Worker } from 'bullmq';
import { Queues, Jobs, JobDefaults, Logger } from '@autoposts/shared';
import { connectToRedis } from '@autoposts/shared/config';
import { env } from '@config/env';
import { handleGenerateJob } from '@jobs/posts.job';
import { startRecoveryScanner } from '@jobs/recovery';
import { createQueue } from '@autoposts/shared/config';

const logger = new Logger('workers');
const redis = connectToRedis(env.redisUrl);

const postEngineQueue = createQueue(Queues.PostEngine, redis, {
  attempts: JobDefaults.MAX_ATTEMPTS,
  backoff: { type: 'exponential', delay: JobDefaults.BACKOFF_DELAY_MS },
  removeOnComplete: true,
  removeOnFail: false,
});

export const postEngineWorker = new Worker(
  Queues.PostEngine,
  async (job) => {
    if (job.name === Jobs.Generate) {
      return await handleGenerateJob(job);
    }

    logger.logWarning('Unknown job type received', {
      jobName: job.name,
      jobId: job.id,
    });
    return { success: false, message: `Unknown job type: ${job.name}` };
  },
  {
    connection: redis,
  }
);

postEngineWorker.on('completed', (job) => {
  logger.logInfo('Job completed', { jobId: job.id, data: job.data });
});

postEngineWorker.on('failed', (job, err) => {
  logger.logError('Job failed', {
    jobId: job?.id,
    error: err.message,
    attemptsMade: job?.attemptsMade,
  });
});

postEngineWorker.on('error', (err) => {
  logger.logError('Worker error', { error: err.message });
});

// Start the DLQ recovery scanner
startRecoveryScanner(postEngineQueue);

logger.logInfo('Worker service started', { queue: Queues.PostEngine });
