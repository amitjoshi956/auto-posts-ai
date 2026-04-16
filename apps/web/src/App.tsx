import { lazy, useState } from 'react';
import AppHeader from '@components/AppHeader';
import Login from '@pages/Login';

const Home = lazy(() => import('@pages/Home'));

import './App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const handleLoginSignup = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  return (
    <div className="app">
      <AppHeader isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <Home userName={userName} />
      ) : (
        <Login onLoginSignup={handleLoginSignup} />
      )}
    </div>
  );
}

export default App;
