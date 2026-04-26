import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuth } from '@common/hooks';
import { AppHeader, Loader } from '@components/.';
import Login from '@pages/Login';

const Home = lazy(() => import('@pages/Home'));
const Topics = lazy(() => import('@pages/Topics'));

import './App.scss';

function App() {
  const { isAuthenticated, userName, isLoading, logout } = useAuth();

  if (isLoading) {
    return <Loader message="Loading" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        <AppHeader isAuthenticated={false} onLogout={logout} />
        <Login />
      </div>
    );
  }

  return (
    <div className="app">
      <AppHeader isAuthenticated={isAuthenticated} onLogout={logout} />
      <Suspense fallback={<Loader message="Loading" />}>
        <Routes>
          <Route path="/" element={<Home userName={userName} />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
