import React, { useState, useRef, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignOutAlt, faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { HeaderTokens, UserConfig, UserMenuOption, HeaderProps, ActionItem } from './Header.types';
import {
  HeaderBar,
  Actions,
  UserMenuContainer,
  UserButton,
  UserAvatar,
  UserDetails,
  UserMenu,
  UserMenuItem,
  Divider
} from '../../styles/Header.styles';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip';
import { headerTokens } from './Header.tokens';

const defaultMenuOptions = (onLogout?: () => void): UserMenuOption[] => [
  { label: 'Profile', icon: <FontAwesomeIcon icon={faUser} />, onClick: () => {}, disabled: true },
  { label: 'My Messages', icon: <FontAwesomeIcon icon={faEnvelope} />, onClick: () => {}, disabled: true },
  { label: 'Change Password', icon: <FontAwesomeIcon icon={faKey} />, onClick: () => {}, disabled: true },
  { label: 'Logout', icon: <FontAwesomeIcon icon={faSignOutAlt} />, onClick: onLogout },
];

const Header: React.FC<HeaderProps> = ({ title, actions, user, tokens: tokensProp, onLogout, userMenuOptions, tooltipIcon, tooltipContent, tooltipPlacement }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const tokens = useTokens<HeaderTokens>('header', headerTokens);
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

  const renderActions = () => {
    if (!actions) return null;
    
    // If actions is an array of ActionItem objects
    if (Array.isArray(actions)) {
      return actions.map((action: ActionItem, index) => (
        <button
          key={index}
          onClick={action.onClick}
          disabled={action.disabled}
          style={{
            background: 'none',
            border: 'none',
            cursor: action.disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '4px',
            color: mergedTokens.header.titleColor,
            opacity: action.disabled ? 0.6 : 1,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!action.disabled) {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {action.icon}
          <Typography variant="body2">{action.label}</Typography>
        </button>
      ));
    }
    
    // If actions is a ReactNode, render it directly
    return actions;
  };

  return (
    <HeaderBar tokens={mergedTokens.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {tooltipIcon && tooltipContent && (
          <Tooltip content={tooltipContent} placement={tooltipPlacement}>
            {tooltipIcon}
          </Tooltip>
        )}
        {title && (typeof title === 'string' ? (
          <Typography variant="h5" weight="semibold" style={{ color: mergedTokens.header.titleColor }}>
            {title}
          </Typography>
        ) : title)}
      </div>
      <Actions>
        {renderActions && renderActions()}
        {user && (
          <UserMenuContainer ref={userRef}>
            <UserButton tokens={mergedTokens.header} onClick={() => setMenuOpen((open) => !open)}>
              <UserAvatar>{user.avatar}</UserAvatar>
              <UserDetails>
                <Typography variant="body1" weight="medium">
                  {user.name}
                </Typography>
                {user.role && (
                  <Typography variant="caption" style={{ color: mergedTokens.header.userRoleColor }}>
                    {user.role}
                  </Typography>
                )}
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
                    {option.icon} 
                    <Typography variant="body2" style={{ color: 'inherit' }}>
                      {option.label}
                    </Typography>
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
                  {menuOptions[menuOptions.length-1].icon} 
                  <Typography variant="body2" style={{ color: 'inherit' }}>
                    {menuOptions[menuOptions.length-1].label}
                  </Typography>
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