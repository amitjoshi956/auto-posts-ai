import { Router } from 'express';
import bcrypt from 'bcrypt';
import { AuthRequest, AuthResponse, ProfileReq, Req, Res } from '@base/types';
import { ErrorMessages, UserRole, ReqHeaders } from '@base/const';
import User from '@model/user';
import { auth } from '@middleware/auth';

const router = Router();

export const userProfile = async (
  req: ProfileReq<AuthRequest>,
  res: Res<AuthResponse>
): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.status(403).json({ hasErrors: true, error: ErrorMessages.UNAUTHORIZED });
    return;
  }

  res.status(200).json({
    data: {
      email: user.email,
      fullName: user.fullName || '',
      permissions: user.permissions || [],
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

router.get('/profile', auth, userProfile);
router.post('/signup', registerNewUser);
