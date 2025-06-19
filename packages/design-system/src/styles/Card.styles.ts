import styled from 'styled-components';
import { CardProps, CardTokens } from '../components/Card/Card.types';

export const StyledCard = styled.div<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
  $shadow: CardProps['shadow'];
  $hoverEffect: CardProps['hoverEffect'];
  $backgroundColor?: string;
  $customPadding?: string;
  $border?: string;
  $radius?: string;
  tokens: CardTokens;
}>`
  ${({ $variant = 'default', $padding = 'medium', $shadow, $backgroundColor, $customPadding, $border, $radius, tokens }) => {
    const variant = tokens.variants[$variant];
    const padding = tokens.padding[$padding];
    
    return `
      background: ${$backgroundColor || variant.background};
      border-radius: ${$radius || variant.borderRadius};
      padding: ${$customPadding || padding};
      border: ${$border || (variant.border || 'none')};
      ${variant.boxShadow && $shadow !== false ? `box-shadow: ${variant.boxShadow};` : ''}
      ${$shadow === false ? 'box-shadow: none;' : ''}
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    `;
  }}
  
  ${({ $hoverEffect, $variant = 'default', tokens }) => $hoverEffect && `
    &:hover {
      ${(() => {
        const variant = tokens.variants[$variant];
        if ($variant === 'elevated') {
          return 'box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1);';
        }
        if ($variant === 'default' && variant.boxShadow) {
          return 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);';
        }
        return '';
      })()}
    }
  `}
`; 