import { ReactNode } from 'react';

export type FixedColumnPosition = 'left' | 'right' | 'none';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortConfig {
  columnKey: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: keyof T;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
}

export interface TableHeaderCellProps {
  tokens: TableTokens;
  fixed?: boolean;
  side?: 'left' | 'right';
  sortable?: boolean;
}

export interface TableTokens {
  containerBackground: string;
  containerBorderRadius: string;
  containerBoxShadow: string;
  containerBorder: string;
  headerBackground: string;
  headerBorderBottom: string;
  headerPadding: string;
  smallPadding: string;
  largePadding: string;
  cellPadding: string;
  cellBorderBottom: string;
  rowBackground: string;
  rowBackgroundHover: string;
  rowBorderBottom: string;
  stripedRowBackground: string;
  borderedBorder: string;
  fixedColumnShadowLeft: string;
  fixedColumnShadowRight: string;
  headerTextColor: string;
  sortIconColor: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  showHeader?: boolean;
  sortable?: boolean;
  sortConfig?: SortConfig;
  onSort?: (config: SortConfig) => void;
  fixedLeftmost?: boolean;
  fixedRightmost?: boolean;
  isRowSelection?: boolean;
  selectedRows?: number[];
  onRowSelect?: (selectedRows: number[]) => void;
  onRowClick?: (row: T, index: number) => void;
} 