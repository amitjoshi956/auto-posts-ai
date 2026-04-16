import { useMutation } from '@tanstack/react-query';
import { qClient } from '@api/client';
import { loginUser, logoutUser, signupUser } from '@api/user/user-service';
import type { UserProfile } from '@autoposts/shared';
import type { LoginPayload, SignupPayload, PMutation } from '@base/type';
import { QueryCacheKey } from '@base/const/api';

export const useLazyLogin: PMutation<LoginPayload, UserProfile> = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => loginUser(email, password),
    retry: false,
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.UserProfile] });
    },
  });
  return [mutate, rest];
};

export const useLazySignup: PMutation<SignupPayload, UserProfile> = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ email, password, fullName }: SignupPayload) =>
      signupUser(email, password, fullName),
    retry: false,
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.UserProfile] });
    },
  });
  return [mutate, rest];
};

export const useLazyLogout: PMutation<void, void> = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async () => logoutUser(),
    retry: false,
    onSuccess: () => {
      qClient.clear(); // Clear all query cache on logout
    },
  });
  return [mutate, rest];
};
