export interface SubMenuItemConfig {
  id?: string;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
}

export interface MenuItemConfig {
  id?: string;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  submenu?: SubMenuItemConfig[];
  header?: boolean;
}

export interface SidebarProps {
  menuItems: MenuItemConfig[];
  logo?: React.ReactNode;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onMenuClick?: (item: MenuItemConfig | SubMenuItemConfig, isSubItem?: boolean) => void;
}

export interface SidebarTokens {
  sidebar: {
    width: string;
    collapsedWidth: string;
    background: string;
    borderColor: string;
    boxShadow: string;
    headerHeight: string;
    headerBg: string;
    logoPadding: string;
    logoPaddingCollapsed: string;
    logoJustify: string;
    logoJustifyCollapsed: string;
    toggleBg: string;
    toggleBorder: string;
    toggleColor: string;
    toggleBoxShadow: string;
    navItemDefaultColor: string;
    navItemActiveColor: string;
    navItemHoverColor: string;
    navItemHoverBg: string;
    navItemActiveBg: string;
  };
} 