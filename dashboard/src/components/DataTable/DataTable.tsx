import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Filter } from 'lucide-react';
import { colors, fonts, radii, shadows, transitions, components } from '../../lib/theme';
import { Badge } from '../UI/Badge';
import { Skeleton } from '../UI/Skeleton';
import type { User } from '../../data/mockData';

interface DataTableProps {
  data: User[] | null;
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

type SortField = 'name' | 'email' | 'status' | 'role' | 'createdAt';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 5;

const statusVariant = (s: string) => {
  if (s === 'active') return 'success' as const;
  if (s === 'inactive') return 'error' as const;
  return 'warning' as const;
};

export const DataTable: React.FC<DataTableProps> = ({ data, loading, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((u) => {
        const matchSearch =
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || u.status === filterStatus;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [data, search, sortField, sortDir, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) return null;
    return sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const thStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    color: colors.gray600,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderBottom: `1px solid ${colors.gray200}`,
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    color: colors.gray800,
    borderBottom: `1px solid ${colors.gray100}`,
    whiteSpace: 'nowrap',
  };

  if (loading) {
    return (
      <div
        style={{
          background: components.card.bg,
          borderRadius: components.card.radius,
          border: components.card.border,
          boxShadow: components.card.shadow,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem' }}>
          <Skeleton width={260} height={36} borderRadius={radii.lg} />
          <Skeleton width={100} height={36} borderRadius={radii.md} />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton width={32} height={32} borderRadius="50%" />
            <Skeleton width={140} height={14} />
            <Skeleton width={180} height={14} />
            <Skeleton width={60} height={22} borderRadius={radii.round} />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          background: components.card.bg,
          borderRadius: components.card.radius,
          border: components.card.border,
          boxShadow: components.card.shadow,
          padding: '3rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontSize: '1.125rem',
            fontWeight: 600,
            color: colors.gray800,
            marginBottom: '0.375rem',
          }}
        >
          No users found
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: '0.875rem', color: colors.gray500 }}>
          Add your first user to get started.
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
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: `1px solid ${colors.gray200}`,
        }}
      >
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <Search
            size={15}
            color={colors.gray500}
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search users..."
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2rem',
              border: `1px solid ${colors.gray200}`,
              borderRadius: radii.md,
              fontFamily: fonts.body,
              fontSize: '0.8125rem',
              outline: 'none',
              transition: transitions.base,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primaryLight;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.gray200;
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Filter size={14} color={colors.gray500} />
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
            style={{
              padding: '0.5rem 0.75rem',
              border: `1px solid ${colors.gray200}`,
              borderRadius: radii.md,
              fontFamily: fonts.body,
              fontSize: '0.8125rem',
              color: colors.gray800,
              outline: 'none',
              cursor: 'pointer',
              background: colors.white,
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            fontFamily: fonts.body,
            fontSize: '0.75rem',
            color: colors.gray500,
          }}
        >
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle} onClick={() => toggleSort('name')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Name <SortIcon field="name" />
                </span>
              </th>
              <th style={thStyle} onClick={() => toggleSort('email')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Email <SortIcon field="email" />
                </span>
              </th>
              <th style={thStyle} onClick={() => toggleSort('status')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Status <SortIcon field="status" />
                </span>
              </th>
              <th style={thStyle} onClick={() => toggleSort('role')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Role <SortIcon field="role" />
                </span>
              </th>
              <th style={thStyle} onClick={() => toggleSort('createdAt')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Created <SortIcon field="createdAt" />
                </span>
              </th>
              <th style={{ ...thStyle, cursor: 'default', width: 48 }} />
            </tr>
          </thead>
          <tbody>
            {paged.map((user) => (
              <tr
                key={user.id}
                style={{ transition: transitions.fast }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.gray50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: 32, height: 32, borderRadius: '50%' }}
                    />
                    <span style={{ fontWeight: 500 }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ ...tdStyle, color: colors.gray600 }}>{user.email}</td>
                <td style={tdStyle}>
                  <Badge variant={statusVariant(user.status)} dot>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </td>
                <td style={tdStyle}>{user.role}</td>
                <td style={{ ...tdStyle, color: colors.gray600 }}>{user.createdAt}</td>
                <td style={tdStyle}>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      style={{
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'transparent',
                        borderRadius: radii.sm,
                        cursor: 'pointer',
                        color: colors.gray500,
                        transition: transitions.fast,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.gray100;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openMenu === user.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 36,
                          background: colors.white,
                          border: `1px solid ${colors.gray200}`,
                          borderRadius: radii.md,
                          boxShadow: shadows.md,
                          zIndex: 20,
                          minWidth: 120,
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => { onEdit(user); setOpenMenu(null); }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem 0.875rem',
                            border: 'none',
                            background: 'transparent',
                            fontFamily: fonts.body,
                            fontSize: '0.8125rem',
                            color: colors.gray800,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: transitions.fast,
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.gray50; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { onDelete(user); setOpenMenu(null); }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem 0.875rem',
                            border: 'none',
                            background: 'transparent',
                            fontFamily: fonts.body,
                            fontSize: '0.8125rem',
                            color: colors.error,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: transitions.fast,
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${colors.gray200}`,
          }}
        >
          <span style={{ fontFamily: fonts.body, fontSize: '0.75rem', color: colors.gray500 }}>
            Page {page + 1} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${colors.gray200}`,
                borderRadius: radii.sm,
                background: colors.white,
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                opacity: page === 0 ? 0.4 : 1,
                color: colors.gray700,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${colors.gray200}`,
                borderRadius: radii.sm,
                background: colors.white,
                cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages - 1 ? 0.4 : 1,
                color: colors.gray700,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
