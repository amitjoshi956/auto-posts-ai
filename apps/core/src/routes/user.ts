import { Elysia } from 'elysia';
import { HttpStatus, ErrorMessages, UpdatePreferencesSchema } from '@autoposts/shared';
import User from '@model/user';
import { authGuard } from '@plugins/auth';

export const userRoutes = new Elysia({ prefix: '/user' })
  .use(authGuard)
  // ─── GET /user/me ─────────────────────────────────────────────────────────
  .get('/me', async ({ user, set }) => {
    const dbUser = await User.findById(user!._id).select('-password -__v');
    if (!dbUser) {
      set.status = HttpStatus.NOT_FOUND;
      return { hasErrors: true, error: ErrorMessages.USER_NOT_FOUND };
    }

    set.status = HttpStatus.OK;
    return {
      data: {
        email: dbUser.email,
        fullName: dbUser.fullName,
        permissions: dbUser.permissions,
        preferences: dbUser.preferences,
      },
    };
  })
  // ─── PUT /user/preferences ────────────────────────────────────────────────
  .put(
    '/preferences',
    async ({ body, user, set }) => {
      const dbUser = await User.findById(user!._id);
      if (!dbUser) {
        set.status = HttpStatus.NOT_FOUND;
        return { hasErrors: true, error: ErrorMessages.USER_NOT_FOUND };
      }

      dbUser.preferences = body;
      await dbUser.save();

      set.status = HttpStatus.OK;
      return {
        data: {
          preferences: dbUser.preferences,
        },
      };
    },
    {
      body: UpdatePreferencesSchema,
    }
  );
