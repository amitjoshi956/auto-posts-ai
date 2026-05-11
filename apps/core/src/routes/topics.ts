import { Elysia } from 'elysia';
import mongoose from 'mongoose';
import { HttpStatus, TopicErrors, TopicPayloadSchema, UpdateTopicSchema } from '@autoposts/shared';
import Topic from '@model/topic';
import { authGuard } from '@plugins/auth';

export const topicRoutes = new Elysia({ prefix: '/topics' })
  .use(authGuard)

  // ─── GET /topics ──────────────────────────────────────────────────────────
  // Returns all topics for the authenticated user, newest first.
  .get('/', async ({ user, set }) => {
    const topics = await Topic.find({ userId: user!._id }).sort({ createdAt: -1 }).lean();

    set.status = HttpStatus.OK;
    return { data: topics };
  })

  // ─── GET /topics/:id ──────────────────────────────────────────────────────
  // Returns a single topic — must belong to the authenticated user.
  .get('/:id', async ({ params, user, set }) => {
    const topic = await Topic.findById(params.id).lean();

    if (!topic) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: TopicErrors.NOT_FOUND };
    }

    if (topic.userId.toString() !== user!._id) {
      set.status = HttpStatus.FORBIDDEN;
      return { hasErrors: true, error: TopicErrors.FORBIDDEN };
    }

    set.status = HttpStatus.OK;
    return { data: topic };
  })

  // ─── POST /topics ─────────────────────────────────────────────────────────
  // Creates a new topic for the authenticated user.
  .post(
    '/',
    async ({ body, user, set }) => {
      const { title, description, parentId } = body;

      try {
        const topic = await Topic.create({
          title,
          description,
          parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
          userId: new mongoose.Types.ObjectId(user!._id),
        });

        set.status = HttpStatus.CREATED;
        return { data: topic };
      } catch {
        set.status = HttpStatus.INTERNAL_SERVER_ERROR;
        return { hasErrors: true, error: TopicErrors.CREATE_FAILED };
      }
    },
    {
      body: TopicPayloadSchema,
    }
  )

  // ─── PUT /topics/:id ──────────────────────────────────────────────────────
  // Updates title and/or description.
  .put(
    '/:id',
    async ({ params, body, user, set }) => {
      const topic = await Topic.findById(params.id);

      if (!topic) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: TopicErrors.NOT_FOUND };
      }

      if (topic.userId.toString() !== user!._id) {
        set.status = HttpStatus.FORBIDDEN;
        return { hasErrors: true, error: TopicErrors.FORBIDDEN };
      }

      try {
        const updated = await Topic.findByIdAndUpdate(params.id, body, { new: true }).lean();

        set.status = HttpStatus.OK;
        return { data: updated };
      } catch {
        set.status = HttpStatus.INTERNAL_SERVER_ERROR;
        return { hasErrors: true, error: TopicErrors.UPDATE_FAILED };
      }
    },
    {
      body: UpdateTopicSchema,
    }
  )

  // ─── DELETE /topics/:id ───────────────────────────────────────────────────
  // Deletes a topic — ownership check enforced.
  .delete('/:id', async ({ params, user, set }) => {
    const topic = await Topic.findById(params.id);

    if (!topic) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: TopicErrors.NOT_FOUND };
    }

    if (topic.userId.toString() !== user!._id) {
      set.status = HttpStatus.FORBIDDEN;
      return { hasErrors: true, error: TopicErrors.FORBIDDEN };
    }

    try {
      await Topic.findByIdAndDelete(params.id);
      set.status = HttpStatus.OK;
      return { data: { message: 'Topic deleted successfully' } };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: TopicErrors.DELETE_FAILED };
    }
  });
