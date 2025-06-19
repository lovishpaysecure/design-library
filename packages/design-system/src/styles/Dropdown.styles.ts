import styled, { css } from 'styled-components';
import { StyledDropdownProps } from '../components/Dropdown/Dropdown.types';

export interface StyledDropdownItemProps {
  tokens: StyledDropdownProps['tokens'];
  $isSelected?: boolean;
  $disabled?: boolean;
}

export interface StyledContainerProps extends StyledDropdownProps {
  $hasError?: boolean;
}

export const StyledDropdownWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: 200px;
  position: relative;
`;

export const StyledLabel = styled.label`
  color: var(--dropdown-label-color);
  font-size: var(--dropdown-label-fontSize);
  margin: var(--dropdown-label-margin);
  font-weight: 500;
`;

export const RequiredIndicator = styled.span`
  color: var(--dropdown-states-error-textColor);
  margin-left: 4px;
  font-size: var(--dropdown-label-fontSize);
`;

export const StyledDropdownContainer = styled.div<Omit<StyledDropdownProps, 'tokens'>>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const StyledChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  min-height: 32px;
  padding: 4px 0;
`;

export const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  background: var(--dropdown-chip-background);
  color: var(--dropdown-chip-textColor);
  border: 1px solid var(--dropdown-chip-borderColor);
  border-radius: 16px;
  padding: 2px 8px;
  font-size: 12px;
  height: 24px;
`;

export const StyledChipRemove = styled.button`
  background: none;
  border: none;
  color: var(--dropdown-chip-textColor);
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  display: flex;
  align-items: center;
  font-size: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledInputContainer = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-color: ${({ $hasError }) => 
    $hasError 
      ? 'var(--dropdown-states-error-borderColor)'
      : 'var(--dropdown-base-borderColor)'};
  border-radius: var(--dropdown-base-borderRadius);
  background-color: var(--dropdown-base-background);
  height: var(--dropdown-base-height);
  box-sizing: border-box;

  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) => 
      $hasError 
        ? 'var(--dropdown-states-error-borderColor)'
        : 'var(--dropdown-states-hover-borderColor)'};
  }

  &:focus-within {
    border-color: ${({ $hasError }) => 
      $hasError 
        ? 'var(--dropdown-states-error-borderColor)'
        : 'var(--dropdown-states-focus-borderColor)'};
    box-shadow: ${({ $hasError }) => 
      $hasError 
        ? 'var(--dropdown-states-error-shadow)'
        : 'var(--dropdown-states-focus-shadow)'};
  }
`;

export const StyledDropdownInput = styled.input`
  width: 100%;
  height: 100%;
  padding: var(--dropdown-base-padding);
  padding-right: 48px;
  border: none;
  font-size: var(--dropdown-base-fontSize);
  color: var(--dropdown-base-textColor);
  background: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  box-sizing: border-box;

  &::placeholder {
    color: var(--dropdown-placeholder-color);
  }

  &:disabled {
    color: var(--dropdown-states-disabled-textColor);
    background: var(--dropdown-states-disabled-background);
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StyledDropdownIcon = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  color: var(--dropdown-icon-color);
  font-size: var(--dropdown-icon-size);
  pointer-events: none;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledDropdownList = styled.ul<{ $isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: var(--dropdown-menu-background);
  border: 1px solid var(--dropdown-menu-borderColor);
  border-radius: var(--dropdown-base-borderRadius);
  box-shadow: var(--dropdown-menu-shadow);
  max-height: var(--dropdown-menu-maxHeight);
  overflow-y: auto;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 1000;
  box-sizing: border-box;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const StyledDropdownItem = styled.li<{ $isSelected?: boolean; $disabled?: boolean }>`
  padding: var(--dropdown-item-padding);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ $disabled }) => 
    $disabled 
      ? 'var(--dropdown-states-disabled-textColor)'
      : 'var(--dropdown-base-textColor)'};
  background-color: ${({ $isSelected }) => 
    $isSelected 
      ? 'var(--dropdown-item-states-selected-background)'
      : 'transparent'};
  white-space: nowrap;
  display: flex;
  align-items: center;
  min-height: 40px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '500' : 'normal')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  
  &:hover:not([disabled]) {
    background-color: var(--dropdown-item-states-hover-background);
  }
`;

export const StyledCheckbox = styled.div<{ $isSelected?: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid;
  border-color: ${({ $isSelected }) => 
    $isSelected 
      ? 'var(--dropdown-states-focus-borderColor)'
      : 'var(--dropdown-base-borderColor)'};
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isSelected }) => 
    $isSelected 
      ? 'var(--dropdown-states-focus-borderColor)'
      : 'transparent'};
  color: #FFFFFF;
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
    opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  &:hover {
    border-color: var(--dropdown-states-hover-borderColor);
  }
`;

export const StyledError = styled.div`
  color: var(--dropdown-states-error-textColor);
  font-size: var(--dropdown-base-fontSize);
  margin-top: 4px;
`; 