import { Elysia } from 'elysia';
import mongoose from 'mongoose';
import { HttpStatus, PostErrors, createPostSchema, updatePostSchema } from '@autoposts/shared';
import Posts from '@model/posts';
import { authGuard } from '@plugins/auth';

export const postRoutes = new Elysia({ prefix: '/posts' })
  .use(authGuard)

  // ─── GET /posts/latest ────────────────────────────────────────────────────
  // Returns the most recently generated article for the authenticated user.
  .get('/latest', async ({ user, set }) => {
    const post = await Posts.findOne({ userId: user!._id }).sort({ createdAt: -1 }).lean();

    if (!post) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: PostErrors.NOT_FOUND };
    }

    set.status = HttpStatus.OK;
    return { data: post };
  })

  // ─── GET /posts ───────────────────────────────────────────────────────────
  // Returns all articles for the authenticated user, newest first.
  .get('/', async ({ user, set }) => {
    const posts = await Posts.find({ userId: user!._id }).sort({ createdAt: -1 }).lean();

    set.status = HttpStatus.OK;
    return { data: posts };
  })

  // ─── POST /posts ──────────────────────────────────────────────────────────
  // Creates a new post attributed to the authenticated user.
  .post('/', async ({ body, user, set }) => {
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.issues[0]?.message ?? PostErrors.CREATE_FAILED,
      };
    }

    const { title, article } = parsed.data;

    try {
      const post = await Posts.create({
        title,
        article,
        userId: new mongoose.Types.ObjectId(user!._id),
      });
      set.status = HttpStatus.CREATED;
      return { data: post };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: PostErrors.CREATE_FAILED };
    }
  })

  // ─── PUT /posts/:id ───────────────────────────────────────────────────────
  // Updates a post — only if it belongs to the authenticated user.
  .put('/:id', async ({ params, body, user, set }) => {
    const parsed = updatePostSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.issues[0]?.message ?? PostErrors.UPDATE_FAILED,
      };
    }

    try {
      const post = await Posts.findById(params.id);
      if (!post) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: PostErrors.NOT_FOUND };
      }

      // Ownership check
      if (post.userId.toString() !== user!._id) {
        set.status = HttpStatus.FORBIDDEN;
        return { hasErrors: true, error: PostErrors.FORBIDDEN };
      }

      const updated = await Posts.findByIdAndUpdate(params.id, parsed.data, { new: true }).lean();
      set.status = HttpStatus.OK;
      return { data: updated };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: PostErrors.UPDATE_FAILED };
    }
  });
