import { FC } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiFileIcon } from '@hugeicons/core-free-icons';

import './AppHeader.scss';

type AppHeaderProps = {
  isLoggedIn: boolean;
};

const AppHeader: FC<AppHeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">
        <HugeiconsIcon className="app-header__title-icon" icon={AiFileIcon} size={32} />
        AutoPosts.<span>ai</span>
      </h1>
      {isLoggedIn && <button className="app-header__profile-btn">Profile</button>}
    </header>
  );
};

export default AppHeader;
