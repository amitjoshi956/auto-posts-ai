import { FC } from 'react';
import { IconSvgElement } from '@hugeicons/react';
import { Icon } from '@components/base';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from '@assets/icons';

import './Message.scss';

export type MessageVariant = 'info' | 'success' | 'warning' | 'error';

export type MessageProps = {
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
  message,
  subtitle = '',
  image,
  iconSrc,
  variant,
  actions,
}) => {
  const icon = iconSrc || VariantIconMap[variant];

  const graphic = image ? (
    <img src={image} alt="message-image" className="message__image" />
  ) : (
    <Icon icon={icon} size="xl" />
  );

  return (
    <div className={`message message--${variant}`}>
      <div className="message__icon-wrapper">{graphic}</div>
      <div className="message__content">
        <h4 className="message__title">{message}</h4>
        {subtitle && <p className="message__subtitle">{subtitle}</p>}
      </div>
      <div className="message__actions">{actions}</div>
    </div>
  );
};

export default Message;
