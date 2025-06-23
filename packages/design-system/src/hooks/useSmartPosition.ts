import { useState, useEffect, useCallback } from 'react';

export interface PositionConfig {
  placement?: 'bottom' | 'top' | 'auto';
  align?: 'left' | 'right' | 'auto';
  offset?: number;
  minSpaceRequired?: {
    width: number;
    height: number;
  };
}

export interface CalculatedPosition {
  placement: 'top' | 'bottom';
  align: 'left' | 'right';
  adjustments: {
    maxWidth?: string;
    maxHeight?: string;
  };
}

export const useSmartPosition = (
  triggerRef: React.RefObject<HTMLElement>,
  isOpen: boolean,
  config: PositionConfig = {}
): CalculatedPosition => {
  const {
    placement = 'auto',
    align = 'auto',
    offset = 8,
    minSpaceRequired = { width: 800, height: 400 }
  } = config;

  const [position, setPosition] = useState<CalculatedPosition>({
    placement: 'bottom',
    align: 'left',
    adjustments: {}
  });

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Calculate available space in each direction
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = viewportWidth - triggerRect.left;
    const spaceLeft = triggerRect.right;

    // Determine optimal vertical placement
    let optimalPlacement: 'top' | 'bottom';
    if (placement === 'auto') {
      // Prefer bottom, but use top if there's more space above and not enough below
      if (spaceBelow < minSpaceRequired.height && spaceAbove > spaceBelow) {
        optimalPlacement = 'top';
      } else {
        optimalPlacement = 'bottom';
      }
    } else {
      optimalPlacement = placement;
    }

    // Determine optimal horizontal alignment
    let optimalAlign: 'left' | 'right';
    if (align === 'auto') {
      // Prefer left alignment, but use right if there's not enough space on the right
      if (spaceRight < minSpaceRequired.width && spaceLeft > spaceRight) {
        optimalAlign = 'right';
      } else {
        optimalAlign = 'left';
      }
    } else {
      optimalAlign = align;
    }

    // Calculate adjustments for constrained spaces
    const adjustments: CalculatedPosition['adjustments'] = {};

    // Horizontal constraints
    const availableWidth = optimalAlign === 'right' ? spaceLeft : spaceRight;
    if (availableWidth < minSpaceRequired.width) {
      adjustments.maxWidth = `${Math.max(availableWidth - 20, 300)}px`; // 20px margin, min 300px
    }

    // Vertical constraints
    const availableHeight = optimalPlacement === 'top' ? spaceAbove : spaceBelow;
    if (availableHeight < minSpaceRequired.height) {
      adjustments.maxHeight = `${Math.max(availableHeight - offset * 2, 200)}px`; // min 200px
    }

    setPosition({
      placement: optimalPlacement,
      align: optimalAlign,
      adjustments
    });
  }, [triggerRef, isOpen, placement, align, offset, minSpaceRequired]);

  // Recalculate on window resize and scroll
  useEffect(() => {
    if (!isOpen) return;

    calculatePosition();

    const handleResize = () => calculatePosition();
    const handleScroll = () => calculatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [calculatePosition, isOpen]);

  // Initial calculation when opening
  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(calculatePosition);
    }
  }, [isOpen, calculatePosition]);

  return position;
}; 