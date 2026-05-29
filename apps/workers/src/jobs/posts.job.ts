import { PostModel, PostStatus, Logger } from '@autoposts/shared';
import { Job } from 'bullmq';
import { generateWithGemini } from '@services/gemini';
import { notifyUser } from '@services/notify';

const logger = new Logger('workers');

export async function handleGenerateJob(
  job: Job
): Promise<{ success: boolean; postId?: string; message?: string }> {
  const { postId, userId } = job.data;

  logger.logInfo('Processing generation job', { postId, jobId: job.id });

  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error(`Post not found: ${postId}`);
  }

  if (post.status !== PostStatus.Draft) {
    logger.logInfo('Skipping job — post not in draft status', {
      postId,
      currentStatus: post.status,
    });
    return { success: true, message: 'Post is not in draft status' };
  }

  await PostModel.findByIdAndUpdate(post._id, {
    status: PostStatus.Generating,
  });

  try {
    const article = await generateWithGemini({
      title: post.title,
      plan: post.plan,
    });

    const updates: Record<string, unknown> = {
      article,
      status: PostStatus.Ready,
    };

    if (!post.plannedFor) {
      updates.plannedFor = new Date();
    }

    await PostModel.findByIdAndUpdate(post._id, updates);

    logger.logInfo('Generation complete', { postId });
    return { success: true, postId: post._id.toString() };
  } catch (error) {
    const isLastAttempt = job.attemptsMade >= (job.opts.attempts ?? 1) - 1;

    if (isLastAttempt) {
      await PostModel.findByIdAndUpdate(post._id, {
        status: PostStatus.Failed,
      });
      logger.logError('Generation failed — all retries exhausted', {
        postId,
        attempts: job.attemptsMade + 1,
        error: String(error),
      });
      await notifyUser(
        userId ?? post.userId.toString(),
        post._id.toString(),
        `Article generation failed after ${job.attemptsMade + 1} attempts: ${String(error)}`
      );
    } else {
      await PostModel.findByIdAndUpdate(post._id, {
        status: PostStatus.Draft,
      });
      logger.logWarning('Generation attempt failed — will retry', {
        postId,
        attempt: job.attemptsMade + 1,
        error: String(error),
      });
    }

    throw error;
  }
}
