export const Queues = {
  PostEngine: 'post-engine',
} as const;

export const QueueDefaults = {
  MAX_ATTEMPTS: 3,
  BACKOFF_TYPE: 'exponential',
  BACKOFF_DELAY_MS: 5000,
  REMOVE_ON_COMPLETE: true,
  REMOVE_ON_FAIL: false,
  PREFIX: 'apai',
} as const;

export const QueuePrefixes = {
  PostEngine: 'post-engine',
} as const;

export const Jobs = {
  Generate: 'generate',
  Schedule: 'schedule',
} as const;
