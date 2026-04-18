import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import {
  HttpStatus,
  ErrorMessages,
  JWT_EXPIRY,
  Headers,
  loginSchema,
  signupSchema,
  UserRole,
} from '@autoposts/shared';
import User from '@model/user';
import { authGuard } from '@plugins/auth';
import { setAuthCookie, clearAuthCookie } from '@utils/cookie';

export const authRoutes = new Elysia({ prefix: '/auth' })
  // ─── POST /auth/login ─────────────────────────────────────────────────────
  .post('/login', async ({ body, cookie, set }) => {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.issues[0]?.message ?? ErrorMessages.BAD_REQUEST,
      };
    }

    const { email, password } = parsed.data;
    const user = await User.findOne({ email });
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
      { _id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: JWT_EXPIRY }
    );

    setAuthCookie(cookie as any, token);

    set.status = HttpStatus.OK;
    return {
      data: {
        fullName: user.fullName,
        email: user.email,
        permissions: user.permissions,
      },
    };
  })

  // ─── POST /auth/signup ────────────────────────────────────────────────────
  .post('/signup', async ({ body, cookie, set }) => {
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      set.status = HttpStatus.BAD_REQUEST;
      return {
        hasErrors: true,
        error: parsed.error.issues[0]?.message ?? ErrorMessages.BAD_REQUEST,
      };
    }

    const { email, password, fullName } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      set.status = HttpStatus.CONFLICT;
      return { hasErrors: true, error: ErrorMessages.USER_ALREADY_EXISTS };
    }

    const hashedPassword = await Bun.password.hash(password);

    const newUser = await new User({
      email,
      password: hashedPassword,
      fullName,
      permissions: UserRole.USER,
    }).save();

    const token = jwt.sign(
      { _id: newUser._id.toString(), email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: JWT_EXPIRY }
    );

    setAuthCookie(cookie as any, token);

    set.status = HttpStatus.CREATED;
    return {
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        permissions: newUser.permissions,
      },
    };
  })

  // ─── POST /auth/logout ────────────────────────────────────────────────────
  .use(authGuard)
  .post('/logout', ({ cookie, set }) => {
    clearAuthCookie(cookie as any);
    // Force browser to wipe all site data securely
    set.headers[Headers.ClearSiteData] = '"cookies", "storage"';
    set.status = HttpStatus.OK;
    return { data: { message: 'Logged out successfully' } };
  });
