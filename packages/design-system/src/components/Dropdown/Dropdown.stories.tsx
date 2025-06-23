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
        component: 'A customizable dropdown component with single and multi-select capabilities, search functionality, and proper checkbox integration for enhanced UX.',
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

const skillOptions: DropdownOption[] = [
  { label: 'JavaScript', value: 'js', description: 'Programming Language' },
  { label: 'TypeScript', value: 'ts', description: 'Programming Language' },
  { label: 'React', value: 'react', description: 'Frontend Framework' },
  { label: 'Node.js', value: 'node', description: 'Runtime Environment' },
  { label: 'Python', value: 'python', description: 'Programming Language' },
  { label: 'Docker', value: 'docker', description: 'Containerization' },
  { label: 'AWS', value: 'aws', description: 'Cloud Platform' },
  { label: 'Git', value: 'git', description: 'Version Control' },
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

// New stories showcasing enhanced checkbox functionality
export const EnhancedMultiSelectWithSkills: Story = {
  render: DropdownWithState,
  args: {
    options: skillOptions,
    placeholder: 'Select your technical skills...',
    searchable: true,
    multiple: true,
    showSelectAll: true,
    clearable: true,
    maxTagCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the enhanced multi-select dropdown with proper CheckBox components integrated. Features include: small-sized checkboxes, indeterminate state for "Select All", individual option selection, and proper state management.',
      },
    },
  },
};

export const CheckboxSelectAllDemo: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<(string | number)[]>(['apple', 'banana']);

    return (
      <div style={{ width: '300px' }}>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>
          Select All with Indeterminate State
        </h4>
        <Dropdown
          options={groupedOptions}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value as (string | number)[])}
          placeholder="Select food items..."
          searchable={true}
          multiple={true}
          showSelectAll={true}
          clearable={true}
          groupBy={true}
        />
        <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <small>
            <strong>Selected ({selectedValue.length}):</strong>{' '}
            {selectedValue.length > 0 ? selectedValue.join(', ') : 'None'}
          </small>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the "Select All" checkbox functionality with proper indeterminate state when some (but not all) options are selected. The checkbox uses our design system CheckBox component with small size and primary color.',
      },
    },
  },
};

export const PartialSelectionDemo: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<(string | number)[]>(['js', 'react']);

    return (
      <div style={{ width: '320px' }}>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>
          Partial Selection State
        </h4>
        <Dropdown
          options={skillOptions}
          value={selectedSkills}
          onChange={(value) => setSelectedSkills(value as (string | number)[])}
          placeholder="Choose technical skills..."
          searchable={true}
          multiple={true}
          showSelectAll={true}
          clearable={true}
          maxTagCount={3}
        />
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Selection Status:</strong>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
            • Selected: {selectedSkills.length}/{skillOptions.length} skills<br/>
            • Select All state: {selectedSkills.length === 0 ? 'Unchecked' : selectedSkills.length === skillOptions.length ? 'Checked' : 'Indeterminate'}<br/>
            • Current: {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'None'}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the Select All checkbox properly shows indeterminate state when partially selected, and how individual checkboxes maintain their checked state independently.',
      },
    },
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