import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { connectDB } from '@plugins/db';
import { authRoutes } from '@routes/auth';
import { userRoutes } from '@routes/user';
import { postRoutes } from '@routes/posts';

const PORT = Number(process.env.PORT) || 5055;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

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
  .get('/health', () => ({ status: 'ok' }))
  .listen(PORT);

console.log(`✅ Server is running on http://localhost:${PORT} 🚀🚀`);

export type App = typeof app;
