import axios from '@src/../axios';

const isProd = process.env.NODE_ENV === 'production';
const apiKey = isProd ? process.env.FB_API_KEY : import.meta.env.VITE_API_KEY;

type UserRequest = {
  email: string;
  password: string;
  returnSecureToken: boolean;
  hasErrors?: boolean;
  error?: string;
};

type UserResponse = {
  hasErrors?: boolean;
  error?: string;
  idToken: string;
  email: string;
  displayName?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};

const REF_TOKEN = 'ref_tok';
const FBID_TOKEN = 'fbid_tok';
const UNKNOWN_USER = 'Uknown User';

const setTokens = (refreshToken: string, idToken: string) => {
  localStorage.setItem(REF_TOKEN, refreshToken);
  localStorage.setItem(FBID_TOKEN, idToken);
};

export const signupNewUser = async (
  email: string,
  password: string,
  name: string
): Promise<APIResponse> => {
  const {
    refreshToken,
    idToken,
    hasErrors = false,
    email: userEmail,
    displayName = UNKNOWN_USER,
    localId,
  } = await axios.post<UserRequest, UserResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      email,
      password,
      displayName: name,
      returnSecureToken: true,
    }
  );

  if (hasErrors) {
    return {
      hasErrors,
      email: userEmail,
      userName: displayName,
    };
  }

  setTokens(refreshToken, idToken);
  return {
    hasErrors,
    email: userEmail,
    userName: displayName,
    uid: localId,
  };
};

export const loginUser = async (email: string, password: string): Promise<APIResponse> => {
  const {
    refreshToken,
    idToken,
    hasErrors = false,
    email: userEmail,
    displayName = UNKNOWN_USER,
    localId,
  } = await axios.post<UserRequest, UserResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  if (hasErrors) {
    return {
      hasErrors,
      email: userEmail,
      userName: displayName,
    };
  }

  setTokens(refreshToken, idToken);
  return {
    hasErrors,
    email: userEmail,
    uid: localId,
    userName: displayName,
  };
};
