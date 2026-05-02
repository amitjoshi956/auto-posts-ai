import { FC, useState } from 'react';
import { LinkedinIcon } from '@assets/icons';
import { useLazyLogin, useLazySignup } from '@api/user/mutation';
import AuthIllustration from '@assets/image/illustration-login.svg';
import { Button, Loader } from '@components/base';
import Login from './Login';
import { Signup } from './Signup';

import './Auth.scss';

const Auth: FC = () => {
  const [isNewSignup, setIsNewSignup] = useState<boolean>(false);
  const [loginUser, { isPending: isLoginLoading }] = useLazyLogin();
  const [signupUser, { isPending: isLoadingSignup }] = useLazySignup();

  const signupPrompt = !isNewSignup ? "Don't have an account?" : 'Already have an account?';
  const signupPromptLink = !isNewSignup ? 'Sign-up' : 'Login';
  const isLoading = isLoginLoading || isLoadingSignup;
  // const _isSuccess = isLoginSuccess || isSignupSuccess; // TODO: Show toast

  const handleLogin = (email: string, password: string) => {
    loginUser({ email, password });
  };

  const handleSignup = (email: string, password: string, fullName: string) => {
    signupUser({ email, password, fullName });
  };

  const handleGoogleSignin = () => {
    console.log('Google Signin');
  };

  const switchFormMode = () => {
    setIsNewSignup((prev) => !prev);
  };

  if (isLoading) {
    const loaderMessage = isNewSignup ? 'Signing Up' : 'Logging In';
    return <Loader message={loaderMessage} />;
  }

  return (
    <div className="auth">
      <section className="auth__branding">
        <img className="auth__brand-illustration" src={AuthIllustration} />
      </section>
      <section className="auth__user-input">
        <div className="auth__user-input-container">
          {isNewSignup ? <Signup onSignup={handleSignup} /> : <Login onLogin={handleLogin} />}
          <span className="auth__choice-separator">OR</span>
          <Button
            disabled
            className="auth__linkedin-button"
            icon={LinkedinIcon}
            iconSize="md"
            label="Sign in with Linkedin"
            onClick={handleGoogleSignin}
          />
          <p className="auth__signup-prompt">
            {signupPrompt}
            <a className="auth__signup-link" onClick={switchFormMode}>
              {signupPromptLink}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Auth;
