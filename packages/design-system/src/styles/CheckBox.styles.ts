import styled, { css } from 'styled-components';
import { CheckboxProps, CheckboxState } from '../components/CheckBox/CheckBox.types';
import { checkboxTokens } from '../components/CheckBox/CheckBox.tokens';

const getCheckboxStateStyles = (state: CheckboxState, color: CheckboxProps['color'] = 'primary', isDisabled?: boolean) => {
  if (isDisabled) {
    color = 'disabled';
  }

  switch (state) {
    case 'checked':
      return css`
        background-color: ${checkboxTokens.colors[color].checked.background};
        border-color: ${checkboxTokens.colors[color].checked.border};
        color: ${checkboxTokens.colors[color].checked.color};

        &:hover:not(:disabled) {
          background-color: ${checkboxTokens.colors[color].hover.checked.background};
          border-color: ${checkboxTokens.colors[color].hover.checked.border};
        }
      `;
    case 'indeterminate':
      return css`
        background-color: ${checkboxTokens.colors[color].indeterminate.background};
        border-color: ${checkboxTokens.colors[color].indeterminate.border};
        color: ${checkboxTokens.colors[color].indeterminate.color};

        &:hover:not(:disabled) {
          background-color: ${checkboxTokens.colors[color].hover.checked.background};
          border-color: ${checkboxTokens.colors[color].hover.checked.border};
        }
      `;
    default:
      return css`
        background-color: ${checkboxTokens.colors[color].unchecked.background};
        border-color: ${checkboxTokens.colors[color].unchecked.border};
        color: ${checkboxTokens.colors[color].unchecked.color};

        &:hover:not(:disabled) {
          background-color: ${checkboxTokens.colors[color].hover.unchecked.background};
          border-color: ${checkboxTokens.colors[color].hover.unchecked.border};
        }
      `;
  }
};

interface StyledCheckboxContainerProps {
  size?: CheckboxProps['size'];
  color?: CheckboxProps['color'];
  isDisabled?: boolean;
  className?: string;
}

interface StyledCheckboxInputProps {
  size?: CheckboxProps['size'];
  color?: CheckboxProps['color'];
  checked?: boolean;
  indeterminate?: boolean;
  isDisabled?: boolean;
}

export const StyledCheckboxContainer = styled.label<StyledCheckboxContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ size = 'medium' }) => checkboxTokens.sizes[size].gap};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  color: ${({ isDisabled }) =>
    isDisabled ? checkboxTokens.labelDisabledColor : checkboxTokens.labelColor};
  line-height: 1;
  vertical-align: top;
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })<StyledCheckboxInputProps>`
  appearance: none;
  margin: 0;
  width: ${({ size = 'medium' }) => checkboxTokens.sizes[size].checkboxSize};
  height: ${({ size = 'medium' }) => checkboxTokens.sizes[size].checkboxSize};
  border: ${({ size = 'medium' }) => checkboxTokens.sizes[size].borderWidth} solid;
  border-radius: 4px;
  display: grid;
  place-content: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  flex-shrink: 0;
  align-self: center;

  ${({ checked, indeterminate, color, isDisabled }) => {
    const state: CheckboxState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';
    return getCheckboxStateStyles(state, color, isDisabled);
  }}

  &:focus-visible {
    outline: none;
    box-shadow: ${({ color = 'primary', isDisabled }) =>
      isDisabled ? 'none' : checkboxTokens.colors[color].focus.ring};
  }

  &::before {
    content: '';
    width: ${({ size = 'medium' }) => checkboxTokens.sizes[size].iconSize};
    height: ${({ size = 'medium' }) => checkboxTokens.sizes[size].iconSize};
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
    box-shadow: inset ${({ indeterminate }) =>
      indeterminate ? '0 1em 0 0' : '1em 1em 0 0'} currentColor;
    transform-origin: center;
    
    /* Figma design: checkmark for checked, horizontal line for indeterminate */
    clip-path: ${({ indeterminate }) =>
      indeterminate
        ? 'polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)'
        : 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)'};
  }

  &:checked::before,
  &[data-indeterminate='true']::before {
    transform: scale(1);
  }
`; 