import { FC } from 'react';
import { classes } from '@common/utils';
import { AiFileIcon } from '@assets/icons';
import { Icon } from '@components/base';

import './AppHeader.scss';

type AppHeaderProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const AppHeader: FC<AppHeaderProps> = ({ isAuthenticated, onLogout }) => {
  const headerClass = classes({
    'app-header': true,
    'app-header--premium': isAuthenticated,
  });

  return (
    <header className={headerClass}>
      <div className="app-header__title">
        <Icon className="app-header__title-icon" icon={AiFileIcon} size="lg" />
        AutoPosts.<span>ai</span>
      </div>

      {isAuthenticated && (
        <button className="app-header__profile-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default AppHeader;
