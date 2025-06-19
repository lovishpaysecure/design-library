import styled from 'styled-components';
import { TooltipTokens } from '../components/Tooltip/Tooltip.types';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipBubble = styled.div<{ 
  placement: string; 
  maxWidth?: string; 
  linebreak: boolean;
  tokens: TooltipTokens;
}>`
  position: absolute;
  z-index: 1000;
  background: ${props => props.tokens.bubble.background};
  color: ${props => props.tokens.bubble.color};
  border-radius: ${props => props.tokens.bubble.borderRadius};
  box-shadow: ${props => props.tokens.bubble.boxShadow};
  padding: ${props => props.tokens.bubble.padding};
  ${({ linebreak, maxWidth }) => linebreak && maxWidth ? `max-width: ${maxWidth};` : ''}
  white-space: ${({ linebreak }) => linebreak ? 'normal' : 'nowrap'};
  overflow-wrap: break-word;
  display: inline-block;
  width: max-content;
  min-width: 40px;
  pointer-events: none;
  opacity: ${props => props.tokens.bubble.opacity};
  transition: ${props => props.tokens.bubble.transition};
  font-size: ${props => props.tokens.bubble.fontSize};
  line-height: ${props => props.tokens.bubble.lineHeight};
  left: 50%;
  transform: translateX(-50%);
  ${({ placement }) => placement === 'top' && 'bottom: 120%;'}
  ${({ placement }) => placement === 'bottom' && `top: 120%; left: 0; right: 0; margin: auto; width: fit-content; transform: none;`}
  ${({ placement }) => placement === 'left' && `
    right: 120%;
    left: auto;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0;
  `}
  ${({ placement }) => placement === 'right' && 'left: 120%; top: 50%; transform: translateY(-50%);'}
  
  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${({ placement, tokens }) => placement === 'top' && `
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize} 0 ${tokens.bubble.arrowSize};
      border-color: ${tokens.bubble.background} transparent transparent transparent;
    `}
    ${({ placement, tokens }) => placement === 'bottom' && `
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize};
      border-color: transparent transparent ${tokens.bubble.background} transparent;
    `}
    ${({ placement, tokens }) => placement === 'left' && `
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: ${tokens.bubble.arrowSize} 0 ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize};
      border-color: transparent transparent transparent ${tokens.bubble.background};
    `}
    ${({ placement, tokens }) => placement === 'right' && `
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize} ${tokens.bubble.arrowSize} 0;
      border-color: transparent ${tokens.bubble.background} transparent transparent;
    `}
  }
  
  @media (max-width: 600px) {
    ${({ linebreak }) => linebreak ? 'max-width: 95vw;' : ''}
    left: 50%;
    transform: translateX(-50%);
  }
`; 