import { FC } from 'react';
import { IconSvgElement } from '@hugeicons/react';
import { classes } from '@common/utils';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from '@assets/icons';
import { Icon } from '@components/base';

import './Message.scss';

export type MessageVariant = 'info' | 'success' | 'warning' | 'error';

export type MessageProps = {
  className?: string;
  actionsClass?: string;
  message: string;
  subtitle?: string;
  image?: string;
  iconSrc?: IconSvgElement;
  variant: MessageVariant;
  actions?: React.ReactNode;
};

const VariantIconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

const Message: FC<MessageProps> = ({
  className = '',
  actionsClass = '',
  message,
  subtitle = '',
  image,
  iconSrc,
  variant,
  actions,
}) => {
  const icon = iconSrc || VariantIconMap[variant];

  const messageClass = classes({
    message: true,
    [`message--${variant}`]: true,
    [className]: !!className,
  });

  const actionClass = classes({
    message__actions: true,
    [actionsClass]: !!actionsClass,
  });

  const graphic = image ? (
    <img src={image} alt="message-image" className="message__image" />
  ) : (
    <Icon icon={icon} size="xl" />
  );

  return (
    <div className={messageClass}>
      <div className="message__icon-wrapper">{graphic}</div>
      <div className="message__content">
        <h4 className="message__title">{message}</h4>
        {subtitle && <p className="message__subtitle">{subtitle}</p>}
      </div>
      <div className={actionClass}>{actions}</div>
    </div>
  );
};

export default Message;
