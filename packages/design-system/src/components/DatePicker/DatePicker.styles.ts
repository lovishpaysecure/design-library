import styled from 'styled-components';
import type { DatePickerTokens } from './DatePicker.types';

const getTokenValue = (tokens: any, path: string, defaultValue: string = '') => {
  if (!tokens?.datePicker) return defaultValue;
  return tokens.datePicker[path] || defaultValue;
};

export const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const DatePickerTrigger = styled.button<{ tokens: DatePickerTokens; disabled?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.disabled ? props.tokens.disabledColor : props.tokens.textColor};
  background-color: ${props => props.disabled ? props.tokens.disabledBackgroundColor : props.tokens.backgroundColor};
  border: 1px solid ${props => props.tokens.borderColor};
  border-radius: 8px;
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: ${props => props.tokens.primaryColor};
  }

  &:focus {
    border-color: ${props => props.tokens.primaryColor};
    box-shadow: 0 0 0 3px ${props => props.tokens.primaryColorLight};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const DatePickerTriggerText = styled.span<{ tokens: DatePickerTokens; hasValue?: boolean }>`
  color: ${props => props.hasValue ? props.tokens.textColor : props.tokens.disabledColor};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DatePickerIcon = styled.span<{ tokens: DatePickerTokens; position: 'pre' | 'post' }>`
  color: ${props => props.tokens.iconColor};
  font-size: ${props => props.tokens.iconSize};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.tokens.iconSize};
  height: ${props => props.tokens.iconSize};
  margin-${props => props.position === 'pre' ? 'right' : 'left'}: ${props => props.tokens.iconSpacing};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const DatePickerTriggerIcon = styled.span<{ tokens: DatePickerTokens; isOpen?: boolean }>`
  color: ${props => props.tokens.iconColor};
  font-size: 16px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

export const DatePickerPopup = styled.div<{ 
  tokens: DatePickerTokens; 
  isOpen: boolean;
  $placement?: 'top' | 'bottom';
  $align?: 'left' | 'right';
  $zIndex?: number;
}>`
  position: absolute;
  ${props => props.$placement === 'top' ? 'bottom: 100%; margin-bottom: 8px;' : 'top: 100%; margin-top: 8px;'}
  ${props => props.$align === 'right' ? 'right: 0;' : 'left: 0;'}
  z-index: ${props => props.$zIndex || 1000};
  background-color: ${props => props.tokens.backgroundColor};
  border: 1px solid ${props => props.tokens.borderColor};
  border-radius: ${props => props.tokens.borderRadius};
  box-shadow: ${props => props.tokens.shadowColor};
  display: ${props => props.isOpen ? 'flex' : 'none'};
  min-width: 800px;
  max-width: 90vw;
  overflow: hidden;
`;

export const DatePickerSidebar = styled.div<{ tokens: DatePickerTokens }>`
  width: 200px;
  background-color: ${props => props.tokens.sidebarBackgroundColor};
  border-right: 1px solid ${props => props.tokens.sidebarBorderColor};
  padding: ${props => props.tokens.padding};
  flex-shrink: 0;
`;

export const SidebarItem = styled.button<{ 
  tokens: DatePickerTokens; 
  isSelected?: boolean; 
  disabled?: boolean;
}>`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 4px;
  background-color: ${props => {
    if (props.isSelected) return props.tokens.sidebarSelectedColor;
    return 'transparent';
  }};
  color: ${props => {
    if (props.disabled) return props.tokens.disabledColor;
    if (props.isSelected) return props.tokens.sidebarSelectedTextColor;
    return props.tokens.textColor;
  }};
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  transition: all 0.2s ease-in-out;
  text-align: left;

  &:hover:not(:disabled) {
    background-color: ${props => 
      props.isSelected 
        ? props.tokens.sidebarSelectedColor 
        : props.tokens.sidebarItemHoverColor
    };
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const DatePickerMain = styled.div<{ tokens: DatePickerTokens }>`
  flex: 1;
  padding: ${props => props.tokens.padding};
  display: flex;
  flex-direction: column;
`;

export const CalendarContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
`;

export const SingleCalendar = styled.div`
  flex: 1;
`;

export const CalendarHeader = styled.div<{ tokens: DatePickerTokens }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CalendarHeaderText = styled.span<{ tokens: DatePickerTokens }>`
  font-size: 16px;
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.tokens.calendarHeaderColor};
  font-weight: 600;
