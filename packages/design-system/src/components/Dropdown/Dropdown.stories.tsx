import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { DropdownProps, DropdownOption } from './Dropdown.types';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable dropdown component with single and multi-select capabilities, search functionality, and more.',
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: 'Currently selected value(s)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when selection changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple selection is allowed',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to show search functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show clear button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicOptions: DropdownOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4 (Disabled)', value: 'option4', disabled: true },
];

const countryOptions: DropdownOption[] = [
  { label: 'United States', value: 'us', description: 'North America' },
  { label: 'Canada', value: 'ca', description: 'North America' },
  { label: 'United Kingdom', value: 'uk', description: 'Europe' },
  { label: 'France', value: 'fr', description: 'Europe' },
  { label: 'Germany', value: 'de', description: 'Europe' },
  { label: 'Japan', value: 'jp', description: 'Asia' },
  { label: 'Australia', value: 'au', description: 'Oceania' },
];

const groupedOptions: DropdownOption[] = [
  { label: 'Apple', value: 'apple', group: 'Fruits' },
  { label: 'Banana', value: 'banana', group: 'Fruits' },
  { label: 'Orange', value: 'orange', group: 'Fruits' },
  { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
  { label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
  { label: 'Spinach', value: 'spinach', group: 'Vegetables' },
];

const userOptions: DropdownOption[] = [
  { label: 'John Doe', value: 'john', description: 'Developer' },
  { label: 'Jane Smith', value: 'jane', description: 'Designer' },
  { label: 'Bob Johnson', value: 'bob', description: 'Manager' },
  { label: 'Alice Brown', value: 'alice', description: 'Product Manager' },
  { label: 'Charlie Wilson', value: 'charlie', description: 'QA Engineer' },
];

const DropdownWithState = (args: any) => {
  const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[] | undefined>(args.value);

  return (
    <div style={{ width: '300px' }}>
      <Dropdown
        {...args}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value);
          args.onChange?.(value);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
};

export const WithDefaultValue: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    value: 'option2',
    placeholder: 'Select an option',
  },
};

export const MultiSelect: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    multiple: true,
    placeholder: 'Select multiple options',
    showSelectAll: true,
  },
};

export const MultiSelectWithDefaults: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    multiple: true,
    value: ['option1', 'option2'],
    placeholder: 'Select multiple options',
    showSelectAll: true,
  },
};

export const Searchable: Story = {
  render: DropdownWithState,
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
    searchable: true,
  },
};

export const SearchableMultiSelect: Story = {
  render: DropdownWithState,
  args: {
    options: countryOptions,
    placeholder: 'Search and select countries...',
    searchable: true,
    multiple: true,
    showSelectAll: true,
  },
};

export const WithGroups: Story = {
  render: DropdownWithState,
  args: {
    options: groupedOptions,
    placeholder: 'Select food items',
    groupBy: true,
    searchable: true,
  },
};

export const WithGroupsMultiSelect: Story = {
  render: DropdownWithState,
  args: {
    options: groupedOptions,
    placeholder: 'Select food items',
    groupBy: true,
    searchable: true,
    multiple: true,
    showSelectAll: true,
  },
};

export const WithDescriptions: Story = {
  render: DropdownWithState,
  args: {
    options: userOptions,
    placeholder: 'Select a team member',
    searchable: true,
  },
};

export const WithIcons: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    placeholder: 'Filters',
    preIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5H21L15 12V18.5L9 16.5V12L3 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    postIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export const Disabled: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    placeholder: 'This dropdown is disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  render: DropdownWithState,
  args: {
    options: [],
    placeholder: 'Loading options...',
    loading: true,
  },
};

export const WithError: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    placeholder: 'This field has an error',
    error: true,
  },
};

export const Clearable: Story = {
  render: DropdownWithState,
  args: {
    options: basicOptions,
    placeholder: 'Select an option (clearable)',
    clearable: true,
    value: 'option1',
  },
};

export const LongList: Story = {
  render: DropdownWithState,
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
      description: i % 3 === 0 ? `This is option ${i + 1}` : undefined,
    })),
    placeholder: 'Select from 100 options',
    searchable: true,
  },
};

