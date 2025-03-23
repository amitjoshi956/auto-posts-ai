import { FC, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { GoogleIcon } from '@hugeicons/core-free-icons';
import LoginIllustration from '@assets/illustration-login.svg';
import LoginForm from './LoginForm';

import './Login.scss';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
  onGoogleSignIn: () => void;
};

const Login: FC<LoginProps> = ({ onLogin, onSignup, onGoogleSignIn }) => {
  const [isNewSignup, setIsNewSignup] = useState<boolean>(false);

  const signupPrompt = !isNewSignup ? "Don't have an account?" : 'Already have an account?';
  const signupPromptLink = !isNewSignup ? 'Sign-up' : 'Login';

  const handleSubmit = (email: string, password: string, name?: string) => {
    if (isNewSignup) {
      onSignup(name!, email, password);
      return;
    }

    onLogin(email, password);
  };

  const handleSignup = () => {
    setIsNewSignup((prev) => !prev);
  };

  return (
    <div className="login">
      <section className="login__branding">
        <img className="login__brand-illustration" src={LoginIllustration} />
      </section>
      <section className="login__user-input">
        <div className="login__user-input-container">
          <LoginForm isSignup={isNewSignup} onSubmit={handleSubmit} />
          <span className="login__choice-separator">OR</span>
          <button className="login__google-button" onClick={onGoogleSignIn}>
            <HugeiconsIcon icon={GoogleIcon} />
            Sign in with Google
          </button>
          <p className="login__signup-prompt">
            {signupPrompt}
            <a className="login__signup-link" onClick={handleSignup}>
              {signupPromptLink}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
