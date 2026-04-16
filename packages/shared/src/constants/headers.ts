// HTTP header name constants — single source of truth for both frontend and backend.
// Migrated from auto-posts-ai.core/src/base/config/headers.json

export const Headers = {
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
} as const;
