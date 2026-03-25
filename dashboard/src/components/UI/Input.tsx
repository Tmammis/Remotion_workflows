import React from 'react';
import { components, fonts, colors, transitions } from '../../lib/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  style,
  ...rest
}) => {
  const t = components.input;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {label && (
        <label
          style={{
            fontFamily: fonts.body,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: colors.gray800,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.gray500,
              display: 'flex',
            }}
          >
            {icon}
          </span>
        )}
        <input
          style={{
            width: '100%',
            padding: t.padding,
            paddingLeft: icon ? '2.5rem' : undefined,
            background: t.bg,
            color: t.text,
            border: error ? t.errorBorder : t.border,
            borderRadius: t.radius,
            fontFamily: fonts.body,
            fontSize: t.fontSize,
            fontWeight: t.fontWeight,
            outline: 'none',
            transition: transitions.base,
            boxSizing: 'border-box',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = error ? t.errorBorder : t.focusBorder;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? colors.error + '22' : colors.primaryLight + '22'}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = error ? t.errorBorder : t.border;
            e.currentTarget.style.boxShadow = 'none';
          }}
          {...rest}
        />
      </div>
      {error && (
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: '0.75rem',
            color: colors.error,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
