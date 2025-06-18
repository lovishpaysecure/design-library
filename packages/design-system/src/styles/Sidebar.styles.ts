import styled from 'styled-components';
import { SidebarTokens } from '../components/Sidebar/types';

export const SidebarContainer = styled.div<{ $collapsed: boolean; tokens: SidebarTokens['sidebar'] }>`
  width: ${({ $collapsed, tokens }) => $collapsed ? tokens.collapsedWidth : tokens.width};
  background: ${({ tokens }) => tokens.background};
  border-right: 1px solid ${({ tokens }) => tokens.borderColor};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: ${({ tokens }) => tokens.boxShadow};
`;

export const SidebarHeader = styled.div<{ tokens: SidebarTokens['sidebar'] }>`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ tokens }) => tokens.headerBg};
`;

export const LogoContainer = styled.div<{ $collapsed: boolean; tokens: SidebarTokens['sidebar'] }>`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoPaddingCollapsed : tokens.logoPadding};
  transition: all 0.3s ease;
  overflow: hidden;
  justify-content: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoJustifyCollapsed : tokens.logoJustify};
`;

export const ToggleSidebarButton = styled.button<{ tokens: SidebarTokens['sidebar'] }>`
  width: 28px;
  height: 28px;
  position: absolute;
  right: -12px;
  top: 60%;
  transform: translateY(-50%);
  background: ${({ tokens }) => tokens.toggleBg};
  border: 1px solid ${({ tokens }) => tokens.toggleBorder};
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ tokens }) => tokens.toggleColor};
  z-index: 1001;
  box-shadow: ${({ tokens }) => tokens.toggleBoxShadow};
  transition: all 0.2s ease;
  padding: 0;
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
`; 