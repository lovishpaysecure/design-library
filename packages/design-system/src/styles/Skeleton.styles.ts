import styled, { css, keyframes } from 'styled-components';
import { StyledSkeletonProps, SkeletonTokens } from '../components/Skeleton/Skeleton.types';

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const getAnimation = (animation: string, tokens: SkeletonTokens) => {
  switch (animation) {
    case 'pulse':
      return css`
        animation: ${pulseAnimation} ${tokens.animation.duration} ${tokens.animation.timingFunction} infinite;
      `;
    case 'wave':
      return css`
        position: relative;
        overflow: hidden;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            ${tokens.colors.highlight},
            transparent
          );
          animation: ${waveAnimation} ${tokens.animation.duration} ${tokens.animation.timingFunction} infinite;
        }
      `;
    case 'none':
    default:
      return css``;
  }
};

export const StyledSkeleton = styled.div<StyledSkeletonProps & { tokens: SkeletonTokens }>`
  display: block;
  background-color: ${props => props.tokens.colors.base};
  border-radius: ${props => 
    props.$borderRadius || props.tokens.variants[props.$variant].borderRadius
  };
  
  width: ${props => {
    if (props.$width) {
      return typeof props.$width === 'number' ? `${props.$width}px` : props.$width;
    }
    return '100%';
  }};
  
  height: ${props => {
    if (props.$height) {
      return typeof props.$height === 'number' ? `${props.$height}px` : props.$height;
    }
    return props.tokens.variants[props.$variant].height || '20px';
  }};

  ${props => getAnimation(props.$animation, props.tokens)}

  /* Ensure accessibility */
  &::before {
    content: '\\00a0'; /* Non-breaking space for screen readers */
  }
`; 