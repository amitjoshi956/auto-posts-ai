import axios from 'axios';
import express from 'express';
import { GENERIC_ERR_MESSAGE, UNKNOWN_USER } from '@const/index.js';
import { AuthRequest, AuthResponse, GenericAPIRequest, GenericAPIResponse } from '../../global.js';

const router = express.Router();
const apiKey = process.env.API_KEY;

export const signupUser = async (req: any, res: any) => {
  const { email, password, fullName } = req.body;
  const {
    hasErrors = false,
    status,
    error,
    data,
  } = await axios.post<AuthRequest, GenericAPIResponse<AuthResponse>>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    { email, password, displayName: fullName, returnSecureToken: true }
  );
  if (hasErrors) {
    const errRes: GenericAPIResponse<AuthResponse> = {
      hasErrors,
      error: error || GENERIC_ERR_MESSAGE,
      status,
      data,
    };
    res.json(errRes);
  } else {
    const response: GenericAPIResponse<AuthResponse> = {
      hasErrors,
      error,
      status,
      data: { ...data, displayName: data.displayName || UNKNOWN_USER },
    };
    res.json(response);
  }
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const {
    hasErrors = false,
    status,
    error,
    data,
  } = await axios.post<AuthRequest, GenericAPIResponse<AuthResponse>>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    { email, password, returnSecureToken: true }
  );
  if (hasErrors) {
    const errRes: GenericAPIResponse<AuthResponse> = {
      hasErrors,
      error: error || GENERIC_ERR_MESSAGE,
      status,
      data: {
        idToken: '',
        email: '',
        refreshToken: '',
        expiresIn: '',
        localId: '',
      },
    };
    res.json(errRes);
  } else {
    const response: GenericAPIResponse<AuthResponse> = {
      hasErrors,
      error,
      status,
      data: { ...data, displayName: data.displayName || UNKNOWN_USER },
    };
    res.json(response);
  }
};

router.post('/login', loginUser);
router.post('/signup', signupUser);
