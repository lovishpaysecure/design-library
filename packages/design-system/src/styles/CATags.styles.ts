import styled from 'styled-components';
import { StyledCATagProps, StyledCATagsContainerProps, CATagsTokens } from '../components/CATags/CATags.types';

export const StyledCATagsContainer = styled.div<StyledCATagsContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: ${props => props.$maxWidth || '100%'};
  flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
  overflow: visible;
`;

export const StyledCATag = styled.div<StyledCATagProps & { tokens: CATagsTokens }>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 6px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  position: relative;
  
  padding: ${props => props.tokens.sizes[props.$size].padding};
  font-size: ${props => props.tokens.sizes[props.$size].fontSize};
  height: ${props => props.tokens.sizes[props.$size].height};
  gap: ${props => props.tokens.sizes[props.$size].gap};

  ${props => {
    const variant = props.tokens.variants[props.$variant];
    return `
      background: ${variant.background};
      color: ${variant.color};
      ${variant.border ? `border: ${variant.border};` : ''}
      ${variant.borderColor ? `border-color: ${variant.borderColor};` : ''}

      &:hover {
        ${variant.hover?.background ? `background: ${variant.hover.background};` : ''}
        ${variant.hover?.color ? `color: ${variant.hover.color};` : ''}
        ${variant.hover?.borderColor ? `border-color: ${variant.hover.borderColor};` : ''}
      }

      &:active {
        ${variant.active?.background ? `background: ${variant.active.background};` : ''}
        ${variant.active?.color ? `color: ${variant.active.color};` : ''}
      }

      &:focus-visible {
        ${variant.focus?.outline ? `outline: ${variant.focus.outline};` : ''}
        ${variant.focus?.ring ? `box-shadow: ${variant.focus.ring};` : ''}
      }
    `;
  }}

  &:focus {
    outline: none;
  }
`;

export const CATagLabel = styled.div<{ tokens: CATagsTokens; $maxWidth?: string }>`
  display: flex;
  align-items: center;
  overflow: ${props => props.tokens.label.overflow};
  text-overflow: ${props => props.tokens.label.textOverflow};
  white-space: ${props => props.tokens.label.whiteSpace};
  flex: ${props => props.tokens.label.flex};
  max-width: ${props => props.$maxWidth || props.tokens.label.maxWidth};
  position: relative;
  
  /* Ensure the Typography component inside also gets truncated */
  & > * {
    overflow: inherit;
    text-overflow: inherit;
    white-space: inherit;
    max-width: 100%;
  }
`;

export const CARemoveButton = styled.button<{ tokens: CATagsTokens; size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: ${props => props.tokens.removeButton.borderRadius};
  transition: background-color 0.2s ease;
  padding: 0;
  margin-left: ${props => props.tokens.sizes[props.size].gap};
  flex-shrink: 0;
  
  width: ${props => props.tokens.sizes[props.size].iconSize};
  height: ${props => props.tokens.sizes[props.size].iconSize};

  &:hover {
    background: ${props => props.tokens.removeButton.hover.background};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`; 