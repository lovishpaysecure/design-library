import React from 'react';

export type CATagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type CATagSize = 'small' | 'medium' | 'large';

export interface CATag {
  id: string;
  label: string;
  value?: any;
}

export interface StyledCATagProps {
  $variant: CATagVariant;
  $size: CATagSize;
  $removable?: boolean;
}

export interface StyledCATagsContainerProps {
  $maxWidth?: string;
  $wrap?: boolean;
}

export interface CATagsProps {
  /**
   * Array of tags to display
   */
  tags: CATag[];
  /**
   * Visual variant of the tags
   */
  variant?: CATagVariant;
  /**
   * Size of the tags
   */
  size?: CATagSize;
  /**
   * Whether tags can be removed
   */
  removable?: boolean;
  /**
   * Maximum width of the tags container
   */
  maxWidth?: string;
  /**
   * Whether tags should wrap to next line
   */
  wrap?: boolean;
  /**
   * Maximum width for each tag label before truncation
   */
  labelMaxWidth?: string;
  /**
   * Whether to show tooltips on hover
   */
  showTooltip?: boolean;
  /**
   * Whether to automatically show tooltip only for truncated text
   */
  autoTooltip?: boolean;
  /**
   * Callback when a tag is removed
   */
  onRemove?: (tag: CATag) => void;
  /**
   * Callback when a tag is clicked
   */
  onTagClick?: (tag: CATag) => void;
  /**
   * Custom remove icon
   */
  removeIcon?: React.ReactNode;
  /**
   * Additional class name
   */
  className?: string;
}

export interface CATagsTokens {
  variants: {
    [key in CATagVariant]: {
      background: string;
      color: string;
      border?: string;
      borderColor?: string;
      hover?: {
        background?: string;
        color?: string;
        borderColor?: string;
      };
      active?: {
        background?: string;
        color?: string;
      };
      focus?: {
        outline?: string;
        ring?: string;
      };
    };
  };
  sizes: {
    [key in CATagSize]: {
      padding: string;
      fontSize: string;
      height: string;
      iconSize: string;
      gap: string;
      typography: {
        variant: string;
        weight: string;
      };
    };
  };
  container: {
    gap: string;
  };
  removeButton: {
    size: string;
    borderRadius: string;
    hover: {
      background: string;
    };
  };
  label: {
    overflow: string;
    textOverflow: string;
    whiteSpace: string;
    flex: string;
    maxWidth: string;
  };
} 