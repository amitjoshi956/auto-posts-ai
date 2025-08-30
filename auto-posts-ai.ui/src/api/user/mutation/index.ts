import { useMutation } from '@tanstack/react-query';
import { qClient } from '@api/client';
import { loginUser } from '@api/user/user-service';
import { AuthPayload, User, PMutation } from '@base/type';
import { QueryCacheKey } from '@base/const/api';

const useLazyLogin: PMutation<AuthPayload, User> = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ email, password }: AuthPayload) => await loginUser(email, password),
    retry: false,
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: [QueryCacheKey.UserProfile],
      });
    },
  });

  return [mutate, rest];
};

export { useLazyLogin };
