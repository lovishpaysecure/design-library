import React from 'react';
import styled from 'styled-components';
import { SortDirection } from './Table.types';

interface SortIconProps {
  direction: SortDirection;
  active: boolean;
  color: string;
  onAscClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDescClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const IconWrapper = styled.span<{ active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  margin-left: 4px;
  height: 14px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 0.2s ease;
`;

const ArrowUp = styled.span<{ active: boolean; isAsc: boolean; color: string }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid ${({ color }) => color};
  margin-bottom: 2px;
  opacity: ${({ active, isAsc }) => (active && isAsc ? 1 : 0.5)};
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

const ArrowDown = styled.span<{ active: boolean; isDesc: boolean; color: string }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${({ color }) => color};
  opacity: ${({ active, isDesc }) => (active && isDesc ? 1 : 0.5)};
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(1px);
  }
`;

const SortIcon: React.FC<SortIconProps> = ({ 
  direction, 
  active, 
  color,
  onAscClick,
  onDescClick,
}) => {
  return (
    <IconWrapper active={active}>
      <ArrowUp 
        active={active} 
        isAsc={direction === 'asc'} 
        color={color}
        onClick={onAscClick}
      />
      <ArrowDown 
        active={active} 
        isDesc={direction === 'desc'} 
        color={color}
        onClick={onDescClick}
      />
    </IconWrapper>
  );
};

export default SortIcon; 