import { onSchedule } from 'firebase-functions/scheduler';
import * as logger from 'firebase-functions/logger';
import axios from 'axios';
import { db, getGeminiApiKey } from '@src/.';

export const generatePost = async (prompt: string): Promise<Post> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    console.error('Error reading API Key!');
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts[0]
    ) {
      const newPost = response.data.candidates[0].content.parts[0].text;
      return newPost;
    } else {
      logger.error('Error generating post: Response has not the expected structure');
      return null;
    }
  } catch (error) {
    logger.error('Error generating post:', error);
    return null;
  }
};

export const scheduledFunction = onSchedule('02 15 * * 3', async () => {
  logger.info('Preparing new article!');
  const newPost: Post = await generatePost('');
  db.collection('posts').doc('nextPost').set({
    post: newPost,
  });
  logger.info('New article generated!');
});
