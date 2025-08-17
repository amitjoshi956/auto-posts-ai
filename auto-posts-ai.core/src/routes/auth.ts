import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest, AuthResponse, Req, Res } from '@base/types';
import { ErrorMessages } from '@base/const';
import * as Headers from '@base/config/headers.json';
import User from '@model/user';

const router = Router();

export const loginUser = async (req: Req<AuthRequest>, res: Res<AuthResponse>): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = await bcrypt.compare(password, user?.password || '');

  if (!user || !isValidPassword) {
    res.status(401).json({ hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS });
    return;
  }

  // Generate JWT token
  const token = user.generateAuthToken?.() || '';
  const { fullName, permissions = [] } = user;

  res
    .status(200)
    .setHeader(Headers.Auth_Token, token)
    .json({
      data: {
        fullName: fullName,
        permissions: permissions || [],
      },
    });
};

router.post('/login', loginUser);

export default router;
