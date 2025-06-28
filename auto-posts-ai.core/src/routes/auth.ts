import { Request, Response, Router } from 'express';
import { AuthRequest, AuthResponse, Req, Res } from '../../global.js';

const router = Router();

export const signupUser = async (req: Req<AuthRequest>, res: Res<AuthResponse>) => {
  const { email, password, fullName = '' } = req.body;
};

export const loginUser = async (req: Request, res: Response) => {
  res.json({ message: 'login' });
};

router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;
