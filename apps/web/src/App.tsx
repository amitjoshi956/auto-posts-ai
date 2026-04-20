import { lazy } from 'react';
import { useUserProfile } from '@api/user/query';
import AppHeader from '@components/AppHeader';
import Login from '@pages/Login';
import Loader from '@components/Loader';

const Home = lazy(() => import('@pages/Home'));

import './App.scss';

function App() {
  const { data: userProfile, isLoading, isSuccess } = useUserProfile();

  const isLoggedIn = isSuccess && !!userProfile?.fullName;
  const userName = userProfile?.fullName || '';

  if (isLoading) {
    return <Loader message="Loading" />;
  }

  return (
    <div className="app">
      <AppHeader isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <Home userName={userName} /> : <Login />}
    </div>
  );
}

export default App;
