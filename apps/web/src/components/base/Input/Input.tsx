import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { ViewIcon, ViewOffSlashIcon } from '@assets/icons';
import { classes } from '@common/utils';
import { Icon } from '@components/base';

import './Input.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  isRequired?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, label, isRequired = false, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const showPasswordIcon = showPassword ? ViewOffSlashIcon : ViewIcon;
    const showPasswordLabel = showPassword ? 'Hide password' : 'Show password';

    const inputClass = classes({
      input: true,
      'input--error': !!error,
      [className!]: !!className,
    });

    return (
      <div className={inputClass}>
        <label className="input__label" htmlFor={id}>
          {label}
          {isRequired && <sup className="input__required-indicator">*</sup>}
        </label>
        <div className="input__field-wrapper">
          <input
            {...props}
            id={id}
            ref={ref}
            className="input__field"
            type={currentType}
            onBlur={() => setShowPassword(false)}
          />
          {isPassword && (
            <button
              type="button"
              className="input__toggle"
              aria-label={showPasswordLabel}
              data-active={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon icon={showPasswordIcon} size="base" />
            </button>
          )}
        </div>
        {error && <span className="input__error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
