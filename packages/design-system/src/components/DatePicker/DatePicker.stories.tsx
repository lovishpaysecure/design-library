import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { DatePickerProps, DateRange } from './DatePicker.types';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'left',
  },
};

export default meta;

type Story = StoryFn<typeof DatePicker>;

// Wrapper component to handle state
const DatePickerWrapper: React.FC<Omit<DatePickerProps, 'value' | 'onChange'>> = (props) => {
  const [value, setValue] = React.useState<DateRange | undefined>(undefined);
  
  const handleChange = (range: DateRange) => {
    setValue(range);
  };

  return <DatePicker {...props} value={value} onChange={handleChange} />;
};

export const Default: Story = () => <DatePickerWrapper />;

export const WithCustomTokens: Story = () => (
  <DatePickerWrapper
    customTokens={{
      datePicker: {
        background: '#FFFFFF',
        borderColor: '#6B7280',
        borderRadius: '4px',
        fontSize: '14px',
        padding: '10px 16px',
        color: '#111827',
        hoverBackground: '#F9FAFB',
        selectedBackground: '#4F46E5',
        selectedColor: '#FFFFFF',
        disabledColor: '#9CA3AF',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    }}
  />
);

export const WithMinMaxDates: Story = () => (
  <DatePickerWrapper
    minDate={new Date(2024, 0, 1)}
    maxDate={new Date(2024, 11, 31)}
  />
);

export const WithDisabledDates: Story = () => (
  <DatePickerWrapper
    disabledDates={[
      new Date(2024, 3, 15),
      new Date(2024, 3, 16),
      new Date(2024, 3, 17),
    ]}
  />
); 