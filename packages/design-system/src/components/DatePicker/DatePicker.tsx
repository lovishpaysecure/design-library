import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { DatePickerProps, DatePickerTokens, DateRange, PresetOption } from './DatePicker.types';
import { defaultDatePickerTokens } from './DatePicker.tokens';
import {
  DatePickerContainer,
  DatePickerTrigger,
  DatePickerTriggerText,
  DatePickerTriggerIcon,
  DatePickerPopup,
  DatePickerSidebar,
  SidebarItem,
  DatePickerMain,
  CalendarContainer,
  SingleCalendar,
  CalendarHeader,
  CalendarHeaderText,
  CalendarNavButton,
  WeekdaysRow,
  WeekdayCell,
  DaysGrid,
  DayCell,
  TimeContainer,
  TimeSelectGroup,
  TimeSelect,
  TimeSeparator,
  ActionButtons,
  StyledDatePickerButton,
} from './DatePicker.styles';

const DEFAULT_PRESETS: PresetOption[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = new Date();
      return { startDate: today, endDate: today };
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      return { startDate, endDate };
    },
  },
  {
    label: 'This week',
    getValue: () => {
      const today = new Date();
      const startDate = new Date(today);
      const endDate = new Date(today);
      
      startDate.setDate(today.getDate() - today.getDay());
      endDate.setDate(today.getDate() + (6 - today.getDay()));
      
      return { startDate, endDate };
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      return { startDate, endDate };
    },
  },
  {
    label: 'This month',
    getValue: () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { startDate, endDate };
    },
  },
  {
    label: 'Custom range',
    getValue: () => ({ startDate: new Date(), endDate: new Date() }),
    disabled: false,
  },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date range",
  disabled = false,
  presets = DEFAULT_PRESETS,
  showTime = true,
  minDate,
  maxDate,
  className,
  style,
  onOpen,
  onClose,
  onCancel,
  onApply,
  dateFormat = 'MMM dd, yyyy',
  firstDayOfWeek = 0,
}) => {
  const tokens = useTokens<DatePickerTokens>('datePicker', defaultDatePickerTokens);
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState<DateRange | null>(value || null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [leftMonth, setLeftMonth] = useState(() => new Date());
  const [rightMonth, setRightMonth] = useState(() => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    return next;
  });
  const [selectingStart, setSelectingStart] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const formatDateRange = (range: DateRange | null): string => {
    if (!range || !range.startDate || !range.endDate) return '';
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    };

    if (range.startDate.toDateString() === range.endDate.toDateString()) {
      return formatDate(range.startDate);
    }

    return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(true);
    setTempValue(value || null);
    onOpen?.();
  };

  const handlePresetSelect = (preset: PresetOption) => {
    if (preset.disabled) return;
    
    if (preset.label === 'Custom range') {
      setSelectedPreset('Custom range');
      setSelectingStart(true);
      return;
    }

    const range = preset.getValue();
    if (!range || !range.startDate || !range.endDate) return;
    
    setTempValue(range);
    setSelectedPreset(preset.label);
    
    // Update calendar view to show the selected range
    setLeftMonth(new Date(range.startDate.getFullYear(), range.startDate.getMonth(), 1));
    const rightMonthDate = new Date(range.endDate);
    if (range.startDate.getMonth() === range.endDate.getMonth()) {
      rightMonthDate.setMonth(rightMonthDate.getMonth() + 1);
    }
    setRightMonth(new Date(rightMonthDate.getFullYear(), rightMonthDate.getMonth(), 1));
  };

  const handleDateClick = (date: Date) => {
    if (selectedPreset !== 'Custom range') {
      setSelectedPreset('Custom range');
    }

    if (!tempValue || selectingStart) {
      setTempValue({ startDate: date, endDate: date });
      setSelectingStart(false);
    } else {
      if (date < tempValue.startDate) {
        setTempValue({ startDate: date, endDate: tempValue.startDate });
      } else {
        setTempValue({ ...tempValue, endDate: date });
      }
      setSelectingStart(true);
    }
  };

  const isDateInRange = (date: Date, range: DateRange | null): boolean => {
    if (!range || !range.startDate || !range.endDate) return false;
    return date >= range.startDate && date <= range.endDate;
  };

  const isDateRangeStart = (date: Date, range: DateRange | null): boolean => {
    if (!range || !range.startDate) return false;
    return date.toDateString() === range.startDate.toDateString();
  };

  const isDateRangeEnd = (date: Date, range: DateRange | null): boolean => {
    if (!range || !range.endDate) return false;
    return date.toDateString() === range.endDate.toDateString();
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTempValue(value || null);
    setSelectedPreset(null);
    onCancel?.();
    onClose?.();
  };

  const handleApply = () => {
    if (tempValue) {
      onChange?.(tempValue);
      onApply?.(tempValue);
    }
    setIsOpen(false);
    onClose?.();
  };

  const renderCalendar = (monthDate: Date, isLeft: boolean) => {
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + firstDayOfWeek);
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const goToPrevMonth = () => {
      const newDate = new Date(monthDate);
      newDate.setMonth(newDate.getMonth() - 1);
      if (isLeft) {
        setLeftMonth(newDate);
        if (newDate >= rightMonth) {
          const newRight = new Date(newDate);
          newRight.setMonth(newRight.getMonth() + 1);
          setRightMonth(newRight);
        }
      } else {
        setRightMonth(newDate);
        if (newDate <= leftMonth) {
          const newLeft = new Date(newDate);
          newLeft.setMonth(newLeft.getMonth() - 1);
          setLeftMonth(newLeft);
        }
      }
    };

    const goToNextMonth = () => {
      const newDate = new Date(monthDate);
      newDate.setMonth(newDate.getMonth() + 1);
      if (isLeft) {
        setLeftMonth(newDate);
        if (newDate >= rightMonth) {
          const newRight = new Date(newDate);
          newRight.setMonth(newRight.getMonth() + 1);
          setRightMonth(newRight);
        }
      } else {
        setRightMonth(newDate);
        if (newDate <= leftMonth) {
          const newLeft = new Date(newDate);
          newLeft.setMonth(newLeft.getMonth() - 1);
          setLeftMonth(newLeft);
        }
      }
    };

    return (
      <SingleCalendar>
        <CalendarHeader tokens={tokens}>
          <CalendarNavButton tokens={tokens} onClick={goToPrevMonth}>
            ←
          </CalendarNavButton>
          <CalendarHeaderText tokens={tokens}>
            {MONTHS[month]} {year}
          </CalendarHeaderText>
          <CalendarNavButton tokens={tokens} onClick={goToNextMonth}>
            →
          </CalendarNavButton>
        </CalendarHeader>

        <WeekdaysRow>
          {WEEKDAYS.map((day) => (
            <WeekdayCell key={day} tokens={tokens}>
              {day}
            </WeekdayCell>
          ))}
        </WeekdaysRow>

        <DaysGrid>
          {days.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isOtherMonth = date.getMonth() !== month;
            const isDisabled = isDateDisabled(date);
            const isInRange = isDateInRange(date, tempValue);
            const isRangeStart = isDateRangeStart(date, tempValue);
            const isRangeEnd = isDateRangeEnd(date, tempValue);
            const isSelected = isRangeStart || isRangeEnd;

            return (
              <DayCell
                key={index}
                tokens={tokens}
                onClick={() => !isDisabled && handleDateClick(date)}
                isSelected={isSelected}
                isInRange={isInRange}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isToday={isToday}
                isOtherMonth={isOtherMonth}
                disabled={isDisabled}
              >
                {date.getDate()}
              </DayCell>
            );
          })}
        </DaysGrid>
      </SingleCalendar>
    );
  };

  const renderTimeSelectors = () => {
    if (!showTime || !tempValue || !tempValue.startDate || !tempValue.endDate) return null;

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
      <TimeContainer tokens={tokens}>
        <TimeSelectGroup>
          <TimeSelect tokens={tokens} defaultValue={tempValue.startDate.getHours()}>
            {hours.map(hour => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </TimeSelect>
          <TimeSeparator tokens={tokens}>:</TimeSeparator>
          <TimeSelect tokens={tokens} defaultValue={tempValue.startDate.getMinutes()}>
            {minutes.map(minute => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </TimeSelect>
        </TimeSelectGroup>

        <TimeSelectGroup>
          <TimeSelect tokens={tokens} defaultValue={tempValue.endDate.getHours()}>
            {hours.map(hour => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </TimeSelect>
          <TimeSeparator tokens={tokens}>:</TimeSeparator>
          <TimeSelect tokens={tokens} defaultValue={tempValue.endDate.getMinutes()}>
            {minutes.map(minute => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </TimeSelect>
        </TimeSelectGroup>
      </TimeContainer>
    );
  };

  return (
    <DatePickerContainer ref={containerRef} className={className} style={style}>
      <DatePickerTrigger
        tokens={tokens}
        disabled={disabled}
        onClick={handleTriggerClick}
      >
        <DatePickerTriggerText tokens={tokens} hasValue={!!value}>
          {value ? formatDateRange(value) : placeholder}
        </DatePickerTriggerText>
        <DatePickerTriggerIcon tokens={tokens}>📅</DatePickerTriggerIcon>
      </DatePickerTrigger>

      <DatePickerPopup tokens={tokens} isOpen={isOpen}>
        <DatePickerSidebar tokens={tokens}>
          {presets.map((preset) => (
            <SidebarItem
              key={preset.label}
              tokens={tokens}
              isSelected={selectedPreset === preset.label}
              disabled={preset.disabled}
              onClick={() => handlePresetSelect(preset)}
            >
              {preset.label}
            </SidebarItem>
          ))}
        </DatePickerSidebar>

        <DatePickerMain tokens={tokens}>
          <CalendarContainer>
            {renderCalendar(leftMonth, true)}
            {renderCalendar(rightMonth, false)}
          </CalendarContainer>

          {renderTimeSelectors()}

          <ActionButtons>
            <StyledDatePickerButton
              tokens={tokens}
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </StyledDatePickerButton>
            <StyledDatePickerButton
              tokens={tokens}
              variant="primary"
              onClick={handleApply}
            >
              Apply
            </StyledDatePickerButton>
          </ActionButtons>
        </DatePickerMain>
      </DatePickerPopup>
    </DatePickerContainer>
  );
}; 