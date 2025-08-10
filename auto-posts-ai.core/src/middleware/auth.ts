import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Req, AuthRequest, Res, AuthResponse, ProfileReq, User } from '@base/types';
import { ErrorMessages, ReqHeaders } from '@base/const';

const getUserFromToken = (token: string): User | null => {
  const JwtSecret = process.env.JWT_SECRET || '';

  try {
    return jwt.verify(token, JwtSecret) as User;
  } catch (ex) {
    return null;
  }
};

export const auth = (req: Req<AuthRequest>, res: Res<AuthResponse>, next: NextFunction): void => {
  const token = req.header(ReqHeaders.AUTH_TOKEN);

  if (!token) {
    res.status(401).json({ hasErrors: true, error: ErrorMessages.NO_AUTH_TOKEN });
    return;
  }

  const user = getUserFromToken(token);
  if (!user) {
    res.status(403).json({ hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS });
    return;
  }

  (req as ProfileReq).user = user;
  next();
};
