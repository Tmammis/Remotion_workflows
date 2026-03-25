import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { colors, fonts, radii, components } from '../../lib/theme';
import { Skeleton } from '../UI/Skeleton';
import type { ChartDataPoint } from '../../data/mockData';

interface RevenueChartProps {
  data: ChartDataPoint[] | null;
  loading: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, loading }) => {
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
        <Skeleton width={160} height={20} style={{ marginBottom: '1.5rem' }} />
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
        Revenue Overview
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.primaryLight} stopOpacity={0.3} />
              <stop offset="100%" stopColor={colors.primaryLight} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.gray400} stopOpacity={0.15} />
              <stop offset="100%" stopColor={colors.gray400} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} />
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
            tickFormatter={(v: number) => `€${(v / 1000).toFixed(0)}k`}
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
            formatter={(val) => [`€${Number(val).toLocaleString()}`, '']}
          />
          <Legend
            wrapperStyle={{ fontFamily: fonts.body, fontSize: 12, paddingTop: 8 }}
          />
          <Area
            name="Previous"
            type="monotone"
            dataKey="previous"
            stroke={colors.gray400}
            strokeWidth={1.5}
            fill="url(#gradPrevious)"
            strokeDasharray="4 4"
          />
          <Area
            name="Current"
            type="monotone"
            dataKey="value"
            stroke={colors.primaryLight}
            strokeWidth={2}
            fill="url(#gradCurrent)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
