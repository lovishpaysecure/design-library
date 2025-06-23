import { CheckboxTokens } from './CheckBox.types';

export const checkboxTokens: CheckboxTokens = {
  sizes: {
    small: {
      checkboxSize: '16px',
      iconSize: '12px',
      fontSize: '12px',
      gap: '8px',
      borderWidth: '1px',
    },
    medium: {
      checkboxSize: '20px',
      iconSize: '14px',
      fontSize: '14px',
      gap: '10px',
      borderWidth: '1px',
    },
    large: {
      checkboxSize: '24px',
      iconSize: '16px',
      fontSize: '16px',
      gap: '12px',
      borderWidth: '2px',
    },
  },
  colors: {
    primary: {
      unchecked: {
        background: '#FFFFFF',
        border: '#D1D5DB',
        color: '#6B7280',
      },
      checked: {
        background: '#5223BC',
        border: '#5223BC',
        color: '#FFFFFF',
      },
      indeterminate: {
        background: '#5223BC',
        border: '#5223BC',
        color: '#FFFFFF',
      },
      hover: {
        unchecked: {
          background: '#F9FAFB',
          border: '#5223BC',
        },
        checked: {
          background: '#6031CB',
          border: '#6031CB',
        },
      },
      focus: {
        ring: '0 0 0 2px rgba(82, 35, 188, 0.2)',
      },
    },
    disabled: {
      unchecked: {
        background: '#F3F4F6',
        border: '#E5E7EB',
        color: '#D1D5DB',
      },
      checked: {
        background: '#E5E7EB',
        border: '#E5E7EB',
        color: '#9CA3AF',
      },
      indeterminate: {
        background: '#E5E7EB',
        border: '#E5E7EB',
        color: '#9CA3AF',
      },
      hover: {
        unchecked: {
          background: '#F3F4F6',
          border: '#E5E7EB',
        },
        checked: {
          background: '#E5E7EB',
          border: '#E5E7EB',
        },
      },
      focus: {
        ring: 'none',
      },
    },
    error: {
      unchecked: {
        background: '#FFFFFF',
        border: '#EF4444',
        color: '#EF4444',
      },
      checked: {
        background: '#EF4444',
        border: '#EF4444',
        color: '#FFFFFF',
      },
      indeterminate: {
        background: '#EF4444',
        border: '#EF4444',
        color: '#FFFFFF',
      },
      hover: {
        unchecked: {
          background: '#FEF2F2',
          border: '#DC2626',
        },
        checked: {
          background: '#DC2626',
          border: '#DC2626',
        },
      },
      focus: {
        ring: '0 0 0 2px rgba(239, 68, 68, 0.2)',
      },
    },
  },
  labelColor: '#111827',
  labelDisabledColor: '#9CA3AF',
}; 