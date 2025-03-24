import axios from 'axios';
import { GENERIC_ERR_MESSAGE, UNKNOWN_USER } from '@const/.';
import { getAPIKey } from '@src/.';
import { onRequest } from 'firebase-functions/https';

type AuthRequest = {
  email: string;
  password: string;
  displayName?: string;
};

type AuthResponse = {
  idToken: string;
  email: string;
  displayName?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};

const apiKey = getAPIKey();

export const signupUser = onRequest(async (req, res) => {
  const { email, password, fullName } = req.body;
  const {
    hasErrors = false,
    status,
    error,
    data,
  } = await axios.post<AuthRequest, GenericAPIResponse<AuthResponse>>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      email,
      password,
      displayName: fullName,
      returnSecureToken: true,
    }
  );

  if (hasErrors) {
    const errRes: GenericAPIError = {
      hasErrors,
      error: error || GENERIC_ERR_MESSAGE,
      status,
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
});

export const loginUser = onRequest(async (req, res) => {
  const { email, password } = req.body;
  const {
    hasErrors = false,
    status,
    error,
    data,
  } = await axios.post<AuthRequest, GenericAPIResponse<AuthResponse>>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  if (hasErrors) {
    const errRes: GenericAPIError = {
      hasErrors,
      error: error || GENERIC_ERR_MESSAGE,
      status,
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
});
