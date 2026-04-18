import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import { HttpStatus, ErrorMessages, COOKIE_NAME, type JwtPayload } from '@autoposts/shared';

const extractUser = new Elysia({ name: 'extract-user' }).derive({ as: 'global' }, ({ cookie }) => {
  const token = cookie[COOKIE_NAME]?.value as string | undefined;
  if (!token) return { user: null as JwtPayload | null };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return { user: payload };
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
