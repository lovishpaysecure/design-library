import React, { ReactNode } from 'react';

export interface HeaderTokens {
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

export interface UserConfig {
  avatar?: ReactNode;
  name: string;
  role?: string;
}

export interface UserMenuOption {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  bold?: boolean;
  gray?: boolean;
}

export interface ActionItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface HeaderProps {
  title?: ReactNode;
  actions?: ActionItem[] | ReactNode;
  user?: UserConfig;
  tokens?: HeaderTokens;
  onLogout?: () => void;
  userMenuOptions?: UserMenuOption[];
  tooltipIcon?: ReactNode;
  tooltipContent?: ReactNode;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
} 