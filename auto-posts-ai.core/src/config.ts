import { DEFAULT_PORT } from './const/index.js';

export const getAPIKey = () => process.env.API_KEY || '';

export const getPort = () => process.env.PORT || DEFAULT_PORT;
