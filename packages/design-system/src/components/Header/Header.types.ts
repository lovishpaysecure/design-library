import React from 'react';

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
  avatar?: React.ReactNode;
  name: string;
  role?: string;
}

export interface UserMenuOption {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  bold?: boolean;
  gray?: boolean;
}

export interface HeaderProps {
  title?: React.ReactNode;
  actions?: { icon: React.ReactNode; label: string; onClick?: () => void }[];
  user?: UserConfig;
  tokens?: HeaderTokens;
  onLogout?: () => void;
  userMenuOptions?: UserMenuOption[];
} 