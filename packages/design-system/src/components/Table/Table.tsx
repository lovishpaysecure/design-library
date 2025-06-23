import React, { useState, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { Typography } from '../Typography';
import { CheckBox } from '../CheckBox';
import { TableProps, TableColumn, FixedColumnPosition } from './Table.types';
import { tableTokens } from './Table.tokens';
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

const Table = <T extends Record<string, any>>({
  columns,
  data,
  variant = 'default',
  size = 'medium',
  showHeader = true,
  sortable = false,
  hoverable = true,
  className,
  onRowClick,
  onSort,
  isRowSelection = false,
  selectedRows = [],
  onRowSelect,
  fixedColumn = 'none',
}: TableProps<T>) => {
  const tokens = useTokens('Table', tableTokens);
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>(selectedRows);

  // If row selection is enabled, we should not allow row clicking
  const effectiveOnRowClick = isRowSelection ? undefined : onRowClick;
  const effectiveHoverable = isRowSelection ? false : hoverable;

  useEffect(() => {
    setInternalSelectedRows(selectedRows);
  }, [selectedRows]);

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : [];
    setInternalSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    const newSelectedRows = checked
      ? [...internalSelectedRows, row]
      : internalSelectedRows.filter(selectedRow => selectedRow !== row);
    setInternalSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const isRowSelected = (row: T) => {
    return internalSelectedRows.some(selectedRow => 
      Object.keys(row).every(key => selectedRow[key] === row[key])
    );
  };

  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor];
  };

  const handleHeaderClick = (column: TableColumn<T>) => {
    if (sortable && onSort && (column.sortable !== false)) {
      onSort(column, 'asc');
    }
  };

  const handleRowClick = (row: T, index: number) => {
    if (effectiveOnRowClick) {
      effectiveOnRowClick(row, index);
    }
  };

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

  const renderHeaderCell = (column: TableColumn<T>, index: number, isFixed: boolean = false) => (
    <StyledTableHeaderCell
      key={column.key}
      tokens={tokens}
      size={size}
      align={column.align}
      fixed={isFixed ? fixedColumn : 'none'}
      isLastFixed={isFixed}
      style={{ 
        width: column.width,
        cursor: sortable && column.sortable !== false ? 'pointer' : 'default'
      }}
      onClick={() => handleHeaderClick(column)}
    >
      <Typography 
        variant={getHeaderTypographyVariant()} 
        weight="semibold"
        component="span"
        style={{ color: '#ffffff' }}
      >
        {column.header}
      </Typography>
    </StyledTableHeaderCell>
  );

  const renderBodyCell = (row: T, rowIndex: number, column: TableColumn<T>, index: number, isFixed: boolean = false) => (
    <StyledTableCell
      key={`${rowIndex}-${column.key}`}
      tokens={tokens}
      size={size}
      align={column.align}
      fixed={isFixed ? fixedColumn : 'none'}
      isLastFixed={isFixed}
    >
      <Typography 
        variant={getCellTypographyVariant()} 
        component="span"
      >
        {getCellValue(row, column)}
      </Typography>
    </StyledTableCell>
  );

  return (
    <StyledTableContainer 
      tokens={tokens} 
      variant={variant}
      className={className}
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
                    fixed={fixedColumn === 'left' ? 'left' : 'none'}
                    style={{ width: '48px', padding: '0 8px' }}
                  >
                    <CheckBox
                      checked={data.length > 0 && internalSelectedRows.length === data.length}
                      indeterminate={internalSelectedRows.length > 0 && internalSelectedRows.length < data.length}
                      onChange={handleSelectAll}
                    />
                  </StyledTableHeaderCell>
                )}
                {columns.map((column, index) => renderHeaderCell(
                  column,
                  index,
                  (fixedColumn === 'left' && index === 0) || (fixedColumn === 'right' && index === columns.length - 1)
                ))}
              </StyledTableRow>
            </StyledTableHeader>
          )}
          
          <StyledTableBody tokens={tokens}>
            {data.map((row, rowIndex) => (
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
                    fixed={fixedColumn === 'left' ? 'left' : 'none'}
                    style={{ width: '48px', padding: '0 8px' }}
                  >
                    <CheckBox
                      checked={isRowSelected(row)}
                      onChange={(checked: boolean) => handleSelectRow(row, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </StyledTableCell>
                )}
                {columns.map((column, index) => renderBodyCell(
                  row,
                  rowIndex,
                  column,
                  index,
                  (fixedColumn === 'left' && index === 0) || (fixedColumn === 'right' && index === columns.length - 1)
                ))}
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableWrapper>
    </StyledTableContainer>
  );
};

export default Table; 