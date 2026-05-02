import { FC } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiFileIcon } from '@hugeicons/core-free-icons';
import { classes } from '@common/utils';

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
        <HugeiconsIcon className="app-header__title-icon" icon={AiFileIcon} size={32} />
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
