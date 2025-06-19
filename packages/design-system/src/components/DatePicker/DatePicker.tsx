import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, isBefore, isAfter } from 'date-fns';
import { useTokens } from '../../hooks/useTokens';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { DatePickerProps, DateRange, PresetOptionType, DatePickerTokens } from './DatePicker.types';
import {
  DatePickerContainer,
  DatePickerTrigger,
  DatePickerDropdown,
  PresetList,
  PresetOption,
  CalendarContainer,
  SingleCalendarContainer,
  CalendarHeader,
  MonthYearDisplay,
  MonthGrid,
  WeekDay,
  DayCell,
  TimeContainer,
  TimeSelect,
  TimeSeparator,
  ActionButtons,
  CancelButton,
  ApplyButton,
  TimeSelectContainer,
} from '../../styles/DatePicker.styles';

const defaultTokens: DatePickerTokens = {
  datePicker: {
    background: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    padding: '8px 12px',
    color: '#374151',
    hoverBackground: '#F3F4F6',
    selectedBackground: '#5022bd',
    selectedColor: '#FFFFFF',
    disabledColor: '#9CA3AF',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
};

const presetOptions: PresetOptionType[] = [
  {
    label: 'Today',
    getValue: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        startDate: yesterday,
        endDate: yesterday,
      };
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This week',
    getValue: () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      return { startDate: start, endDate: today };
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This month',
    getValue: () => ({
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
    }),
  },
  {
    label: 'Custom range',
    getValue: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  customTokens,
  onCancel,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(addMonths(new Date(), 1));
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(value);
  const [startHours, setStartHours] = useState('0');
  const [startMinutes, setStartMinutes] = useState('00');
  const [endHours, setEndHours] = useState('0');
  const [endMinutes, setEndMinutes] = useState('00');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tokens = useTokens<DatePickerTokens>('datePicker', defaultTokens);
  const finalTokens = customTokens || tokens;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePresetClick = (preset: PresetOptionType) => {
    const range = preset.getValue();
    setSelectedRange(range);
    setSelectedPreset(preset.label);
    
    // Update displayed months based on the selected range
    const { startDate } = range;
    setCurrentMonth(startDate);
    setNextMonth(addMonths(startDate, 1));
  };

  const handleDayClick = (date: Date) => {
    // Only allow date selection in Custom range mode
    if (selectedPreset !== 'Custom range') {
      return;
    }

    if (!selectedRange || !selectedRange.startDate) {
      setSelectedRange({ startDate: date, endDate: date });
      setCurrentMonth(date);
      setNextMonth(addMonths(date, 1));
    } else if (!selectedRange.endDate || isSameDay(selectedRange.startDate, selectedRange.endDate)) {
      if (isBefore(date, selectedRange.startDate)) {
        setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
        setCurrentMonth(date);
        setNextMonth(addMonths(date, 1));
      } else {
        setSelectedRange({ startDate: selectedRange.startDate, endDate: date });
        if (date.getMonth() !== currentMonth.getMonth() && 
            date.getMonth() !== nextMonth.getMonth()) {
          setCurrentMonth(subMonths(date, 1));
          setNextMonth(date);
        }
      }
    } else {
      setSelectedRange({ startDate: date, endDate: date });
      setCurrentMonth(date);
      setNextMonth(addMonths(date, 1));
    }
  };

  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentMonth(subMonths(currentMonth, 1));
      setNextMonth(subMonths(nextMonth, 1));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
      setNextMonth(addMonths(nextMonth, 1));
    }
  };

  const renderCalendar = (month: Date, showLeftArrow: boolean = true, showRightArrow: boolean = true) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = eachDayOfInterval({ start, end });

    return (
      <SingleCalendarContainer>
        <CalendarHeader>
          {showLeftArrow && (
            <button 
              onClick={() => handleMonthNavigation('prev')} 
              aria-label="Previous month"
              disabled={selectedPreset !== 'Custom range'}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </button>
          )}
          <MonthYearDisplay>
            {format(month, 'MMMM yyyy')}
          </MonthYearDisplay>
          {showRightArrow && (
            <button 
              onClick={() => handleMonthNavigation('next')} 
              aria-label="Next month"
              disabled={selectedPreset !== 'Custom range'}
            >
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </button>
          )}
        </CalendarHeader>
        <MonthGrid>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
          {Array.from({ length: start.getDay() }, (_, i) => (
            <DayCell key={`empty-${i}`} disabled style={{ visibility: 'hidden' }}>
              {' '}
            </DayCell>
          ))}
          {days.map((day: Date) => {
            const isSelected = selectedRange && (
              isSameDay(day, selectedRange.startDate) ||
              isSameDay(day, selectedRange.endDate)
            );

            const isInRange = selectedRange && selectedRange.startDate && selectedRange.endDate && (
              isWithinInterval(day, {
                start: selectedRange.startDate,
                end: selectedRange.endDate,
              }) &&
              !isSameDay(day, selectedRange.startDate) &&
              !isSameDay(day, selectedRange.endDate)
            );

            const isDisabled =
              selectedPreset !== 'Custom range' || // Disable all dates if not in Custom range mode
              (minDate && isBefore(day, minDate)) ||
              (maxDate && isAfter(day, maxDate)) ||
              (disabledDates && disabledDates.some((disabled) => isSameDay(day, disabled)));

            return (
              <DayCell
                key={day.toISOString()}
                onClick={() => !isDisabled && handleDayClick(day)}
                $isSelected={isSelected}
                $isInRange={isInRange}
                $isDisabled={isDisabled}
                disabled={isDisabled}
              >
                {format(day, 'd')}
              </DayCell>
            );
          })}
        </MonthGrid>
      </SingleCalendarContainer>
    );
  };

  const formatDateRange = (range?: DateRange) => {
    if (!range) return 'Select date range';
    const { startDate, endDate } = range;
    if (isSameDay(startDate, endDate)) {
      return format(startDate, 'MMM d, yyyy');
    }
    return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  return (
    <DatePickerContainer ref={containerRef} className={className}>
      <DatePickerTrigger onClick={() => setIsOpen(!isOpen)} tokens={finalTokens}>
        <FontAwesomeIcon icon={faCalendar} />
        {formatDateRange(selectedRange)}
        <FontAwesomeIcon icon={faChevronDown} />
      </DatePickerTrigger>
      <DatePickerDropdown $isOpen={isOpen} tokens={finalTokens}>
        <PresetList>
          {presetOptions.map((preset) => (
            <PresetOption
              key={preset.label}
              onClick={() => handlePresetClick(preset)}
              $isSelected={selectedPreset === preset.label}
            >
              {preset.label}
            </PresetOption>
          ))}
        </PresetList>
        <div>
          <CalendarContainer>
            {renderCalendar(currentMonth, true, false)}
            {renderCalendar(nextMonth, false, true)}
          </CalendarContainer>
          <TimeContainer>
            <TimeSelectContainer>
              <TimeSelect
                value={startHours}
                onChange={(e) => setStartHours(e.target.value)}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
              </TimeSelect>
              <TimeSeparator>:</TimeSeparator>
              <TimeSelect
                value={startMinutes}
                onChange={(e) => setStartMinutes(e.target.value)}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                ))}
              </TimeSelect>
            </TimeSelectContainer>
            <TimeSelectContainer>
              <TimeSelect
                value={endHours}
                onChange={(e) => setEndHours(e.target.value)}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
              </TimeSelect>
              <TimeSeparator>:</TimeSeparator>
              <TimeSelect
                value={endMinutes}
                onChange={(e) => setEndMinutes(e.target.value)}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                ))}
              </TimeSelect>
            </TimeSelectContainer>
          </TimeContainer>
          <ActionButtons>
            <CancelButton onClick={() => {
              setIsOpen(false);
              onCancel?.();
            }}>
              Cancel
            </CancelButton>
            <ApplyButton onClick={() => {
              if (selectedRange) {
                const { startDate, endDate } = selectedRange;
                
                const finalStartDate = new Date(startDate);
                finalStartDate.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
                
                const finalEndDate = new Date(endDate);
                finalEndDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
                
                onChange?.({ startDate: finalStartDate, endDate: finalEndDate });
              }
              setIsOpen(false);
            }}>
              Apply
            </ApplyButton>
          </ActionButtons>
        </div>
      </DatePickerDropdown>
    </DatePickerContainer>
  );
}; 