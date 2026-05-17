export const PostErrors = {
  FETCH_FAILED: 'Failed to fetch posts',
  NOT_FOUND: 'Post not found',
  CREATE_FAILED: 'Failed to create post',
  UPDATE_FAILED: 'Failed to update post',
  DELETE_FAILED: 'Failed to delete post',
  BULK_DELETE_FAILED: 'Failed to bulk-delete posts',
  FORBIDDEN: 'You do not have permission to access this post',
  ENQUEUE_FAILED: 'Failed to schedule post for generation',
};

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