// Interactive demo with feature toggles
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[] | undefined>();
    const [multiple, setMultiple] = useState(false);
    const [searchable, setSearchable] = useState(false);
    const [clearable, setClearable] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [groupBy, setGroupBy] = useState(false);
    const [showSelectAll, setShowSelectAll] = useState(false);
    const [showPreIcon, setShowPreIcon] = useState(false);
    const [showPostIcon, setShowPostIcon] = useState(false);

    const handleChange = (value: string | number | (string | number)[]) => {
      setSelectedValue(value);
    };

    const getOptions = () => {
      return groupBy ? groupedOptions : countryOptions;
    };

    const resetValue = () => {
      setSelectedValue(multiple ? [] : undefined);
    };

    const handleMultipleChange = (checked: boolean) => {
      setMultiple(checked);
      resetValue();
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '500px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={multiple}
              onChange={(e) => handleMultipleChange(e.target.checked)}
            />
            Multiple
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={searchable}
              onChange={(e) => setSearchable(e.target.checked)}
            />
            Searchable
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={clearable}
              onChange={(e) => setClearable(e.target.checked)}
            />
            Clearable
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disabled
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
            />
            Loading
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={error}
              onChange={(e) => setError(e.target.checked)}
            />
            Error
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={groupBy}
              onChange={(e) => setGroupBy(e.target.checked)}
            />
            Group By
          </label>
                     {multiple && (
             <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
               <input
                 type="checkbox"
                 checked={showSelectAll}
                 onChange={(e) => setShowSelectAll(e.target.checked)}
               />
               Show Select All
             </label>
           )}
           <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
             <input
               type="checkbox"
               checked={showPreIcon}
               onChange={(e) => setShowPreIcon(e.target.checked)}
             />
             Pre Icon
           </label>
           <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
             <input
               type="checkbox"
               checked={showPostIcon}
               onChange={(e) => setShowPostIcon(e.target.checked)}
             />
             Post Icon
           </label>
          <button 
            onClick={resetValue}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset Value
          </button>
        </div>

                 <Dropdown
           options={getOptions()}
           value={selectedValue}
           onChange={handleChange}
           placeholder={`Try different combinations of features...`}
           multiple={multiple}
           searchable={searchable}
           clearable={clearable}
           disabled={disabled}
           loading={loading}
           error={error}
           groupBy={groupBy}
           showSelectAll={showSelectAll}
           preIcon={showPreIcon ? (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M3 4.5H21L15 12V18.5L9 16.5V12L3 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           ) : undefined}
           postIcon={showPostIcon ? (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           ) : undefined}
         />

        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <strong>Current value:</strong> {JSON.stringify(selectedValue)}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showcasing all dropdown features with toggleable options.',
      },
    },
  },
};

export const SmartPositioning: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | (string | number)[] | undefined>();
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '600px' }}>
        <h3>Smart Positioning Demo</h3>
        <p>These Dropdowns will automatically adjust their position based on available viewport space.</p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
          <div style={{ width: '200px' }}>
            <h4>Top Left (auto positioning)</h4>
            <Dropdown
              options={basicOptions}
              value={value}
              onChange={setValue}
              placement="auto"
              align="auto"
              placeholder="Auto position"
              searchable={true}
            />
          </div>
          
          <div style={{ width: '200px' }}>
            <h4>Top Right (right aligned)</h4>
            <Dropdown
              options={countryOptions.slice(0, 5)}
              value={value}
              onChange={setValue}
              placement="auto"
              align="right"
              placeholder="Right aligned"
              multiple={true}
              searchable={true}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '250px', display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
          <div style={{ width: '200px' }}>
            <h4>Bottom Left (forced top)</h4>
            <Dropdown
              options={basicOptions}
              value={value}
              onChange={setValue}
              placement="top"
              align="left"
              placeholder="Top placement"
              searchable={true}
            />
          </div>
          
          <div style={{ width: '200px' }}>
            <h4>Bottom Right (auto adjust)</h4>
            <Dropdown
              options={countryOptions}
              value={value}
              onChange={setValue}
              placement="auto"
              align="auto"
              placeholder="Auto adjust"
              searchable={true}
              groupBy={true}
            />
          </div>
        </div>
        
        <div style={{ height: '100px' }} />
        
        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0284c7' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}>
            🎯 Smart Positioning Features:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#0369a1' }}>
            <li><strong>Auto placement:</strong> Automatically chooses top/bottom based on available space</li>
            <li><strong>Auto alignment:</strong> Adjusts left/right alignment to stay within viewport</li>
            <li><strong>Responsive sizing:</strong> Constrains width/height when space is limited</li>
            <li><strong>Scroll awareness:</strong> Updates position on scroll events</li>
            <li><strong>Window resize:</strong> Recalculates position on window resize</li>
            <li><strong>Viewport constraints:</strong> Never extends outside the visible area</li>
          </ul>
        </div>
      </div>
         );
   },
 };

