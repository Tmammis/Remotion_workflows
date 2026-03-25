import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '../UI/Button';
import { colors, fonts } from '../../lib/theme';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm, name }) => (
  <Modal open={open} onClose={onClose} title="Confirm Deletion" width={420}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#FEE2E2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AlertTriangle size={24} color={colors.error} />
      </div>
      <p style={{ fontFamily: fonts.body, fontSize: '0.9375rem', color: colors.gray700, margin: 0 }}>
        Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          width: '100%',
          justifyContent: 'center',
          paddingTop: '0.5rem',
        }}
      >
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={() => { onConfirm(); onClose(); }}>
          Delete
        </Button>
      </div>
    </div>
  </Modal>
);
