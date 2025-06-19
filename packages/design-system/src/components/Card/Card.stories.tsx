import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'x-large'],
    },
    shadow: {
      control: 'boolean',
    },
    hoverEffect: {
      control: 'boolean',
    },
    backgroundColor: {
      control: 'color',
    },
    customPadding: {
      control: 'text',
    },
    border: {
      control: 'text',
    },
    radius: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Card Title
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This is a default card with some content inside. It has padding and a subtle shadow.
        </Typography>
        <Button variant="primary" size="small">
          Action
        </Button>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Outlined Card
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a border instead of a shadow, giving it a more subtle appearance.
        </Typography>
        <Button variant="tertiary" size="small">
          Learn More
        </Button>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Elevated Card
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a more prominent shadow, making it appear elevated above the surface.
        </Typography>
        <Button variant="primary" size="small">
          Get Started
        </Button>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div style={{ padding: '0' }}>
        <img 
          src="https://via.placeholder.com/300x150/5223BC/ffffff?text=Image" 
          alt="Card header" 
          style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '16px' }}>
          <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
            Card with Image
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            This card has no padding and includes an image that extends to the edges.
          </Typography>
          <Button variant="primary" size="small">
            View Details
          </Button>
        </div>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'small',
    children: (
      <div>
        <Typography variant="body2" weight="medium" style={{ marginBottom: '8px' }}>
          Compact Card
        </Typography>
        <Typography variant="caption">
          This card has small padding for a more compact appearance.
        </Typography>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'large',
    children: (
      <div>
        <Typography variant="h5" weight="semibold" style={{ marginBottom: '12px' }}>
          Spacious Card
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '20px' }}>
          This card has large padding, giving it a more spacious and breathable feel. Perfect for important content that needs more visual emphasis.
        </Typography>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary">Primary Action</Button>
          <Button variant="tertiary">Secondary</Button>
        </div>
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    shadow: false,
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Card without Shadow
        </Typography>
        <Typography variant="body1">
          This card has the shadow explicitly disabled, giving it a flat appearance.
        </Typography>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    hoverEffect: true,
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Filled Card
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a filled background with hover effects enabled.
        </Typography>
        <Button variant="primary" size="small">
          Interact
        </Button>
      </div>
    ),
  },
};

export const CustomBackgroundColor: Story = {
  args: {
    backgroundColor: '#e3f2fd',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Custom Background
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a custom light blue background color.
        </Typography>
        <Button variant="primary" size="small">
          Custom Color
        </Button>
      </div>
    ),
  },
};

export const CustomPadding: Story = {
  args: {
    customPadding: '32px 48px',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Custom Padding
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has custom padding (32px vertical, 48px horizontal).
        </Typography>
        <Button variant="primary" size="small">
          More Space
        </Button>
      </div>
    ),
  },
};

export const CustomBorder: Story = {
  args: {
    border: '3px solid #ff9800',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Custom Border
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a custom orange border.
        </Typography>
        <Button variant="warning" size="small">
          Bordered
        </Button>
      </div>
    ),
  },
};

export const CustomRadius: Story = {
  args: {
    radius: '24px',
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Custom Border Radius
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has a custom border radius of 24px.
        </Typography>
        <Button variant="primary" size="small">
          Rounded
        </Button>
      </div>
    ),
  },
};

export const FullyCustomized: Story = {
  args: {
    backgroundColor: '#f3e5f5',
    customPadding: '24px',
    border: '2px dashed #9c27b0',
    radius: '18px',
    hoverEffect: true,
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px', color: '#7b1fa2' }}>
          Fully Customized
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px', color: '#4a148c' }}>
          This card combines custom background, padding, border, radius, and hover effects.
        </Typography>
        <Button variant="primary" size="small">
          Amazing!
        </Button>
      </div>
    ),
  },
};

export const WithHoverEffect: Story = {
  args: {
    hoverEffect: true,
    children: (
      <div>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Interactive Card
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>
          This card has hover effects enabled. Hover over it to see the shadow change.
        </Typography>
        <Button variant="primary" size="small">
          Hover Me
        </Button>
      </div>
    ),
  },
};

export const RadiusShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
      <Card radius="0px">
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          No Radius
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Sharp corners with 0px border radius.
        </Typography>
        <Button variant="primary" size="small" fullWidth>
          Sharp
        </Button>
      </Card>
      
      <Card radius="12px">
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Medium Radius
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Standard rounded corners with 12px radius.
        </Typography>
        <Button variant="tertiary" size="small" fullWidth>
          Rounded
        </Button>
      </Card>
      
      <Card radius="32px">
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Large Radius
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Very rounded corners with 32px radius.
        </Typography>
        <Button variant="success" size="small" fullWidth>
          Very Rounded
        </Button>
      </Card>
      
      <Card radius="50%">
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Circular
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Completely circular with 50% radius.
        </Typography>
        <Button variant="warning" size="small" fullWidth>
          Circle
        </Button>
      </Card>
    </div>
  ),
};

export const CustomizationShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      <Card 
        backgroundColor="#fff3e0" 
        border="2px solid #ff9800"
        customPadding="20px"
        radius="16px"
        hoverEffect={true}
      >
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px', color: '#e65100' }}>
          Custom Orange Theme
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px', color: '#bf360c' }}>
          Background, border, padding, radius, and hover all customized.
        </Typography>
        <Button variant="warning" size="small" fullWidth>
          Orange Theme
        </Button>
      </Card>
      
      <Card 
        backgroundColor="#e8f5e8" 
        border="1px dashed #4caf50"
        customPadding="16px 24px"
        radius="8px"
      >
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px', color: '#2e7d32' }}>
          Green Variant
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px', color: '#1b5e20' }}>
          Subtle green theme with dashed border and custom radius.
        </Typography>
        <Button variant="success" size="small" fullWidth>
          Green Theme
        </Button>
      </Card>
      
      <Card 
        backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
        customPadding="24px"
        radius="20px"
        hoverEffect={true}
      >
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px', color: 'white' }}>
          Gradient Background
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px', color: '#f3e5f5' }}>
          Beautiful gradient background with custom radius and hover effects.
        </Typography>
        <Button variant="primary" size="small" fullWidth>
          Gradient Card
        </Button>
      </Card>
    </div>
  ),
};

export const HoverEffectComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <Card hoverEffect={false}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          No Hover Effect
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          This card has hover effects disabled (default behavior).
        </Typography>
        <Button variant="tertiary" size="small" fullWidth>
          Static Card
        </Button>
      </Card>
      <Card hoverEffect={true}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          With Hover Effect
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          This card has hover effects enabled. Notice the shadow change on hover.
        </Typography>
        <Button variant="primary" size="small" fullWidth>
          Interactive Card
        </Button>
      </Card>
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <Card hoverEffect={true}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Feature 1
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Description of the first feature with some details.
        </Typography>
        <Button variant="primary" size="small" fullWidth>
          Learn More
        </Button>
      </Card>
      <Card variant="outlined" hoverEffect={true}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Feature 2
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Description of the second feature with some details.
        </Typography>
        <Button variant="tertiary" size="small" fullWidth>
          Explore
        </Button>
      </Card>
      <Card variant="elevated" hoverEffect={true}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: '8px' }}>
          Feature 3
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '12px' }}>
          Description of the third feature with some details.
        </Typography>
        <Button variant="success" size="small" fullWidth>
          Get Started
        </Button>
      </Card>
    </div>
  ),
}; 