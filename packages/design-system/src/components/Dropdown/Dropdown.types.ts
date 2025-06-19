import React from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  data?: any; // Additional data that can be passed with the option
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
  base: {
    background: string;
    borderColor: string;
    borderRadius: string;
    textColor: string;
    fontSize: string;
    padding: string;
    height: string;
  };
  states: {
    hover: {
      borderColor: string;
    };
    focus: {
      borderColor: string;
      shadow: string;
    };
    disabled: {
      background: string;
      textColor: string;
    };
    error: {
      borderColor: string;
      textColor: string;
      shadow: string;
    };
  };
  label: {
    color: string;
    fontSize: string;
    margin: string;
  };
  placeholder: {
    color: string;
  };
  icon: {
    color: string;
    size: string;
  };
  menu: {
    background: string;
    borderColor: string;
    shadow: string;
    maxHeight: string;
  };
  item: {
    padding: string;
    states: {
      hover: {
        background: string;
      };
      selected: {
        background: string;
      };
    };
  };
  chip: {
    background: string;
    textColor: string;
    borderColor: string;
    margin: string;
  };
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

export interface DropdownProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onLoadMore?: () => void;
  options?: DropdownOption[];
  config?: DropdownConfig;
  fullWidth?: boolean;
  tokens?: DropdownTokens;
} 