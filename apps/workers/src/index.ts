import { Worker } from 'bullmq';
import {
  type Queue,
  Queues,
  Jobs,
  Logger,
  connectToRedis,
  createQueue,
  QueueDefaults,
  QueuePrefixes,
  HttpStatus,
} from '@autoposts/shared';
import { env } from '@config/env';
import { handleGenerateJob, startRecoveryScanner } from '@jobs/.';

const logger = new Logger('workers');
const redis = connectToRedis(env.redisUrl);

const postEngineQueue: Queue = createQueue(
  Queues.PostEngine,
  redis,
  {
    attempts: QueueDefaults.MAX_ATTEMPTS,
    backoff: { type: QueueDefaults.BACKOFF_TYPE, delay: QueueDefaults.BACKOFF_DELAY_MS },
    removeOnComplete: QueueDefaults.REMOVE_ON_COMPLETE,
    removeOnFail: QueueDefaults.REMOVE_ON_FAIL,
  },
  QueuePrefixes.PostEngine
);

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

Bun.serve({
  port: env.port,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/health' || url.pathname === '/') {
      return new Response(JSON.stringify({ status: 'ok', service: 'workers' }), {
        status: HttpStatus.OK,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: HttpStatus.NOT_FOUND });
  },
});

logger.logInfo(`Health check server listening on port ${env.port}`);
