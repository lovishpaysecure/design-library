import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DropdownProps, DropdownConfig, DropdownTokens, DropdownOption, PaginationConfig } from './Dropdown.types';
import { useTokens } from '../../hooks/useTokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';
import {
  StyledDropdownWrapper,
  StyledLabel,
  StyledDropdownContainer,
  StyledInputContainer,
  StyledDropdownInput,
  StyledDropdownIcon,
  StyledDropdownList,
  StyledDropdownItem,
  StyledChipsContainer,
  StyledChip,
  StyledChipRemove,
  StyledCheckbox,
  StyledError,
  RequiredIndicator
} from '../../styles/Dropdown.styles';

const defaultConfig: Required<Omit<DropdownConfig, 'loadOptions' | 'renderOption' | 'search' | 'pagination'>> = {
  label: '',
  placeholder: 'Select an option',
  searchable: true,
  clearable: false,
  disabled: false,
  loading: false,
  multiselect: false,
  noOptionsMessage: 'No options available',
  loadingMessage: 'Loading...',
  maxSelectedItems: Infinity,
  error: false,
  required: false
};

const defaultTokens: DropdownTokens = {
  base: {
    background: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderRadius: '8px',
    textColor: '#333333',
    fontSize: '14px',
    padding: '12px 16px',
    height: '44px'
  },
  states: {
    hover: {
      borderColor: '#999999'
    },
    focus: {
      borderColor: '#0066FF',
      shadow: '0 0 0 2px rgba(0, 102, 255, 0.2)'
    },
    disabled: {
      background: '#F5F5F5',
      textColor: '#999999'
    },
    error: {
      borderColor: '#FF4D4D',
      textColor: '#FF4D4D',
      shadow: '0 0 0 2px rgba(255, 77, 77, 0.2)'
    }
  },
  label: {
    color: '#333333',
    fontSize: '14px',
    margin: '0 0 8px 0'
  },
  placeholder: {
    color: '#999999'
  },
  icon: {
    color: '#666666',
    size: '12px'
  },
  menu: {
    background: '#FFFFFF',
    borderColor: '#E5E5E5',
    shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxHeight: '200px'
  },
  item: {
    padding: '12px 16px',
    states: {
      hover: {
        background: '#F5F5F5'
      },
      selected: {
        background: '#E5E5E5'
      }
    }
  },
  chip: {
    background: '#F0F0F0',
    textColor: '#333333',
    borderColor: '#E0E0E0',
    margin: '0 4px 4px 0'
  }
};

