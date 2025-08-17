import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest, AuthResponse, Req, Res } from '@base/types';
import { ErrorMessages, ReqHeaders } from '@base/const';
import User from '@model/user';

const router = Router();

export const loginUser = async (req: Req<AuthRequest>, res: Res<AuthResponse>): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    res.status(401).json({ hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const isValidPassword = await bcrypt.compare(hashedPassword, user.password);
  if (!isValidPassword) {
    res.status(400).json({ hasErrors: true, error: ErrorMessages.INVALID_CREDENTIALS });
    return;
  }

  // Generate JWT token
  const token = user.generateAuthToken?.() || '';
  const { fullName, permissions = [] } = user;

  res
    .status(200)
    .setHeader(ReqHeaders.AUTH_TOKEN, token)
    .json({
      data: {
        fullName: fullName,
        permissions: permissions || [],
      },
    });
};

router.post('/login', loginUser);

export default router;
