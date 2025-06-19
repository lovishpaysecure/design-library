import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import { CardProps, CardTokens } from './Card.types';
import { StyledCard } from '../../styles/Card.styles';
import { cardTokens } from './Card.tokens';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default', 
    padding = 'medium', 
    shadow, 
    hoverEffect = false, 
    backgroundColor,
    customPadding,
    border,
    radius,
    className, 
    ...props 
  }, ref) => {
    const tokens = useTokens<CardTokens>('card', cardTokens);

    return (
      <StyledCard
        ref={ref}
        $variant={variant}
        $padding={padding}
        $shadow={shadow}
        $hoverEffect={hoverEffect}
        $backgroundColor={backgroundColor}
        $customPadding={customPadding}
        $border={border}
        $radius={radius}
        tokens={tokens}
        className={className}
        {...props}
      >
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card'; 