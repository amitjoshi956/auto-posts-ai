import { GoogleGenAI } from '@google/genai';
import { env } from '@config/env';

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

export async function generateWithGemini({
  title,
  plan,
}: {
  title: string;
  plan: string;
}): Promise<string> {
  const prompt = `You are a LinkedIn content strategist and ghostwriter. Write a professional, engaging LinkedIn post about the following topic.

Topic: ${title}

Additional context or plan:
${plan}

Guidelines:
- Write in a conversational yet professional tone
- Open with a hook that grabs attention
- Use short paragraphs and line breaks for readability
- Include relevant insights or a personal perspective
- End with a clear call-to-action or thought-provoking question
- Use 3-5 relevant hashtags at the end
- Keep the post between 800-1500 characters for optimal engagement`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || '';
}
