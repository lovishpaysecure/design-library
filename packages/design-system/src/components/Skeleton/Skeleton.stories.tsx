import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './index';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    borderRadius: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic Skeleton Stories
export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '200px',
    height: '100px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '60px',
    height: '60px',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '200px',
    height: '120px',
  },
};

export const PulseAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'pulse',
    width: '200px',
    height: '100px',
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'wave',
    width: '200px',
    height: '100px',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'none',
    width: '200px',
    height: '100px',
  },
};

// Multi-Line Examples using basic Skeleton component
export const MultipleTextLines: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3>Multiple Text Lines</h3>
      <Skeleton variant="text" width="100%" height="16px" />
      <Skeleton variant="text" width="95%" height="16px" style={{ marginTop: '8px' }} />
      <Skeleton variant="text" width="85%" height="16px" style={{ marginTop: '8px' }} />
      <Skeleton variant="text" width="75%" height="16px" style={{ marginTop: '8px' }} />
      <Skeleton variant="text" width="90%" height="16px" style={{ marginTop: '8px' }} />
    </div>
  ),
};

export const TableLikeStructure: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <h3>Table-like Structure</h3>
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
        <Skeleton variant="text" width="120px" height="16px" />
        <Skeleton variant="text" width="150px" height="16px" />
        <Skeleton variant="text" width="100px" height="16px" />
        <Skeleton variant="text" width="130px" height="16px" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <Skeleton variant="text" width="120px" height="14px" />
          <Skeleton variant="text" width="150px" height="14px" />
          <Skeleton variant="text" width="100px" height="14px" />
          <Skeleton variant="text" width="130px" height="14px" />
        </div>
      ))}
    </div>
  ),
};

export const ListItems: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3>List Items</h3>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Skeleton variant="circular" width="40px" height="40px" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height="16px" />
            <Skeleton variant="text" width="40%" height="14px" style={{ marginTop: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Complex Layout Examples
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '16px', border: '1px solid #E4E7EC', borderRadius: '8px' }}>
      <Skeleton variant="rectangular" width="100%" height="120px" />
      <div style={{ marginTop: '12px' }}>
        <Skeleton variant="text" width="80%" height="16px" />
        <Skeleton variant="text" width="60%" height="16px" style={{ marginTop: '8px' }} />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="circular" width="32px" height="32px" />
        <Skeleton variant="rectangular" width="80px" height="32px" borderRadius="4px" />
      </div>
    </div>
  ),
};

export const DashboardSkeleton: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <h3>Dashboard with Multiple Cards</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} style={{ padding: '16px', border: '1px solid #E4E7EC', borderRadius: '8px' }}>
            <Skeleton variant="text" width="80%" height="24px" />
            <Skeleton variant="text" width="40%" height="32px" style={{ marginTop: '8px' }} />
            <Skeleton variant="text" width="60%" height="14px" style={{ marginTop: '4px' }} />
          </div>
        ))}
      </div>
      
      <h3>Data Table Structure</h3>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
        <Skeleton variant="text" width="120px" height="16px" />
        <Skeleton variant="text" width="150px" height="16px" />
        <Skeleton variant="text" width="100px" height="16px" />
        <Skeleton variant="text" width="130px" height="16px" />
        <Skeleton variant="text" width="110px" height="16px" />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <Skeleton variant="text" width="120px" height="14px" />
          <Skeleton variant="text" width="150px" height="14px" />
          <Skeleton variant="text" width="100px" height="14px" />
          <Skeleton variant="text" width="130px" height="14px" />
          <Skeleton variant="text" width="110px" height="14px" />
        </div>
      ))}
    </div>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Skeleton variant="circular" width="48px" height="48px" />
      <div>
        <Skeleton variant="text" width="120px" height="16px" />
        <Skeleton variant="text" width="80px" height="14px" style={{ marginTop: '4px' }} />
      </div>
    </div>
  ),
}; 