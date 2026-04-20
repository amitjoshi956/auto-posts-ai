import { lazy } from 'react';
import { useAuth } from '@common/hooks';
import { AppHeader, Loader } from '@components/.';
import Login from '@pages/Login';

const Home = lazy(() => import('@pages/Home'));

import './App.scss';

function App() {
  const { isAuthenticated, userName, isLoading, logout } = useAuth();

  if (isLoading) {
    return <Loader message="Loading" />;
  }

  return (
    <div className="app">
      <AppHeader isAuthenticated={isAuthenticated} onLogout={logout} />
      {isAuthenticated ? <Home userName={userName} /> : <Login />}
    </div>
  );
}

export default App;
