import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '@config/env';
import { QueueName, JobName } from '@config/constants';
import { handleGenerateJob } from '@jobs/post-engine';

const redisConnection = new IORedis(env.redisUrl, {
  maxRetriesPerRequest: null,
});

export const postGenerationWorker = new Worker(
  QueueName.PostGeneration,
  async (job) => {
    if (job.name === JobName.Generate) {
      return await handleGenerateJob(job);
    }

    return { success: false, message: `Unknown job type: ${job.name}` };
  },
  {
    connection: redisConnection,
  }
);

postGenerationWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed:`, job.data);
});

postGenerationWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

postGenerationWorker.on('error', (err) => {
  console.error('❌ Worker error:', err);
});
