import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors, fonts, radii, components } from '../../lib/theme';
import { Skeleton } from '../UI/Skeleton';
import type { ChartDataPoint } from '../../data/mockData';

interface CallsBarChartProps {
  data: ChartDataPoint[] | null;
  loading: boolean;
}

export const CallsBarChart: React.FC<CallsBarChartProps> = ({ data, loading }) => {
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
        <Skeleton width={140} height={20} style={{ marginBottom: '1.5rem' }} />
        <Skeleton width="100%" height={260} borderRadius={radii.md} />
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
        Calls This Week
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontFamily: fonts.body, fontSize: 11, fill: colors.gray500 }}
            axisLine={{ stroke: colors.gray200 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: fonts.body, fontSize: 11, fill: colors.gray500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: colors.white,
              border: `1px solid ${colors.gray200}`,
              borderRadius: radii.md,
              fontFamily: fonts.body,
              fontSize: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <Bar
            dataKey="value"
            fill={colors.primary}
            radius={[6, 6, 0, 0]}
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
