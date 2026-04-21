import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { connectDB } from '@plugins/db';
import { authRoutes, postRoutes, userRoutes, topicRoutes } from '@routes/.';
import { getAllowedOrigins, getPort } from './config';

const PORT = getPort();
const ALLOWED_ORIGINS = getAllowedOrigins();

// Connect to database first
await connectDB();

const app = new Elysia()
  .use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
      allowedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      exposeHeaders: ['Clear-Site-Data'],
    })
  )
  .use(authRoutes)
  .use(userRoutes)
  .use(postRoutes)
  .use(topicRoutes)
  .get('/health', () => ({ status: 'ok' }))
  .listen(PORT);

console.log(`✅ Server is running on http://localhost:${PORT} 🚀🚀`);

export type App = typeof app;
