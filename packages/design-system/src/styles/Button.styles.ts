import styled from 'styled-components';
import { StyledButtonProps, ButtonTokens } from '../components/Button/Button.types';

export const StyledButton = styled.button<StyledButtonProps & { tokens: ButtonTokens }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  padding: ${props => props.tokens.sizes[props.$size].padding};
  font-size: ${props => props.tokens.sizes[props.$size].fontSize};

  ${props => {
    const variant = props.tokens.variants[props.$variant];
    return `
      background: ${variant.background};
      color: ${variant.color};
      ${variant.border ? `border: ${variant.border};` : ''}
      ${variant.borderColor ? `border-color: ${variant.borderColor};` : ''}

      &:hover:not(:disabled) {
        ${variant.hover?.background ? `background: ${variant.hover.background};` : ''}
        ${variant.hover?.color ? `color: ${variant.hover.color};` : ''}
        ${props.$variant === 'link' ? 'text-decoration: underline;' : ''}
      }

      &:active:not(:disabled) {
        ${variant.active?.background ? `background: ${variant.active.background};` : ''}
        ${variant.active?.color ? `color: ${variant.active.color};` : ''}
      }

      &:focus-visible {
        ${variant.focus?.outline ? `outline: ${variant.focus.outline};` : ''}
        ${variant.focus?.ring ? `box-shadow: ${variant.focus.ring};` : ''}
      }
    `;
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #F2F4F7;
    color: #667085;
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonIcon = styled.span<{ 
  tokens: ButtonTokens; 
  size: 'small' | 'medium' | 'large';
  position: 'pre' | 'post';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.tokens.sizes[props.size].iconSize || props.tokens.icon.size};
  height: ${props => props.tokens.sizes[props.size].iconSize || props.tokens.icon.size};
  margin-${props => props.position === 'pre' ? 'right' : 'left'}: ${props => 
    props.tokens.sizes[props.size].iconSpacing || props.tokens.icon.spacing};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    stroke: currentColor;
  }
`; 