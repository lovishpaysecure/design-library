import styled from 'styled-components';
import type { DropdownTokens } from './Dropdown.types';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const DropdownTrigger = styled.button<{ 
  tokens: DropdownTokens; 
  isOpen: boolean; 
  disabled?: boolean; 
  error?: boolean;
}>`
  width: 100%;
  min-height: 44px;
  padding: ${props => props.tokens.padding};
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.disabled ? props.tokens.disabledColor : props.tokens.textColor};
  background-color: ${props => props.disabled ? props.tokens.disabledBackgroundColor : props.tokens.backgroundColor};
  border: 1px solid ${props => {
    if (props.error) return props.tokens.errorColor;
    if (props.isOpen) return props.tokens.primaryColor;
    return props.tokens.borderColor;
  }};
  border-radius: ${props => props.tokens.borderRadius};
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &:hover:not(:disabled) {
    border-color: ${props => props.error ? props.tokens.errorColor : props.tokens.primaryColor};
  }

  &:focus {
    border-color: ${props => props.error ? props.tokens.errorColor : props.tokens.primaryColor};
    box-shadow: 0 0 0 3px ${props => 
      props.error ? props.tokens.errorColor + '20' : props.tokens.primaryColorLight
    };
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const DropdownTriggerContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 20px;
  overflow: hidden;
`;

export const DropdownPlaceholder = styled.span<{ tokens: DropdownTokens }>`
  color: ${props => props.tokens.placeholderColor};
  font-style: italic;
`;

export const DropdownValue = styled.span<{ tokens: DropdownTokens }>`
  color: ${props => props.tokens.textColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownTag = styled.span<{ tokens: DropdownTokens }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background-color: ${props => props.tokens.primaryColorLight};
  color: ${props => props.tokens.primaryColor};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  max-width: 120px;
`;

export const DropdownTagText = styled.span<{ tokens: DropdownTokens }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownTagRemove = styled.button<{ tokens: DropdownTokens }>`
  background: none;
  border: none;
  color: ${props => props.tokens.primaryColor};
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.tokens.primaryColor};
    color: white;
  }
`;

export const DropdownIcon = styled.span<{ tokens: DropdownTokens; position: 'pre' | 'post' }>`
  color: ${props => props.tokens.iconColor};
  font-size: ${props => props.tokens.iconSize};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.tokens.iconSize};
  height: ${props => props.tokens.iconSize};
  margin-${props => props.position === 'pre' ? 'right' : 'left'}: ${props => props.tokens.iconSpacing};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const DropdownChevron = styled.span<{ tokens: DropdownTokens; isOpen: boolean }>`
  color: ${props => props.tokens.iconColor};
  font-size: 12px;
  transition: transform 0.2s ease-in-out;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  svg {
    width: 100%;
    height: 100%;
    stroke: currentColor;
  }
`;

export const DropdownClearButton = styled.button<{ tokens: DropdownTokens }>`
  background: none;
  border: none;
  color: ${props => props.tokens.disabledColor};
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.tokens.clearButtonColor};
    color: white;
  }
`;

export const DropdownMenu = styled.div<{ 
  tokens: DropdownTokens; 
  isOpen: boolean; 
  $placement?: 'top' | 'bottom';
  $align?: 'left' | 'right';
  $zIndex?: number;
  width?: string | number;
  $expandedMenu?: {
    enabled: boolean;
    minWidth?: number;
    minHeight?: number;
  };
}>`
  position: absolute;
  ${props => {
    if (props.$expandedMenu?.enabled) {
      // For expanded menu, respect smart positioning alignment
      return `
        ${props.$placement === 'top' ? 'bottom: 100%; margin-bottom: 4px;' : 'top: 100%; margin-top: 4px;'}
        ${props.$align === 'right' ? 'right: 0;' : 'left: 0;'}
      `;
    } else {
      // Default positioning for regular dropdowns
      return `
        ${props.$placement === 'top' ? 'bottom: 100%; margin-bottom: 4px;' : 'top: 100%; margin-top: 4px;'}
        ${props.$align === 'right' ? 'right: 0;' : 'left: 0; right: 0;'}
      `;
    }
  }}
  z-index: ${props => props.$zIndex || 1000};
  background-color: ${props => props.tokens.backgroundColor};
  border: 1px solid ${props => props.tokens.borderColor};
  border-radius: ${props => props.tokens.borderRadius};
  box-shadow: ${props => props.tokens.shadowColor};
  display: ${props => props.isOpen ? 'block' : 'none'};
  max-height: ${props => props.tokens.maxHeight};
  max-width: ${props => props.$expandedMenu?.enabled ? 'none' : '90vw'};
  overflow: hidden;
  ${props => {
    // Handle width
    if (props.$expandedMenu?.enabled) {
      return props.$expandedMenu.minWidth ? `min-width: ${props.$expandedMenu.minWidth}px;` : '';
    } else if (props.width) {
      const width = typeof props.width === 'number' ? `${props.width}px` : props.width;
      return `width: ${width};`;
    }
    return '';
  }}
  ${props => {
    // Handle height
    if (props.$expandedMenu?.enabled && props.$expandedMenu.minHeight) {
      return `min-height: ${props.$expandedMenu.minHeight}px;`;
    }
    return '';
  }}
