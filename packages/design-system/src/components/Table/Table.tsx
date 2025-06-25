import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { Typography } from '../Typography';
import { CheckBox } from '../CheckBox';
import {
  TableProps,
  TableColumn,
  TableTokens,
  TableHeaderCellProps,
  SortConfig,
  SortDirection
} from './Table.types';
import { tableTokens } from './Table.tokens';
import SortIcon from './SortIcon';
import Pagination from './Pagination';
import {
  StyledTableContainer,
  StyledTableWrapper,
  StyledTable,
  StyledTableHeader,
  StyledTableHeaderCell,
  StyledTableBody,
  StyledTableRow,
  StyledTableCell,
} from '../../styles/Table.styles';
import styled, { css } from 'styled-components';

const TableHeaderCell = styled.th<TableHeaderCellProps>`
  position: relative;
  padding: ${({ tokens }) => tokens.headerPadding};
  background: ${({ tokens }) => tokens.headerBackground};
  color: ${({ tokens }) => tokens.headerTextColor};
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  border-bottom: ${({ tokens }) => tokens.headerBorderBottom};
  ${({ fixed, side, tokens }) =>
    fixed &&
    side === 'left' &&
    css`
      position: sticky;
      left: 0;
      z-index: 2;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: -8px;
        bottom: 0;
        width: 8px;
        background: ${tokens.fixedColumnShadowLeft};
        pointer-events: none;
      }
    `}
  ${({ fixed, side, tokens }) =>
    fixed &&
    side === 'right' &&
    css`
      position: sticky;
      right: 0;
      z-index: 2;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -8px;
        bottom: 0;
        width: 8px;
        background: ${tokens.fixedColumnShadowRight};
        pointer-events: none;
      }
    `}
  ${({ sortable }) =>
    sortable &&
    css`
      cursor: pointer;
      user-select: none;
    `}
`;