export const CustomDropdownView: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | (string | number)[] | undefined>();
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Custom Dropdown View</h3>
        <p>This example shows how to completely customize the dropdown content using the `renderDropdown` prop.</p>
        
        <div style={{ width: '300px' }}>
          <Dropdown
            options={countryOptions}
            value={value}
            onChange={setValue}
            placeholder="Select with custom view"
            renderDropdown={({ 
              filteredOptions, 
              selectedOptions, 
              searchValue, 
              onOptionClick, 
              onSearchChange,
              tokens 
            }) => (
              <div style={{ padding: '16px' }}>
                {/* Custom search */}
                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search countries..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>
                
                {/* Custom header */}
                <div style={{ 
                  marginBottom: '8px', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: tokens.disabledColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {filteredOptions.length} countries available
                </div>
                
                {/* Custom options list */}
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedOptions.some(s => s.value === option.value);
                    return (
                      <div
                        key={option.value}
                        onClick={() => onOptionClick(option)}
                        style={{
                          padding: '12px',
                          margin: '4px 0',
                          backgroundColor: isSelected ? tokens.primaryColorLight : 'transparent',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          border: `1px solid ${isSelected ? tokens.primaryColor : 'transparent'}`,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? tokens.primaryColor : tokens.borderColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {isSelected ? '✓' : ''}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', color: tokens.textColor }}>
                            {option.label}
                          </div>
                          {option.description && (
                            <div style={{ fontSize: '12px', color: tokens.disabledColor }}>
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {filteredOptions.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '24px', 
                    color: tokens.disabledColor,
                    fontStyle: 'italic'
                  }}>
                    No countries found matching "{searchValue}"
                  </div>
                )}
              </div>
            )}
          />
        </div>
        
        {value && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '6px',
            border: '1px solid #0284c7'
          }}>
            <strong>Selected:</strong> {JSON.stringify(value)}
          </div>
        )}
      </div>
    );
  },
};

export const CustomDropdownGrid: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | (string | number)[] | undefined>();
    
    const productOptions = [
      { value: 'laptop', label: 'Laptop', description: '$999', icon: '💻' },
      { value: 'phone', label: 'Smartphone', description: '$699', icon: '📱' },
      { value: 'tablet', label: 'Tablet', description: '$499', icon: '📱' },
      { value: 'watch', label: 'Smartwatch', description: '$299', icon: '⌚' },
      { value: 'headphones', label: 'Headphones', description: '$199', icon: '🎧' },
      { value: 'speaker', label: 'Smart Speaker', description: '$149', icon: '🔊' },
    ];
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Custom Grid Dropdown</h3>
        <p>This example shows a custom grid layout for product selection.</p>
        
        <div style={{ width: '300px' }}>
          <Dropdown
            options={productOptions}
            value={value}
            onChange={setValue}
            placeholder="Select products"
            multiple={true}
            renderDropdown={({ 
              filteredOptions, 
              selectedOptions, 
              onOptionClick,
              tokens 
            }) => (
              <div style={{ padding: '16px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '12px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedOptions.some(s => s.value === option.value);
                    return (
                      <div
                        key={option.value}
                        onClick={() => onOptionClick(option)}
                        style={{
                          padding: '16px',
                          backgroundColor: isSelected ? tokens.primaryColorLight : tokens.backgroundColor,
                          border: `2px solid ${isSelected ? tokens.primaryColor : tokens.borderColor}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '20px',
                            height: '20px',
                            backgroundColor: tokens.primaryColor,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            ✓
                          </div>
                        )}
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                          {option.icon}
                        </div>
                        <div style={{ 
                          fontWeight: '600', 
                          fontSize: '14px',
                          color: tokens.textColor,
                          marginBottom: '4px'
                        }}>
                          {option.label}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: tokens.primaryColor,
                          fontWeight: '500'
                        }}>
                          {option.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          />
        </div>
        
        {value && Array.isArray(value) && value.length > 0 && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '6px',
            border: '1px solid #0284c7'
          }}>
            <strong>Selected ({value.length}):</strong> {value.join(', ')}
          </div>
        )}
      </div>
    );
  },
}; 