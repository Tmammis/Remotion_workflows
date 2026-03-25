import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { colors, fonts, radii, components } from '../../lib/theme';
import { Skeleton } from '../UI/Skeleton';
import type { CategoryData } from '../../data/mockData';

interface StatusDonutProps {
  data: CategoryData[] | null;
  loading: boolean;
}

export const StatusDonut: React.FC<StatusDonutProps> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <div
        style={{
          background: components.card.bg,
          borderRadius: components.card.radius,
          border: components.card.border,
          boxShadow: components.card.shadow,
          padding: components.card.padding,
        }}
      >
        <Skeleton width={150} height={20} style={{ marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton width={180} height={180} borderRadius="50%" />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: components.card.bg,
        borderRadius: components.card.radius,
        border: components.card.border,
        boxShadow: components.card.shadow,
        padding: components.card.padding,
      }}
    >
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: '1rem',
          fontWeight: 600,
          color: colors.gray900,
          marginBottom: '1.25rem',
        }}
      >
        Call Resolution
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              strokeWidth={2}
              stroke={colors.white}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: colors.white,
                border: `1px solid ${colors.gray200}`,
                borderRadius: radii.md,
                fontFamily: fonts.body,
                fontSize: 12,
              }}
              formatter={(val) => [`${val}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: '0.8125rem',
                  color: colors.gray700,
                  minWidth: 80,
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: colors.gray900,
                }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
