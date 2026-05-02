import { FC, ButtonHTMLAttributes } from 'react';
import { IconSvgElement } from '@hugeicons/react';
import { IconSize } from '@base/type';
import { ICON_SIZE } from '@base/const';
import { classes } from '@common/utils';
import { Icon } from '../Icon';

import './Button.scss';

type ButtonVariant = 'filled' | 'gradient' | 'outlined' | 'ghost' | 'text' | 'link' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconSvgElement;
  iconSize?: IconSize;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  fullWidth?: boolean;
};

const Button: FC<ButtonProps> = ({
  label,
  variant = 'filled',
  size = 'md',
  icon,
  iconSize = 'base',
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const btnClass = classes({
    btn: true,
    [`btn--${variant}`]: true,
    [`btn--${size}`]: true,
    'btn--full-width': fullWidth,
    'btn--loading': isLoading,
    [className]: !!className,
  });

  const content = variant !== 'icon' ? label || children : null;

  const renderIcon = () => {
    if (isLoading) {
      return (
        <svg
          className="btn__spinner"
          width={ICON_SIZE[iconSize]}
          height={ICON_SIZE[iconSize]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      );
    }
    if (icon) {
      return <Icon icon={icon} size={iconSize} />;
    }
    return null;
  };

  return (
    <button className={btnClass} disabled={isLoading || rest.disabled} {...rest}>
      {iconPosition === 'left' && renderIcon()}
      {content}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;
