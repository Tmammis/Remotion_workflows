import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { colors, layout, transitions } from '../../lib/theme';

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sidebarW = collapsed ? layout.sidebarCollapsed : layout.sidebarWidth;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode ? colors.darkSurface : colors.gray50,
        transition: transitions.slow,
      }}
    >
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Header
        sidebarWidth={sidebarW}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <main
        style={{
          marginLeft: sidebarW,
          marginTop: layout.headerHeight,
          padding: layout.containerPadding,
          transition: transitions.slow,
          minHeight: `calc(100vh - ${layout.headerHeight})`,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
