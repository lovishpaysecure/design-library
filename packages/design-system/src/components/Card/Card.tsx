import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import { CardProps, CardTokens } from './Card.types';
import { StyledCard } from '../../styles/Card.styles';
import { cardTokens } from './Card.tokens';
import { Skeleton } from '../Skeleton';

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
    isLoading = false,
    skeletonLines = 3,
    skeletonContent,
    ...props 
  }, ref) => {
    const tokens = useTokens<CardTokens>('card', cardTokens);

    const renderContent = () => {
      if (isLoading) {
        if (skeletonContent) {
          return skeletonContent;
        }
        return null;
      }
      
      return children;
    };

    return (
      <StyledCard
        ref={ref}
        $variant={variant}
        $padding={padding}
        $shadow={shadow}
        $hoverEffect={hoverEffect && !isLoading}
        $backgroundColor={backgroundColor}
        $customPadding={customPadding}
        $border={border}
        $radius={radius}
        tokens={tokens}
        className={className}
        {...props}
      >
        {renderContent()}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card'; 