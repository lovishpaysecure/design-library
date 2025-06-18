export { Button } from './Button/index.js';
export { Typography } from './Typography/index.js';
import React$1, { ReactNode } from 'react';

interface SubMenuItemConfig {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
}
interface MenuItemConfig {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    submenu?: SubMenuItemConfig[];
    header?: boolean;
}
interface SidebarProps {
    menuItems: MenuItemConfig[];
    logo?: React.ReactNode;
    collapsed: boolean;
    onToggleCollapse: () => void;
    onMenuClick?: (item: MenuItemConfig) => void;
}
interface SidebarTokens {
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
    };
}

declare const Sidebar: React$1.FC<SidebarProps & {
    tokens?: SidebarTokens;
}>;

interface HeaderTokens {
    header: {
        height: string;
        background: string;
        titleFontSize: string;
        titleFontWeight: number;
        titleColor: string;
        userBg: string;
        userRoleFontSize: string;
        userRoleColor: string;
        userMenuBoxShadow: string;
        userMenuBg: string;
        userMenuItemColor: string;
        userMenuItemHoverBg: string;
        userMenuItemHoverColor: string;
    };
}
interface UserConfig {
    avatar?: React$1.ReactNode;
    name: string;
    role?: string;
}
interface UserMenuOption {
    label: string;
    icon?: React$1.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    bold?: boolean;
    gray?: boolean;
}
interface HeaderProps {
    title?: React$1.ReactNode;
    actions?: {
        icon: React$1.ReactNode;
        label: string;
        onClick?: () => void;
    }[];
    user?: UserConfig;
    tokens?: HeaderTokens;
    onLogout?: () => void;
    userMenuOptions?: UserMenuOption[];
}

declare const Header: React$1.FC<HeaderProps>;

interface TokenValue {
    [key: string]: string | TokenValue;
}
interface TokenConfig {
    [section: string]: TokenValue;
}
declare function useTokens<T extends {
    [key: string]: any;
}>(componentType: string, defaultTokens: T): T;

interface ThemeProviderProps {
    tokenUrl: string;
    children: ReactNode;
}
declare const ThemeProvider: React$1.FC<ThemeProviderProps>;

export { Header, HeaderProps, Sidebar, SidebarProps, ThemeProvider, TokenConfig, TokenValue, useTokens };
