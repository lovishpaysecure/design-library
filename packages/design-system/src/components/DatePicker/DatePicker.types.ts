import { ReactNode } from 'react';

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export interface PresetOptionType {
  label: string;
  getValue: () => DateRange;
}

export type DatePickerTokens = {
  datePicker: {
    background: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    padding: string;
    color: string;
    hoverBackground: string;
    selectedBackground: string;
    selectedColor: string;
    disabledColor: string;
    shadow: string;
  };
};

export interface StyledComponentProps {
  tokens?: DatePickerTokens;
  className?: string;
}

export interface StyledDatePickerProps extends StyledComponentProps {
  $isOpen?: boolean;
  $isSelected?: boolean;
  $isDisabled?: boolean;
  $isCustomRange?: boolean;
  $isInRange?: boolean;
}

export interface DatePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  customTokens?: DatePickerTokens;
  onCancel?: () => void;
  className?: string;
} 