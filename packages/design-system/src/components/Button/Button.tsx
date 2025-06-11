import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTokens } from '../../hooks/useTokens';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface StyledButtonProps {
  $fullWidth?: boolean;
  $variant: ButtonVariant;
  $size: ButtonSize;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 24px';
      default: return '12px 20px';
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: #0066FF;
          color: #FFFFFF;
          &:hover:not(:disabled) {
            background: #0052CC;
          }
        `;
      case 'secondary':
        return `
          background: #F5F5F5;
          color: #333333;
          &:hover:not(:disabled) {
            background: #E5E5E5;
          }
        `;
      case 'tertiary':
        return `
          background: transparent;
          color: #0066FF;
          border: 1px solid #0066FF;
          &:hover:not(:disabled) {
            background: #F0F7FF;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #666666;
          &:hover:not(:disabled) {
            background: #F5F5F5;
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

interface ButtonTokens {
  variants: {
    [key in ButtonVariant]: {
      background: string;
      color: string;
      hover: {
        background: string;
      };
      border?: string;
      borderColor?: string;
    };
  };
  sizes: {
    [key in ButtonSize]: {
      padding: string;
      fontSize: string;
    };
  };
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const finalRef = (ref as React.RefObject<HTMLButtonElement>) || buttonRef;
    
    const tokens = useTokens<ButtonTokens>('button', {
      variants: {
        primary: {
          background: '#0066FF',
          color: '#FFFFFF',
          hover: {
            background: '#0052CC'
          }
        },
        secondary: {
          background: '#F5F5F5',
          color: '#333333',
          hover: {
            background: '#E5E5E5'
          }
        },
        tertiary: {
          background: 'transparent',
          color: '#0066FF',
          border: '1px solid',
          borderColor: '#0066FF',
          hover: {
            background: '#F0F7FF'
          }
        },
        ghost: {
          background: 'transparent',
          color: '#666666',
          hover: {
            background: '#F5F5F5'
          }
        }
      },
      sizes: {
        small: {
          padding: '8px 16px',
          fontSize: '14px'
        },
        medium: {
          padding: '12px 20px',
          fontSize: '16px'
        },
        large: {
          padding: '16px 24px',
          fontSize: '18px'
        }
      }
    });

    useEffect(() => {
      if (!finalRef.current) return;

      const button = finalRef.current;
      const variantTokens = tokens.variants[variant];
      const sizeTokens = tokens.sizes[size];

      // Apply tokens directly to DOM for better performance
      Object.entries(variantTokens).forEach(([prop, value]) => {
        if (prop === 'hover') return;
        if (typeof value === 'string') {
          button.style.setProperty(`--button-${prop}`, value);
        }
      });

      Object.entries(sizeTokens).forEach(([prop, value]) => {
        if (typeof value === 'string') {
          button.style.setProperty(`--button-${prop}`, value);
        }
      });

      // Handle hover state
      const hoverStyles = variantTokens.hover;
      const originalStyles = Object.entries(variantTokens).reduce((acc, [prop, value]) => {
        if (prop !== 'hover' && typeof value === 'string') {
          acc[prop] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      const handleMouseEnter = () => {
        Object.entries(hoverStyles).forEach(([prop, value]) => {
          if (typeof value === 'string') {
            button.style.setProperty(`--button-${prop}`, value);
          }
        });
      };

      const handleMouseLeave = () => {
        Object.entries(originalStyles).forEach(([prop, value]) => {
          button.style.setProperty(`--button-${prop}`, value);
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [variant, size, tokens, finalRef]);

    return (
      <StyledButton
        ref={finalRef}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
); 