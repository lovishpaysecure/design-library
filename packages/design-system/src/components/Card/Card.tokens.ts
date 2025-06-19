import { CardTokens } from './Card.types';

export const cardTokens: CardTokens = {
  variants: {
    default: {
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      boxShadow: "0px 2px 4px 0px #0000001F"
    },
    outlined: {
      background: '#ffffff',
      borderRadius: '12px',
      border: "1px solid var(--borders-border-primary, #EBECEC)",
      boxShadow: 'none',
    },
    elevated: {
      background: '#ffffff',
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    },
    filled: {
      background: '#f8fafc',
      borderRadius: '8px',
      border: 'none',
      boxShadow: 'none',
    },
  },
  padding: {
    none: '0',
    small: '12px',
    medium: '16px',
    large: '24px',
    'x-large': '32px',
  },
}; 