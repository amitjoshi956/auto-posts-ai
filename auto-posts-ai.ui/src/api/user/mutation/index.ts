import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@api/user/user-service';
import { AuthPayload, AuthResponse, PMutation } from '@base/type';

const useLazyLogin: PMutation<AuthPayload, AuthResponse> = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ email, password }: AuthPayload) => loginUser(email, password),
    retry: false,
  });

  return [mutate, rest];
};

export { useLazyLogin };
