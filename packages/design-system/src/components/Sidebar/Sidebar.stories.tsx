import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMoneyBill,
  faUserCog,
  faChevronDown,
  faPencil,
  faSync,
  faBell,
  faUser,
  faUserGroup,
  faLock,
  faChartPie,
  faChartBar,
  faMoneyBillTransfer,
  faMoneyCheck,
  faStore,
  faCog,
  faUniversity,
  faShieldHalved,
  faChartLine,
  faGavel,
  faShieldAlt,
  faBalanceScale,
  faTools,
  faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { MenuItemConfig, SubMenuItemConfig } from './Sidebar.types';
import Logo from '../../assests/icon/Logo.svg';
import favicon from '../../assests/icon/favicon.ico';

const config = {
  logo: (collapsed: boolean) => collapsed
    ? <img src={favicon} alt="Favicon" style={{ width: 32, height: 32, borderRadius: 8 }} />
    : <img src={Logo} alt="Logo" style={{ width: 175, height: 32, objectFit: 'contain' }} />,
  menuItems: [
    { id: 'dashboard', icon: <FontAwesomeIcon icon={faHome} />, label: 'Dashboard', active: true },
    { 
      id: 'payout',
      icon: <FontAwesomeIcon icon={faMoneyBill} />, 
      label: 'Payout', 
      submenu: [
        { id: 'transfer-payout', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, label: 'Transfer Payout' },
        { id: 'check-payout', icon: <FontAwesomeIcon icon={faMoneyCheck} />, label: 'Check Payout' },
        { id: 'payout-analytics', icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Payout Analytics' }
      ]
    },
    { id: 'admin-header', label: 'ADMIN', header: true },
    { 
      id: 'manage-roles',
      icon: <FontAwesomeIcon icon={faUserCog} />, 
      label: 'Manage Roles',
      submenu: [
        { id: 'user-roles', icon: <FontAwesomeIcon icon={faUser} />, label: 'User Roles' },
        { id: 'team-roles', icon: <FontAwesomeIcon icon={faUserGroup} />, label: 'Team Roles' },
        { id: 'permissions', icon: <FontAwesomeIcon icon={faLock} />, label: 'Permissions' }
      ]
    },
    { 
      id: 'merchant',
      icon: <FontAwesomeIcon icon={faStore} />, 
      label: 'Merchant', 
      submenu: [
        { id: 'all-merchants', icon: <FontAwesomeIcon icon={faStore} />, label: 'All Merchants' },
        { id: 'merchant-groups', icon: <FontAwesomeIcon icon={faUserGroup} />, label: 'Merchant Groups' },
        { id: 'merchant-analytics', icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Analytics' }
      ]
    },
    { id: 'global-settings', icon: <FontAwesomeIcon icon={faCog} />, label: 'Global Settings' },
    { 
      id: 'banks',
      icon: <FontAwesomeIcon icon={faUniversity} />, 
      label: 'Banks', 
      submenu: [
        { id: 'bank-list', icon: <FontAwesomeIcon icon={faUniversity} />, label: 'Bank List' },
        { id: 'bank-security', icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Bank Security' },
        { id: 'bank-analytics', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Bank Analytics' }
      ]
    },
    { id: 'rules-header', label: 'RULES', header: true },
    { 
      id: 'rule-engine',
      icon: <FontAwesomeIcon icon={faGavel} />, 
      label: 'Rule Engine', 
      submenu: [
        { id: 'rule-list', icon: <FontAwesomeIcon icon={faGavel} />, label: 'Rule List' },
        { id: 'rule-security', icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Rule Security' },
        { id: 'rule-analytics', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Rule Analytics' }
      ]
    },
    { 
      id: 'global-blocking',
      icon: <FontAwesomeIcon icon={faShieldAlt} />, 
      label: 'Global Blocking', 
      submenu: [
        { id: 'block-list', icon: <FontAwesomeIcon icon={faLock} />, label: 'Block List' },
        { id: 'blocking-security', icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Security Rules' },
        { id: 'blocking-analytics', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Blocking Analytics' }
      ]
    },
    { id: 'operations-header', label: 'OPERATIONS', header: true },
    { id: 'balance', icon: <FontAwesomeIcon icon={faBalanceScale} />, label: 'Balance' },
    { 
      id: 'scoring',
      icon: <FontAwesomeIcon icon={faChartLine} />, 
      label: 'Scoring', 
      submenu: [
        { id: 'score-cards', icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Score Cards' },
        { id: 'score-analytics', icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Score Analytics' },
        { id: 'trends', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Trends' }
      ]
    },
    { 
      id: 'utilities',
      icon: <FontAwesomeIcon icon={faTools} />, 
      label: 'Utilities', 
      submenu: [
        { id: 'tools', icon: <FontAwesomeIcon icon={faTools} />, label: 'Tools' },
        { id: 'utility-settings', icon: <FontAwesomeIcon icon={faCog} />, label: 'Settings' },
        { id: 'usage-analytics', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Usage Analytics' }
      ]
    },
    { id: 'settlement-header', label: 'SETTLEMENT SECTION', header: true },
    { 
      id: 'settlement',
      icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />, 
      label: 'Settlement', 
      submenu: [
        { id: 'settlement-list', icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />, label: 'Settlement List' },
        { id: 'settlement-transfer', icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, label: 'Transfer' },
        { id: 'settlement-analytics', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Settlement Analytics' }
      ]
    },
    { id: 'reports-header', label: 'REPORTS AND ANALYTICS', header: true },
    { 
      id: 'report',
      icon: <FontAwesomeIcon icon={faChartLine} />, 
      label: 'Report', 
      submenu: [
        { id: 'daily-reports', icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Daily Reports' },
        { id: 'monthly-reports', icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Monthly Reports' },
        { id: 'custom-reports', icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Custom Reports' }
      ]
    },
  ],
};

export default {
  title: 'Components/Sidebar',
};


export const SidebarInteractive = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState(config.menuItems);

  const handleMenuClick = (item: MenuItemConfig | SubMenuItemConfig, isSubItem?: boolean) => {
    console.log('Clicked item:', item, 'Is sub-item:', isSubItem);
    
    // Update active states - only one item can be active at a time
    const updatedMenuItems = menuItems.map((menuItem: MenuItemConfig) => {
      if (menuItem.header) return menuItem;
      
      if (isSubItem) {
        // If clicking a sub-item, update its parent and siblings
        if (menuItem.submenu) {
          const hasActiveSubItem = menuItem.submenu.some(sub => sub.id === item.id);
          if (hasActiveSubItem) {
            return {
              ...menuItem,
              active: false,
              submenu: menuItem.submenu.map(sub => ({
                ...sub,
                active: sub.id === item.id
              }))
            };
          } else {
            return {
              ...menuItem,
              active: false,
              submenu: menuItem.submenu.map(sub => ({
                ...sub,
                active: false
              }))
            };
          }
        }
        return { ...menuItem, active: false };
      } else {
        // If clicking a main item, update main items and clear sub-item actives
        return {
          ...menuItem,
          active: menuItem.id === item.id,
          submenu: menuItem.submenu?.map(sub => ({
            ...sub,
            active: false
          }))
        };
      }
    });
    
    setMenuItems(updatedMenuItems);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        menuItems={menuItems}
        logo={config.logo(collapsed)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(c => !c)}
        onMenuClick={handleMenuClick}
      />
      <div style={{ flex: 1, padding: '20px', background: '#f5f5f5' }}>
        <h2>Sidebar Click Demo</h2>
        <p>Click on sidebar items to see the active states change and check the console for click events.</p>
        <p>Only one item can be active at a time.</p>
      </div>
    </div>
  );
}; 