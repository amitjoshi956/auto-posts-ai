import { FC, ReactNode, useRef, useEffect } from 'react';
import { classes } from '@common/utils';
import { CancelIcon } from '@assets/icons';
import { Button } from '@components/base';

import './Modal.scss';

export type ModalButtonProps = React.ComponentProps<typeof Button> & {
  label?: string;
};

export type ModalProps = {
  open: boolean;
  className?: string;
  header?: ReactNode;
  headerClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  showDefaultFooter?: boolean;
  submitBtnProps?: ModalButtonProps;
  closeBtnProps?: ModalButtonProps;
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({
  open,
  header,
  footer,
  showDefaultFooter = false,
  submitBtnProps,
  closeBtnProps,
  className = '',
  headerClassName = '',
  footerClassName = '',
  children,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isTextBasedHeader = typeof header === 'string';
  const showFooter = footer || showDefaultFooter;
  const modalClass = classes({ modal: true, [className]: !!className });
  const headerClass = classes({ modal__header: true, [headerClassName]: !!headerClassName });
  const footerClass = classes({ modal__footer: true, [footerClassName]: !!footerClassName });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const closeBtnLabel = closeBtnProps?.label || 'Cancel';
  const submitBtnLabel = submitBtnProps?.label || 'Submit';
  return (
    <dialog ref={dialogRef} className={modalClass} onClose={onClose}>
      {header && (
        <div className={headerClass}>
          {isTextBasedHeader ? <h2 className="modal__heading">{header}</h2> : header}
          <Button
            className="modal__close-btn"
            type="button"
            size="sm"
            variant="icon"
            label={closeBtnLabel}
            icon={CancelIcon}
            onClick={onClose}
          />
        </div>
      )}

      <div className="modal__body">{children}</div>

      {showFooter && (
        <div className={footerClass}>
          {footer ?? (
            <>
              <Button
                {...closeBtnProps}
                type="button"
                size="sm"
                variant="outlined"
                label={closeBtnLabel}
                onClick={onClose}
              />
              <Button {...submitBtnProps} size="sm" type="submit" label={submitBtnLabel} />
            </>
          )}
        </div>
      )}
    </dialog>
  );
};
