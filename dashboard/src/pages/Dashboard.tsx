import React from 'react';
import { ChevronRight } from 'lucide-react';
import { colors, fonts } from '../lib/theme';
import { useMockData } from '../hooks/useMockData';
import { MetricCard } from '../components/Cards/MetricCard';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { CallsBarChart } from '../components/Charts/CallsBarChart';
import { StatusDonut } from '../components/Charts/StatusDonut';

export const Dashboard: React.FC = () => {
  const { data: metrics, loading: metricsLoading } = useMockData('metrics');
  const { data: revenue, loading: revenueLoading } = useMockData('revenueTimeSeries');
  const { data: calls, loading: callsLoading } = useMockData('callsByCategory');
  const { data: status, loading: statusLoading } = useMockData('statusDistribution');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray500 }}>
          Home
        </span>
        <ChevronRight size={14} color={colors.gray400} />
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray900, fontWeight: 500 }}>
          Dashboard
        </span>
      </div>

      {/* Page title */}
      <div>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: '1.75rem',
            fontWeight: 700,
            color: colors.gray900,
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: '0.875rem',
            color: colors.gray500,
            margin: '0.25rem 0 0',
          }}
        >
          Overview of your AI receptionist performance.
        </p>
      </div>

      {/* Metric cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {metricsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <MetricCard
                key={i}
                label=""
                value=""
                change={0}
                changeLabel=""
                icon=""
                loading
              />
            ))
          : metrics?.map((m) => (
              <MetricCard key={m.id} {...m} />
            ))}
      </div>

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1rem',
        }}
      >
        <RevenueChart data={revenue} loading={revenueLoading} />
        <StatusDonut data={status} loading={statusLoading} />
      </div>

      {/* Bar chart full width */}
      <CallsBarChart data={calls} loading={callsLoading} />
    </div>
  );
};
