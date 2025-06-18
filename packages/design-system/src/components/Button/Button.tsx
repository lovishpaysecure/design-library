import React, { useRef, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { ButtonProps, ButtonTokens, ButtonVariant, ButtonSize } from './Button.types';
import { StyledButton } from '../../styles/Button.styles';

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