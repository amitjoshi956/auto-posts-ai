import type { FC, ReactNode } from 'react';
import { useDevice } from '@common/hooks';
import { classes } from '@common/utils';
import { AppHeader } from '@components/.';
import { AppSidebar, AppNavigation } from './Navigation';

import './AppLayout.scss';

type AppLayoutProps = {
  isAuthenticated?: boolean;
  children: ReactNode;
  logout: () => void;
};

const AppLayout: FC<AppLayoutProps> = ({ isAuthenticated = false, children, logout }) => {
  const { isDesktop } = useDevice();

  const appLayoutClass = classes({
    'app-layout': true,
    'app-layout--authenticated': isAuthenticated,
  });

  const showSidebar = isAuthenticated && isDesktop;
  const showBottomAppNavigation = isAuthenticated && !isDesktop;

  return (
    <div className={appLayoutClass}>
      <AppHeader isAuthenticated={isAuthenticated} onLogout={logout} />

      <div className="app-layout__body">
        {showSidebar && <AppSidebar />}
        <main className="app-layout__main">{children}</main>
      </div>

      {showBottomAppNavigation && <AppNavigation />}
    </div>
  );
};

export default AppLayout;
