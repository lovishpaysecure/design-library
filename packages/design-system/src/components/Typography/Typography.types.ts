import React from 'react';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface StyledTypographyProps {
  $variant: TypographyVariant;
  $weight: TypographyWeight;
  $align: TypographyAlign;
}

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  component?: keyof JSX.IntrinsicElements;
} 