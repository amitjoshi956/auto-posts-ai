import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Login03Icon } from '@hugeicons/core-free-icons';
import { Input, Button } from '@components/base';

import './LoginForm.scss';

type UserInputFormProps = {
  isSignup: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
};

export const LoginForm: FC<UserInputFormProps> = ({ isSignup, onSubmit }) => {
  const formSchema = z.object({
    name: isSignup ? z.string().min(1, 'Full name is required') : z.string().optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const formTitle = isSignup ? 'Create your new account' : 'Login to begin';
  const submitBtnLabel = isSignup ? 'Sign-up' : 'Login';

  const onFormSubmit = (data: FormValues) => {
    onSubmit(data.email, data.password, data.name);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <h2 className="login-form__title">{formTitle}</h2>

      {isSignup && (
        <Input
          {...register('name')}
          id="login-userFullname"
          isRequired
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
        />
      )}

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
        className="login-form__submit-btn"
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
