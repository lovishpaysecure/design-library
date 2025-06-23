import React from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
}

export interface PaginationConfig {
  pageSize: number;
  totalItems?: number;
  currentPage: number;
}

export interface SearchConfig {
  mode: 'local' | 'api' | 'both';
  minChars?: number;
  debounceMs?: number;
}

export interface DropdownTokens {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  primaryColor: string;
  primaryColorLight: string;
  secondaryColor: string;
  hoverColor: string;
  selectedColor: string;
  selectedTextColor: string;
  disabledColor: string;
  disabledBackgroundColor: string;
  shadowColor: string;
  placeholderColor: string;
  optionPadding: string;
  optionHoverColor: string;
  checkboxColor: string;
  checkboxCheckedColor: string;
  dividerColor: string;
  searchBackgroundColor: string;
  searchBorderColor: string;
  loadingColor: string;
  errorColor: string;
  errorBackgroundColor: string;
  maxHeight: string;
}

export interface StyledDropdownProps {
  $isOpen?: boolean;
  $fullWidth?: boolean;
  $isSelected?: boolean;
  $hasError?: boolean;
  $isDisabled?: boolean;
  tokens: DropdownTokens;
}

export interface DropdownConfig {
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  multiselect?: boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
  maxSelectedItems?: number;
  error?: string | boolean;
  required?: boolean;
  search?: SearchConfig;
  pagination?: PaginationConfig;
  renderOption?: (option: DropdownOption) => React.ReactNode;
  loadOptions?: (
    search: string,
    pagination?: PaginationConfig
  ) => Promise<{
    options: DropdownOption[];
    pagination?: PaginationConfig;
  }>;
}

export interface DropdownProps {
  /**
   * Available options to select from
   */
  options: DropdownOption[];
  /**
   * Current selected value(s)
   */
  value?: string | number | (string | number)[];
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;
  /**
   * Placeholder text when no selection
   */
  placeholder?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Whether multiple selection is allowed
   */
  multiple?: boolean;
  /**
   * Whether to show search functionality
   */
  searchable?: boolean;
  /**
   * Custom search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Whether to show clear button
   */
  clearable?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  /**
   * Callback when dropdown opens
   */
  onOpen?: () => void;
  /**
   * Callback when dropdown closes
   */
  onClose?: () => void;
  /**
   * Callback when search value changes
   */
  onSearch?: (searchValue: string) => void;
  /**
   * Custom filter function for search
   */
  filterOption?: (option: DropdownOption, searchValue: string) => boolean;
  /**
   * Custom render function for options
   */
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
  /**
   * Custom render function for selected value display
   */
  renderValue?: (selectedOptions: DropdownOption[]) => React.ReactNode;
  /**
   * Maximum number of selected items to display
   */
  maxTagCount?: number;
  /**
   * Position of the dropdown
   */
  placement?: 'bottom' | 'top';
  /**
   * Custom width for dropdown
   */
  dropdownWidth?: string | number;
  /**
   * Whether to show select all option (for multiple)
   */
  showSelectAll?: boolean;
  /**
   * Group options by the group property
   */
  groupBy?: boolean;
} 