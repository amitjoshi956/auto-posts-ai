import { Elysia } from 'elysia';
import { HttpStatus, ErrorMessages, type BasePermission } from '@autoposts/shared';
import { authPlugin } from './auth';

/**
 * Creates a scoped Elysia plugin that checks the authenticated user's
 * permissions (from the JWT payload) against a required permission.
 *
 * Must be applied AFTER `authGuard` so `user` is available in context.
 *
 * @example
 * ```ts
 * .use(authGuard)
 * .use(requirePermission(BasePermission.DELETE))
 * .delete('/posts/:id', handler)
 * ```
 */
export const requirePermission = (permission: BasePermission) =>
  new Elysia({ name: `require-permission-${permission}` })
    .use(authPlugin)
    .onBeforeHandle(
      { as: 'scoped' },
      ({ user, set }) => {
        const permissions = user?.permissions;

        if (!permissions || !permissions.includes(permission)) {
          set.status = HttpStatus.FORBIDDEN;
          return { hasErrors: true, error: ErrorMessages.FORBIDDEN };
        }
      }
    );
