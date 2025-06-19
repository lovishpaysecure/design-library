import styled, { keyframes, css } from 'styled-components';
import { StyledModalProps, StyledOverlayProps, ModalTokens } from '../components/Modal/Modal.types';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -50%) translateY(20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) translateY(20px);
    opacity: 0;
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translate(-50%, 0) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0) translateY(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translate(-50%, 0) translateY(20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0) translateY(0);
    opacity: 1;
  }
`;

// Overlay component
export const StyledOverlay = styled.div<StyledOverlayProps & { tokens: ModalTokens }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.tokens.overlay.background};
  backdrop-filter: ${props => props.tokens.overlay.backdropFilter || 'none'};
  z-index: ${props => props.tokens.overlay.zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => !props.$disableAnimation && css`
    animation: ${props.$isOpen ? fadeIn : fadeOut} 
               ${props.$animationDuration}ms 
               ${props.tokens.animation.easing};
  `}
`;

// Modal container
export const StyledModal = styled.div<StyledModalProps & { tokens: ModalTokens }>`
  position: relative;
  background: ${props => props.$customBackground || props.tokens.variants[props.$variant].background || props.tokens.modal.background};
  border-radius: ${props => props.$customBorderRadius || props.tokens.variants[props.$variant].borderRadius || props.tokens.modal.borderRadius};
  box-shadow: ${props => props.tokens.variants[props.$variant].boxShadow || props.tokens.modal.boxShadow};
  border: ${props => props.tokens.modal.border};
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
  z-index: ${props => props.tokens.modal.zIndex};
  
  /* Size handling */
  ${props => {
    const size = props.tokens.sizes[props.$size];
    return css`
      width: ${props.$customWidth || size.width};
      max-width: ${props.$customMaxWidth || size.maxWidth};
      ${size.height ? `height: ${props.$customHeight || size.height};` : ''}
      max-height: ${props.$customMaxHeight || size.maxHeight};
    `;
  }}
  
  /* Position handling */
  ${props => {
    const position = props.tokens.positions[props.$position];
    if (props.$variant === 'sidebar') {
      return css`
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        transform: none;
      `;
    }
    
    if (props.$variant === 'fullscreen' || props.$size === 'full') {
      return css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
        transform: none;
      `;
    }
    
    return css`
      position: absolute;
      left: 50%;
      ${position.top ? `top: ${position.top};` : ''}
      ${position.bottom ? `bottom: ${position.bottom};` : ''}
      transform: ${position.transform};
    `;
  }}
  
  /* Padding override */
  ${props => props.$customPadding && css`
    padding: ${props.$customPadding};
  `}
  
  /* Animation */
  ${props => !props.$disableAnimation && css`
    animation: ${getModalAnimation(props)} 
               ${props.$animationDuration}ms 
               ${props.tokens.animation.easing};
  `}
`;

// Animation helper function
function getModalAnimation(props: StyledModalProps & { tokens: ModalTokens }) {
  if (props.$variant === 'sidebar') {
    return props.$isOpen ? 
      keyframes`
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      ` :
      keyframes`
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      `;
  }
  
  if (props.$position === 'top') {
    return props.$isOpen ? slideInFromTop : slideOut;
  }
  
  if (props.$position === 'bottom') {
    return props.$isOpen ? slideInFromBottom : slideOut;
  }
  
  return props.$isOpen ? slideIn : slideOut;
}

// Header component
export const StyledModalHeader = styled.header<{ tokens: ModalTokens }>`
  padding: ${props => props.tokens.header.padding};
  border-bottom: ${props => props.tokens.header.borderBottom};
  background: ${props => props.tokens.header.background};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
`;

// Container for header content
export const StyledModalHeaderContent = styled.div`
  flex: 1;
`;

// Body component
export const StyledModalBody = styled.div<{ tokens: ModalTokens; $customPadding?: string }>`
  padding: ${props => props.$customPadding || props.tokens.body.padding};
  max-height: ${props => props.tokens.body.maxHeight};
  overflow: ${props => props.tokens.body.overflow};
  flex: 1;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

// Footer component
export const StyledModalFooter = styled.footer<{ tokens: ModalTokens }>`
  padding: ${props => props.tokens.footer.padding};
  border-top: ${props => props.tokens.footer.borderTop};
  background: ${props => props.tokens.footer.background};
  display: flex;
  align-items: center;
  justify-content: ${props => props.tokens.footer.justifyContent};
  gap: 12px;
`;

// Close button
export const StyledCloseButton = styled.button<{ tokens: ModalTokens }>`
  width: ${props => props.tokens.closeButton.size};
  height: ${props => props.tokens.closeButton.size};
  border: none;
  background: ${props => props.tokens.closeButton.background};
  color: ${props => props.tokens.closeButton.color};
  border-radius: ${props => props.tokens.closeButton.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 150ms ease;
  
  &:hover {
    background: ${props => props.tokens.closeButton.hoverBackground};
    color: ${props => props.tokens.closeButton.hoverColor};
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Content wrapper for better structure
export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`; 