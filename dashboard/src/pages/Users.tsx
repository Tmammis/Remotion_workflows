import React, { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { colors, fonts } from '../lib/theme';
import { useMockData } from '../hooks/useMockData';
import { Button } from '../components/UI/Button';
import { DataTable } from '../components/DataTable/DataTable';
import { UserFormModal } from '../components/Modals/UserFormModal';
import { DeleteModal } from '../components/Modals/DeleteModal';
import type { User } from '../data/mockData';

export const UsersPage: React.FC = () => {
  const { data, loading } = useMockData('users');
  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray500 }}>
          Home
        </span>
        <ChevronRight size={14} color={colors.gray400} />
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray900, fontWeight: 500 }}>
          Users
        </span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            Users
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: '0.875rem',
              color: colors.gray500,
              margin: '0.25rem 0 0',
            }}
          >
            Manage user accounts and permissions.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => { setEditUser(null); setFormOpen(true); }}
        >
          Add User
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={data}
        loading={loading}
        onEdit={(user) => { setEditUser(user); setFormOpen(true); }}
        onDelete={(user) => setDeleteUser(user)}
      />

      {/* Modals */}
      <UserFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditUser(null); }}
        user={editUser}
      />
      <DeleteModal
        open={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={() => setDeleteUser(null)}
        name={deleteUser?.name || ''}
      />
    </div>
  );
};
