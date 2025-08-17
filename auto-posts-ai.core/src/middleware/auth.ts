import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Req, Res, AuthResponse, User } from '@base/types';
import { ErrorMessages } from '@base/const';
import * as Headers from '@base/config/headers.json';

const getUserFromToken = (token: string): User | null => {
  const JwtSecret = process.env.JWT_SECRET || '';

  try {
    return jwt.verify(token, JwtSecret) as User;
  } catch (ex) {
    return null;
  }
};

export const auth = (req: Req<unknown>, res: Res<AuthResponse>, next: NextFunction): void => {
  const token = req.header(Headers.Auth_Token);

  if (!token) {
    res.status(401).json({ hasErrors: true, error: ErrorMessages.NO_AUTH_TOKEN });
    return;
  }

  const user = getUserFromToken(token);
  if (!user) {
    res.status(403).json({ hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS });
    return;
  }

  req.user = user;
  next();
};
