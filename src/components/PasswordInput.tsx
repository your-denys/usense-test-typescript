import React, { ChangeEvent } from 'react';

interface PasswordInputProps {
  value: string;
  showPassword: boolean;
  characterCount: {
    letters: number;
    symbols: number;
    digits: number;
  };
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  showPassword,
  onInputChange,
  onToggleShowPassword,
  characterCount,
}) => {
  return (
    <div>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onInputChange}
          placeholder="Enter password"
          className="password-input"
        />
        <button
          className="password-button"
          onClick={onToggleShowPassword}
        >
          {!showPassword ? (
            <p>Show password</p>
          ) : (
            <p>Hide password</p>
          )}
        </button>
      </div>
      <p>
        The password includes {characterCount.letters} letters,{' '}
        {characterCount.symbols} symbols, and {characterCount.digits}{' '}
        digits.
      </p>
    </div>
  );
};

export default PasswordInput;
