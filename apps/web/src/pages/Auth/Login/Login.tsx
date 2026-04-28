import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login03Icon } from '@hugeicons/core-free-icons';
import { Input, Button } from '@components/base';
import { LoginPayload, LoginSchema } from '@autoposts/shared';

import './Login.scss';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formTitle = 'Login to begin';
  const submitBtnLabel = 'Login';

  const onFormSubmit = ({ email, password }: LoginPayload) => {
    onLogin(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <h2 className="login__title">{formTitle}</h2>
      <Input
        {...register('email')}
        id="login-userEmail"
        isRequired
        label="Email"
        type="email"
        placeholder="john.doe@gmail.com"
        error={errors.email?.message}
      />

      <Input
        {...register('password')}
        id="login-userPassword"
        isRequired
        label="Password"
        type="password"
        placeholder="****************"
        error={errors.password?.message}
      />

      <Button
        className="login__submit-btn"
        type="submit"
        icon={Login03Icon}
        iconPosition="right"
        isLoading={isSubmitting}
      >
        {submitBtnLabel}
      </Button>
    </form>
  );
};
