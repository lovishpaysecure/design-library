import { SkeletonTokens } from './Skeleton.types';

export const skeletonTokens: SkeletonTokens = {
  variants: {
    text: {
      borderRadius: '4px',
      height: '1em'
    },
    rectangular: {
      borderRadius: '4px'
    },
    circular: {
      borderRadius: '50%'
    },
    rounded: {
      borderRadius: '8px'
    }
  },
  animation: {
    duration: '1.5s',
    timingFunction: 'ease-in-out'
  },
  colors: {
    base: '#F2F4F7',
    highlight: '#E4E7EC'
  }
}; 