import z from 'zod';

const envSchema = z.object({
  port: z.coerce.number(),
  nodeEnv: z.enum(['development', 'production']),
  dbUri: z.url(),
  dbName: z.string(),
  redisUrl: z.string(),
  geminiApiKey: z.string(),
});

export const env = envSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  redisUrl: process.env.REDIS_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  dbUri: process.env.DB_CONNECT,
  dbName: process.env.DB_NAME,
});
