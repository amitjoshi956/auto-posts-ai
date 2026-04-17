import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import { HttpStatus, ErrorMessages, COOKIE_NAME } from '@autoposts/shared';
import type { JwtPayload } from '@autoposts/shared';

const extractUser = new Elysia({ name: 'extract-user' }).derive({ as: 'global' }, ({ cookie }) => {
  const token = cookie[COOKIE_NAME]?.value;
  if (!token) return { user: null as JwtPayload | null };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return { user: payload as JwtPayload | null };
  } catch {
    return { user: null as JwtPayload | null };
  }
});

export const authGuard = new Elysia({ name: 'auth-guard' })
  .use(extractUser)
  .onBeforeHandle({ as: 'scoped' }, ({ user, set }) => {
    if (!user) {
      set.status = HttpStatus.UNAUTHORIZED;
      return { hasErrors: true, error: ErrorMessages.NO_AUTH_TOKEN };
    }
  });
