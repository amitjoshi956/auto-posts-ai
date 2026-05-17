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
  const prompt = `Write an engaging blog post about the following topic: ${title}\n\nAdditional details or plan:\n${plan}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || '';
}
