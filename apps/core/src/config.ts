export const getPort = () => process.env.PORT || '5055';
export const getAPIKey = () => process.env.API_KEY || '';
export const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS || '';
  return origins
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
};
