import { CATagsTokens } from './CATags.types';

export const catagsTokens: CATagsTokens = {
  variants: {
    default: {
      background: '#F2F4F7',
      color: '#344054',
      border: '1px solid',
      borderColor: '#D0D5DD',
      hover: {
        background: '#E4E7EC',
        borderColor: '#98A2B3'
      },
      active: {
        background: '#D0D5DD'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(52, 64, 84, 0.25)'
      }
    },
    primary: {
      background: '#F4F0FF',
      color: '#6B46C1',
      border: '1px solid',
      borderColor: '#A78BFA',
      hover: {
        background: '#EDE9FE',
        borderColor: '#8B5CF6'
      },
      active: {
        background: '#DDD6FE'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(107, 70, 193, 0.25)'
      }
    },
    success: {
      background: '#E6F7E6',
      color: '#0A5A0A',
      border: '1px solid',
      borderColor: '#B3E6B3',
      hover: {
        background: '#D4F0D4',
        borderColor: '#7FD47F'
      },
      active: {
        background: '#B3E6B3'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(0, 128, 0, 0.25)'
      }
    },
    warning: {
      background: '#FFF8E1',
      color: '#7A5A00',
      border: '1px solid',
      borderColor: '#F2D97A',
      hover: {
        background: '#FFF3C4',
        borderColor: '#EFCD47'
      },
      active: {
        background: '#F2D97A'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(206, 159, 0, 0.25)'
      }
    },
    danger: {
      background: '#FEF2F2',
      color: '#991B1B',
      border: '1px solid',
      borderColor: '#FECACA',
      hover: {
        background: '#FEE2E2',
        borderColor: '#FCA5A5'
      },
      active: {
        background: '#FECACA'
      },
      focus: {
        outline: 'none',
        ring: '0 0 0 2px rgba(222, 53, 11, 0.25)'
      }
    }
  },
  sizes: {
    small: {
      padding: '4px 8px',
      fontSize: '12px',
      height: '24px',
      iconSize: '12px',
      gap: '4px',
      typography: {
        variant: 'caption',
        weight: 'medium'
      }
    },
    medium: {
      padding: '6px 10px',
      fontSize: '14px',
      height: '28px',
      iconSize: '14px',
      gap: '6px',
      typography: {
        variant: 'caption',
        weight: 'medium'
      }
    },
    large: {
      padding: '8px 12px',
      fontSize: '16px',
      height: '32px',
      iconSize: '16px',
      gap: '8px',
      typography: {
        variant: 'body2',
        weight: 'medium'
      }
    }
  },
  container: {
    gap: '8px'
  },
  removeButton: {
    size: '16px',
    borderRadius: '50%',
    hover: {
      background: 'rgba(0, 0, 0, 0.1)'
    }
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: '1',
    maxWidth: '150px'
  }
}; 