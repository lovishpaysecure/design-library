import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CATags } from './index';
import { CATag } from './CATags.types';

const meta: Meta<typeof CATags> = {
  title: 'Components/CATags',
  component: CATags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    removable: {
      control: 'boolean',
    },
    wrap: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'text',
    },
    showTooltip: {
      control: 'boolean',
    },
    autoTooltip: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CATags>;

export default meta;
type Story = StoryObj<typeof CATags>;

const sampleTags: CATag[] = [
  { id: '1', label: 'React' },
  { id: '2', label: 'TypeScript' },
  { id: '3', label: 'JavaScript' },
  { id: '4', label: 'CSS' },
];

const multiSelectTags: CATag[] = [
  { id: '1', label: 'MID_1' },
  { id: '2', label: 'MID_2' },
  { id: '3', label: 'MID_3' },
  { id: '4', label: 'MID_4' },
];

export const Default: Story = {
  args: {
    tags: sampleTags,
    variant: 'default',
    size: 'medium',
  },
};

export const Primary: Story = {
  args: {
    tags: sampleTags,
    variant: 'primary',
    size: 'medium',
  },
};

export const Success: Story = {
  args: {
    tags: sampleTags,
    variant: 'success',
    size: 'medium',
  },
};

export const Warning: Story = {
  args: {
    tags: sampleTags,
    variant: 'warning',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    tags: sampleTags,
    variant: 'danger',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    tags: sampleTags,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    tags: sampleTags,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    tags: sampleTags,
    size: 'large',
  },
};

export const Removable: Story = {
  args: {
    tags: sampleTags,
    removable: true,
    onRemove: (tag: CATag) => console.log('Removed tag:', tag),
  },
};

export const MultiSelectExample: Story = {
  args: {
    tags: multiSelectTags,
    variant: 'primary',
    size: 'medium',
    removable: true,
    onRemove: (tag: CATag) => console.log('Removed tag:', tag),
  },
};

export const Interactive: Story = {
  render: () => {
    const [tags, setTags] = useState<CATag[]>([
      { id: '1', label: 'React' },
      { id: '2', label: 'TypeScript' },
      { id: '3', label: 'JavaScript' },
      { id: '4', label: 'CSS' },
      { id: '5', label: 'HTML' },
    ]);

    const handleRemove = (tagToRemove: CATag) => {
      setTags(tags.filter(tag => tag.id !== tagToRemove.id));
    };

    const handleTagClick = (tag: CATag) => {
      console.log('Clicked tag:', tag);
    };

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '16px' }}>Interactive CATags (Click to remove)</h3>
        <CATags
          tags={tags}
          variant="primary"
          size="medium"
          removable
          onRemove={handleRemove}
          onTagClick={handleTagClick}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <h4>Default</h4>
        <CATags tags={sampleTags} variant="default" removable />
      </div>
      <div>
        <h4>Primary</h4>
        <CATags tags={sampleTags} variant="primary" removable />
      </div>
      <div>
        <h4>Success</h4>
        <CATags tags={sampleTags} variant="success" removable />
      </div>
      <div>
        <h4>Warning</h4>
        <CATags tags={sampleTags} variant="warning" removable />
      </div>
      <div>
        <h4>Danger</h4>
        <CATags tags={sampleTags} variant="danger" removable />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <h4>Small</h4>
        <CATags tags={sampleTags} size="small" variant="primary" removable />
      </div>
      <div>
        <h4>Medium</h4>
        <CATags tags={sampleTags} size="medium" variant="primary" removable />
      </div>
      <div>
        <h4>Large</h4>
        <CATags tags={sampleTags} size="large" variant="primary" removable />
      </div>
    </div>
  ),
};

export const LongTagsWithWrapping: Story = {
  args: {
    tags: [
      { id: '1', label: 'This is a very long tag name that shows ellipsis' },
      { id: '2', label: 'Another Long Tag Name' },
      { id: '3', label: 'Short' },
      { id: '4', label: 'Medium Length Tag' },
      { id: '5', label: 'Extra Long Tag Name That Gets Truncated With Ellipsis' },
    ],
    variant: 'primary',
    removable: true,
    autoTooltip: true,
    labelMaxWidth: '120px',
    maxWidth: '400px',
    wrap: true,
  },
};

export const NoWrapping: Story = {
  args: {
    tags: [
      { id: '1', label: 'Tag One' },
      { id: '2', label: 'Tag Two' },
      { id: '3', label: 'Tag Three' },
      { id: '4', label: 'Tag Four' },
      { id: '5', label: 'Tag Five' },
      { id: '6', label: 'Tag Six' },
    ],
    variant: 'default',
    removable: true,
    maxWidth: '300px',
    wrap: false,
  },
};

export const CustomRemoveIcon: Story = {
  args: {
    tags: sampleTags,
    variant: 'danger',
    removable: true,
    removeIcon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M3 6H5H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    onRemove: (tag: CATag) => console.log('Removed tag:', tag),
  },
};

export const WithTooltips: Story = {
  args: {
    tags: sampleTags,
    variant: 'primary',
    showTooltip: true,
    removable: true,
  },
};

export const AutoTooltipForLongText: Story = {
  args: {
    tags: [
      { id: '1', label: 'Short' },
      { id: '2', label: 'This is a very long tag name that shows ellipsis' },
      { id: '3', label: 'Medium tag' },
      { id: '4', label: 'Payments_provider_1_with_very_long_name' },
      { id: '5', label: 'Super extremely long tag name that definitely needs truncation' },
    ],
    variant: 'primary',
    removable: true,
    autoTooltip: true,
    labelMaxWidth: '150px',
  },
};

export const TooltipComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '500px' }}>
      <div>
        <h4>No Tooltips (Default)</h4>
        <CATags 
          tags={[
            { id: '1', label: 'Short' },
            { id: '2', label: 'Very long tag name that gets truncated' },
          ]} 
          variant="default" 
          showTooltip={false}
          autoTooltip={false}
          labelMaxWidth="100px"
        />
      </div>
      <div>
        <h4>Auto Tooltips (Only for truncated text with ...)</h4>
        <CATags 
          tags={[
            { id: '1', label: 'Short' },
            { id: '2', label: 'Very long tag name that gets truncated with ellipsis' },
          ]} 
          variant="primary" 
          autoTooltip={true}
          labelMaxWidth="100px"
        />
      </div>
      <div>
        <h4>Always Show Tooltips</h4>
        <CATags 
          tags={[
            { id: '1', label: 'Short' },
            { id: '2', label: 'Very long tag name that gets truncated' },
          ]} 
          variant="success" 
          showTooltip={true}
          labelMaxWidth="100px"
        />
      </div>
    </div>
  ),
}; 