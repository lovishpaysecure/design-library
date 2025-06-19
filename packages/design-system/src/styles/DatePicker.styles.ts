import styled, { css } from 'styled-components';
import { StyledDatePickerProps, StyledComponentProps } from '../components/DatePicker/DatePicker.types';

const getTokenValue = (tokens: any, path: string, defaultValue: string = '') => {
  if (!tokens?.datePicker) return defaultValue;
  return tokens.datePicker[path] || defaultValue;
};

export const DatePickerContainer = styled.div<StyledComponentProps>`
  position: relative;
  display: inline-block;
`;

export const DatePickerTrigger = styled.button<StyledDatePickerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ tokens }) => getTokenValue(tokens, 'padding', '8px 12px')};
  border: 1px solid ${({ tokens }) => getTokenValue(tokens, 'borderColor', '#E5E7EB')};
  border-radius: ${({ tokens }) => getTokenValue(tokens, 'borderRadius', '8px')};
  background: ${({ tokens }) => getTokenValue(tokens, 'background', '#FFFFFF')};
  color: ${({ tokens }) => getTokenValue(tokens, 'color', '#374151')};
  font-size: ${({ tokens }) => getTokenValue(tokens, 'fontSize', '14px')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ tokens }) => getTokenValue(tokens, 'hoverBackground', '#F3F4F6')};
  }
`;

export const DatePickerDropdown = styled.div<StyledDatePickerProps>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1000;
  background: ${({ tokens }) => getTokenValue(tokens, 'background', '#FFFFFF')};
  border: 1px solid ${({ tokens }) => getTokenValue(tokens, 'borderColor', '#E5E7EB')};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  padding: 16px;
  min-width: 800px;
`;

export const PresetList = styled.div<StyledComponentProps>`
  width: 160px;
  border-right: 1px solid ${({ tokens }) => getTokenValue(tokens, 'borderColor', '#E5E7EB')};
  padding-right: 16px;
  margin-right: 16px;
`;

export const PresetOption = styled.button<StyledDatePickerProps>`
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  border: none;
  background: none;
  color: ${({ tokens }) => getTokenValue(tokens, 'color', '#374151')};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  font-size: 14px;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: #6E41E2;
      color: white;
    `}

  &:hover:not(:disabled) {
    background: ${({ $isSelected }) => ($isSelected ? '#6E41E2' : '#F3F4F6')};
  }

  &:disabled {
    color: #9CA3AF;
    cursor: not-allowed;
  }
`;

export const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 32px;
`;

export const SingleCalendarContainer = styled.div`
  flex: 1;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  button {
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: #6B7280;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;

    &:hover:not(:disabled) {
      background: #F3F4F6;
      color: #374151;
    }

    &:disabled {
      cursor: not-allowed;
      color: #D1D5DB;
    }
  }
`;

export const MonthYearDisplay = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  text-align: center;
  flex: 1;
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  color: #6B7280;
  padding: 8px;
  font-weight: 500;
`;

export const DayCell = styled.button<StyledDatePickerProps>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #374151;
  position: relative;

  ${({ $isSelected, $isInRange }) => {
    if ($isSelected) {
      return css`
        background: #6E41E2;
        color: white;
        font-weight: 500;
      `;
    }
    if ($isInRange) {
      return css`
        background: rgba(110, 65, 226, 0.08);
        color: #374151;
      `;
    }
    return '';
  }}

  &:hover:not(:disabled) {
    background: ${({ $isSelected }) => ($isSelected ? '#6E41E2' : 'rgba(110, 65, 226, 0.08)')};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : '#374151')};
  }

  &:disabled {
    color: #D1D5DB;
    cursor: not-allowed;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
  width: 100%;
  gap: 24px;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TimeSelect = styled.select`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #F8F8F8 url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  width: 72px;
  appearance: none;
  text-align: center;

  &:focus {
    outline: none;
    background-color: #F3F4F6;
  }

  &:hover {
    background-color: #F3F4F6;
  }
`;

export const TimeSeparator = styled.span`
  color: #374151;
  font-size: 14px;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  min-width: 80px;
  transition: all 0.2s ease;

  &:hover {
    background: #F3F4F6;
  }
`;

export const ApplyButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #6E41E2;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  min-width: 80px;
  transition: background 0.2s ease;

  &:hover {
    background: #5D35C4;
  }
`;