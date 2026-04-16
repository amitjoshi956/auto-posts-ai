import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import { HttpStatus, ErrorMessages, COOKIE_NAME } from '@autoposts/shared';
import type { JwtPayload } from '@autoposts/shared';

// ─── Extract User ──────────────────────────────────────────────────────────
// Derives `user` from the session cookie on every request.
// Does NOT enforce authentication — use authGuard for that.
const extractUser = new Elysia({ name: 'extract-user' }).derive({ as: 'scoped' }, ({ cookie }) => {
  const token = cookie[COOKIE_NAME]?.value;
  if (!token) return { user: null as JwtPayload | null };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return { user: payload as JwtPayload | null };
  } catch {
    return { user: null as JwtPayload | null };
  }
});

// ─── Auth Guard ─────────────────────────────────────────────────────────────
// Elysia plugin that enforces authentication on any route that uses it.
// Attach with: app.use(authGuard)
export const authGuard = new Elysia({ name: 'auth-guard' })
  .use(extractUser)
  .onBeforeHandle({ as: 'scoped' }, ({ user, set }) => {
    if (!user) {
      set.status = HttpStatus.UNAUTHORIZED;
      return { hasErrors: true, error: ErrorMessages.NO_AUTH_TOKEN };
    }
  });
