import React, { useRef, useEffect, useState } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { CATagsProps, CATagsTokens, CATag } from './CATags.types';
import { StyledCATagsContainer, StyledCATag, CATagLabel, CARemoveButton } from '../../styles/CATags.styles';
import { catagsTokens } from './CATags.tokens';
import { Typography } from '../Typography';
import { Tooltip } from '../Tooltip';

// Individual tag component to properly use hooks
interface CATagItemProps {
  tag: CATag;
  variant: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large';
  removable: boolean;
  labelMaxWidth?: string;
  showTooltip: boolean;
  autoTooltip: boolean;
  tokens: CATagsTokens;
  onRemove?: (tag: CATag) => void;
  onTagClick?: (tag: CATag) => void;
  removeIcon?: React.ReactNode;
}

const CATagItem: React.FC<CATagItemProps> = ({
  tag,
  variant,
  size,
  removable,
  labelMaxWidth,
  showTooltip,
  autoTooltip,
  tokens,
  onRemove,
  onTagClick,
  removeIcon
}) => {
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoTooltip && labelRef.current) {
      // Check if text is actually truncated by comparing scroll width with client width
      const checkTruncation = () => {
        const element = labelRef.current;
        if (element) {
          // Try to find the actual text element (Typography renders as span)
          const textElement = element.querySelector('span') || element;
          
          
          // Check both the container and the text element
          const isContainerOverflowing = element.scrollWidth > element.clientWidth;
          const isTextOverflowing = textElement.scrollWidth > textElement.clientWidth;
          const isOverflowing = isContainerOverflowing || isTextOverflowing;
        
          setIsTextTruncated(isOverflowing);
        }
      };

      // Use a small delay to ensure the element is fully rendered
      const timeoutId = setTimeout(checkTruncation, 100);

      // Also use ResizeObserver for dynamic changes
      const resizeObserver = new ResizeObserver(checkTruncation);
      resizeObserver.observe(labelRef.current);

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, [tag.label, labelMaxWidth, autoTooltip]);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove?.(tag);
  };

  const handleTagClick = () => {
    onTagClick?.(tag);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onTagClick?.(tag);
    }
  };

  const handleRemoveKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onRemove?.(tag);
    }
  };

  const shouldShowTooltip = showTooltip || (autoTooltip && isTextTruncated);
  

  const tagElement = (
    <StyledCATag
      $variant={variant}
      $size={size}
      $removable={removable}
      tokens={tokens}
      onClick={handleTagClick}
      onKeyDown={handleKeyDown}
      tabIndex={onTagClick ? 0 : -1}
      role={onTagClick ? 'button' : 'text'}
      aria-label={`Tag: ${tag.label}`}
    >
      <CATagLabel ref={labelRef} tokens={tokens} $maxWidth={labelMaxWidth}>
        <Typography 
          variant={tokens.sizes[size].typography.variant as any}
          weight={tokens.sizes[size].typography.weight as any}
          component="span"
        >
          {tag.label}
        </Typography>
      </CATagLabel>
      {removable && (
        <CARemoveButton
          tokens={tokens}
          size={size}
          onClick={handleRemove}
          onKeyDown={handleRemoveKeyDown}
          aria-label={`Remove ${tag.label}`}
          tabIndex={0}
        >
          {removeIcon || <DefaultRemoveIcon />}
        </CARemoveButton>
      )}
    </StyledCATag>
  );

  if (shouldShowTooltip) {
    return (
      <Tooltip content={tag.label} placement="top" delay={500}>
        {tagElement}
      </Tooltip>
    );
  }

  return tagElement;
};

// Default remove icon (X icon)
const DefaultRemoveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 6L6 18M6 6L18 18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CATags = React.forwardRef<HTMLDivElement, CATagsProps>(
  ({ 
    tags = [],
    variant = 'default',
    size = 'medium',
    removable = false,
    maxWidth,
    wrap = true,
    labelMaxWidth,
    showTooltip = false,
    autoTooltip = true,
    onRemove,
    onTagClick,
    removeIcon,
    className,
    ...props 
  }, ref) => {
    const tokens = useTokens<CATagsTokens>('catags', catagsTokens);

    if (tags.length === 0) {
      return null;
    }

    return (
      <StyledCATagsContainer
        ref={ref}
        $maxWidth={maxWidth}
        $wrap={wrap}
        className={className}
        {...props}
      >
        {tags.map((tag) => (
          <CATagItem
            key={tag.id}
            tag={tag}
            variant={variant}
            size={size}
            removable={removable}
            labelMaxWidth={labelMaxWidth}
            showTooltip={showTooltip}
            autoTooltip={autoTooltip}
            tokens={tokens}
            onRemove={onRemove}
            onTagClick={onTagClick}
            removeIcon={removeIcon}
          />
        ))}
      </StyledCATagsContainer>
    );
  }
);

CATags.displayName = 'CATags'; 