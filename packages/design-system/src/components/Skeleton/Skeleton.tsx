import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import { SkeletonProps, SkeletonTokens } from './Skeleton.types';
import { StyledSkeleton } from '../../styles/Skeleton.styles';
import { skeletonTokens } from './Skeleton.tokens';

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    variant = 'rectangular',
    animation = 'pulse',
    width,
    height,
    borderRadius,
    className,
    ...props 
  }, ref) => {
    const tokens = useTokens<SkeletonTokens>('skeleton', skeletonTokens);

    return (
      <StyledSkeleton
        ref={ref}
        $variant={variant}
        $animation={animation}
        $width={width}
        $height={height}
        $borderRadius={borderRadius}
        tokens={tokens}
        className={className}
        role="status"
        aria-label="Loading..."
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton'; 