export const Dropdown = React.forwardRef<HTMLInputElement, DropdownProps>(
  ({ 
    value,
    onChange,
    onBlur,
    onSearch,
    onLoadMore,
    options = [],
    config: userConfig,
    fullWidth = false,
    tokens: tokensProp,
    ...props
  }, ref) => {
    const config = { ...defaultConfig, ...userConfig };
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiOptions, setApiOptions] = useState<DropdownOption[]>([]);
    const [pagination, setPagination] = useState<PaginationConfig | undefined>(config.pagination);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const finalRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    const tokens = useTokens<DropdownTokens>('dropdown', defaultTokens);
    const finalTokens = tokensProp || tokens;

    const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);
    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));
    
    const displayValue = config.multiselect
      ? inputValue
      : (isOpen ? inputValue : (selectedOptions[0]?.label || ''));

    // Determine which options to show based on search mode
    const getFilteredOptions = useCallback(() => {
      if (!config.search || config.search.mode === 'local') {
        return config.searchable 
          ? options.filter(option =>
              option.label.toLowerCase().includes(inputValue.toLowerCase()))
          : options;
      }
      return apiOptions;
    }, [config.search, config.searchable, options, apiOptions, inputValue]);

    const filteredOptions = getFilteredOptions();

    // API-based search with debounce
    const debouncedSearch = useCallback(
      debounce(async (searchTerm: string) => {
        if (!config.loadOptions) return;
        
        setIsLoading(true);
        try {
          const result = await config.loadOptions(searchTerm, pagination);
          setApiOptions(result.options);
          setPagination(result.pagination);
        } catch (error) {
          console.error('Error loading options:', error);
        } finally {
          setIsLoading(false);
        }
      }, config.search?.debounceMs || 300),
      [config.loadOptions, pagination]
    );

    // Handle scroll for pagination
    useEffect(() => {
      const listElement = listRef.current;
      if (!listElement || !config.pagination || !onLoadMore) return;

      const handleScroll = () => {
        if (
          listElement.scrollHeight - listElement.scrollTop === listElement.clientHeight &&
          !isLoading &&
          pagination?.currentPage && 
          pagination.totalItems &&
          pagination.currentPage * pagination.pageSize < pagination.totalItems
        ) {
          onLoadMore();
        }
      };

      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }, [config.pagination, onLoadMore, isLoading, pagination]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          if (config.searchable) {
            setInputValue('');
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [config.searchable]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!config.searchable) return;
      
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);

      // Handle search based on configuration
      if (config.search?.mode === 'api' || config.search?.mode === 'both') {
        if (newValue.length >= (config.search.minChars || 0)) {
          debouncedSearch(newValue);
        } else {
          setApiOptions([]);
        }
      }

      if (onSearch) {
        onSearch(newValue);
      }
    };

    const handleInputClick = () => {
      if (!config.disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setInputValue('');
        }
      }
    };

    const handleOptionClick = (selectedValue: string) => {
      if (!onChange) return;

      if (config.multiselect) {
        const newValues = selectedValues.includes(selectedValue)
          ? selectedValues.filter(v => v !== selectedValue)
          : [...selectedValues, selectedValue];

        if (newValues.length <= (config.maxSelectedItems || Infinity)) {
          onChange(newValues);
        }
      } else {
        onChange(selectedValue);
        setIsOpen(false);
        setInputValue('');
      }
    };

    const handleChipRemove = (valueToRemove: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onChange && config.multiselect) {
        const newValues = selectedValues.filter(v => v !== valueToRemove);
        onChange(newValues);
      }
    };

    const renderOption = (option: DropdownOption) => {
      const isSelected = selectedValues.includes(option.value);
      const isDisabled = option.disabled || config.disabled;

      return (
        <StyledDropdownItem
          key={option.value}
          $isSelected={isSelected}
          $disabled={isDisabled}
          onClick={() => !isDisabled && handleOptionClick(option.value)}
        >
          {config.multiselect && (
            <StyledCheckbox $isSelected={isSelected}>
              {isSelected && (
                <FontAwesomeIcon 
                  icon={faCheck} 
                  size="xs" 
                  style={{ width: '12px', height: '12px', display: 'block' }} 
                />
              )}
            </StyledCheckbox>
          )}
          {config.renderOption ? config.renderOption(option) : option.label}
        </StyledDropdownItem>
      );
    };

    const renderContent = () => {
      if (config.loading || isLoading) {
        return (
          <StyledDropdownItem>
            <FontAwesomeIcon icon={faSpinner} spin />
            <span style={{ marginLeft: '8px' }}>{config.loadingMessage}</span>
          </StyledDropdownItem>
        );
      }

      if (filteredOptions.length === 0) {
        return (
          <StyledDropdownItem>
            {config.noOptionsMessage}
          </StyledDropdownItem>
        );
      }

      return filteredOptions.map(renderOption);
    };

    // Apply tokens as CSS variables for better performance
    const setCSSVar = (prefix: string, obj: Record<string, any>, parent = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const varName = parent ? `${prefix}-${parent}-${key}` : `${prefix}-${key}`;
        if (typeof value === 'object') {
          setCSSVar(prefix, value, key);
        } else {
          document.documentElement.style.setProperty(`--${varName}`, value);
        }
      });
    };

    useEffect(() => {
      if (finalTokens) {
        setCSSVar('dropdown', finalTokens);
        // Set focus state color for checkbox
        document.documentElement.style.setProperty(
          '--dropdown-states-focus-borderColor',
          finalTokens.states.focus.borderColor
        );
      }
    }, [finalTokens]);

    return (
      <div ref={containerRef} className="dropdown-container" style={{ width: fullWidth ? '100%' : 'auto' }}>
        {config.label && (
          <StyledLabel>
            {config.label}
            {config.required && <RequiredIndicator>*</RequiredIndicator>}
          </StyledLabel>
        )}
        <StyledDropdownWrapper $fullWidth={fullWidth}>
          <StyledDropdownContainer 
            ref={containerRef} 
            $isOpen={isOpen} 
            $fullWidth={fullWidth}
            $hasError={!!config.error}
            $isDisabled={!!config.disabled}
            aria-required={config.required}
            aria-invalid={!!config.error}
          >
            <StyledInputContainer $hasError={!!config.error}>
              <StyledDropdownInput
                ref={finalRef}
                type="text"
                value={displayValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onBlur={onBlur}
                placeholder={config.placeholder}
                disabled={config.disabled}
                readOnly={!config.searchable}
                {...props}
              />
              <StyledDropdownIcon $isOpen={isOpen}>
                {config.loading || isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </StyledDropdownIcon>
            </StyledInputContainer>
            {config.multiselect && selectedOptions.length > 0 && (
              <StyledChipsContainer>
                {selectedOptions.map(option => (
                  <StyledChip key={option.value}>
                    {option.label}
                    <StyledChipRemove
                      onClick={(e) => handleChipRemove(option.value, e)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </StyledChipRemove>
                  </StyledChip>
                ))}
              </StyledChipsContainer>
            )}
            {isOpen && (
              <StyledDropdownList 
                ref={listRef}
                $isOpen={isOpen}
              >
                {renderContent()}
              </StyledDropdownList>
            )}
          </StyledDropdownContainer>
          {config.error && typeof config.error === 'string' && (
            <StyledError>{config.error}</StyledError>
          )}
        </StyledDropdownWrapper>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';