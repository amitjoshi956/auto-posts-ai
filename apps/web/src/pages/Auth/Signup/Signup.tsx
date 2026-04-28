import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login03Icon } from '@hugeicons/core-free-icons';
import { Input, Button } from '@components/base';
import { SignupPayload, SignupSchema } from '@autoposts/shared';

import './Signup.scss';

type SignupProps = {
  onSignup: (email: string, password: string, name: string) => void;
};

export const Signup: FC<SignupProps> = ({ onSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupPayload>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const formTitle = 'Create your new account';
  const submitBtnLabel = 'Sign-up';

  const onFormSubmit = ({ email, password, fullName }: SignupPayload) => {
    onSignup(email, password, fullName);
  };

  return (
    <form className="signup" onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <h2 className="signup__title">{formTitle}</h2>

      <Input
        {...register('fullName')}
        id="signup-userFullname"
        isRequired
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.fullName?.message}
      />

      <Input
        {...register('email')}
        id="signup-userEmail"
        isRequired
        label="Email"
        type="email"
        placeholder="john.doe@gmail.com"
        error={errors.email?.message}
      />

      <Input
        {...register('password')}
        id="signup-userPassword"
        isRequired
        label="Password"
        type="password"
        placeholder="****************"
        error={errors.password?.message}
      />

      <Button
        className="signup__submit-btn"
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
