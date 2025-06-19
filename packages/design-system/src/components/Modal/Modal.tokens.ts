import { ModalTokens } from './Modal.types';

export const modalTokens: ModalTokens = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
  },
  modal: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
  },
  sizes: {
    small: {
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '80vh',
    },
    medium: {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '80vh',
    },
    large: {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '85vh',
    },
    'x-large': {
      width: '1200px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    },
    full: {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
    },
  },
  variants: {
    default: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '0',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    compact: {
      background: '#ffffff',
      borderRadius: '8px',
      padding: '0',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    sidebar: {
      background: '#ffffff',
      borderRadius: '0',
      padding: '0',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
    },
    fullscreen: {
      background: '#ffffff',
      borderRadius: '0',
      padding: '0',
      boxShadow: 'none',
    },
  },
  positions: {
    center: {
      transform: 'translate(-50%, -50%)',
      top: '50%',
    },
    top: {
      transform: 'translate(-50%, 0)',
      top: '10%',
    },
    bottom: {
      transform: 'translate(-50%, 0)',
      bottom: '10%',
    },
  },
  header: {
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid #e5e7eb',
    background: '#ffffff',
  },
  body: {
    padding: '16px 24px',
    maxHeight: 'calc(80vh - 200px)',
    overflow: 'auto',
  },
  footer: {
    padding: '16px 24px 24px 24px',
    borderTop: '1px solid #e5e7eb',
    background: '#ffffff',
    justifyContent: 'flex-end',
  },
  closeButton: {
    size: '32px',
    color: '#6b7280',
    hoverColor: '#374151',
    background: 'transparent',
    hoverBackground: '#f3f4f6',
    borderRadius: '6px',
  },
  animation: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    slideDistance: '20px',
  },
}; 