import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { useSmartPosition } from '../../hooks/useSmartPosition';
import { DropdownProps, DropdownTokens, DropdownOption } from './Dropdown.types';
import { CheckBox } from '../CheckBox/CheckBox';
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
  DropdownIcon,
  DropdownChevron,
  DropdownClearButton,
  DropdownMenu,
  DropdownSearch,
  DropdownOptionsList,
  DropdownOption as StyledDropdownOption,
  DropdownOptionContent,
  DropdownOptionLabel,
  DropdownOptionDescription,
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
  preIcon,
  postIcon,
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
  renderDropdown,
  maxTagCount = 3,
  placement = 'auto',
  align = 'auto',
  zIndex = 1000,
  dropdownWidth,
  showSelectAll = false,
  groupBy = false,
}) => {
  const tokens = useTokens<DropdownTokens>('dropdown', defaultDropdownTokens);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Use smart positioning - use stable object reference
  const minSpaceRequired = useMemo(() => ({ width: 250, height: 200 }), []);
  const smartPosition = useSmartPosition(triggerRef, isOpen, {
    placement,
    align,
    minSpaceRequired
  });

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
  }, [isOpen]); // Removed onClose from dependencies

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

  const isOptionSelected = (option: DropdownOption): boolean => {
    return selectedValues.includes(option.value);
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

  const renderSelectedValue = () => {
    if (renderValue && selectedOptions.length > 0) {
      return renderValue(selectedOptions);
    }

    if (selectedValues.length === 0) {
      return (
        <DropdownPlaceholder tokens={tokens}>
          {placeholder}
        </DropdownPlaceholder>
      );
    }

    if (!multiple) {
      const option = selectedOptions[0];
      return option ? (
        <DropdownValue tokens={tokens}>
          {option.icon && (
            <span style={{ marginRight: '8px' }}>
              {option.icon}
            </span>
          )}
          {option.label}
        </DropdownValue>
      ) : null;
    }

    // Multiple selection - show tags
    const visibleOptions = selectedOptions.slice(0, maxTagCount);
    const remainingCount = Math.max(0, selectedOptions.length - maxTagCount);

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
          <CheckBox
            variant="checkbox"
            size="small"
            color="primary"
            checked={isSelected}
            disabled={option.disabled}
            onChange={() => {}} // Handled by parent click
          />
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
      const someSelected = allFilteredValues.some(val => selectedValues.includes(val));
      const indeterminate = someSelected && !allSelected;

      content.push(
        <DropdownSelectAll
          key="select-all"
          tokens={tokens}
          onClick={handleSelectAll}
        >
          <CheckBox
            variant="checkbox"
            size="small"
            color="primary"
            checked={allSelected}
            indeterminate={indeterminate}
            onChange={() => {}} // Handled by parent click
          />
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
        ref={triggerRef}
        tokens={tokens}
        isOpen={isOpen}
        disabled={disabled}
        error={error}
        onClick={handleTriggerClick}
      >
        {preIcon && (
          <DropdownIcon tokens={tokens} position="pre">
            {preIcon}
          </DropdownIcon>
        )}
        <DropdownTriggerContent>
          {renderSelectedValue()}
        </DropdownTriggerContent>
        {postIcon && (
          <DropdownIcon tokens={tokens} position="post">
            {postIcon}
          </DropdownIcon>
        )}
        
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </DropdownChevron>
        </div>
      </DropdownTrigger>

      <DropdownMenu
        tokens={tokens}
        isOpen={isOpen}
        $placement={smartPosition.placement}
        $align={smartPosition.align}
        $zIndex={zIndex}
        width={dropdownWidth}
        style={smartPosition.adjustments}
      >
        {renderDropdown ? (
          renderDropdown({
            options,
            filteredOptions,
            selectedOptions,
            searchValue,
            onOptionClick: handleOptionClick,
            onSearchChange: (value: string) => {
              setSearchValue(value);
              onSearch?.(value);
            },
            onSelectAll: handleSelectAll,
            isOpen,
            loading,
            error,
            errorMessage,
            multiple,
            searchable,
            showSelectAll,
            groupBy,
            tokens,
          })
        ) : (
          <>
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
          </>
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};