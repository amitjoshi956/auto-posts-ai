import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, LibraryIcon } from '@hugeicons/core-free-icons';
import type { NavMenuItem } from '@base/type';
import { AppRoutes } from '@base/const';

export const NavConfig: NavMenuItem[] = [
  {
    label: 'Home',
    path: AppRoutes.Home,
    showMenu: true,
    icon: (props) => <HugeiconsIcon icon={Home01Icon} {...props} />,
  },
  {
    label: 'Topics',
    path: AppRoutes.Topics,
    showMenu: true,
    icon: (props) => <HugeiconsIcon icon={LibraryIcon} {...props} />,
  },
];
