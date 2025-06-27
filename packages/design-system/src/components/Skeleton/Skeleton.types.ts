import React from 'react';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface StyledSkeletonProps {
  $variant: SkeletonVariant;
  $animation: SkeletonAnimation;
  $width?: string | number;
  $height?: string | number;
  $borderRadius?: string;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the skeleton
   */
  variant?: SkeletonVariant;
  /**
   * The animation type
   */
  animation?: SkeletonAnimation;
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Custom border radius
   */
  borderRadius?: string;
  /**
   * Custom className for additional styling
   */
  className?: string;
}



export interface SkeletonTokens {
  variants: {
    [key in SkeletonVariant]: {
      borderRadius: string;
      height?: string;
    };
  };
  animation: {
    duration: string;
    timingFunction: string;
  };
  colors: {
    base: string;
    highlight: string;
  };
} 