export const QueueName = {
  PostGeneration: 'post-generation',
} as const;

export const JobName = {
  Generate: 'generate',
  Schedule: 'schedule',
} as const;

export const JobDefaults = {
  MAX_ATTEMPTS: 3,
  BACKOFF_DELAY_MS: 5000,
} as const;
