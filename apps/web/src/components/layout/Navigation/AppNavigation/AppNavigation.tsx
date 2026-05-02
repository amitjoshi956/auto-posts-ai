import React from 'react';
import { NavLink } from 'react-router';
import { classes } from '@common/utils';
import { NavConfig } from '@base/config/nav.config';

import './AppNavigation.scss';

export const AppNavigation: React.FC = () => {
  return (
    <nav className="app-navigation">
      <ul className="app-navigation__list">
        {NavConfig.filter((item) => item.showMenu).map(({ path, label, icon: Icon }) => {
          const navLinkClass = (isActive: boolean) =>
            classes({
              'app-navigation__link': true,
              'app-navigation__link--active': isActive,
            });

          return (
            <li key={path} className="app-navigation__item">
              <NavLink to={path} className={({ isActive }) => navLinkClass(isActive)}>
                <Icon size="md" className="app-navigation__icon" />
                <span className="app-navigation__label">{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
