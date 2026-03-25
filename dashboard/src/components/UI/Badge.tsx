import React from 'react';
import { colors, fonts, radii } from '../../lib/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: colors.primaryPale, text: colors.primary },
  warning: { bg: '#FFF3D6', text: '#946200' },
  error: { bg: '#FEE2E2', text: colors.error },
  info: { bg: '#DBEAFE', text: '#1D4ED8' },
  default: { bg: colors.gray100, text: colors.gray700 },
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  dot,
}) => {
  const s = variantStyles[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.75rem',
        background: s.bg,
        color: s.text,
        borderRadius: radii.round,
        fontFamily: fonts.body,
        fontSize: '0.75rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: s.text,
          }}
        />
      )}
      {children}
    </span>
  );
};
