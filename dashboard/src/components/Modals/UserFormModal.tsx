import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { colors, fonts, radii } from '../../lib/theme';
import type { User } from '../../data/mockData';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ open, onClose, user }) => {
  const isEdit = !!user;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [status, setStatus] = useState<string>('active');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    } else {
      setName('');
      setEmail('');
      setRole('User');
      setStatus('active');
    }
  }, [user, open]);

  const handleSubmit = () => {
    // In production: call Supabase insert/update here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit User' : 'Create User'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label
              style={{
                fontFamily: fonts.body,
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: colors.gray800,
              }}
            >
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                border: `1px solid ${colors.gray500}`,
                borderRadius: radii.lg,
                fontFamily: fonts.body,
                fontSize: '0.875rem',
                color: colors.gray900,
                outline: 'none',
                background: colors.white,
              }}
            >
              <option>User</option>
              <option>Editor</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label
              style={{
                fontFamily: fonts.body,
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: colors.gray800,
              }}
            >
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                border: `1px solid ${colors.gray500}`,
                borderRadius: radii.lg,
                fontFamily: fonts.body,
                fontSize: '0.875rem',
                color: colors.gray900,
                outline: 'none',
                background: colors.white,
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: `1px solid ${colors.gray200}`,
            marginTop: '0.5rem',
          }}
        >
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
