import styled from 'styled-components';
import { StyledButtonProps } from '../components/Button/Button.types';

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 24px';
      default: return '12px 20px';
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: #0066FF;
          color: #FFFFFF;
          &:hover:not(:disabled) {
            background: #0052CC;
          }
        `;
      case 'secondary':
        return `
          background: #F5F5F5;
          color: #333333;
          &:hover:not(:disabled) {
            background: #E5E5E5;
          }
        `;
      case 'tertiary':
        return `
          background: transparent;
          color: #0066FF;
          border: 1px solid #0066FF;
          &:hover:not(:disabled) {
            background: #F0F7FF;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #666666;
          &:hover:not(:disabled) {
            background: #F5F5F5;
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`; 