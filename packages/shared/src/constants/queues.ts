export const Queues = {
  PostEngine: 'post-engine',
} as const;

export const Jobs = {
  Generate: 'generate',
  Schedule: 'schedule',
} as const;

export const JobDefaults = {
  MAX_ATTEMPTS: 3,
  BACKOFF_DELAY_MS: 5000,
} as const;
