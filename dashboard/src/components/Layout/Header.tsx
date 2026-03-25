import React, { useState } from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { colors, fonts, radii, transitions, layout, components } from '../../lib/theme';

interface HeaderProps {
  sidebarWidth: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarWidth, darkMode, onToggleDarkMode }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      style={{
        height: layout.headerHeight,
        position: 'fixed',
        top: 0,
        left: sidebarWidth,
        right: 0,
        background: darkMode ? colors.dark : colors.white,
        borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : colors.gray200}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 30,
        transition: transitions.slow,
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative', width: 320 }}>
        <Search
          size={16}
          color={colors.gray500}
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: '100%',
            padding: `${components.input.padding}`,
            paddingLeft: '2.25rem',
            background: darkMode ? colors.darkSurface : colors.gray50,
            color: darkMode ? colors.white : colors.gray900,
            border: searchFocused
              ? `1px solid ${colors.primaryLight}`
              : `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : colors.gray200}`,
            borderRadius: radii.lg,
            fontFamily: fonts.body,
            fontSize: '0.8125rem',
            outline: 'none',
            transition: transitions.base,
            boxShadow: searchFocused ? `0 0 0 3px ${colors.primaryLight}22` : 'none',
          }}
        />
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radii.md,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: darkMode ? colors.gray400 : colors.gray600,
            transition: transitions.base,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : colors.gray100;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radii.md,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            position: 'relative',
            color: darkMode ? colors.gray400 : colors.gray600,
            transition: transitions.base,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : colors.gray100;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.error,
              border: `2px solid ${darkMode ? colors.dark : colors.white}`,
            }}
          />
        </button>

        {/* Avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.375rem 0.75rem',
            borderRadius: radii.full,
            cursor: 'pointer',
            transition: transitions.base,
            marginLeft: '0.25rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : colors.gray50;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontFamily: fonts.heading,
              fontSize: '0.8125rem',
              fontWeight: 700,
            }}
          >
            EL
          </div>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: darkMode ? colors.white : colors.gray800,
            }}
          >
            Erik
          </span>
        </div>
      </div>
    </header>
  );
};
