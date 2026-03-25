import { useState, useEffect, useCallback } from 'react';
import * as mock from '../data/mockData';

type DataMap = {
  users: mock.User[];
  metrics: mock.Metric[];
  revenueTimeSeries: mock.ChartDataPoint[];
  callsByCategory: mock.ChartDataPoint[];
  statusDistribution: mock.CategoryData[];
};

const dataMap: DataMap = {
  users: mock.users,
  metrics: mock.metrics,
  revenueTimeSeries: mock.revenueTimeSeries,
  callsByCategory: mock.callsByCategory,
  statusDistribution: mock.statusDistribution,
};

interface UseMockDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Mock data hook mirroring Supabase's useQuery pattern.
 * Swap internals for `supabase.from(table).select()` later.
 *
 * Usage:
 *   const { data, loading, error } = useMockData('users');
 */
export function useMockData<K extends keyof DataMap>(
  key: K,
  delay = 600,
): UseMockDataResult<DataMap[K]> {
  const [data, setData] = useState<DataMap[K] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    // Simulate network latency
    const timer = setTimeout(() => {
      try {
        setData(dataMap[key]);
      } catch {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [key, delay]);

  useEffect(() => {
    const cleanup = fetch();
    return cleanup;
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
