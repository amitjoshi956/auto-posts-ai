import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import {
  HttpStatus,
  HttpHeaders,
  ErrorMessages,
  JWT_EXPIRY,
  LoginSchema,
  SignupSchema,
  UserRole,
  UserModel,
} from '@autoposts/shared';
import { env } from '@base/config/env';
import { authGuard, authPlugin } from '@plugins/auth';

const JwtSecret = env.jwtSecret;

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(authPlugin)
  // ─── POST /auth/login ─────────────────────────────────────────────────────
  .post(
    '/login',
    async ({ body, set, setAuthCookie }) => {
      const { email, password } = body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        set.status = HttpStatus.UNAUTHORIZED;
        return { hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS };
      }

      const isValid = await Bun.password.verify(password, user.password);
      if (!isValid) {
        set.status = HttpStatus.UNAUTHORIZED;
        return { hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS };
      }

      const token = jwt.sign(
        { _id: user._id.toString(), email: user.email, permissions: user.permissions },
        JwtSecret,
        { expiresIn: JWT_EXPIRY }
      );

      setAuthCookie(token);

      set.status = HttpStatus.OK;
      return {
        data: {
          fullName: user.fullName,
          email: user.email,
          permissions: user.permissions,
        },
      };
    },
    {
      body: LoginSchema,
    }
  )

  // ─── POST /auth/signup ────────────────────────────────────────────────────
  .post(
    '/signup',
    async ({ body, set, setAuthCookie }) => {
      const { email, password, fullName } = body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        set.status = HttpStatus.CONFLICT;
        return { hasErrors: true, error: ErrorMessages.USER_ALREADY_EXISTS };
      }

      const hashedPassword = await Bun.password.hash(password);

      const newUser = await new UserModel({
        email,
        password: hashedPassword,
        fullName,
        permissions: UserRole.USER,
      }).save();

      const token = jwt.sign(
        { _id: newUser._id.toString(), email: newUser.email, permissions: newUser.permissions },
        JwtSecret,
        { expiresIn: JWT_EXPIRY }
      );

      setAuthCookie(token);

      set.status = HttpStatus.CREATED;
      return {
        data: {
          fullName: newUser.fullName,
          email: newUser.email,
          permissions: newUser.permissions,
        },
      };
    },
    {
      body: SignupSchema,
    }
  )

  // ─── POST /auth/logout ────────────────────────────────────────────────────
  .use(authGuard)
  .post('/logout', ({ clearAuthCookie, set }) => {
    clearAuthCookie();
    // Force browser to wipe all site data securely
    set.headers[HttpHeaders.ClearSiteData] = '"cookies", "storage"';
    set.status = HttpStatus.OK;
    return { data: { message: 'Logged out successfully' } };
  });
