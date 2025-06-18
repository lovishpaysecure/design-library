import React from 'react';
import { TypographyProps, TypographyVariant, TypographyWeight, TypographyAlign } from './Typography.types';
import { StyledTypography } from '../../styles/Typography.styles';

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