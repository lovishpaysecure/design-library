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
    const [selectedValue, setSelectedValue] = useState<(string | number)[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>
          Enhanced Select All Behavior
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
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Select All Behavior:</strong>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            • <strong>Empty checkbox:</strong> No items or some items selected<br/>
            • <strong>"-" icon:</strong> Only when ALL items are selected<br/>
            • <strong>Selected:</strong> {selectedValue.length}/{groupedOptions.length} items<br/>
            • <strong>Current:</strong> {selectedValue.length > 0 ? selectedValue.join(', ') : 'None'}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the enhanced "Select All" checkbox behavior where the "-" icon only appears when ALL items are selected, not for partial selections. Empty checkbox shows for no selection or partial selection.',
      },
    },
  },
};

export const PartialSelectionDemo: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<(string | number)[]>(['js', 'react']);

    const getSelectAllState = () => {
      if (selectedSkills.length === 0) return 'Empty checkbox - No items selected';
      if (selectedSkills.length === skillOptions.length) return '"-" icon - All items selected';
      return 'Empty checkbox - Partial selection';
    };

    return (
      <div style={{ width: '320px' }}>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>
          Select All States Demo
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
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            • <strong>Selected:</strong> {selectedSkills.length}/{skillOptions.length} skills<br/>
            • <strong>Select All shows:</strong> {getSelectAllState()}<br/>
            • <strong>Current items:</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'None'}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the new Select All behavior where "-" icon only appears when ALL items are selected. Partial selections show an empty checkbox, maintaining consistent behavior with the enhanced CheckBox component.',
      },
    },
  },
};

