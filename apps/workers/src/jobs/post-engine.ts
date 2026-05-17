import { Job } from 'bullmq';
import PostModel from '@config/models';
import { generateWithGemini } from '@services/gemini';

export async function handleGenerateJob(
  job: Job
): Promise<{ success: boolean; postId?: string; message?: string }> {
  const { postId } = job.data;

  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error(`Post not found: ${postId}`);
  }

  if (post.status !== 'draft') {
    return { success: true, message: 'Post is not in draft status' };
  }

  await PostModel.findByIdAndUpdate(post._id, { status: 'generating' });

  try {
    const article = await generateWithGemini({ title: post.title, plan: post.plan });

    const updates: Record<string, unknown> = { article, status: 'ready' };

    if (!post.plannedFor) {
      updates.plannedFor = new Date();
    }

    await PostModel.findByIdAndUpdate(post._id, updates);

    return { success: true, postId: post._id.toString() };
  } catch (error) {
    if (job.attemptsMade >= job.opts.attempts!) {
      await PostModel.findByIdAndUpdate(post._id, { status: 'failed' });
      throw error;
    } else {
      await PostModel.findByIdAndUpdate(post._id, { status: 'draft' });
      throw error;
    }
  }
}

export async function handleSchedulingJob(job: Job): Promise<void> {
  const { userId } = job.data;

  const post = await PostModel.findOne({
    userId,
    status: 'draft',
    plannedFor: null,
  }).sort({ createdAt: 1 });

  if (!post) {
    return;
  }

  // Note: This creates a generation job, but the actual queue instance
  // would be managed by the worker setup. For now, just update the post.
  await PostModel.findByIdAndUpdate(post._id, { plannedFor: new Date() });
}