const Table = <T extends Record<string, any>>({
  columns,
  data,
  variant = 'default',
  size = 'medium',
  showHeader = true,
  sortable = false,
  sortConfig,
  onSort,
  hoverable = true,
  onRowClick,
  isRowSelection = false,
  selectedRows = [],
  onRowSelect,
  fixedLeftmost = false,
  fixedRightmost = false,
  pagination,
  onPageChange,
}: TableProps<T>) => {
  const tokens = useTokens('Table', tableTokens);
  // Use controlled state for row selection
  const [internalSelectedRows, setInternalSelectedRows] = useState<number[]>([]);
  
  // Use the prop value if provided, otherwise use internal state
  const currentSelectedRows = selectedRows.length > 0 ? selectedRows : internalSelectedRows;

  // If row selection is enabled, we should not allow row clicking
  const effectiveOnRowClick = isRowSelection ? undefined : onRowClick;
  const effectiveHoverable = isRowSelection ? false : hoverable;

  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedRows = checked ? data.map((_, index) => index) : [];
    setInternalSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  }, [data, onRowSelect]);

  const handleSelectRow = useCallback((rowIndex: number, checked: boolean) => {
    const newSelectedRows = checked
      ? [...currentSelectedRows, rowIndex]
      : currentSelectedRows.filter(selectedIndex => selectedIndex !== rowIndex);
    setInternalSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  }, [currentSelectedRows, onRowSelect]);

  const isRowSelected = useCallback((rowIndex: number) => {
    return currentSelectedRows.includes(rowIndex);
  }, [currentSelectedRows]);

  const getCellValue = (row: T, column: TableColumn<T>) => {
    return row[column.accessor];
  };

  const handleAscSort = useCallback((columnKey: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!onSort) return;
    onSort({ columnKey, direction: 'asc' } as SortConfig);
  }, [onSort]);

  const handleDescSort = useCallback((columnKey: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!onSort) return;
    onSort({ columnKey, direction: 'desc' } as SortConfig);
  }, [onSort]);

  const renderSortIcon = useCallback((column: TableColumn<T>) => {
    const isColumnSorted = sortConfig?.columnKey === column.key;
    const sortDirection = isColumnSorted ? sortConfig.direction : 'none';
    
    return (
      <SortIcon 
        direction={sortDirection} 
        active={isColumnSorted}
        color={tokens.sortIconColor}
        onAscClick={(e) => handleAscSort(column.key, e)}
        onDescClick={(e) => handleDescSort(column.key, e)}
      />
    );
  }, [sortConfig, tokens.sortIconColor, handleAscSort, handleDescSort]);

  const getNextSortDirection = (currentDirection?: SortDirection): SortDirection => {
    switch (currentDirection) {
      case 'asc':
        return 'desc';
      case 'desc':
        return 'none';
      default:
        return 'asc';
    }
  };

  // Memoize the sort column to avoid infinite re-renders due to columns array reference changes
  const sortColumn = useMemo(() => {
    if (!sortConfig || sortConfig.direction === 'none') return null;
    return columns.find(col => col.key === sortConfig.columnKey);
  }, [columns, sortConfig?.columnKey]);

  const sortedData = useMemo(() => {
    if (!sortConfig || sortConfig.direction === 'none' || !sortColumn) return data;

    return [...data].sort((a, b) => {
      if (sortColumn.sortFn) {
        return sortConfig.direction === 'asc' 
          ? sortColumn.sortFn(a, b) 
          : sortColumn.sortFn(b, a);
      }

      const aValue = a[sortColumn.accessor];
      const bValue = b[sortColumn.accessor];

      // Convert values to strings for string comparison
      const aString = String(aValue);
      const bString = String(bValue);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      }

      // Numeric comparison
      const aNum = Number(aValue);
      const bNum = Number(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        if (aNum < bNum) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aNum > bNum) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }

      // Fallback to string comparison
      return sortConfig.direction === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }, [data, sortConfig, sortColumn]);

  const handleRowClick = useCallback((row: T, index: number) => {
    if (effectiveOnRowClick) {
      effectiveOnRowClick(row, index);
    }
  }, [effectiveOnRowClick]);

  const getHeaderTypographyVariant = () => {
    switch (size) {
      case 'small':
        return 'caption' as const;
      case 'large':
        return 'subtitle1' as const;
      default:
        return 'subtitle2' as const;
    }
  };

  const getCellTypographyVariant = () => {
    switch (size) {
      case 'small':
        return 'caption' as const;
      case 'large':
        return 'body1' as const;
      default:
        return 'body2' as const;
    }
  };

  const getColumnFixedPosition = (index: number): 'left' | 'right' | 'none' => {
    if (index === 0 && fixedLeftmost) return 'left';
    if (index === columns.length - 1 && fixedRightmost) return 'right';
    return 'none';
  };

  const isLastFixedColumn = (index: number): boolean => {
    return (index === 0 && fixedLeftmost) || (index === columns.length - 1 && fixedRightmost);
  };

  const renderHeaderCell = (column: TableColumn<T>, index: number) => {
    const isFixed =
      (fixedLeftmost && index === 0) ||
      (fixedRightmost && index === columns.length - 1);
    const side = index === 0 ? 'left' : 'right';
    const isColumnSortable = sortable && column.sortable !== false;
    
    return (
      <TableHeaderCell
        key={column.key}
        tokens={tokens}
        fixed={isFixed}
        side={isFixed ? side : undefined}
        sortable={false}
      >
        <Typography 
          variant="subtitle1" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            color: tokens.headerTextColor 
          }}
        >
          {column.header}
          {isColumnSortable && renderSortIcon(column)}
        </Typography>
      </TableHeaderCell>
    );
  };

  const renderBodyCell = (row: T, rowIndex: number, column: TableColumn<T>, index: number) => {
    const fixedPosition = getColumnFixedPosition(index);
    const isLastFixed = isLastFixedColumn(index);
    const isRowStriped = variant === 'striped' && rowIndex % 2 === 1;
    const cellValue = getCellValue(row, column);

    return (
      <StyledTableCell
        key={`${rowIndex}-${column.key}`}
        tokens={tokens}
        size={size}
        align={column.align}
        fixed={fixedPosition}
        isLastFixed={isLastFixed}
        isStriped={isRowStriped}
      >
        {column.render ? (
          column.render(cellValue, row, rowIndex)
        ) : (
          <Typography 
            variant={getCellTypographyVariant()} 
            component="span"
          >
            {cellValue}
          </Typography>
        )}
      </StyledTableCell>
    );
  };

  return (
    <StyledTableContainer 
      tokens={tokens} 
      variant={variant}
    >
      <StyledTableWrapper>
        <StyledTable tokens={tokens}>
          {showHeader && (
            <StyledTableHeader tokens={tokens} size={size}>
              <StyledTableRow 
                tokens={tokens} 
                variant={variant}
                style={{ background: tokens.headerBackground }}
              >
                {isRowSelection && (
                  <StyledTableHeaderCell
                    tokens={tokens}
                    size={size}
                    align="center"
                    fixed={fixedLeftmost ? 'left' : 'none'}
                    isLastFixed={fixedLeftmost && columns.length === 0}
                    style={{ width: '48px', padding: '0 8px' }}
                  >
                    <CheckBox
                      checked={data.length > 0 && currentSelectedRows.length === data.length}
                      indeterminate={currentSelectedRows.length > 0 && currentSelectedRows.length < data.length}
                      onChange={handleSelectAll}
                    />
                  </StyledTableHeaderCell>
                )}
                {columns.map((column, index) => renderHeaderCell(column, index))}
              </StyledTableRow>
            </StyledTableHeader>
          )}
          
          <StyledTableBody tokens={tokens}>
            {sortedData.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                tokens={tokens}
                variant={variant}
                hoverable={effectiveHoverable}
                isStriped={variant === 'striped' && rowIndex % 2 === 1}
                clickable={!!effectiveOnRowClick}
                onClick={() => handleRowClick(row, rowIndex)}
              >
                {isRowSelection && (
                  <StyledTableCell
                    tokens={tokens}
                    size={size}
                    align="center"
                    fixed={fixedLeftmost ? 'left' : 'none'}
                    isLastFixed={fixedLeftmost && columns.length === 0}
                    style={{ width: '48px', padding: '0 8px' }}
                  >
                    <CheckBox
                      checked={isRowSelected(rowIndex)}
                      onChange={(checked: boolean) => handleSelectRow(rowIndex, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </StyledTableCell>
                )}
                {columns.map((column, index) => renderBodyCell(row, rowIndex, column, index))}
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableWrapper>
      
      {pagination && (
        <Pagination
          config={pagination}
          onPageChange={onPageChange || (() => {})}
        />
      )}
    </StyledTableContainer>
  );
};

export default Table; 