import { Elysia } from 'elysia';
import mongoose from 'mongoose';
import {
  HttpStatus,
  TopicErrors,
  TopicStatus,
  CreateTopicSchema,
  UpdateTopicSchema,
} from '@autoposts/shared';
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
  .post('/', async ({ body, user, set }) => {
    const parsed = CreateTopicSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.errors[0]?.message ?? TopicErrors.CREATE_FAILED,
      };
    }

    const { title, plan, generationDateTime, parentId } = parsed.data;

    try {
      const topic = await Topic.create({
        title,
        plan,
        generationDateTime: new Date(generationDateTime),
        parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
        userId: new mongoose.Types.ObjectId(user!._id),
      });

      set.status = HttpStatus.CREATED;
      return { data: topic };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: TopicErrors.CREATE_FAILED };
    }
  })

  // ─── PUT /topics/:id ──────────────────────────────────────────────────────
  // Updates plan, generationDateTime, and/or status.
  //
  // Status transition side-effects (server-enforced):
  //   → THINKING | ARCHIVED : clears generationDateTime to null
  //   → DRAFT               : generationDateTime is required in body
  .put('/:id', async ({ params, body, user, set }) => {
    const parsed = UpdateTopicSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.errors[0]?.message ?? TopicErrors.UPDATE_FAILED,
      };
    }

    const topic = await Topic.findById(params.id);

    if (!topic) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: TopicErrors.NOT_FOUND };
    }

    if (topic.userId.toString() !== user!._id) {
      set.status = HttpStatus.FORBIDDEN;
      return { hasErrors: true, error: TopicErrors.FORBIDDEN };
    }

    const { plan, generationDateTime, status } = parsed.data;
    const updatePayload: Record<string, unknown> = {};

    // Apply field updates
    if (plan !== undefined) updatePayload.plan = plan;

    // ── Status transition logic ──────────────────────────────────────────────
    if (status !== undefined) {
      updatePayload.status = status;

      if (status === TopicStatus.THINKING || status === TopicStatus.ARCHIVED) {
        // Clear the scheduled date — no generation will happen
        updatePayload.generationDateTime = null;
      } else if (status === TopicStatus.DRAFT) {
        // Reverting to DRAFT requires a new generation date-time
        const newDateTime = generationDateTime ?? null;
        if (!newDateTime) {
          set.status = HttpStatus.BAD_REQUEST;
          return { hasErrors: true, error: TopicErrors.GENERATION_DATE_REQUIRED };
        }
        updatePayload.generationDateTime = new Date(newDateTime);
      }
    } else if (generationDateTime !== undefined) {
      // Plain date update without a status change
      updatePayload.generationDateTime = new Date(generationDateTime);
    }

    try {
      const updated = await Topic.findByIdAndUpdate(params.id, updatePayload, { new: true }).lean();

      set.status = HttpStatus.OK;
      return { data: updated };
    } catch {
      set.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return { hasErrors: true, error: TopicErrors.UPDATE_FAILED };
    }
  })

  // ─── DELETE /topics/:id ───────────────────────────────────────────────────
  // Deletes a topic — ownership check enforced, no date guards for now.
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
