import React from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: string;
  linebreak?: boolean;
}

export interface TooltipTokens {
  bubble: {
    background: string;
    color: string;
    borderRadius: string;
    boxShadow: string;
    padding: string;
    fontSize: string;
    lineHeight: string;
    opacity: string;
    transition: string;
    arrowSize: string;
  };
} 