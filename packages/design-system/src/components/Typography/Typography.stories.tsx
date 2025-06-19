import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption'],
    },
    margin: {
      control: 'text',
      description: 'Custom margin (e.g., "16px", "1rem", "10px 0")',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 text with a longer paragraph to demonstrate how the typography looks with more content. This helps designers and developers see how the text wraps and flows in a more realistic context.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 text with a longer paragraph to demonstrate how the typography looks with more content. This helps designers and developers see how the text wraps and flows in a more realistic context.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'Overline Text',
  },
};

export const BoldWeight: Story = {
  args: {
    weight: 'bold',
    children: 'Bold Text',
  },
};

export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: 'Center Aligned Text',
  },
};

export const WithCustomMargin: Story = {
  args: {
    variant: 'h2',
    margin: '24px 0',
    children: 'Heading with Custom Margin',
  },
};

export const ZeroMarginDemo: Story = {
  render: () => (
    <div style={{ border: '1px solid #ddd', padding: '16px' }}>
      <Typography variant="h3">Default (No Margin)</Typography>
      <Typography variant="body1">This paragraph follows immediately after the heading with no margin.</Typography>
      <Typography variant="body1" margin="16px 0">This paragraph has custom margin: 16px 0</Typography>
      <Typography variant="body1">And this follows with default zero margin again.</Typography>
    </div>
  ),
};

export const MarginComparison: Story = {
  render: () => (
    <div>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px', marginBottom: '16px' }}>
        <h3>Without Typography Component (Browser Default)</h3>
        <h2>Native H2 Tag</h2>
        <p>Native paragraph with browser default margins</p>
        <p>Another native paragraph</p>
      </div>
      
      <div style={{ border: '1px solid #e0e0e0', padding: '16px' }}>
        <h3>With Typography Component (Zero Margin Default)</h3>
        <Typography variant="h2">Typography H2</Typography>
        <Typography variant="body1">Typography paragraph with zero margin</Typography>
        <Typography variant="body1">Another Typography paragraph</Typography>
      </div>
    </div>
  ),
}; 