import { ReactNode } from 'react';

export type FixedColumnPosition = 'left' | 'right' | 'none';

export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => string | number);
  align?: 'left' | 'center' | 'right';
  width?: string;
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
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  showHeader?: boolean;
  sortable?: boolean;
  hoverable?: boolean;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
  onSort?: (column: TableColumn<T>, direction: 'asc' | 'desc') => void;
  isRowSelection?: boolean;
  selectedRows?: T[];
  onRowSelect?: (selectedRows: T[]) => void;
  fixedColumn?: FixedColumnPosition;
} 