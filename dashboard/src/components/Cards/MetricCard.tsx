import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Phone, Zap } from 'lucide-react';
import { colors, fonts, radii, transitions, components } from '../../lib/theme';
import { Skeleton } from '../UI/Skeleton';

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  loading?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={22} />,
  revenue: <DollarSign size={22} />,
  calls: <Phone size={22} />,
  speed: <Zap size={22} />,
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeLabel,
  icon,
  loading,
}) => {
  const positive = change >= 0;

  if (loading) {
    return (
      <div
        style={{
          background: components.card.bg,
          borderRadius: components.card.radius,
          border: components.card.border,
          padding: components.card.padding,
          boxShadow: components.card.shadow,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Skeleton width={100} height={14} />
          <Skeleton width={40} height={40} borderRadius={radii.md} />
        </div>
        <Skeleton width={120} height={32} style={{ marginBottom: '0.5rem' }} />
        <Skeleton width={140} height={14} />
      </div>
    );
  }

  return (
    <div
      style={{
        background: components.card.bg,
        borderRadius: components.card.radius,
        border: components.card.border,
        padding: components.card.padding,
        boxShadow: components.card.shadow,
        transition: transitions.slow,
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = components.card.hoverShadow;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = components.card.shadow;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: colors.gray600,
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: radii.md,
            background: colors.primaryPalest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.primary,
          }}
        >
          {iconMap[icon] || <Zap size={22} />}
        </div>
      </div>

      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: '1.75rem',
          fontWeight: 700,
          color: colors.gray900,
          marginBottom: '0.375rem',
        }}
      >
        {value}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {positive ? (
          <TrendingUp size={14} color={colors.success} />
        ) : (
          <TrendingDown size={14} color={colors.error} />
        )}
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: positive ? colors.success : colors.error,
          }}
        >
          {positive ? '+' : ''}
          {change}%
        </span>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: '0.75rem',
            color: colors.gray500,
          }}
        >
          {changeLabel}
        </span>
      </div>
    </div>
  );
};
