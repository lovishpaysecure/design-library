import React from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { TablePaginationConfig, PaginationTokens } from './Table.types';
import { useTokens } from '../../hooks/useTokens';
import { paginationTokens } from './Pagination.tokens';

interface PaginationProps {
  config: TablePaginationConfig;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const PaginationContainer = styled.div<{ tokens: PaginationTokens }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ tokens }) => tokens.containerPadding};
  border-top: ${({ tokens }) => tokens.containerBorderTop};
  background: ${({ tokens }) => tokens.containerBackground};
`;

const InfoText = styled.div<{ tokens: PaginationTokens }>`
  color: ${({ tokens }) => tokens.infoTextColor};
  font-size: ${({ tokens }) => tokens.infoFontSize};
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PaginationButton = styled.button<{ 
  tokens: PaginationTokens; 
  isActive?: boolean; 
  disabled?: boolean 
}>`
  padding: ${({ tokens }) => tokens.buttonPadding};
  margin: ${({ tokens }) => tokens.buttonMargin};
  background: ${({ tokens, isActive, disabled }) => 
    disabled 
      ? tokens.buttonBackgroundDisabled 
      : isActive 
        ? tokens.currentPageBackground 
        : tokens.buttonBackground
  };
  color: ${({ tokens, isActive, disabled }) => 
    disabled 
      ? tokens.buttonTextColorDisabled 
      : isActive 
        ? tokens.currentPageTextColor 
        : tokens.buttonTextColor
  };
  border: ${({ tokens, isActive }) => isActive ? tokens.currentPageBorder : tokens.buttonBorder};
  border-radius: ${({ tokens }) => tokens.buttonBorderRadius};
  font-size: ${({ tokens }) => tokens.buttonFontSize};
  font-weight: ${({ tokens }) => tokens.buttonFontWeight};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ tokens, isActive }) => 
      isActive 
        ? tokens.currentPageBackground 
        : tokens.buttonBackgroundHover
    };
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ 
  config, 
  onPageChange,
  disabled = false
}) => {
  const tokens = useTokens('Pagination', paginationTokens);
  
  const {
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    showFirstLast = true,
    showPrevNext = true,
    maxVisiblePages = 5
  } = config;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <PaginationContainer tokens={tokens}>
      <InfoText tokens={tokens}>
        Showing {startItem} to {endItem} of {totalItems} entries
      </InfoText>
      
      <PaginationControls>
        {showFirstLast && (
          <PaginationButton
            tokens={tokens}
            disabled={disabled || isFirstPage}
            onClick={() => !disabled && onPageChange(1)}
          >
            First
          </PaginationButton>
        )}
        
        {showPrevNext && (
          <PaginationButton
            tokens={tokens}
            disabled={disabled || isFirstPage}
            onClick={() => !disabled && onPageChange(currentPage - 1)}
          >
            Prev
          </PaginationButton>
        )}
        
        {pageNumbers.map((pageNum) => (
          <PaginationButton
            key={pageNum}
            tokens={tokens}
            isActive={pageNum === currentPage}
            disabled={disabled}
            onClick={() => !disabled && onPageChange(pageNum)}
          >
            {pageNum}
          </PaginationButton>
        ))}
        
        {showPrevNext && (
          <PaginationButton
            tokens={tokens}
            disabled={disabled || isLastPage}
            onClick={() => !disabled && onPageChange(currentPage + 1)}
          >
            Next
          </PaginationButton>
        )}
        
        {showFirstLast && (
          <PaginationButton
            tokens={tokens}
            disabled={disabled || isLastPage}
            onClick={() => !disabled && onPageChange(totalPages)}
          >
            Last
          </PaginationButton>
        )}
      </PaginationControls>
    </PaginationContainer>
  );
};

export default Pagination; 