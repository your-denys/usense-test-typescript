import React from 'react';

interface PasswordStrengthProps {
  color: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ color }) => {
  return <div className={`section ${color}`} />;
};

export default PasswordStrength;