`;

export const CalendarNavButton = styled.button<{ tokens: DatePickerTokens }>`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  color: ${props => props.tokens.calendarHeaderColor};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${props => props.tokens.hoverColor};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.tokens.primaryColorLight};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

export const WeekdayCell = styled.div<{ tokens: DatePickerTokens }>`
  padding: 8px 4px;
  text-align: center;
  font-size: 12px;
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.tokens.weekdayColor};
  font-weight: 600;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const DayCell = styled.button<{ 
  tokens: DatePickerTokens; 
  isSelected?: boolean; 
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isToday?: boolean; 
  isOtherMonth?: boolean;
  disabled?: boolean;
}>`
  padding: 8px 4px;
  border: none;
  background: ${props => {
    if (props.isSelected || props.isRangeStart || props.isRangeEnd) {
      return props.tokens.selectedColor;
    }
    if (props.isInRange) {
      return props.tokens.rangeBackgroundColor;
    }
    return 'transparent';
  }};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border-radius: ${props => {
    if (props.isRangeStart && !props.isRangeEnd) return '6px 0 0 6px';
    if (props.isRangeEnd && !props.isRangeStart) return '0 6px 6px 0';
    if (props.isSelected || (props.isRangeStart && props.isRangeEnd)) return '6px';
    return '6px';
  }};
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  transition: all 0.2s ease-in-out;
  position: relative;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;

  color: ${props => {
    if (props.disabled) return props.tokens.disabledColor;
    if (props.isSelected || props.isRangeStart || props.isRangeEnd) return props.tokens.selectedTextColor;
    if (props.isOtherMonth) return props.tokens.otherMonthColor;
    return props.tokens.textColor;
  }};

  ${props => props.isToday && !props.isSelected && !props.isInRange && `
    border: 1px solid ${props.tokens.todayBorderColor};
  `}

  &:hover:not(:disabled) {
    background-color: ${props => {
      if (props.isSelected || props.isRangeStart || props.isRangeEnd) {
        return props.tokens.selectedColor;
      }
      if (props.isInRange) {
        return props.tokens.rangeHoverColor;
      }
      return props.tokens.hoverColor;
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.tokens.primaryColorLight};
  }

  &:disabled {
    opacity: 0.3;
  }
`;

export const TimeContainer = styled.div<{ tokens: DatePickerTokens }>`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: ${props => props.tokens.secondaryColor};
  border-radius: 8px;
`;

export const TimeSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TimeSelect = styled.select<{ tokens: DatePickerTokens }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.tokens.timeSelectBorderColor};
  border-radius: 6px;
  background-color: ${props => props.tokens.timeSelectBackgroundColor};
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  color: ${props => props.tokens.textColor};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.tokens.primaryColor};
    box-shadow: 0 0 0 2px ${props => props.tokens.primaryColorLight};
  }
`;

export const TimeSeparator = styled.span<{ tokens: DatePickerTokens }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.tokens.textColor};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const StyledDatePickerButton = styled.button<{ 
  tokens: DatePickerTokens; 
  variant: 'primary' | 'secondary';
}>`
  padding: 10px 20px;
  border: 1px solid ${props => 
    props.variant === 'primary' ? props.tokens.primaryColor : props.tokens.borderColor
  };
  border-radius: 8px;
  background-color: ${props => 
    props.variant === 'primary' ? props.tokens.primaryColor : props.tokens.backgroundColor
  };
  color: ${props => 
    props.variant === 'primary' ? props.tokens.selectedTextColor : props.tokens.textColor
  };
  font-size: ${props => props.tokens.fontSize};
  font-family: ${props => props.tokens.fontFamily};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => 
      props.variant === 'primary' 
        ? props.tokens.primaryColor + 'dd' 
        : props.tokens.hoverColor
    };
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.tokens.primaryColorLight};
  }
`;