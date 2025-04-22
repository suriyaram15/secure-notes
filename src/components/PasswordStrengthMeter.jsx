// PasswordStrengthMeter.jsx
import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null;

  const testResult = zxcvbn(password);
  const strength = testResult.score;
  const num = (strength * 100) / 4;

  const createPassLabel = () => {
    switch (strength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (strength) {
      case 0:
        return '#ff0000';
      case 1:
        return '#ff0000';
      case 2:
        return '#ffa500';
      case 3:
        return '#ffff00';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px',
  });

  return (
    <div style={{ margin: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Password strength:</span>
        <span>{createPassLabel()}</span>
      </div>
      <div style={{ background: '#ddd', height: '7px', borderRadius: '4px' }}>
        <div style={changePasswordColor()}></div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;