import { Queue } from 'bullmq';
import { PostStatus, Logger, Time } from '@autoposts/shared';
import { PostModel } from '@autoposts/be-specific';
import { notifyUser } from '@services/notify';

const logger = new Logger('workers');
const RECOVERY_INTERVAL_MS = Time.mins(5);

export function startRecoveryScanner(queue: Queue): void {
  logger.logInfo('Recovery scanner started', {
    intervalMs: RECOVERY_INTERVAL_MS,
  });

  setInterval(async () => {
    try {
      const failedJobs = await queue.getFailed(0, 50);

      if (failedJobs.length === 0) return;

      logger.logInfo('Recovery scan found failed jobs', {
        count: failedJobs.length,
      });

      for (const job of failedJobs) {
        const { postId, userId } = job.data;

        logger.logWarning('Failed job detected in DLQ', {
          jobId: job.id,
          postId,
          failedReason: job.failedReason,
          attemptsMade: job.attemptsMade,
        });

        // Ensure post is marked as failed
        if (postId) {
          const post = await PostModel.findById(postId);
          if (post && post.status !== PostStatus.Failed) {
            await PostModel.findByIdAndUpdate(postId, {
              status: PostStatus.Failed,
            });
          }
        }

        if (userId && postId) {
          await notifyUser(
            userId,
            postId,
            `Job permanently failed: ${job.failedReason ?? 'Unknown error'}`
          );
        }
      }
    } catch (err) {
      logger.logError('Recovery scan failed', { error: String(err) });
    }
  }, RECOVERY_INTERVAL_MS);
}
