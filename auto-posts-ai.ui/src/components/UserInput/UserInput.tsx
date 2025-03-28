import { FC } from 'react';

import './UserInput.scss';

type UserInputProps = {
  id: string;
  value: string;
  type: string;
  label: string;
  isRequired?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
};

export const UserInput: FC<UserInputProps> = ({
  id,
  value,
  type,
  label,
  placeholder,
  isRequired = false,
  onChange,
}) => {
  return (
    <div className="user-input">
      <label className="user-input__label" htmlFor={id}>
        {label}
        {isRequired && <sup className="user-input__required-indicator">*</sup>}
      </label>
      <input
        id={id}
        className="user-input__field"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
