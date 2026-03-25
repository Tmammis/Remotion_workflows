import React from 'react';
import { components, transitions, fonts } from '../../lib/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  icon,
  children,
  disabled,
  style,
  ...rest
}) => {
  const t = components.button[variant];
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: t.padding,
        background: t.bg,
        color: t.text,
        border: t.border,
        borderRadius: t.radius,
        fontFamily: fonts.body,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition: transitions.slow,
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        const el = e.currentTarget;
        el.style.background = t.hoverBg;
        el.style.color = t.hoverText;
        el.style.border = t.hoverBorder;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = t.bg;
        el.style.color = t.text;
        el.style.border = t.border;
      }}
      {...rest}
    >
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};
