import { ReactNode } from 'react';

export type FixedColumnPosition = 'left' | 'right' | 'none';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortConfig {
  columnKey: string;
  direction: SortDirection;
}

export interface TablePaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

export interface PaginationTokens {
  containerPadding: string;
  containerBorderTop: string;
  containerBackground: string;
  infoTextColor: string;
  infoFontSize: string;
  buttonPadding: string;
  buttonMargin: string;
  buttonBackground: string;
  buttonBackgroundHover: string;
  buttonBackgroundActive: string;
  buttonBackgroundDisabled: string;
  buttonTextColor: string;
  buttonTextColorActive: string;
  buttonTextColorDisabled: string;
  buttonBorder: string;
  buttonBorderRadius: string;
  buttonFontSize: string;
  buttonFontWeight: string;
  currentPageBackground: string;
  currentPageTextColor: string;
  currentPageBorder: string;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: keyof T;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
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
  pagination?: TablePaginationConfig;
  onPageChange?: (page: number) => void;
  /**
   * Shows skeleton loading state for table rows
   */
  isLoading?: boolean;
  /**
   * Number of skeleton rows to show when loading
   */
  skeletonRows?: number;
  /**
   * Custom skeleton content for table cells (overrides default skeleton)
   */
  skeletonContent?: React.ReactNode;
  /**
   * Shows skeleton loading state for pagination
   */
  showPaginationSkeleton?: boolean;
} 