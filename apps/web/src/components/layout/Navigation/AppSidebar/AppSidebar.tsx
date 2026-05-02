import React from 'react';
import { NavLink } from 'react-router';
import { NavConfig } from '@base/config/nav.config';

import './AppSidebar.scss';

export const AppSidebar: React.FC = () => {
  return (
    <nav className="app-sidebar">
      <ul className="app-sidebar__list">
        {NavConfig.filter((item) => item.showMenu).map(({ icon: Icon, path, label }) => (
          <li key={path} className="app-sidebar__item">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
              }
              title={label}
            >
              <Icon size={24} className="app-sidebar__icon" />
              <span className="app-sidebar__link-label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
