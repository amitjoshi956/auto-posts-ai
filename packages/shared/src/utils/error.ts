import { HttpStatus } from '../constants';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(HttpStatus.NOT_FOUND, `${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message, details);
    this.name = 'ValidationError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have access to this resource') {
    super(HttpStatus.FORBIDDEN, message);
    this.name = 'ForbiddenError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(HttpStatus.UNAUTHORIZED, message);
    this.name = 'UnauthorizedError';
  }
}

export class ConflictError extends AppError {
  constructor(resource: string, field: string) {
    super(HttpStatus.CONFLICT, `${resource} with this ${field} already exists`);
    this.name = 'ConflictError';
  }
}
