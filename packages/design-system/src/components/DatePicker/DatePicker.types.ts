import { ReactNode } from 'react';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DatePickerTokens {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  primaryColor: string;
  primaryColorLight: string;
  secondaryColor: string;
  hoverColor: string;
  selectedColor: string;
  selectedTextColor: string;
  disabledColor: string;
  disabledBackgroundColor: string;
  shadowColor: string;
  sidebarBackgroundColor: string;
  sidebarBorderColor: string;
  sidebarItemHoverColor: string;
  sidebarSelectedColor: string;
  sidebarSelectedTextColor: string;
  calendarHeaderColor: string;
  weekdayColor: string;
  rangeBackgroundColor: string;
  rangeHoverColor: string;
  todayBorderColor: string;
  otherMonthColor: string;
  timeSelectBackgroundColor: string;
  timeSelectBorderColor: string;
  iconColor: string;
  iconSize: string;
  iconSpacing: string;
}

export interface PresetOption {
  label: string;
  getValue: () => DateRange;
  disabled?: boolean;
}

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
  /**
   * Current selected date range
   */
  value?: DateRange | null;
  /**
   * Callback fired when date range is selected
   */
  onChange?: (range: DateRange | null) => void;
  /**
   * Placeholder text for the trigger input
   */
  placeholder?: string;
  /**
   * Icon to display at the start of the input
   */
  preIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  postIcon?: React.ReactNode;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
  /**
   * Custom preset options (defaults provided)
   */
  presets?: PresetOption[];
  /**
   * Whether to show time selection
   */
  showTime?: boolean;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  /**
   * Callback when picker opens
   */
  onOpen?: () => void;
  /**
   * Callback when picker closes
   */
  onClose?: () => void;
  /**
   * Callback when Cancel is clicked
   */
  onCancel?: () => void;
  /**
   * Callback when Apply is clicked
   */
  onApply?: (range: DateRange) => void;
  /**
   * Date format for display
   */
  dateFormat?: string;
  /**
   * First day of week (0 = Sunday, 1 = Monday)
   */
  firstDayOfWeek?: number;
} 