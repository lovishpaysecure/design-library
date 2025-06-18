import React, { useState, useRef, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignOutAlt, faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { HeaderTokens, UserConfig, UserMenuOption, HeaderProps } from './Header.types';
import {
  HeaderBar,
  Title,
  Actions,
  UserMenuContainer,
  UserButton,
  UserAvatar,
  UserDetails,
  UserRole,
  UserMenu,
  UserMenuItem,
  Divider
} from '../../styles/Header.styles';

const defaultTokens: HeaderTokens = {
  header: {
    height: '64px',
    background: '#fff',
    titleFontSize: '20px',
    titleFontWeight: 600,
    titleColor: '#333',
    userBg: '#f8f9fa',
    userRoleFontSize: '12px',
    userRoleColor: '#666',
    userMenuBoxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    userMenuBg: '#fff',
    userMenuItemColor: '#5022bd',
    userMenuItemHoverBg: '#f5f5f5',
    userMenuItemHoverColor: '#333',
  },
};

const defaultMenuOptions = (onLogout?: () => void): UserMenuOption[] => [
  { label: 'Profile', icon: <FontAwesomeIcon icon={faUser} />, onClick: () => {}, disabled: true },
  { label: 'My Messages', icon: <FontAwesomeIcon icon={faEnvelope} />, onClick: () => {}, disabled: true },
  { label: 'Change Password', icon: <FontAwesomeIcon icon={faKey} />, onClick: () => {}, disabled: true },
  { label: 'Logout', icon: <FontAwesomeIcon icon={faSignOutAlt} />, onClick: onLogout },
];

const Header: React.FC<HeaderProps> = ({ title, actions, user, tokens: tokensProp, onLogout, userMenuOptions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const tokens = useTokens<HeaderTokens>('header', defaultTokens);
  const mergedTokens = tokensProp || tokens;
  const menuOptions = userMenuOptions || defaultMenuOptions(onLogout);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <HeaderBar tokens={mergedTokens.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {title && (typeof title === 'string' ? <Title tokens={mergedTokens.header}>{title}</Title> : title)}
      </div>
      <Actions>
        {user && (
          <UserMenuContainer ref={userRef}>
            <UserButton tokens={mergedTokens.header} onClick={() => setMenuOpen((open) => !open)}>
              <UserAvatar>{user.avatar}</UserAvatar>
              <UserDetails>
                <span>{user.name}</span>
                {user.role && <UserRole tokens={mergedTokens.header}>{user.role}</UserRole>}
              </UserDetails>
              <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8, fontSize: 16 }} />
            </UserButton>
            {menuOpen && (
              <UserMenu tokens={mergedTokens.header}>
                {menuOptions.slice(0, -1).map((option, idx) => (
                  <UserMenuItem
                    key={option.label}
                    tokens={mergedTokens.header}
                    onClick={() => {
                      setMenuOpen(false);
                      if (!option.disabled && option.onClick) option.onClick();
                    }}
                    disabled={option.disabled}
                    gray={option.label === 'Logout'}
                  >
                    {option.icon} {option.label}
                  </UserMenuItem>
                ))}
                <Divider />
                <UserMenuItem
                  key={menuOptions[menuOptions.length-1].label}
                  tokens={mergedTokens.header}
                  onClick={() => {
                    setMenuOpen(false);
                    if (menuOptions[menuOptions.length-1].onClick) menuOptions[menuOptions.length-1].onClick!();
                  }}
                  disabled={menuOptions[menuOptions.length-1].disabled}
                  gray
                >
                  {menuOptions[menuOptions.length-1].icon} {menuOptions[menuOptions.length-1].label}
                </UserMenuItem>
              </UserMenu>
            )}
          </UserMenuContainer>
        )}
      </Actions>
    </HeaderBar>
  );
};

export default Header; 