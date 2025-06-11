import React from 'react';
import styled from 'styled-components';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface StyledTypographyProps {
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

const StyledTypography = styled.div<StyledTypographyProps>`
  margin: 0;
  text-align: ${props => props.$align};
  font-family: inherit;

  ${props => {
    switch (props.$variant) {
      case 'h1':
        return `
          font-size: 2.5rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.5em;
        `;
      case 'h2':
        return `
          font-size: 2rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h3':
        return `
          font-size: 1.75rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h4':
        return `
          font-size: 1.5rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h5':
        return `
          font-size: 1.25rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'h6':
        return `
          font-size: 1rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin-bottom: 0.5em;
        `;
      case 'subtitle1':
        return `
          font-size: 1.125rem;
          line-height: 1.5;
          letter-spacing: 0;
          margin-bottom: 0.35em;
        `;
      case 'subtitle2':
        return `
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: 0.01em;
          margin-bottom: 0.35em;
        `;
      case 'body1':
        return `
          font-size: 1rem;
          line-height: 1.6;
          letter-spacing: 0;
          margin-bottom: 1em;
        `;
      case 'body2':
        return `
          font-size: 0.875rem;
          line-height: 1.6;
          letter-spacing: 0;
          margin-bottom: 1em;
        `;
      case 'caption':
        return `
          font-size: 0.75rem;
          line-height: 1.5;
          letter-spacing: 0.02em;
          margin-bottom: 0.5em;
        `;
      case 'overline':
        return `
          font-size: 0.75rem;
          line-height: 1.5;
          letter-spacing: 0.1em;
          margin-bottom: 0.5em;
          text-transform: uppercase;
        `;
      default:
        return '';
    }
  }}

  font-weight: ${props => {
    switch (props.$weight) {
      case 'regular': return '400';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return '400';
    }
  }};
`;

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ 
    variant = 'body1',
    weight = 'regular',
    align = 'left',
    component,
    children,
    ...props
  }, ref) => {
    const Component = component || getDefaultComponent(variant);

    return (
      <StyledTypography
        as={Component}
        ref={ref}
        $variant={variant}
        $weight={weight}
        $align={align}
        {...props}
      >
        {children}
      </StyledTypography>
    );
  }
);

function getDefaultComponent(variant: TypographyVariant): keyof JSX.IntrinsicElements {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant;
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
    case 'overline':
      return 'span';
    default:
      return 'p';
  }
} 