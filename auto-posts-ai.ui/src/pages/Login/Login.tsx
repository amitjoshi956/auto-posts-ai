import { FC, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkedinIcon } from '@hugeicons/core-free-icons';
import { useLazyLogin } from '@api/user/mutation';
import LoginIllustration from '@assets/image/illustration-login.svg';
import LoginForm from './LoginForm';

import './Login.scss';

type LoginProps = {
  onLoginSignup: (name: string) => void;
};

const Login: FC<LoginProps> = ({ onLoginSignup }) => {
  const [isNewSignup, setIsNewSignup] = useState<boolean>(false);
  const [loginUser, { isSuccess: isLoginSuccess, isPending: isLoginLoading, data }] =
    useLazyLogin();

  const { fullName = '' } = data || {};

  const signupPrompt = !isNewSignup ? "Don't have an account?" : 'Already have an account?';
  const signupPromptLink = !isNewSignup ? 'Sign-up' : 'Login';

  const handleSubmit = async (email: string, password: string, name: string = 'Unknown User') => {
    if (isNewSignup) {
      console.log('Signup:', { email, password, name });
    } else {
      loginUser({ email, password });
    }
  };

  const handleGoogleSignin = () => {
    console.log('Google Signin');
  };

  const switchFormMode = () => {
    setIsNewSignup((prev) => !prev);
  };

  useEffect(() => {
    if (isLoginSuccess && !isLoginLoading) {
      onLoginSignup(fullName);
    }
  }, [isLoginSuccess, isLoginLoading, fullName]);

  return (
    <div className="login">
      <section className="login__branding">
        <img className="login__brand-illustration" src={LoginIllustration} />
      </section>
      <section className="login__user-input">
        <div className="login__user-input-container">
          <LoginForm isSignup={isNewSignup} onSubmit={handleSubmit} />
          <span className="login__choice-separator">OR</span>
          <button className="login__linkedin-button" onClick={handleGoogleSignin}>
            <HugeiconsIcon icon={LinkedinIcon} />
            <span className="login__linkedin-btn-label">Sign in with Linkedin</span>
          </button>
          <p className="login__signup-prompt">
            {signupPrompt}
            <a className="login__signup-link" onClick={switchFormMode}>
              {signupPromptLink}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
