import { Elysia } from 'elysia';
import mongoose from 'mongoose';
import {
  HttpStatus,
  PostStatus,
  BasePermission,
  SchedulePostSchema,
  UpdatePostSchema,
  GetPostsQuerySchema,
  PostModel,
} from '@autoposts/shared';
import { PostErrors, JobName } from '@base/const';
import { postGenerationQueue } from '@base/config/queue';
import { authGuard, requirePermission } from '@plugins/.';

export const postRoutes = new Elysia({ prefix: '/posts' })
  .use(authGuard)

  // ─── GET /posts/latest ────────────────────────────────────────────────────
  // Returns the most recently generated article for the authenticated user.
  .get('/latest', async ({ user, set }) => {
    const post = await PostModel.findOne({
      userId: user!._id,
      status: PostStatus.Ready,
      article: { $ne: '' },
    })
      .sort({ plannedFor: -1 })
      .lean();

    if (!post) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: PostErrors.NOT_FOUND };
    }

    set.status = HttpStatus.OK;
    return { data: post };
  })

  // ─── GET /posts ───────────────────────────────────────────────────────────
  // Returns all articles for the authenticated user, newest first.
  // Accepts optional ?topicId= and ?status= query params to filter.
  .get(
    '/',
    async ({ user, set, query }) => {
      const filter: Record<string, unknown> = { userId: user!._id };

      if (query.topicId) {
        filter.topicId = new mongoose.Types.ObjectId(query.topicId);
      }

      if (query.status) {
        filter.status = query.status;
      }

      const posts = await PostModel.find(filter).sort({ createdAt: -1 }).lean();

      set.status = HttpStatus.OK;
      return { data: posts };
    },
    {
      query: GetPostsQuerySchema,
    }
  )

  // ─── DELETE /posts/topic/:topicId ─────────────────────────────────────────
  // Bulk-deletes all posts for a given topic.
  // Must be registered BEFORE the generic /:id routes to avoid path collision.
  .use(requirePermission(BasePermission.DELETE))
  .delete('/topic/:topicId', async ({ params, user, set }) => {
    try {
      const filter: Record<string, unknown> = {
        topicId: new mongoose.Types.ObjectId(params.topicId),
      };

      // SUPER users can delete any user's posts for this topic;
      // regular users are scoped to their own posts.
      if (!user!.permissions?.includes(BasePermission.SUPER)) {
        filter.userId = new mongoose.Types.ObjectId(user!._id);
      }

      const result = await PostModel.deleteMany(filter);

      set.status = HttpStatus.OK;
      return { data: { deletedCount: result.deletedCount } };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: PostErrors.BULK_DELETE_FAILED };
    }
  })

  // ─── GET /posts/:id ───────────────────────────────────────────────────────
  // Returns a single post by ID with ownership check.
  .get('/:id', async ({ params, user, set }) => {
    try {
      const post = await PostModel.findById(params.id).lean();

      if (!post) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: PostErrors.NOT_FOUND };
      }

      // Ownership check — only the post owner can view it
      if (post.userId.toString() !== user!._id) {
        set.status = HttpStatus.FORBIDDEN;
        return { hasErrors: true, error: PostErrors.FORBIDDEN };
      }

      set.status = HttpStatus.OK;
      return { data: post };
    } catch {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: PostErrors.NOT_FOUND };
    }
  })

  // ─── POST /posts ──────────────────────────────────────────────────────────
  // Creates a new draft post. If plannedFor is set, enqueues a delayed
  // BullMQ generation job. Server enforces status=draft and article=''.
  .post(
    '/',
    async ({ body, user, set }) => {
      const { title, plan, plannedFor, topicId, tags } = body;

      try {
        const post = await PostModel.create({
          title,
          plan,
          tags,
          status: PostStatus.Draft,
          article: '',
          plannedFor: plannedFor ? new Date(plannedFor) : null,
          topicId: new mongoose.Types.ObjectId(topicId),
          userId: new mongoose.Types.ObjectId(user!._id),
        });

        const delay = plannedFor ? Math.max(new Date(plannedFor).getTime() - Date.now(), 0) : 0;
        await postGenerationQueue.add(JobName.Generate, { postId: post._id.toString() }, { delay });

        set.status = HttpStatus.CREATED;
        return { data: post };
      } catch {
        set.status = HttpStatus.INTERNAL_SERVER_ERROR;
        return { hasErrors: true, error: PostErrors.CREATE_FAILED };
      }
    },
    {
      body: SchedulePostSchema,
    }
  )

  // ─── POST /posts/:id/trigger ────────────────────────────────────────────────
  // Immediately enqueues a generation job.
  .post('/:id/trigger', async ({ params, user, set }) => {
    try {
      const post = await PostModel.findById(params.id);

      if (!post) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: PostErrors.NOT_FOUND };
      }

      if (post.userId.toString() !== user!._id) {
        set.status = HttpStatus.FORBIDDEN;
        return { hasErrors: true, error: PostErrors.FORBIDDEN };
      }

      await postGenerationQueue.add(JobName.Generate, {
        postId: post._id.toString(),
      });

      set.status = HttpStatus.OK;
      return { data: { triggered: true } };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: PostErrors.ENQUEUE_FAILED };
    }
  })

  // ─── PUT /posts/:id ───────────────────────────────────────────────────────
  // Updates a post — only if it belongs to the authenticated user.
  .put(
    '/:id',
    async ({ params, body, user, set }) => {
      try {
        const post = await PostModel.findById(params.id);
        if (!post) {
          set.status = HttpStatus.NOT_FOUND;
          return { hasErrors: true, error: PostErrors.NOT_FOUND };
        }

        // Ownership check
        if (post.userId.toString() !== user!._id) {
          set.status = HttpStatus.FORBIDDEN;
          return { hasErrors: true, error: PostErrors.FORBIDDEN };
        }

        const updated = await PostModel.findByIdAndUpdate(params.id, body, { new: true }).lean();
        set.status = HttpStatus.OK;
        return { data: updated };
      } catch {
        set.status = HttpStatus.INTERNAL_SERVER_ERROR;
        return { hasErrors: true, error: PostErrors.UPDATE_FAILED };
      }
    },
    {
      body: UpdatePostSchema,
    }
  )

  // ─── DELETE /posts/:id ─────────────────────────────────────────────────────
  // Deletes a single post. Ownership check or SUPER bypass.
  .delete('/:id', async ({ params, user, set }) => {
    try {
      const post = await PostModel.findById(params.id);

      if (!post) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: PostErrors.NOT_FOUND };
      }

      const isOwner = post.userId.toString() === user!._id;
      const isSuper = user!.permissions?.includes(BasePermission.SUPER);

      if (!isOwner && !isSuper) {
        set.status = HttpStatus.FORBIDDEN;
        return { hasErrors: true, error: PostErrors.FORBIDDEN };
      }

      await PostModel.findByIdAndDelete(params.id);

      set.status = HttpStatus.OK;
      return { data: { deleted: true } };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: PostErrors.DELETE_FAILED };
    }
  });
