import React from 'react';

export type ModalSize = 'small' | 'medium' | 'large' | 'x-large' | 'full';
export type ModalPosition = 'center' | 'top' | 'bottom';
export type ModalVariant = 'default' | 'compact' | 'sidebar' | 'fullscreen';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  variant?: ModalVariant;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closable?: boolean;
  preventBackdropClose?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  // Custom overrides
  customWidth?: string;
  customHeight?: string;
  customMaxWidth?: string;
  customMaxHeight?: string;
  customBorderRadius?: string;
  customPadding?: string;
  customBackground?: string;
  // Animation props
  animationDuration?: number;
  disableAnimation?: boolean;
  // Focus management
  focusOnOpen?: boolean;
  restoreFocus?: boolean;
  // Portal target
  portalTarget?: Element | null;
}

export interface StyledModalProps {
  $size: ModalSize;
  $position: ModalPosition;
  $variant: ModalVariant;
  $isOpen: boolean;
  $animationDuration: number;
  $disableAnimation: boolean;
  $customWidth?: string;
  $customHeight?: string;
  $customMaxWidth?: string;
  $customMaxHeight?: string;
  $customBorderRadius?: string;
  $customPadding?: string;
  $customBackground?: string;
}

export interface StyledOverlayProps {
  $isOpen: boolean;
  $animationDuration: number;
  $disableAnimation: boolean;
}

export interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  showCloseButton: boolean;
  onClose: () => void;
  className?: string;
}

export interface ModalTokens {
  overlay: {
    background: string;
    backdropFilter?: string;
    zIndex: number;
  };
  modal: {
    background: string;
    borderRadius: string;
    boxShadow: string;
    border?: string;
    zIndex: number;
  };
  sizes: {
    [key in ModalSize]: {
      width: string;
      maxWidth: string;
      height?: string;
      maxHeight: string;
    };
  };
  variants: {
    [key in ModalVariant]: {
      background?: string;
      borderRadius?: string;
      padding?: string;
      boxShadow?: string;
    };
  };
  positions: {
    [key in ModalPosition]: {
      transform: string;
      top?: string;
      bottom?: string;
    };
  };
  header: {
    padding: string;
    borderBottom: string;
    background?: string;
  };
  body: {
    padding: string;
    maxHeight: string;
    overflow: string;
  };
  footer: {
    padding: string;
    borderTop: string;
    background?: string;
    justifyContent: string;
  };
  closeButton: {
    size: string;
    color: string;
    hoverColor: string;
    background: string;
    hoverBackground: string;
    borderRadius: string;
  };
  animation: {
    duration: string;
    easing: string;
    slideDistance: string;
  };
} 