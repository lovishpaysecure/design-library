import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './CheckBox';

// Wrapper component for Storybook to handle state properly
const CheckBoxWrapper = ({ checked: initialChecked, ...args }: any) => {
  const [checked, setChecked] = useState(initialChecked || false);
  
  return (
    <CheckBox
      {...args}
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked)}
    />
  );
};

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'error'],
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof CheckBox>;

// Default interactive story
export const Default: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'medium',
    color: 'primary',
    label: 'Interactive Checkbox',
    checked: false,
  },
};

// Basic variants
export const CheckboxOnly: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'medium',
    color: 'primary',
  },
};

export const CheckboxWithLabel: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'medium',
    color: 'primary',
    label: 'Checkbox label',
  },
};

// States
export const Checked: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    label: 'Initially checked checkbox',
    checked: true,
  },
};

export const Unchecked: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    label: 'Unchecked checkbox',
    checked: false,
  },
};

export const Indeterminate: Story = {
  render: () => (
    <CheckBox
      label="Indeterminate checkbox (static)"
      indeterminate={true}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckBox
      label="Disabled checkbox"
      isDisabled={true}
    />
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <CheckBox
      label="Disabled checked checkbox"
      checked={true}
      isDisabled={true}
    />
  ),
};

// Sizes
export const Small: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'small',
    label: 'Small checkbox',
  },
};

export const Medium: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'medium',
    label: 'Medium checkbox',
  },
};

export const Large: Story = {
  render: (args) => <CheckBoxWrapper {...args} />,
  args: {
    size: 'large',
    label: 'Large checkbox',
  },
};

// Colors
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CheckBoxWrapper color="primary" label="Primary" checked={false} />
      <CheckBoxWrapper color="error" label="Error" checked={false} />
      <CheckBox label="Disabled" isDisabled={true} />
    </div>
  ),
};

// Interactive examples
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <CheckBox
        label="Click me to toggle"
        checked={checked}
        onChange={(newChecked) => setChecked(newChecked)}
      />
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([false, false, false]);
    
    const allChecked = items.every(Boolean);
    const noneChecked = items.every(item => !item);
    
    const handleSelectAll = () => {
      if (allChecked) {
        // If all are selected (showing "-"), unselect all (back to empty)
        setItems(items.map(() => false));
      } else {
        // If none or some are selected (showing empty), select all (show "-")
        setItems(items.map(() => true));
      }
    };
    
    const handleItemChange = (index: number, checked: boolean) => {
      const newItems = [...items];
      newItems[index] = checked;
      setItems(newItems);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CheckBox
          label={`Select All (${items.filter(Boolean).length}/${items.length} selected)`}
          checked={false}
          indeterminate={allChecked}
          onChange={handleSelectAll}
        />
        <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((checked, index) => (
            <CheckBox
              key={index}
              label={`Option ${index + 1}`}
              checked={checked}
              onChange={(newChecked) => handleItemChange(index, newChecked)}
            />
          ))}
        </div>
      </div>
    );
  },
};


// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CheckBoxWrapper size="small" label="Small checkbox" checked={false} />
      <CheckBoxWrapper size="medium" label="Medium checkbox" checked={false} />
      <CheckBoxWrapper size="large" label="Large checkbox" checked={false} />
    </div>
  ),
}; 