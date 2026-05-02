import { FC } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { type IconProps } from '@base/type';
import { ICON_SIZE } from '@base/const';

const Icon: FC<IconProps> = ({ icon, size = 'md', ...props }) => {
  if (!icon) {
    return null;
  }

  return <HugeiconsIcon {...props} icon={icon} size={ICON_SIZE[size]} />;
};

export default Icon;
