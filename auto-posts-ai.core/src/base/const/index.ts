export * from './user';
export * from './posts';

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
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/i;
export const PASSWORD_REGEX = /^[\S]{8,64}$/i;
