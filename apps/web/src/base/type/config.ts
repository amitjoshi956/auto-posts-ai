import { HugeiconsProps } from '@hugeicons/react';

export type NavMenuItem = {
  label: string;
  path: string;
  showMenu: boolean;
  icon: React.ComponentType<HugeiconsProps>;
};
