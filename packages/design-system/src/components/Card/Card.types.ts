import React from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';
export type CardPadding = 'none' | 'small' | 'medium' | 'large' | 'x-large';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  shadow?: boolean;
  hoverEffect?: boolean;
  backgroundColor?: string;
  customPadding?: string;
  border?: string;
  radius?: string;
  className?: string;
}

export interface CardTokens {
  variants: {
    [key in CardVariant]: {
      background: string;
      border?: string;
      borderRadius: string;
      boxShadow?: string;
    };
  };
  padding: {
    [key in CardPadding]: string;
  };
} 