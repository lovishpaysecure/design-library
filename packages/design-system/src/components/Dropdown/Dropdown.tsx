import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { DropdownProps, DropdownTokens, DropdownOption } from './Dropdown.types';
import { defaultDropdownTokens } from './Dropdown.tokens';
import {
  DropdownContainer,
  DropdownTrigger,
  DropdownTriggerContent,
  DropdownPlaceholder,
  DropdownValue,
  DropdownTag,
  DropdownTagText,
  DropdownTagRemove,
  DropdownChevron,
  DropdownClearButton,
  DropdownMenu,
  DropdownSearch,
  DropdownOptionsList,
  DropdownOption as StyledDropdownOption,
  DropdownOptionContent,
  DropdownOptionLabel,
  DropdownOptionDescription,
  DropdownCheckbox,
  DropdownDivider,
  DropdownGroup,
  DropdownGroupLabel,
  DropdownLoadingSpinner,
  DropdownError,
  DropdownSelectAll,
} from './Dropdown.styles';

const defaultFilterOption = (option: DropdownOption, searchValue: string): boolean => {
  if (!searchValue) return true;
  const search = searchValue.toLowerCase();
  return (
    option.label.toLowerCase().includes(search) ||
    Boolean(option.description && option.description.toLowerCase().includes(search))
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  multiple = false,
  searchable = false,
  searchPlaceholder = "Search...",
  clearable = false,
  loading = false,
  error = false,
  errorMessage,
  className,
  style,
  onOpen,
  onClose,
  onSearch,
  filterOption = defaultFilterOption,
  renderOption,
  renderValue,
  maxTagCount = 3,
  placement = 'bottom',
  dropdownWidth,
  showSelectAll = false,
  groupBy = false,
}) => {
  const tokens = useTokens<DropdownTokens>('dropdown', defaultDropdownTokens);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize value to array for easier handling
  const selectedValues = useMemo(() => {
    if (value === undefined || value === null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    return options.filter(option => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option => filterOption(option, searchValue));
  }, [options, searchValue, filterOption]);

  // Group options if needed
  const groupedOptions = useMemo(() => {
    if (groupBy !== true) return { ungrouped: filteredOptions };
    
    const groups: Record<string, DropdownOption[]> = {};
    filteredOptions.forEach(option => {
      const group = option.group || 'ungrouped';
      if (!groups[group]) groups[group] = [];
      groups[group].push(option);
    });
    return groups;
  }, [filteredOptions, groupBy]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleTriggerClick = () => {
    if (disabled || loading) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;

    let newValue: string | number | (string | number)[];

    if (multiple) {
      const currentValues = selectedValues;
      if (currentValues.includes(option.value)) {
        newValue = currentValues.filter(v => v !== option.value);
      } else {
        newValue = [...currentValues, option.value];
      }
    } else {
      newValue = option.value;
      setIsOpen(false);
      onClose?.();
    }

    onChange?.(newValue);
  };

  const handleSelectAll = () => {
    if (!multiple) return;
    
    const allValues = filteredOptions
      .filter(option => !option.disabled)
      .map(option => option.value);
    
    const allSelected = allValues.every(val => selectedValues.includes(val));
    
    if (allSelected) {
      // Deselect all
      onChange?.(selectedValues.filter(val => !allValues.includes(val)));
    } else {
      // Select all
      const newValues = [...new Set([...selectedValues, ...allValues])];
      onChange?.(newValues);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null as any);
  };

  const handleTagRemove = (valueToRemove: string | number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!multiple) return;
    
    const newValues = selectedValues.filter(v => v !== valueToRemove);
    onChange?.(newValues);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const isOptionSelected = (option: DropdownOption): boolean => {
    return selectedValues.includes(option.value);
  };

  const renderSelectedValue = () => {
    if (renderValue) {
      return renderValue(selectedOptions);
    }

    if (selectedOptions.length === 0) {
      return (
        <DropdownPlaceholder tokens={tokens}>
          {placeholder}
        </DropdownPlaceholder>
      );
    }

    if (!multiple) {
      return (
        <DropdownValue tokens={tokens}>
          {selectedOptions[0]?.label}
        </DropdownValue>
      );
    }

    // Multiple selection - show tags
    const visibleOptions = selectedOptions.slice(0, maxTagCount);
    const remainingCount = selectedOptions.length - maxTagCount;

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
        {visibleOptions.map(option => (
          <DropdownTag key={option.value} tokens={tokens}>
            <DropdownTagText tokens={tokens}>
              {option.label}
            </DropdownTagText>
            <DropdownTagRemove
              tokens={tokens}
              onClick={(e) => handleTagRemove(option.value, e)}
            >
              ×
            </DropdownTagRemove>
          </DropdownTag>
        ))}
        {remainingCount > 0 && (
          <DropdownTag tokens={tokens}>
            <DropdownTagText tokens={tokens}>
              +{remainingCount} more
            </DropdownTagText>
          </DropdownTag>
        )}
      </div>
    );
  };

  const renderOptionContent = (option: DropdownOption, isSelected: boolean) => {
    if (renderOption) {
      return renderOption(option, isSelected);
    }

    return (
      <DropdownOptionContent>
        {multiple && (
          <DropdownCheckbox
            tokens={tokens}
            checked={isSelected}
          >
            {isSelected && '✓'}
          </DropdownCheckbox>
        )}
        {option.icon && (
          <span style={{ marginRight: '8px' }}>
            {option.icon}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <DropdownOptionLabel tokens={tokens}>
            {option.label}
          </DropdownOptionLabel>
          {option.description && (
            <DropdownOptionDescription tokens={tokens}>
              {option.description}
            </DropdownOptionDescription>
          )}
        </div>
      </DropdownOptionContent>
    );
  };

  const renderOptions = () => {
    if (loading) {
      return (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <DropdownLoadingSpinner tokens={tokens}>
            Loading...
          </DropdownLoadingSpinner>
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <div style={{ padding: '16px', textAlign: 'center', color: tokens.disabledColor }}>
          No options found
        </div>
      );
    }

    const content = [];

    // Select All option for multiple selection
    if (multiple && showSelectAll && filteredOptions.length > 1) {
      const allFilteredValues = filteredOptions
        .filter(option => !option.disabled)
        .map(option => option.value);
      const allSelected = allFilteredValues.length > 0 && 
        allFilteredValues.every(val => selectedValues.includes(val));

      content.push(
        <DropdownSelectAll
          key="select-all"
          tokens={tokens}
          onClick={handleSelectAll}
        >
          <DropdownCheckbox tokens={tokens} checked={allSelected}>
            {allSelected && '✓'}
          </DropdownCheckbox>
          <span>Select All</span>
        </DropdownSelectAll>
      );
      content.push(<DropdownDivider key="divider" tokens={tokens} />);
    }

    // Render grouped or ungrouped options
    Object.entries(groupedOptions).forEach(([groupName, groupOptions]) => {
      if (groupBy === true && groupName !== 'ungrouped') {
        content.push(
          <DropdownGroup key={groupName}>
            <DropdownGroupLabel tokens={tokens}>
              {groupName}
            </DropdownGroupLabel>
          </DropdownGroup>
        );
      }

      groupOptions.forEach(option => {
        const isSelected = isOptionSelected(option);
        content.push(
          <StyledDropdownOption
            key={option.value}
            tokens={tokens}
            isSelected={isSelected}
            disabled={option.disabled}
            onClick={() => handleOptionClick(option)}
          >
            {renderOptionContent(option, isSelected)}
          </StyledDropdownOption>
        );
      });
    });

    return content;
  };

  const showClearButton = clearable && selectedValues.length > 0 && !disabled;

  return (
    <DropdownContainer ref={containerRef} className={className} style={style}>
      <DropdownTrigger
        tokens={tokens}
        isOpen={isOpen}
        disabled={disabled}
        error={error}
        onClick={handleTriggerClick}
      >
        <DropdownTriggerContent>
          {renderSelectedValue()}
        </DropdownTriggerContent>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {showClearButton && (
            <DropdownClearButton
              tokens={tokens}
              onClick={handleClear}
            >
              ×
            </DropdownClearButton>
          )}
          <DropdownChevron tokens={tokens} isOpen={isOpen}>
            ▼
          </DropdownChevron>
        </div>
      </DropdownTrigger>

      <DropdownMenu
        tokens={tokens}
        isOpen={isOpen}
        placement={placement}
        width={dropdownWidth}
      >
        {searchable && (
          <>
            <DropdownSearch
              ref={searchInputRef}
              tokens={tokens}
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
            />
            <DropdownDivider tokens={tokens} />
          </>
        )}

        {error && errorMessage && (
          <>
            <DropdownError tokens={tokens}>
              {errorMessage}
            </DropdownError>
            <DropdownDivider tokens={tokens} />
          </>
        )}

        <DropdownOptionsList tokens={tokens}>
          {renderOptions()}
        </DropdownOptionsList>
      </DropdownMenu>
    </DropdownContainer>
  );
};