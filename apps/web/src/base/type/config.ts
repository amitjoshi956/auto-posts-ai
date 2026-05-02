import { IconProps } from './index';

export type NavMenuItem = {
  label: string;
  path: string;
  showMenu: boolean;
  icon: React.FC<IconProps>;
};
