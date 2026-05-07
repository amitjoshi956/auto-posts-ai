import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { HttpHeaders, HttpMethods } from '@autoposts/shared';
import { env } from '@base/config/env';
import { connectDB } from '@plugins/db';
import { authRoutes, postRoutes, userRoutes, topicRoutes } from '@routes/.';

const PORT = env.port;
const ALLOWED_ORIGINS = env.allowedOrigins;

// Connect to database first
await connectDB();

const app = new Elysia()
  .use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
      allowedHeaders: [HttpHeaders.ContentType],
      methods: [
        HttpMethods.GET,
        HttpMethods.POST,
        HttpMethods.PUT,
        HttpMethods.DELETE,
        HttpMethods.OPTIONS,
      ],
      exposeHeaders: [HttpHeaders.ClearSiteData],
    })
  )
  .use(authRoutes)
  .use(userRoutes)
  .use(postRoutes)
  .use(topicRoutes)
  .get('/health', () => ({ status: 'ok' }))
  .listen(PORT);

console.log(`✅ Server is running on Port = ${PORT} 🚀🚀`);

export type App = typeof app;
