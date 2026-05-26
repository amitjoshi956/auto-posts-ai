import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { env } from '@config/env';
import { QueueName, JobName } from '@const/values';
import { handleGenerateJob } from '@jobs/posts.job';

const redis = new Redis(env.redisUrl, {
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
    connection: redis,
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
