import { COOKIE_NAME, SESSION_MAX_AGE } from '@autoposts/shared';

const isProduction = process.env.NODE_ENV === 'production';

type CookieContext = Record<string, { value: string; set: (opts: object) => void }>;

export const setAuthCookie = (cookie: CookieContext, token: string) => {
  cookie[COOKIE_NAME].set({
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
};

export const clearAuthCookie = (cookie: CookieContext) => {
  cookie[COOKIE_NAME].set({
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 0,
    path: '/',
  });
};
