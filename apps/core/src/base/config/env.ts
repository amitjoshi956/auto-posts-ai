import z from 'zod';

const envSchema = z.object({
  port: z.coerce.number(),
  apiKey: z.string(),
  nodeEnv: z.enum(['development', 'production']),
  dbUri: z.url(),
  dbName: z.string(),
  jwtSecret: z.string(),
  allowedOrigins: z.array(z.string()),
  internalApiKey: z.string(),
});

export const env = envSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,

  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  apiKey: process.env.API_KEY,
  internalApiKey: process.env.INTERNAL_API_KEY,

  dbUri: process.env.DB_CONNECT,
  dbName: process.env.DB_NAME,
});
