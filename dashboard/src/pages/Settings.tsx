import React, { useState } from 'react';
import { ChevronRight, Save } from 'lucide-react';
import { colors, fonts, radii, components } from '../lib/theme';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { Toggle } from '../components/UI/Toggle';

interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, description, children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: `1px solid ${colors.gray200}`,
    }}
  >
    <div>
      <div style={{ fontFamily: fonts.body, fontSize: '0.9375rem', fontWeight: 500, color: colors.gray900 }}>
        {label}
      </div>
      <div style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray500, marginTop: 2 }}>
        {description}
      </div>
    </div>
    {children}
  </div>
);

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'integrations'>('general');
  const [companyName, setCompanyName] = useState('Smartclick AB');
  const [email, setEmail] = useState('admin@smartclick.se');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [callRecording, setCallRecording] = useState(true);

  const tabs = [
    { key: 'general' as const, label: 'General' },
    { key: 'notifications' as const, label: 'Notifications' },
    { key: 'integrations' as const, label: 'Integrations' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray500 }}>Home</span>
        <ChevronRight size={14} color={colors.gray400} />
        <span style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray900, fontWeight: 500 }}>Settings</span>
      </div>

      {/* Header */}
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '1.75rem', fontWeight: 700, color: colors.gray900, margin: 0 }}>
          Settings
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '0.875rem', color: colors.gray500, margin: '0.25rem 0 0' }}>
          Configure your dashboard and AI receptionist preferences.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: `1px solid ${colors.gray200}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.625rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.key ? `2px solid ${colors.primary}` : '2px solid transparent',
              fontFamily: fonts.body,
              fontSize: '0.875rem',
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? colors.primary : colors.gray600,
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div
        style={{
          background: components.card.bg,
          borderRadius: components.card.radius,
          border: components.card.border,
          boxShadow: components.card.shadow,
          padding: components.card.padding,
        }}
      >
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <Input label="Contact Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <SettingRow label="Call Recording" description="Automatically record all incoming AI receptionist calls.">
              <Toggle checked={callRecording} onChange={setCallRecording} />
            </SettingRow>
            <SettingRow label="GDPR Mode" description="Enforce strict GDPR compliance for all data processing.">
              <Toggle checked={true} onChange={() => {}} disabled />
            </SettingRow>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="primary" icon={<Save size={16} />}>
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingRow label="Email Notifications" description="Receive email alerts for missed calls and new bookings.">
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
            </SettingRow>
            <SettingRow label="SMS Notifications" description="Receive SMS alerts for urgent escalations.">
              <Toggle checked={smsNotifs} onChange={setSmsNotifs} />
            </SettingRow>
            <SettingRow label="Weekly Report" description="Get a weekly summary of AI receptionist performance.">
              <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
            </SettingRow>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Google Calendar', desc: 'Sync bookings to Google Calendar', connected: true },
              { name: 'Outlook', desc: 'Sync bookings to Outlook Calendar', connected: false },
              { name: 'Supabase', desc: 'Database and authentication backend', connected: false },
              { name: 'Slack', desc: 'Send call summaries to Slack channels', connected: false },
            ].map((int) => (
              <div
                key={int.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: `1px solid ${colors.gray200}`,
                  borderRadius: radii.md,
                }}
              >
                <div>
                  <div style={{ fontFamily: fonts.body, fontSize: '0.9375rem', fontWeight: 500, color: colors.gray900 }}>
                    {int.name}
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: '0.8125rem', color: colors.gray500, marginTop: 2 }}>
                    {int.desc}
                  </div>
                </div>
                <Button variant={int.connected ? 'ghost' : 'secondary'}>
                  {int.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
