import { Worker } from 'bullmq';
import { GoogleGenAI } from '@google/genai';
import { env } from '@base/config/env';
import { QueueName } from '@base/const/posts';
import PostModel from '@model/posts';
import IORedis from 'ioredis';

const redisConnection = new IORedis(env.redisUrl, {
  maxRetriesPerRequest: null,
});

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

export const postGenerationWorker = new Worker(
  QueueName.PostGeneration,
  async (job) => {
    const { postId } = job.data;

    const post = await PostModel.findById(postId);
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    if (post.status !== 'draft') {
      return { success: true, message: 'Post is not in draft status' };
    }

    const prompt = `Write an engaging blog post about the following topic: ${post.title}\n\nAdditional details or plan:\n${post.plan}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const article = response.text;

    post.article = article || '';
    post.status = 'ready';
    await post.save();

    return { success: true, postId: post._id.toString() };
  },
  {
    connection: redisConnection,
  }
);
