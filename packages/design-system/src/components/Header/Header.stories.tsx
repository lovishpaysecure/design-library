import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSync, faBell } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const config = {
  user: {
    avatar: <div style={{width: 30, height: 30, borderRadius: '50%', background: '#eee'}} />,
    name: 'dugu404',
    role: 'SUPERADMIN',
  },
  header: {
    title: 'Dashboard Analytics',
    actions: [
      { icon: <FontAwesomeIcon icon={faPencil} />, label: 'Edit' },
      { icon: <FontAwesomeIcon icon={faSync} />, label: 'Refresh' },
      { icon: <FontAwesomeIcon icon={faBell} />, label: 'Notifications' },
    ],
  },
};

const customConfig = {
  user: {
    avatar: <div style={{width: 30, height: 30, borderRadius: '50%', background: '#4caf50'}} />,
    name: 'customUser',
    role: 'ADMIN',
  },
  header: {
    title: 'Custom Dashboard',
    actions: [
      { icon: <FontAwesomeIcon icon={faSync} />, label: 'Refresh' },
    ],
  },
};

export default {
  title: 'Components/Header',
};

export const HeaderDefault = () => (
  <Header
    title={config.header.title}
    actions={config.header.actions}
    user={config.user}
    tokens={{
      header: {
        height: '64px',
        background: 'transparent',
        titleColor: '#333',
        titleFontSize: '20px',
        titleFontWeight: '600',
        userRoleColor: '#666',
        userRoleFontSize: '12px',
        userBg: '#f8f9fa',
        userMenuBoxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        userMenuBg: '#fff',
        userMenuItemColor: '#333',
        userMenuItemHoverBg: '#f5f5f5',
        userMenuItemHoverColor: '#1976d2',
      },
    }}
  />
);

export const HeaderCustom = () => (
  <Header
    title={customConfig.header.title}
    actions={customConfig.header.actions}
    user={customConfig.user}
    tokens={{
      header: {
        height: '64px',
        background: 'transparent',
        titleColor: '#333',
        titleFontSize: '20px',
        titleFontWeight: 600,
        userRoleColor: '#666',
        userRoleFontSize: '12px',
        userBg: '#e0f7fa',
        userMenuBoxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        userMenuBg: '#fff',
        userMenuItemColor: '#333',
        userMenuItemHoverBg: '#f5f5f5',
        userMenuItemHoverColor: '#1976d2',
      },
    }}
  />
); 