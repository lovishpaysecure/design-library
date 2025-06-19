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
import Logo from '../../assests/icon/Logo.svg';
import favicon from '../../assests/icon/favicon.ico';

const config = {
  logo: (collapsed: boolean) => collapsed
    ? <img src={favicon} alt="Favicon" style={{ width: 32, height: 32, borderRadius: 8 }} />
    : <img src={Logo} alt="Logo" style={{ width: 175, height: 32, objectFit: 'contain' }} />,
  menuItems: [
    { icon: <FontAwesomeIcon icon={faHome} />, label: 'Dashboard', active: true },
    { 
      icon: <FontAwesomeIcon icon={faMoneyBill} />, 
      label: 'Payout', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, label: 'Transfer Payout' },
        { icon: <FontAwesomeIcon icon={faMoneyCheck} />, label: 'Check Payout' },
        { icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Payout Analytics' }
      ]
    },
    { label: 'ADMIN', header: true },
    { 
      icon: <FontAwesomeIcon icon={faUserCog} />, 
      label: 'Manage Roles',
      submenu: [
        { icon: <FontAwesomeIcon icon={faUser} />, label: 'User Roles' },
        { icon: <FontAwesomeIcon icon={faUserGroup} />, label: 'Team Roles' },
        { icon: <FontAwesomeIcon icon={faLock} />, label: 'Permissions' }
      ]
    },
    { 
      icon: <FontAwesomeIcon icon={faStore} />, 
      label: 'Merchant', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faStore} />, label: 'All Merchants' },
        { icon: <FontAwesomeIcon icon={faUserGroup} />, label: 'Merchant Groups' },
        { icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Analytics' }
      ]
    },
    { icon: <FontAwesomeIcon icon={faCog} />, label: 'Global Settings' },
    { 
      icon: <FontAwesomeIcon icon={faUniversity} />, 
      label: 'Banks', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faUniversity} />, label: 'Bank List' },
        { icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Bank Security' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Bank Analytics' }
      ]
    },
    { label: 'RULES', header: true },
    { 
      icon: <FontAwesomeIcon icon={faGavel} />, 
      label: 'Rule Engine', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faGavel} />, label: 'Rule List' },
        { icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Rule Security' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Rule Analytics' }
      ]
    },
    { 
      icon: <FontAwesomeIcon icon={faShieldAlt} />, 
      label: 'Global Blocking', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faLock} />, label: 'Block List' },
        { icon: <FontAwesomeIcon icon={faShieldHalved} />, label: 'Security Rules' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Blocking Analytics' }
      ]
    },
    { label: 'OPERATIONS', header: true },
    { icon: <FontAwesomeIcon icon={faBalanceScale} />, label: 'Balance' },
    { 
      icon: <FontAwesomeIcon icon={faChartLine} />, 
      label: 'Scoring', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Score Cards' },
        { icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Score Analytics' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Trends' }
      ]
    },
    { 
      icon: <FontAwesomeIcon icon={faTools} />, 
      label: 'Utilities', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faTools} />, label: 'Tools' },
        { icon: <FontAwesomeIcon icon={faCog} />, label: 'Settings' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Usage Analytics' }
      ]
    },
    { label: 'SETTLEMENT SECTION', header: true },
    { 
      icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />, 
      label: 'Settlement', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />, label: 'Settlement List' },
        { icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />, label: 'Transfer' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Settlement Analytics' }
      ]
    },
    { label: 'REPORTS AND ANALYTICS', header: true },
    { 
      icon: <FontAwesomeIcon icon={faChartLine} />, 
      label: 'Report', 
      submenu: [
        { icon: <FontAwesomeIcon icon={faChartBar} />, label: 'Daily Reports' },
        { icon: <FontAwesomeIcon icon={faChartPie} />, label: 'Monthly Reports' },
        { icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Custom Reports' }
      ]
    },
  ],
};

export default {
  title: 'Components/Sidebar',
};


export const SidebarInteractive = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      menuItems={config.menuItems}
      logo={config.logo(collapsed)}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed(c => !c)}
    />
  );
}; 