export const HttpStatus = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 3xx Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
} as const;

export const HttpHeaders = {
  ContentType: 'Content-Type',
  Accept: 'Accept',
  Authorization: 'Authorization',
  ClearSiteData: 'Clear-Site-Data',
  XContentTypeOptions: 'X-Content-Type-Options',
  XFrameOptions: 'X-Frame-Options',
  XXSSProtection: 'X-XSS-Protection',
  AccessControlAllowOrigin: 'Access-Control-Allow-Origin',
  AccessControlAllowMethods: 'Access-Control-Allow-Methods',
  AccessControlAllowHeaders: 'Access-Control-Allow-Headers',
  AccessControlAllowCredentials: 'Access-Control-Allow-Credentials',
  AccessControlExposeHeaders: 'Access-Control-Expose-Headers',
  XInternalKey: 'X-Internal-Key',
} as const;
