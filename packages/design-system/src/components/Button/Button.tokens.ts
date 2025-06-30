import { ButtonTokens } from './Button.types';

export const buttonTokens: ButtonTokens = {
  variants: {
    primary: {
      background: '#5223BC',
      color: '#FFFFFF',
      hover: {
        background: '#6031CB'
      },
      active: {
        background: '#4319A2'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(82, 35, 188, 0.25)'
      }
    },
    tertiary: {
      background: 'transparent',
      color: '#5223BC',
      border: '2px solid',
      borderColor: '#5223BC',
      hover: {
        background: '#EEE9F8'
      },
      active: {
        background: '#DDD3F7'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(82, 35, 188, 0.25)'
      }
    },
    warning: {
      background: '#CE9F00',
      color: '#FFFFFF',
      hover: {
        background: '#D6AF2B'
      },
      active: {
        background: '#B58C00'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(206, 159, 0, 0.25)'
      }
    },
    danger: {
      background: '#DE350B',
      color: '#FFFFFF',
      hover: {
        background: '#E45734'
      },
      active: {
        background: '#BF2600'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(222, 53, 11, 0.25)'
      }
    },
    success: {
      background: '#008000',
      color: '#FFFFFF',
      hover: {
        background: '#2B962B'
      },
      active: {
        background: '#006600'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(0, 128, 0, 0.25)'
      }
    },
    link: {
      background: 'transparent',
      color: '#0052CC',
      hover: {
        color: '#2B6FD5',
        background: 'transparent'
      },
      active: {
        color: '#003D99'
      },
      focus: {
        outline: 'none'
      }
    },
    subtle: {
      background: 'transparent',
      color: '#8D8E90',
      hover: {
        background: '#EEE9F8',
        color: '#5223BC'
      },
      active: {
        background: '#DDD3F7',
        color: '#5223BC'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(141, 142, 144, 0.25)'
      }
    }
  },
  sizes: {
    small: {
      padding: '8px 14px',
      fontSize: '14px',
      iconSize: '14px',
      iconSpacing: '6px'
    },
    medium: {
      padding: '10px 16px',
      fontSize: '14px',
      iconSize: '16px',
      iconSpacing: '8px'
    },
    large: {
      padding: '12px 20px',
      fontSize: '16px',
      iconSize: '18px',
      iconSpacing: '10px'
    }
  },
  icon: {
    size: '16px',
    spacing: '8px'
  }
}; 