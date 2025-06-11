import { TokenValue } from './types';

export const defaultTokens: Record<string, Record<string, TokenValue>> = {
  button: {
    'button-primary-bg': {
      value: '#007bff',
      type: 'color',
      category: 'button',
      description: 'Primary button background color'
    },
    'button-primary-color': {
      value: '#ffffff',
      type: 'color',
      category: 'button',
      description: 'Primary button text color'
    },
    'button-primary-hover-bg': {
      value: '#0056b3',
      type: 'color',
      category: 'button',
      description: 'Primary button hover background color'
    },
    'button-secondary-bg': {
      value: '#6c757d',
      type: 'color',
      category: 'button',
      description: 'Secondary button background color'
    },
    'button-secondary-color': {
      value: '#ffffff',
      type: 'color',
      category: 'button',
      description: 'Secondary button text color'
    },
    'button-secondary-hover-bg': {
      value: '#545b62',
      type: 'color',
      category: 'button',
      description: 'Secondary button hover background color'
    },
    'button-tertiary-bg': {
      value: 'transparent',
      type: 'color',
      category: 'button',
      description: 'Tertiary button background color'
    },
    'button-tertiary-color': {
      value: '#007bff',
      type: 'color',
      category: 'button',
      description: 'Tertiary button text color'
    },
    'button-tertiary-hover-bg': {
      value: 'rgba(0, 123, 255, 0.1)',
      type: 'color',
      category: 'button',
      description: 'Tertiary button hover background color'
    },
    'button-border-radius': {
      value: '4px',
      type: 'size',
      category: 'button',
      description: 'Button border radius'
    },
    'button-small-padding': {
      value: '4px 8px',
      type: 'spacing',
      category: 'button',
      description: 'Small button padding'
    },
    'button-medium-padding': {
      value: '8px 16px',
      type: 'spacing',
      category: 'button',
      description: 'Medium button padding'
    },
    'button-large-padding': {
      value: '12px 24px',
      type: 'spacing',
      category: 'button',
      description: 'Large button padding'
    },
    'button-small-font-size': {
      value: '12px',
      type: 'typography',
      category: 'button',
      description: 'Small button font size'
    },
    'button-medium-font-size': {
      value: '14px',
      type: 'typography',
      category: 'button',
      description: 'Medium button font size'
    },
    'button-large-font-size': {
      value: '16px',
      type: 'typography',
      category: 'button',
      description: 'Large button font size'
    }
  },
  // Add other component tokens here
}; 