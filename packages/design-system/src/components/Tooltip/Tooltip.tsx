import React, { ReactNode, useState, useRef } from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography/Typography';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: string;
  linebreak?: boolean;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipBubble = styled.div<{ placement: string; maxWidth?: string; linebreak: boolean }>`
  position: absolute;
  z-index: 1000;
  background: #fff;
  color: #5022bd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 8px 14px;
  ${({ linebreak, maxWidth }) => linebreak && maxWidth ? `max-width: ${maxWidth};` : ''}
  white-space: ${({ linebreak }) => linebreak ? 'normal' : 'nowrap'};
  overflow-wrap: break-word;
  display: inline-block;
  width: max-content;
  min-width: 40px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 14px;
  line-height: 1.4;
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
    ${({ placement }) => placement === 'top' && `
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px 8px 0 8px;
      border-color: #fff transparent transparent transparent;
    `}
    ${({ placement }) => placement === 'bottom' && `
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent #fff transparent;
    `}
    ${({ placement }) => placement === 'left' && `
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 8px 0 8px 8px;
      border-color: transparent transparent transparent #fff;
    `}
    ${({ placement }) => placement === 'right' && `
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 8px 8px 8px 0;
      border-color: transparent #fff transparent transparent;
    `}
  }
  @media (max-width: 600px) {
    ${({ linebreak }) => linebreak ? 'max-width: 95vw;' : ''}
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 100,
  maxWidth = '450px',
  linebreak = false,
}) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setVisible(false);
  };

  return (
    <TooltipWrapper onMouseEnter={show} onMouseLeave={hide}>
      {children}
      <TooltipBubble
        className={visible ? 'visible' : ''}
        placement={placement}
        maxWidth={linebreak ? maxWidth : undefined}
        linebreak={linebreak}
        role="tooltip"
      >
        <Typography variant="body2" style={{ color: '#5022bd' }}>{content}</Typography>
      </TooltipBubble>
    </TooltipWrapper>
  );
}; 