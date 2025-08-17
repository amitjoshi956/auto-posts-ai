export const getAPIKey = () => process.env.API_KEY || '';

export const getPort = () => process.env.PORT || '';

export const getAllowedOrigins = () => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  return allowedOrigins ? allowedOrigins.split(',').map((origin) => origin.trim()) : [];
};
