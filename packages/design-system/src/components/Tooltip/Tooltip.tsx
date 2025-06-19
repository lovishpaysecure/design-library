import React, { useState, useRef } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { TooltipProps, TooltipTokens } from './Tooltip.types';
import { TooltipWrapper, TooltipBubble } from '../../styles/Tooltip.styles';
import { tooltipTokens } from './Tooltip.tokens';
import { Typography } from '../Typography/Typography';

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
  const tokens = useTokens<TooltipTokens>('tooltip', tooltipTokens);

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
        tokens={tokens}
        role="tooltip"
      >
        <Typography variant="body2" style={{ color: tokens.bubble.color }}>
          {content}
        </Typography>
      </TooltipBubble>
    </TooltipWrapper>
  );
}; 