import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '../Skeleton';
import { PaginationTokens } from './Table.types';
import { useTokens } from '../../hooks/useTokens';
import { paginationTokens } from './Pagination.tokens';

const PaginationContainer = styled.div<{ tokens: PaginationTokens }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ tokens }) => tokens.containerPadding};
  border-top: ${({ tokens }) => tokens.containerBorderTop};
  background: ${({ tokens }) => tokens.containerBackground};
`;

const InfoTextSkeleton = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationControlsSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PaginationSkeleton: React.FC = () => {
  const tokens = useTokens('Pagination', paginationTokens);

  return (
    <PaginationContainer tokens={tokens}>
      <InfoTextSkeleton>
        <Skeleton width="200px" height="16px" variant="rectangular" />
      </InfoTextSkeleton>
      
      <PaginationControlsSkeleton>
        {/* First button skeleton */}
        <Skeleton width="48px" height="32px" variant="rectangular" borderRadius="4px" />
        
        {/* Prev button skeleton */}
        <Skeleton width="48px" height="32px" variant="rectangular" borderRadius="4px" />
        
        {/* Page number buttons skeleton */}
        <Skeleton width="32px" height="32px" variant="rectangular" borderRadius="4px" />
        <Skeleton width="32px" height="32px" variant="rectangular" borderRadius="4px" />
        <Skeleton width="32px" height="32px" variant="rectangular" borderRadius="4px" />
        
        {/* Next button skeleton */}
        <Skeleton width="48px" height="32px" variant="rectangular" borderRadius="4px" />
        
        {/* Last button skeleton */}
        <Skeleton width="48px" height="32px" variant="rectangular" borderRadius="4px" />
      </PaginationControlsSkeleton>
    </PaginationContainer>
  );
};

export default PaginationSkeleton; 