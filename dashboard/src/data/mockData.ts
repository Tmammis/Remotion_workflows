export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  previous?: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0c4a2d&textColor=ffffff`;

export const users: User[] = [
  { id: '1', name: 'Erik Lindgren', email: 'erik@smartclick.se', avatar: avatarUrl('EL'), status: 'active', role: 'Admin', createdAt: '2025-11-12', lastLogin: '2026-03-25' },
  { id: '2', name: 'Anna Johansson', email: 'anna@smartclick.se', avatar: avatarUrl('AJ'), status: 'active', role: 'Manager', createdAt: '2025-12-03', lastLogin: '2026-03-24' },
  { id: '3', name: 'Lars Svensson', email: 'lars@example.com', avatar: avatarUrl('LS'), status: 'inactive', role: 'User', createdAt: '2025-09-18', lastLogin: '2026-02-10' },
  { id: '4', name: 'Maria Karlsson', email: 'maria@example.com', avatar: avatarUrl('MK'), status: 'active', role: 'User', createdAt: '2026-01-05', lastLogin: '2026-03-25' },
  { id: '5', name: 'Johan Berg', email: 'johan@example.com', avatar: avatarUrl('JB'), status: 'pending', role: 'User', createdAt: '2026-03-20', lastLogin: '—' },
  { id: '6', name: 'Sofia Eklund', email: 'sofia@example.com', avatar: avatarUrl('SE'), status: 'active', role: 'Editor', createdAt: '2025-10-30', lastLogin: '2026-03-23' },
  { id: '7', name: 'Oscar Nilsson', email: 'oscar@example.com', avatar: avatarUrl('ON'), status: 'active', role: 'User', createdAt: '2026-02-14', lastLogin: '2026-03-22' },
  { id: '8', name: 'Emma Pettersson', email: 'emma@example.com', avatar: avatarUrl('EP'), status: 'inactive', role: 'User', createdAt: '2025-08-22', lastLogin: '2025-12-15' },
  { id: '9', name: 'Viktor Olsson', email: 'viktor@example.com', avatar: avatarUrl('VO'), status: 'active', role: 'Manager', createdAt: '2025-11-01', lastLogin: '2026-03-25' },
  { id: '10', name: 'Hanna Gustafsson', email: 'hanna@example.com', avatar: avatarUrl('HG'), status: 'pending', role: 'User', createdAt: '2026-03-22', lastLogin: '—' },
  { id: '11', name: 'Alexander Dahl', email: 'alex@example.com', avatar: avatarUrl('AD'), status: 'active', role: 'User', createdAt: '2026-01-18', lastLogin: '2026-03-24' },
  { id: '12', name: 'Klara Fransson', email: 'klara@example.com', avatar: avatarUrl('KF'), status: 'active', role: 'Editor', createdAt: '2025-12-11', lastLogin: '2026-03-21' },
];

export const metrics: Metric[] = [
  { id: '1', label: 'Total Users', value: '2,847', change: 12.5, changeLabel: 'vs last month', icon: 'users' },
  { id: '2', label: 'Revenue', value: '€48,290', change: 8.2, changeLabel: 'vs last month', icon: 'revenue' },
  { id: '3', label: 'Calls Handled', value: '12,643', change: -3.1, changeLabel: 'vs last month', icon: 'calls' },
  { id: '4', label: 'Avg Response', value: '0.8s', change: 15.7, changeLabel: 'improvement', icon: 'speed' },
];

export const revenueTimeSeries: ChartDataPoint[] = [
  { name: 'Jan', value: 32000, previous: 28000 },
  { name: 'Feb', value: 35000, previous: 30000 },
  { name: 'Mar', value: 38000, previous: 32500 },
  { name: 'Apr', value: 36000, previous: 33000 },
  { name: 'May', value: 42000, previous: 35000 },
  { name: 'Jun', value: 45000, previous: 37000 },
  { name: 'Jul', value: 43000, previous: 38000 },
  { name: 'Aug', value: 47000, previous: 39500 },
  { name: 'Sep', value: 44000, previous: 41000 },
  { name: 'Oct', value: 48000, previous: 42000 },
  { name: 'Nov', value: 46000, previous: 43500 },
  { name: 'Dec', value: 48290, previous: 45000 },
];

export const callsByCategory: ChartDataPoint[] = [
  { name: 'Mon', value: 320 },
  { name: 'Tue', value: 450 },
  { name: 'Wed', value: 380 },
  { name: 'Thu', value: 510 },
  { name: 'Fri', value: 420 },
  { name: 'Sat', value: 180 },
  { name: 'Sun', value: 90 },
];

export const statusDistribution: CategoryData[] = [
  { name: 'Resolved', value: 68, color: '#04b318' },
  { name: 'In Progress', value: 18, color: '#FFB92B' },
  { name: 'Escalated', value: 9, color: '#ed6835' },
  { name: 'Unresolved', value: 5, color: '#e93d3d' },
];
