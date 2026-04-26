import { FC } from 'react';
import { NavLink } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiFileIcon } from '@hugeicons/core-free-icons';

import './AppHeader.scss';
import { classes } from '@common/utils';

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
        <nav className="app-header__nav">
          <NavLink to="/" className="app-header__link" end>
            Home
          </NavLink>
          <NavLink to="/topics" className="app-header__link">
            Topics
          </NavLink>
        </nav>
      )}

      {isAuthenticated && (
        <button className="app-header__profile-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default AppHeader;
