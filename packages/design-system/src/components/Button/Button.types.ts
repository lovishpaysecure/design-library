// Button types and interfaces
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface StyledButtonProps {
  $fullWidth?: boolean;
  $variant: ButtonVariant;
  $size: ButtonSize;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export interface ButtonTokens {
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