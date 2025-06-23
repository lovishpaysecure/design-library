// Button types and interfaces
import React from 'react';

export type ButtonVariant = 'primary' | 'tertiary' | 'warning' | 'danger' | 'success' | 'link';
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
  /**
   * Icon to display at the start of the button
   */
  preIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the button
   */
  postIcon?: React.ReactNode;
}

export interface ButtonTokens {
  variants: {
    [key in ButtonVariant]: {
      background: string;
      color: string;
      hover?: {
        background?: string;
        color?: string;
      };
      active?: {
        background?: string;
        color?: string;
      };
      focus?: {
        outline?: string;
        ring?: string;
      };
      border?: string;
      borderColor?: string;
    };
  };
  sizes: {
    [key in ButtonSize]: {
      padding: string;
      fontSize: string;
      iconSize?: string;
      iconSpacing?: string;
    };
  };
  icon: {
    size: string;
    spacing: string;
  };
} 