import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Phone,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { colors, fonts, radii, transitions, layout, gradients, shadows } from '../../lib/theme';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, section: 'Overview' },
  { path: '/users', label: 'Users', icon: Users, section: 'Overview' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, section: 'Overview' },
  { path: '/calls', label: 'Calls', icon: Phone, section: 'Management' },
  { path: '/reports', label: 'Reports', icon: FileText, section: 'Management' },
  { path: '/settings', label: 'Settings', icon: Settings, section: 'System' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [...new Set(navItems.map((n) => n.section))];

  return (
    <aside
      style={{
        width: collapsed ? layout.sidebarCollapsed : layout.sidebarWidth,
        height: '100vh',
        background: colors.primary,
        display: 'flex',
        flexDirection: 'column',
        transition: transitions.slow,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: layout.headerHeight,
          display: 'flex',
          alignItems: 'center',
          padding: collapsed ? '0 1rem' : '0 1.25rem',
          gap: '0.75rem',
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
          flexShrink: 0,
        }}
      >
        <img
          src="/logo.png"
          alt="Smartclick"
          style={{
            width: 32,
            height: 32,
            borderRadius: radii.sm,
            objectFit: 'contain',
          }}
        />
        {!collapsed && (
          <span
            style={{
              fontFamily: fonts.heading,
              fontSize: '1.125rem',
              fontWeight: 700,
              color: colors.white,
              whiteSpace: 'nowrap',
            }}
          >
            Smartclick
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
        {sections.map((section) => (
          <div key={section} style={{ marginBottom: '1.25rem' }}>
            {!collapsed && (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0 0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {section}
              </div>
            )}
            {navItems
              .filter((n) => n.section === section)
              .map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: collapsed ? '0.625rem' : '0.625rem 0.75rem',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      background: active ? gradients.sidebarActive : 'transparent',
                      border: 'none',
                      borderRadius: radii.md,
                      cursor: 'pointer',
                      transition: transitions.base,
                      marginBottom: '0.125rem',
                      boxShadow: active ? shadows.sm : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icon
                      size={20}
                      color={active ? colors.primaryPale : 'rgba(255,255,255,0.65)'}
                      strokeWidth={active ? 2.2 : 1.8}
                    />
                    {!collapsed && (
                      <span
                        style={{
                          fontFamily: fonts.body,
                          fontSize: '0.875rem',
                          fontWeight: active ? 600 : 400,
                          color: active ? colors.white : 'rgba(255,255,255,0.75)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.875rem',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: fonts.body,
          fontSize: '0.8125rem',
          transition: transitions.base,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        }}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  );
};
