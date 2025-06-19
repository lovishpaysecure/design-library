import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTokens } from '../../hooks/useTokens';
import { ModalProps, ModalHeaderProps, ModalTokens } from './Modal.types';
import { modalTokens } from './Modal.tokens';
import { Typography } from '../Typography';
import { Button } from '../Button';
import {
  StyledOverlay,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalHeaderContent,
  StyledModalBody,
  StyledModalFooter,
  StyledCloseButton,
} from '../../styles/Modal.styles';

// Close icon component
const CloseIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Modal Header component
const ModalHeader: React.FC<ModalHeaderProps & { tokens: ModalTokens }> = ({
  title,
  subtitle,
  showCloseButton,
  onClose,
  className,
  tokens,
}) => {
  if (!title && !subtitle && !showCloseButton) {
    return null;
  }

  return (
    <StyledModalHeader className={className} tokens={tokens}>
      <StyledModalHeaderContent>
        {title && (
          <Typography 
            variant="h4" 
            weight="semibold" 
            margin="0"
            id="modal-title"
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography 
            variant="body2" 
            margin="4px 0 0 0"
            id="modal-subtitle"
            style={{ color: '#6b7280' }}
          >
            {subtitle}
          </Typography>
        )}
      </StyledModalHeaderContent>
      {showCloseButton && (
        <StyledCloseButton
          onClick={onClose}
          aria-label="Close modal"
          tokens={tokens}
        >
          <CloseIcon />
        </StyledCloseButton>
      )}
    </StyledModalHeader>
  );
};

// Modal Body component
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
  customPadding?: string;
  tokens: ModalTokens;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  customPadding,
  tokens,
}) => (
  <StyledModalBody
    className={className}
    $customPadding={customPadding}
    tokens={tokens}
  >
    {children}
  </StyledModalBody>
);

// Modal Footer component
interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
  tokens: ModalTokens;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  tokens,
}) => {
  if (!children) return null;

  return (
    <StyledModalFooter className={className} tokens={tokens}>
      {children}
    </StyledModalFooter>
  );
};

// Main Modal component
type ModalComponent = React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps & { tokens: ModalTokens }>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
};

const ModalBase: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  position = 'center',
  variant = 'default',
  title,
  subtitle,
  showCloseButton = true,
  closable = true,
  preventBackdropClose = false,
  className,
  overlayClassName,
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  customWidth,
  customHeight,
  customMaxWidth,
  customMaxHeight,
  customBorderRadius,
  customPadding,
  customBackground,
  animationDuration = 200,
  disableAnimation = false,
  focusOnOpen = true,
  restoreFocus = true,
  portalTarget,
}) => {
  const tokens = useTokens<ModalTokens>('modal', modalTokens);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable && isOpen) {
        onClose();
      }
    },
    [closable, isOpen, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        !preventBackdropClose &&
        closable &&
        event.target === overlayRef.current
      ) {
        onClose();
      }
    },
    [preventBackdropClose, closable, onClose]
  );

  // Focus management
  useEffect(() => {
    if (isOpen) {
      if (restoreFocus) {
        previousActiveElement.current = document.activeElement as HTMLElement;
      }

      if (focusOnOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0] as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current.focus();
        }
      }
    } else if (restoreFocus && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen, focusOnOpen, restoreFocus]);

  // Keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Parse children to extract header, body, and footer
  const parseChildren = () => {
    const childrenArray = React.Children.toArray(children);
    let headerContent: React.ReactNode = null;
    let bodyContent: React.ReactNode = null;
    let footerContent: React.ReactNode = null;
    let regularContent: React.ReactNode[] = [];

    childrenArray.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === ModalHeader || child.props?.slot === 'header') {
          headerContent = child;
        } else if (child.type === ModalBody || child.props?.slot === 'body') {
          bodyContent = child;
        } else if (child.type === ModalFooter || child.props?.slot === 'footer') {
          footerContent = child;
        } else {
          regularContent.push(child);
        }
      } else {
        regularContent.push(child);
      }
    });

    return { headerContent, bodyContent, footerContent, regularContent };
  };

  if (!isOpen) return null;

  const { headerContent, bodyContent, footerContent, regularContent } = parseChildren();

  const modalContent = (
    <StyledOverlay
      ref={overlayRef}
      className={overlayClassName}
      onClick={handleBackdropClick}
      tokens={tokens}
      $isOpen={isOpen}
      $animationDuration={animationDuration}
      $disableAnimation={disableAnimation}
    >
      <StyledModal
        ref={modalRef}
        className={className}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={subtitle ? 'modal-subtitle' : undefined}
        tokens={tokens}
        $size={size}
        $position={position}
        $variant={variant}
        $isOpen={isOpen}
        $animationDuration={animationDuration}
        $disableAnimation={disableAnimation}
        $customWidth={customWidth}
        $customHeight={customHeight}
        $customMaxWidth={customMaxWidth}
        $customMaxHeight={customMaxHeight}
        $customBorderRadius={customBorderRadius}
        $customPadding={customPadding}
        $customBackground={customBackground}
      >
        <StyledModalContent className={contentClassName}>
          {/* Header */}
          {headerContent || (title || subtitle || showCloseButton) ? (
            headerContent || (
              <ModalHeader
                title={title}
                subtitle={subtitle}
                showCloseButton={showCloseButton}
                onClose={onClose}
                className={headerClassName}
                tokens={tokens}
              />
            )
          ) : null}

          {/* Body */}
          {bodyContent || (
            <ModalBody
              className={bodyClassName}
              customPadding={customPadding}
              tokens={tokens}
            >
              {regularContent}
            </ModalBody>
          )}

          {/* Footer */}
          {footerContent && (
            <ModalFooter className={footerClassName} tokens={tokens}>
              {footerContent}
            </ModalFooter>
          )}
        </StyledModalContent>
      </StyledModal>
    </StyledOverlay>
  );

  // Render through portal
  const target = portalTarget || document.body;
  return createPortal(modalContent, target);
};

// Create the Modal component with sub-components
export const Modal = ModalBase as ModalComponent;

// Export sub-components for advanced usage
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter; 