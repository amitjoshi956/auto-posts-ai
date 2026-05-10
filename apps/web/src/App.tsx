import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuth } from '@common/hooks';
import { AppLayout } from '@components/layout';
import { Loader } from '@components/base';

const Auth = lazy(() => import('@pages/Auth'));
const Home = lazy(() => import('@pages/Home'));
const Topics = lazy(() => import('@pages/Topics'));
const Posts = lazy(() => import('@pages/Posts'));

import './App.scss';

function App() {
  const { isAuthenticated, userName, isLoading, logout } = useAuth();

  if (isLoading) {
    return <Loader message="Loading" />;
  }

  // TODO: Make routes reusable
  return (
    <AppLayout isAuthenticated={isAuthenticated} logout={logout}>
      <Suspense fallback={<Loader message="Loading" />}>
        <Routes>
          {isAuthenticated && <Route path="/" element={<Home userName={userName} />} />}
          {isAuthenticated && <Route path="/topics" element={<Topics />} />}
          {isAuthenticated && <Route path="/posts" element={<Posts />} />}
          {!isAuthenticated && <Route path="/" element={<Auth />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
