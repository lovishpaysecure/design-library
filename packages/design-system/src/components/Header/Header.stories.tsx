import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSync, faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
      { icon: <FontAwesomeIcon icon={faPencil} />, label: 'Edit', onClick: () => alert('Edit clicked!') },
      { icon: <FontAwesomeIcon icon={faSync} />, label: 'Refresh', onClick: () => alert('Refresh clicked!') },
      { icon: <FontAwesomeIcon icon={faBell} />, label: 'Notifications', onClick: () => alert('Notifications clicked!') },
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
      { icon: <FontAwesomeIcon icon={faSync} />, label: 'Refresh', onClick: () => alert('Custom refresh clicked!') },
    ],
  },
};

export default {
  title: 'Components/Header',
  component: Header,
};

export const Default = () => (
  <Header
    title="Dashboard Analytics"
    tooltipIcon={<FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: 22, padding: 2 }} />}
    tooltipContent={
      'Provides a high-level overview of system-wide metrics and analytics for informed decision-making.'
    }
    tooltipPlacement="bottom"
    user={{ name: 'dugu404', avatar: <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 30, height: 30, borderRadius: '50%' }} />, role: 'SUPERADMIN' }}
  />
);

export const WithActions = () => (
  <Header
    title={config.header.title}
    actions={config.header.actions}
    user={config.user}
    tooltipIcon={<FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: 22, padding: 2 }} />}
    tooltipContent="This header includes action buttons!"
    tooltipPlacement="bottom"
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