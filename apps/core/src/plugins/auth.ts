import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import {
  HttpStatus,
  ErrorMessages,
  COOKIE_NAME,
  SESSION_MAX_AGE,
  type JwtPayload,
} from '@autoposts/shared';
import { env } from '@base/config/env';

const isProduction = env.nodeEnv === 'production';
const JwtSecret = env.jwtSecret;

export const authPlugin = new Elysia({ name: 'auth-plugin' }).derive(
  { as: 'global' },
  ({ cookie }) => {
    const token = cookie[COOKIE_NAME]?.value as string | undefined;

    const setAuthCookie = (newToken: string) => {
      cookie[COOKIE_NAME].set({
        value: newToken,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: SESSION_MAX_AGE,
        path: '/',
      });
    };

    const clearAuthCookie = () => {
      cookie[COOKIE_NAME].set({
        value: '',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 0,
        path: '/',
      });
    };

    let user: JwtPayload | null = null;
    if (token) {
      try {
        user = jwt.verify(token, JwtSecret) as JwtPayload;
      } catch {
        user = null;
      }
    }

    return { user, setAuthCookie, clearAuthCookie };
  }
);

export const authGuard = new Elysia({ name: 'auth-guard' })
  .use(authPlugin)
  .onBeforeHandle({ as: 'scoped' }, ({ user, set }) => {
    if (!user) {
      set.status = HttpStatus.UNAUTHORIZED;
      return { hasErrors: true, error: ErrorMessages.NO_AUTH_TOKEN };
    }
  });
