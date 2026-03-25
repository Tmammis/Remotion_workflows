import React from 'react';
import { colors, transitions } from '../../lib/theme';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled }) => (
  <button
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    style={{
      width: 44,
      height: 24,
      borderRadius: 24,
      border: 'none',
      padding: 2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? colors.primaryLight : colors.gray300,
      transition: transitions.base,
      opacity: disabled ? 0.5 : 1,
      display: 'flex',
      alignItems: checked ? 'center' : 'center',
      justifyContent: checked ? 'flex-end' : 'flex-start',
    }}
  >
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: colors.white,
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: transitions.base,
      }}
    />
  </button>
);
