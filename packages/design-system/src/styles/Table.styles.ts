import styled, { css } from 'styled-components';
import { TableTokens } from '../components/Table/Table.types';

interface StyledTableContainerProps {
  tokens: TableTokens;
  variant: 'default' | 'striped' | 'bordered';
}

interface StyledTableWrapperProps {
  maxHeight?: string;
}

interface StyledTableProps {
  tokens: TableTokens;
}

interface StyledTableHeaderProps {
  tokens: TableTokens;
  size: 'small' | 'medium' | 'large';
}

interface StyledTableCellProps {
  tokens: TableTokens;
  size: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | 'none';
  isLastFixed?: boolean;
}

interface StyledTableRowProps {
  tokens: TableTokens;
  variant: 'default' | 'striped' | 'bordered';
  hoverable?: boolean;
  isStriped?: boolean;
  clickable?: boolean;
}

export const StyledTableContainer = styled.div<StyledTableContainerProps>`
  background: ${({ tokens }) => tokens.containerBackground};
  border-radius: ${({ tokens }) => tokens.containerBorderRadius};
  box-shadow: ${({ tokens }) => tokens.containerBoxShadow};
  border: ${({ tokens }) => tokens.containerBorder};
  overflow: hidden;
  width: 100%;
  position: relative;
`;

export const StyledTableWrapper = styled.div<StyledTableWrapperProps>`
  overflow-x: auto;
  position: relative;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const StyledTable = styled.table<StyledTableProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: inherit;
`;

export const StyledTableHeader = styled.thead<StyledTableHeaderProps>`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ tokens }) => tokens.headerBackground} !important;
  color: #ffffff;

  tr {
    background: ${({ tokens }) => tokens.headerBackground} !important;
  }
`;

export const StyledTableHeaderCell = styled.th<StyledTableCellProps>`
  background: ${({ tokens }) => tokens.headerBackground};
  border-bottom: ${({ tokens }) => tokens.headerBorderBottom};
  text-align: ${({ align = 'left' }) => align};
  color: #ffffff;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  
  ${({ size, tokens }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${tokens.smallPadding};
        `;
      case 'large':
        return css`
          padding: ${tokens.largePadding};
        `;
      default:
        return css`
          padding: ${tokens.headerPadding};
        `;
    }
  }}

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
  }

  ${({ fixed }) => {
    if (fixed === 'left') {
      return css`
        position: sticky;
        left: 0;
        z-index: 3;
      `;
    }
    if (fixed === 'right') {
      return css`
        position: sticky;
        right: 0;
        z-index: 3;
      `;
    }
    return '';
  }}

  ${({ fixed, isLastFixed }) => {
    if (fixed === 'left' && isLastFixed) {
      return css`
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }
      `;
    }
    if (fixed === 'right' && isLastFixed) {
      return css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(-90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }
      `;
    }
    return '';
  }}
`;

export const StyledTableBody = styled.tbody<StyledTableProps>`
  position: relative;
  z-index: 1;
`;

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  background: ${({ tokens }) => tokens.rowBackground};
  border-bottom: ${({ tokens }) => tokens.rowBorderBottom};

  ${({ variant, tokens, isStriped }) =>
    variant === 'striped' &&
    isStriped &&
    css`
      background: ${tokens.stripedRowBackground};
    `}

  ${({ variant, tokens }) =>
    variant === 'bordered' &&
    css`
      & td {
        border-right: ${tokens.borderedBorder};
        
        &:last-child {
          border-right: none;
        }
      }
    `}

  ${({ hoverable, tokens, clickable }) =>
    (hoverable || clickable) &&
    css`
      cursor: ${clickable ? 'pointer' : 'default'};
      transition: background-color 0.2s ease;

      &:hover {
        background: ${tokens.rowBackgroundHover};
      }
    `}

  &:last-child td {
    border-bottom: none;
  }
`;

export const StyledTableCell = styled.td<StyledTableCellProps>`
  border-bottom: ${({ tokens }) => tokens.cellBorderBottom};
  text-align: ${({ align = 'left' }) => align};
  color: #1E293B;
  background: inherit;
  position: relative;
  
  ${({ size, tokens }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${tokens.smallPadding};
        `;
      case 'large':
        return css`
          padding: ${tokens.largePadding};
        `;
      default:
        return css`
          padding: ${tokens.cellPadding};
        `;
    }
  }}

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
  }

  ${({ fixed }) => {
    if (fixed === 'left') {
      return css`
        position: sticky;
        left: 0;
        z-index: 2;
        background: inherit;
      `;
    }
    if (fixed === 'right') {
      return css`
        position: sticky;
        right: 0;
        z-index: 2;
        background: inherit;
      `;
    }
    return '';
  }}

  ${({ fixed, isLastFixed }) => {
    if (fixed === 'left' && isLastFixed) {
      return css`
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }
      `;
    }
    if (fixed === 'right' && isLastFixed) {
      return css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(-90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }
      `;
    }
    return '';
  }}
`; 