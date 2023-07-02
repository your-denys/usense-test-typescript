import React, { useState, ChangeEvent } from 'react';
import './PasswordContent.css';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';

const PasswordContent: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const countCharacters = (
    text: string
  ): { letters: number; symbols: number; digits: number } => {
    const result = { letters: 0, symbols: 0, digits: 0 };

    for (const char of text) {
      if (/[a-zA-Z]/.test(char)) {
        result.letters++;
      } else if (/\d/.test(char)) {
        result.digits++;
      } else {
        result.symbols++;
      }
    }
    return result;
  };

  const getPasswordStrength = ():
    | 'empty'
    | 'weak'
    | 'medium'
    | 'strong' => {
    if (password.length === 0 || password.length < 8) {
      return 'empty';
    }
    switch (true) {
      case /[a-zA-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^a-zA-Z0-9]/.test(password):
        return 'strong';
      case (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) ||
        (/[a-zA-Z]/.test(password) &&
          /[^a-zA-Z0-9]/.test(password)) ||
        (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)):
        return 'medium';
      default:
        return 'weak';
    }
  };

  const getPasswordColor = (index: number): string => {
    const strength = getPasswordStrength();
    if (password.length === 0) {
      return 'gray';
    }
      switch (strength) {
        case 'empty':
          return 'red';
        case 'weak':
          return index < 1 ? 'red' : 'gray';
        case 'medium':
          return index < 2 ? 'yellow' : 'gray';
        case 'strong':
          return 'green';
        default:
          return 'gray';
      }
  };

  const renderPasswordSections = (): JSX.Element[] => {
    const sections: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
      const color = getPasswordColor(i);
      sections.push(<PasswordStrength key={i} color={color} />);
    }
    return sections;
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const handleToggleShowPassword = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const characterCount = countCharacters(password);

  return (
    <div className="container">
      <PasswordInput
        value={password}
        showPassword={showPassword}
        onInputChange={handlePasswordChange}
        onToggleShowPassword={handleToggleShowPassword}
        characterCount={characterCount}
      />
      <div className="sections-container">
        {renderPasswordSections()}
      </div>
    </div>
  );
};

export default PasswordContent;
