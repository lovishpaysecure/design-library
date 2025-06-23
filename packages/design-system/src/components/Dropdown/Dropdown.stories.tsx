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