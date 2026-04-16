export const ErrorMessages = {
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PASSWORD:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Resource not found',
  GENERIC_ERR_MESSAGE: 'Something went wrong. Please try again later.',
  NO_AUTH_TOKEN: 'No authentication token provided',
} as const;

export const PostErrors = {
  FETCH_FAILED: 'Failed to fetch posts',
  NOT_FOUND: 'Post not found',
  CREATE_FAILED: 'Failed to create post',
  UPDATE_FAILED: 'Failed to update post',
  FORBIDDEN: 'You do not have permission to modify this post',
} as const;
