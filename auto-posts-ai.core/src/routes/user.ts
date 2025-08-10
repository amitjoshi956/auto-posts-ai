import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest, AuthResponse, ProfileReq, Req, Res } from '@base/types';
import { ErrorMessages, UserRole, ReqHeaders } from '@base/const';
import User from '@model/user';
import { auth } from '@middleware/auth';

const router = Router();

export const userProfile = async (
  req: ProfileReq<AuthRequest>,
  res: Res<AuthResponse>
): Promise<void> => {
  const { _id = '' } = req.user || {};

  const user = await User.findById(_id).select('-password -__v');
  if (!user) {
    res.status(404).json({ hasErrors: true, error: ErrorMessages.USER_NOT_FOUND });
    return;
  }

  const { email = '', fullName = '', permissions = [] } = user;
  res.status(200).json({
    data: {
      email: email,
      fullName: fullName,
      permissions: permissions,
    },
  });
};

const registerNewUser = async (req: Req<AuthRequest>, res: Res<AuthResponse>): Promise<void> => {
  const { email, password, fullName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ hasErrors: true, error: ErrorMessages.USER_ALREADY_EXISTS });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await new User({
    email,
    password: hashedPassword,
    fullName: fullName || '',
    permissions: UserRole.GUEST_USER,
  }).save();

  const token = newUser.generateAuthToken?.() || '';
  res
    .status(201)
    .setHeader(ReqHeaders.AUTH_TOKEN, token)
    .json({
      data: {
        email: newUser.email,
        fullName: newUser.fullName || '',
        permissions: newUser.permissions || [],
      },
    });
};

router.get('/me', auth, userProfile);
router.post('/signup', registerNewUser);

export default router;
