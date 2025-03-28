import { FC, useState } from 'react';
import { Alert02Icon, Login03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import UserInput from '@src/components/UserInput';

import './LoginForm.scss';

type UserInputFormProps = {
  isSignup: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
};

export const LoginForm: FC<UserInputFormProps> = ({ isSignup, onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const formTitle = isSignup ? 'Create your new account' : 'Login to begin';
  const submitBtnLabel = isSignup ? 'Sign-up' : 'Login';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setIsError(true);
      return;
    }

    if (isSignup && !name) {
      setIsError(true);
      return;
    }

    setIsError(false);
    onSubmit(email, password, name);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">{formTitle}</h2>
      {isSignup && (
        <UserInput
          id="login-userFullname"
          isRequired
          label="Full Name"
          type="text"
          value={name}
          placeholder="John Doe"
          onChange={setName}
        />
      )}
      <UserInput
        id="login-userEmail"
        isRequired
        label="Email"
        type="email"
        value={email}
        placeholder="john.doe@gmail.com"
        onChange={setEmail}
      />
      <UserInput
        id="login-userPassword"
        isRequired
        label="Password"
        type="password"
        value={password}
        placeholder="****************"
        onChange={setPassword}
      />
      {isError && (
        <p className="login-form__error">
          <HugeiconsIcon size={14} icon={Alert02Icon} />
          Please fill all required fields
        </p>
      )}
      <button className="login-form__submit-btn" type="submit">
        {submitBtnLabel}
        <HugeiconsIcon className="login-form__submit-btn-icon" icon={Login03Icon} />
      </button>
    </form>
  );
};
