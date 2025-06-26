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
  iconColor: string;
  iconSize: string;
  iconSpacing: string;
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
   * Icon to display at the start of the input
   */
  preIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  postIcon?: React.ReactNode;
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
   * Custom render function for the entire dropdown content
   * When provided, this overrides all default dropdown content rendering
   */
  renderDropdown?: (props: {
    options: DropdownOption[];
    filteredOptions: DropdownOption[];
    selectedOptions: DropdownOption[];
    searchValue: string;
    onOptionClick: (option: DropdownOption) => void;
    onSearchChange: (value: string) => void;
    onSelectAll: () => void;
    isOpen: boolean;
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    multiple: boolean;
    searchable: boolean;
    showSelectAll: boolean;
    groupBy: boolean;
    tokens: DropdownTokens;
  }) => React.ReactNode;
  /**
   * Maximum number of selected items to display
   */
  maxTagCount?: number;
  /**
   * Position of the dropdown (will auto-adjust based on available space)
   */
  placement?: 'bottom' | 'top' | 'auto';
  /**
   * Preferred horizontal alignment (will auto-adjust based on available space)
   */
  align?: 'left' | 'right' | 'auto';
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
  /**
   * Z-index for the dropdown menu
   */
  zIndex?: number;
  /**
   * Configuration for expanded menu that can be bigger than the trigger
   * When enabled, allows the menu to size itself naturally and uses smart positioning
   */
  expandedMenu?: {
    /**
     * Whether to enable expanded menu mode
     */
    enabled: boolean;
    /**
     * Minimum width for the expanded menu (optional)
     */
    minWidth?: number;
    /**
     * Minimum height for the expanded menu (optional)
     */
    minHeight?: number;
  };
  /**
   * Whether to enable tags rendering below the dropdown
   * When enabled, selected items will be displayed as tags below the trigger
   */
  enabletags?: boolean;
  /**
   * Configuration for tags display when enabletags is true
   */
  tagsConfig?: {
    /**
     * Maximum height for the tags container before scrolling
     */
    maxHeight?: string;
    /**
     * Size of the tags
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Visual variant of the tags
     */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    /**
     * Whether tags should wrap to next line or scroll
     */
    wrap?: boolean;
    /**
     * Maximum width for each tag label before truncation
     */
    labelMaxWidth?: string;
    /**
     * Whether to show tooltips on tags
     */
    showTooltip?: boolean;
    /**
     * Custom remove icon for tags
     */
    removeIcon?: React.ReactNode;
    /**
     * Callback when a tag is clicked (not the remove button)
     */
    onTagClick?: (option: DropdownOption) => void;
  };
} 