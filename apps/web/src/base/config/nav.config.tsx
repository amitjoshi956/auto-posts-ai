import type { NavMenuItem } from '@base/type';
import { AppRoutes } from '@base/const';
import { HomeIcon, LibraryIcon, PostsIcon } from '@assets/icons';
import { Icon } from '@components/base';

export const NavConfig: NavMenuItem[] = [
  {
    label: 'Home',
    path: AppRoutes.Home,
    showMenu: true,
    icon: (props) => <Icon {...props} icon={HomeIcon} />,
  },
  {
    label: 'Topics',
    path: AppRoutes.Topics,
    showMenu: true,
    icon: (props) => <Icon {...props} icon={LibraryIcon} />,
  },
  {
    label: 'Posts',
    path: AppRoutes.Posts,
    showMenu: true,
    icon: (props) => <Icon {...props} icon={PostsIcon} />,
  },
];
