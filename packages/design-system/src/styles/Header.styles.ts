import styled from 'styled-components';
import { HeaderTokens } from '../components/Header/Header.types';

export const HeaderBar = styled.div<{tokens: HeaderTokens['header']}>`
  height: ${({tokens}) => tokens.height};
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserButton = styled.div<{tokens: HeaderTokens['header']}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({tokens}) => tokens.userBg};
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  margin-right: 8px;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

export const UserMenu = styled.div<{tokens: HeaderTokens['header']}>`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  border-radius: 12px;
  z-index: 1001;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

export const UserMenuItem = styled.button<{tokens: HeaderTokens['header']; bold?: boolean; gray?: boolean}>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  color: ${({tokens, gray}) => gray ? '#6B7280' : tokens.userMenuItemColor};
  font-weight: ${({bold}) => bold ? 700 : 400};
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-align: left;
  &:hover:not(:disabled) {
    background: ${({tokens}) => tokens.userMenuItemHoverBg};
    color: ${({tokens}) => tokens.userMenuItemHoverColor};
  }
  &:disabled {
    color: #bbb;
    cursor: not-allowed;
    background: none;
    font-weight: 400;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 4px 0 4px 0;
  width: 100%;
`; 