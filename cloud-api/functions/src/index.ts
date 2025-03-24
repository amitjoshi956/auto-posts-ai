import * as admin from 'firebase-admin';
import { loginUser, signupUser } from '@routes/auth'

const appConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
};

// Initializations
const app = admin.initializeApp(appConfig);
export const db = admin.firestore(app);


// API Keys
export function getGeminiApiKey(): string {
  return process.env.GEM_API_KEY || '';
}

export function getAPIKey(): string {
  return process.env.FB_API_KEY || '';
}

// Functions Exports
export {
  signupUser,
  loginUser
}