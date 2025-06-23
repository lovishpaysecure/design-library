import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DateRange } from './DatePicker.types';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable date range picker component with calendar popup and preset options.',
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: 'Currently selected date range',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when date range is selected',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    showTime: {
      control: 'boolean',
      description: 'Whether to show time selectors',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const DatePickerWithState = (args: any) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(args.value || null);

  return (
    <div style={{ width: '400px' }}>
      <DatePicker
        {...args}
        value={selectedRange}
        onChange={(range) => {
          setSelectedRange(range);
          args.onChange?.(range);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select date range',
  },
};

export const WithDefaultValue: Story = {
  render: DatePickerWithState,
  args: {
    value: {
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-20'),
    },
    placeholder: 'Select date range',
  },
};

export const WithTimeSelector: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select date range with time',
    showTime: true,
  },
};

export const Disabled: Story = {
  render: DatePickerWithState,
  args: {
    disabled: true,
    placeholder: 'Date picker disabled',
  },
};

export const SingleDateMode: Story = {
  render: DatePickerWithState,
  args: {
    value: {
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-06-15'),
    },
    placeholder: 'Single date selection',
  },
};

export const WithConstraints: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select date range (limited)',
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
  },
};

export const WithIcons: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: '5th June - 11th June 2025',
    preIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    postIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const [showTime, setShowTime] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const formatDateRange = (range: DateRange | null) => {
      if (!range?.startDate) return 'No selection';
      if (!range.endDate || range.startDate.getTime() === range.endDate.getTime()) {
        return range.startDate.toLocaleDateString();
      }
      return `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Settings</h3>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showTime}
                onChange={(e) => setShowTime(e.target.checked)}
              />
              Show Time Selectors
            </label>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Date Range Picker
          </label>
          <DatePicker
            value={selectedRange}
            onChange={setSelectedRange}
            placeholder="Select date range"
            showTime={showTime}
            disabled={isDisabled}
          />
          {selectedRange && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              Selected: {formatDateRange(selectedRange)}
            </p>
          )}
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0284c7' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}>
            💡 Features Available:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#0369a1' }}>
            <li>Dual calendar view with side-by-side navigation</li>
            <li>Preset options: Today, Yesterday, Last 7 days, etc.</li>
            <li>Date range selection with visual highlighting</li>
            <li>Optional time selectors with hour:minute dropdowns</li>
            <li>Cancel/Apply buttons for confirmation</li>
            <li>Purple theme matching design system</li>
          </ul>
        </div>
      </div>
    );
  },
}; 