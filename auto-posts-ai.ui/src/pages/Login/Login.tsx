import { FC, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkedinIcon } from '@hugeicons/core-free-icons';
import LoginIllustration from '@assets/illustration-login.svg';
import LoginForm from './LoginForm';
import { signupNewUser, loginUser } from '@api/user';

import './Login.scss';

type LoginProps = {
  onLoginSignup: (name: string) => void;
};

const Login: FC<LoginProps> = ({ onLoginSignup }) => {
  const [isNewSignup, setIsNewSignup] = useState<boolean>(false);

  const signupPrompt = !isNewSignup ? "Don't have an account?" : 'Already have an account?';
  const signupPromptLink = !isNewSignup ? 'Sign-up' : 'Login';

  const handleSubmit = async (email: string, password: string, name: string = 'Unknown User') => {
    if (isNewSignup) {
      const { hasErrors, userName } = await signupNewUser(email, password, name);
      if (!hasErrors) {
        onLoginSignup(userName);
      }
    } else {
      const { hasErrors, userName } = await loginUser(email, password);
      if (!hasErrors) {
        onLoginSignup(userName);
      }
    }
  };

  const handleGoogleSignin = () => {
    console.log('Google Signin');
  };

  const switchFormMode = () => {
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