`;

export const DropdownSearch = styled.input<{ tokens: DropdownTokens }>`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid ${props => props.tokens.searchBorderColor};
  background-color: ${props => props.tokens.searchBackgroundColor};
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.tokens.textColor};
  outline: none;

  &::placeholder {
    color: ${props => props.tokens.placeholderColor};
  }

  &:focus {
    border-bottom-color: ${props => props.tokens.primaryColor};
  }
`;

export const DropdownOptionsList = styled.div<{ tokens: DropdownTokens }>`
  max-height: calc(${props => props.tokens.maxHeight} - 100px);
  overflow-y: auto;
  overflow-x: hidden;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.tokens.secondaryColor};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.tokens.disabledColor};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.tokens.textColor};
  }
`;

export const DropdownOption = styled.div<{ 
  tokens: DropdownTokens; 
  isSelected?: boolean; 
  disabled?: boolean;
}>`
  padding: ${props => props.tokens.optionPadding};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid transparent;

  background-color: ${props => {
    if (props.disabled) return 'transparent';
    if (props.isSelected) return props.tokens.primaryColorLight;
    return 'transparent';
  }};

  color: ${props => {
    if (props.disabled) return props.tokens.disabledColor;
    return props.tokens.textColor;
  }};

  &:hover:not([disabled]) {
    background-color: ${props => 
      props.isSelected 
        ? props.tokens.primaryColorLight 
        : props.tokens.optionHoverColor
    };
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const DropdownOptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const DropdownOptionLabel = styled.span<{ tokens: DropdownTokens }>`
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  font-weight: 500;
`;

export const DropdownOptionDescription = styled.div<{ tokens: DropdownTokens }>`
  font-size: 12px;
  color: ${props => props.tokens.disabledColor};
  margin-top: 2px;
`;

export const DropdownCheckbox = styled.div<{ tokens: DropdownTokens; checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid ${props => props.checked ? props.tokens.checkboxCheckedColor : props.tokens.checkboxColor};
  background-color: ${props => props.checked ? props.tokens.checkboxCheckedColor : 'transparent'};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
`;

export const DropdownDivider = styled.div<{ tokens: DropdownTokens }>`
  height: 1px;
  background-color: ${props => props.tokens.dividerColor};
  margin: 4px 0;
`;

export const DropdownGroup = styled.div`
  padding: 0;
`;

export const DropdownGroupLabel = styled.div<{ tokens: DropdownTokens }>`
  padding: 8px 16px 4px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.tokens.disabledColor};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${props => props.tokens.secondaryColor};
`;

export const DropdownSelectAll = styled.div<{ tokens: DropdownTokens }>`
  padding: ${props => props.tokens.optionPadding};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: ${props => props.tokens.primaryColor};

  &:hover {
    background-color: ${props => props.tokens.optionHoverColor};
  }
`;

export const DropdownLoadingSpinner = styled.div<{ tokens: DropdownTokens }>`
  color: ${props => props.tokens.loadingColor};
  font-size: ${props => props.tokens.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid ${props => props.tokens.loadingColor}20;
    border-top: 2px solid ${props => props.tokens.loadingColor};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const DropdownError = styled.div<{ tokens: DropdownTokens }>`
  padding: 12px 16px;
  background-color: ${props => props.tokens.errorBackgroundColor};
  color: ${props => props.tokens.errorColor};
  font-size: 13px;
  border-left: 3px solid ${props => props.tokens.errorColor};
`; 