export const EnhancedSelectAllWorkflow: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

    const handleReset = () => setSelectedItems([]);
    const handleSelectHalf = () => setSelectedItems(['apple', 'banana', 'carrot']);
    const handleSelectAll = () => setSelectedItems(groupedOptions.map(opt => opt.value));

    const getSelectAllDescription = () => {
      if (selectedItems.length === 0) return 'Empty - Click "Select All" to select all items';
      if (selectedItems.length === groupedOptions.length) return 'Shows "-" - All items selected';
      return `Empty - ${selectedItems.length} of ${groupedOptions.length} selected`;
    };

    return (
      <div style={{ width: '350px' }}>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>
          Enhanced Select All Workflow
        </h4>
        
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={handleReset} style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Reset
          </button>
          <button onClick={handleSelectHalf} style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Select Half
          </button>
          <button onClick={handleSelectAll} style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Select All
          </button>
        </div>

        <Dropdown
          options={groupedOptions}
          value={selectedItems}
          onChange={(value) => setSelectedItems(value as (string | number)[])}
          placeholder="Try the Select All behavior..."
          searchable={true}
          multiple={true}
          showSelectAll={true}
          clearable={true}
          groupBy={true}
        />
        
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#e8f4fd', borderRadius: '6px', border: '1px solid #b3d9f7' }}>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <strong>Select All Checkbox:</strong> {getSelectAllDescription()}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the complete Select All workflow. Use the buttons to test different states and observe how the Select All checkbox behaves: empty for no/partial selection, "-" icon only when all items are selected.',
      },
    },
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
  render: (args) => {
    const [value, setValue] = useState<string | number | (string | number)[] | undefined>(undefined);
    
    const DemoFilterPanel = ({ title, description }: { title: string; description: string }) => (
      <div style={{ 
        padding: '20px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '400px',
        maxWidth: '500px',
      }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{description}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Categories</label>
            <Dropdown
              options={[
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'books', label: 'Books' },
                { value: 'home', label: 'Home & Garden' }
              ]}
              placeholder="Select categories"
              multiple
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price Range</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" 
                placeholder="Min"
                style={{ 
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  width: '100px',
                  fontSize: '14px'
                }}
              />
              <span style={{ alignSelf: 'center', color: '#666' }}>-</span>
              <input 
                type="number" 
                placeholder="Max"
                style={{ 
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  width: '100px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  {rating}★+
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          <button
            style={{
              padding: '8px 16px',
              background: '#5223BC',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Apply Filters
          </button>
          <button
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );

    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', minHeight: '1000px' }}>
        <div>
          <h3>Smart Positioning with Expanded Menu</h3>
          <p>These expanded dropdown menus will automatically adjust their position based on available viewport space.</p>
        </div>
        
        {/* Row 1: Auto positioning (top area) */}
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <h4>Top Left - Auto/Auto</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Auto placement & alignment</p>
            <Dropdown
              options={[]}
              placeholder="Auto position"
              renderDropdown={() => <DemoFilterPanel title="Auto/Auto" description="Smart positioning adjusts based on viewport space" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="auto"
              align="auto"
            />
          </div>
          
          <div style={{ flex: 1, textAlign: 'right' }}>
            <h4>Top Right - Auto/Right</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Auto placement, right aligned</p>
            <Dropdown
              options={[]}
              placeholder="Right aligned"
              renderDropdown={() => <DemoFilterPanel title="Auto/Right" description="Right aligned with smart vertical positioning" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="auto"
              align="right"
            />
          </div>
        </div>
        
        {/* Row 2: Bottom placement (middle area) */}
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'space-between', marginTop: '150px' }}>
          <div style={{ flex: 1 }}>
            <h4>Middle Left - Bottom/Left</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Force bottom, left aligned</p>
            <Dropdown
              options={[]}
              placeholder="Bottom left"
              renderDropdown={() => <DemoFilterPanel title="Bottom/Left" description="Forced bottom placement with left alignment" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="bottom"
              align="left"
            />
          </div>
          
          <div style={{ flex: 1, textAlign: 'right' }}>
            <h4>Middle Right - Bottom/Right</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Force bottom, right aligned</p>
            <Dropdown
              options={[]}
              placeholder="Bottom right"
              renderDropdown={() => <DemoFilterPanel title="Bottom/Right" description="Forced bottom placement with right alignment" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="bottom"
              align="right"
            />
          </div>
        </div>
        
        {/* Row 3: Top placement (bottom area) */}
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'space-between', marginTop: '200px' }}>
          <div style={{ flex: 1 }}>
            <h4>Bottom Left - Top/Left</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Force top, left aligned</p>
            <Dropdown
              options={[]}
              placeholder="Top left"
              renderDropdown={() => <DemoFilterPanel title="Top/Left" description="Forced top placement with left alignment" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="top"
              align="left"
            />
          </div>
          
          <div style={{ flex: 1, textAlign: 'right' }}>
            <h4>Bottom Right - Top/Right</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 8px 0' }}>Force top, right aligned</p>
            <Dropdown
              options={[]}
              placeholder="Top right"
              renderDropdown={() => <DemoFilterPanel title="Top/Right" description="Forced top placement with right alignment" />}
              expandedMenu={{
                enabled: true,
                minWidth: 400,
                minHeight: 300
              }}
              placement="top"
              align="right"
            />
          </div>
        </div>
        
        <div style={{ height: '100px' }} />
        
        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0284c7' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}>
            🎯 All Smart Positioning Combinations:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#0284c7' }}>Placement Options:</h5>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#0369a1' }}>
                <li><strong>auto:</strong> Smart vertical positioning</li>
                <li><strong>top:</strong> Force menu above trigger</li>
                <li><strong>bottom:</strong> Force menu below trigger</li>
              </ul>
            </div>
            <div>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#0284c7' }}>Alignment Options:</h5>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#0369a1' }}>
                <li><strong>auto:</strong> Smart horizontal positioning</li>
                <li><strong>left:</strong> Align menu to left edge</li>
                <li><strong>right:</strong> Align menu to right edge</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#e0f2fe', borderRadius: '4px' }}>
            <p style={{ margin: 0, fontSize: '11px', color: '#0369a1' }}>
              💡 <strong>Smart Features:</strong> Auto placement chooses top/bottom based on space. Auto alignment adjusts left/right to stay in viewport. 
              Expanded menus respect minimum dimensions while adapting to content size.
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all smart positioning combinations with expanded menus. Shows how the dropdown automatically adjusts placement (top/bottom) and alignment (left/center/right) based on viewport constraints, following the same pattern as the DatePicker component.',
      },
    },
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

const FilterPanel = () => {
  return (
    <div style={{ 
      padding: '20px',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>Filter Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Categories</label>
            <Dropdown
              options={[
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'books', label: 'Books' }
              ]}
              placeholder="Select categories"
              multiple
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Price Range</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" 
                placeholder="Min"
                style={{ 
                  padding: '8px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  width: '100px'
                }}
              />
              <input 
                type="number" 
                placeholder="Max"
                style={{ 
                  padding: '8px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  width: '100px'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Rating</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button
          style={{
            padding: '8px 16px',
            background: '#5223BC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
        <button
          style={{
            padding: '8px 16px',
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};



export const ExpandedMenuVariants: Story = {
  render: () => {
    const [menuVariant, setMenuVariant] = useState<'small' | 'large' | 'auto'>('large');
    
    const menuConfigs = {
      small: {
        enabled: true,
        minWidth: 350,
        minHeight: 250
      },
      large: {
        enabled: true,
        minWidth: 500,
        minHeight: 400
      },
      auto: {
        enabled: true,
        minWidth: undefined,
        minHeight: undefined
        // No min dimensions - let content determine size
      }
    };

    const DynamicPanel = ({ position }: { position: string }) => (
      <div style={{ 
        padding: '20px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        // Natural content size for 'auto' variant
        ...(menuVariant === 'auto' && {
          minWidth: '350px',
          maxWidth: '500px',
        })
      }}>
        <h4 style={{ margin: 0 }}>Smart Positioned Menu ({position})</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Current variant: <strong>{menuVariant}</strong>
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong>Min Width:</strong> {menuConfigs[menuVariant].minWidth || 'Auto'}
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong>Min Height:</strong> {menuConfigs[menuVariant].minHeight || 'Auto'}
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong>Position:</strong> {position}
          </div>
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong>Viewport Safe:</strong> Yes
          </div>
        </div>
        
        {/* Dynamic content based on variant */}
        {menuVariant === 'auto' && (
          <div style={{ padding: '12px', background: '#e3f2fd', borderRadius: '6px' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              🎯 <strong>Auto-sizing:</strong> No minimum dimensions set. Content determines size naturally.
            </p>
          </div>
        )}
        
        {menuVariant === 'large' && (
          <div style={{ padding: '12px', background: '#f3e5f5', borderRadius: '6px' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              📐 <strong>Large preset:</strong> Minimum 500×400px. Great for complex content.
            </p>
          </div>
        )}
        
        {menuVariant === 'small' && (
          <div style={{ padding: '12px', background: '#fff3e0', borderRadius: '6px' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              📱 <strong>Small preset:</strong> Minimum 350×250px. Perfect for compact interfaces.
            </p>
          </div>
        )}

        <div style={{ 
          padding: '12px', 
          background: position === 'Right Side' ? '#e8f5e8' : '#fff3e0', 
          borderRadius: '6px' 
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {position === 'Right Side' ? (
              <>🔄 <strong>Right-aligned:</strong> Menu opens to the left to stay in viewport.</>
            ) : (
              <>🔄 <strong>Left-aligned:</strong> Menu opens to the right with available space.</>
            )}
          </p>
        </div>
      </div>
    );

    return (
      <div style={{ 
        padding: '40px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px',
        width: '100%',
        minHeight: '600px'
      }}>
        {/* Header with controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0' }}>Smart Positioning - Left & Right Examples</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Dropdowns automatically adjust their alignment based on available viewport space
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(menuConfigs).map((key) => (
              <button
                key={key}
                onClick={() => setMenuVariant(key as keyof typeof menuConfigs)}
                style={{
                  padding: '8px 12px',
                  background: menuVariant === key ? '#5223BC' : 'white',
                  color: menuVariant === key ? 'white' : '#333',
                  border: '1px solid #5223BC',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '14px'
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Left and Right positioned dropdowns */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          width: '100%',
          gap: '40px'
        }}>
          {/* Left side - opens to the right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>Left Side Trigger</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
                Opens to the right (default behavior)
              </p>
            </div>
            <Dropdown
              options={[]}
              placeholder="Open from Left"
              renderDropdown={() => <DynamicPanel position="Left Side" />}
              expandedMenu={menuConfigs[menuVariant]}
              placement="auto"
              align="auto"
            />
          </div>

          {/* Right side - opens to the left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Right Side Trigger</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
                Smart positioning opens to the left
              </p>
            </div>
            <Dropdown
              options={[]}
              placeholder="Open from Right"
              renderDropdown={() => <DynamicPanel position="Right Side" />}
              expandedMenu={menuConfigs[menuVariant]}
              placement="auto"
              align="auto"
            />
          </div>
        </div>

        {/* Center positioned examples */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Center Trigger</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
                Smart positioning chooses optimal alignment
              </p>
            </div>
            <Dropdown
              options={[]}
              placeholder="Open from Center"
              renderDropdown={() => <DynamicPanel position="Center" />}
              expandedMenu={menuConfigs[menuVariant]}
              placement="auto"
              align="auto"
            />
          </div>
        </div>

        {/* Info box */}
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '8px', 
          border: '1px solid #0284c7',
          marginTop: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}>
            🎯 Smart Positioning Behavior:
          </h4>
          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#0369a1' }}>
            <p style={{ margin: '0 0 8px 0' }}>
              • <strong>Left Side:</strong> Menu opens to the right (standard left alignment)<br/>
              • <strong>Right Side:</strong> Menu automatically opens to the left to stay in viewport<br/>
              • <strong>Center:</strong> Chooses optimal alignment based on available space<br/>
              • <strong>All positions:</strong> Respect minimum dimensions while adapting to content size
            </p>
            <p style={{ margin: 0, fontStyle: 'italic' }}>
              The positioning system automatically detects viewport constraints and adjusts alignment accordingly, 
              ensuring the expanded menu always remains fully visible and accessible.
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates smart positioning with expanded menus opening from both left and right sides. The positioning system automatically adjusts alignment based on viewport constraints to ensure the menu stays visible.',
      },
    },
  },
}; 