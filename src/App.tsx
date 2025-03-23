import AppHeader from '@components/AppHeader';
import Home from '@pages/Home';
import Login from '@pages/Login';

import './App.scss';

function App() {
  const showHome = false;

  const handleLogin = (email: string, password: string) => {
    console.log('login', email, password);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('signup', name, email, password);
  };

  const handleGoogleSignIn = () => {
    console.log('google');
  };

  return (
    <div className="app">
      <AppHeader isLoggedIn={false} />
      {showHome ? (
        <Home />
      ) : (
        <Login onLogin={handleLogin} onSignup={handleSignup} onGoogleSignIn={handleGoogleSignIn} />
      )}
    </div>
  );
}

export default App;
