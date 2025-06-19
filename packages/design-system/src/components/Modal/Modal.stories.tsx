import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import { Button } from '../Button';
import { Typography } from '../Typography';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'x-large', 'full'],
      description: 'Size of the modal',
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom'],
      description: 'Position of the modal',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'sidebar', 'fullscreen'],
      description: 'Visual variant of the modal',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    subtitle: {
      control: 'text',
      description: 'Modal subtitle',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closable: {
      control: 'boolean',
      description: 'Allow modal to be closed',
    },
    preventBackdropClose: {
      control: 'boolean',
      description: 'Prevent closing when clicking backdrop',
    },
    customWidth: {
      control: 'text',
      description: 'Custom width override',
    },
    customHeight: {
      control: 'text',
      description: 'Custom height override',
    },
    customBackground: {
      control: 'color',
      description: 'Custom background color',
    },
    customBorderRadius: {
      control: 'text',
      description: 'Custom border radius',
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds',
    },
    disableAnimation: {
      control: 'boolean',
      description: 'Disable modal animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Helper component for interactive demos
const ModalDemo: React.FC<{ children: (props: { isOpen: boolean; onOpen: () => void; onClose: () => void }) => React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {children({
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      })}
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <Button onClick={onOpen}>Open Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Default Modal"
            subtitle="This is a basic modal example"
                     >
             <Typography variant="body1" margin="0 0 16px 0">
               This is the modal content. It can contain any React components.
             </Typography>
             <Typography variant="body1" margin="0">
               The modal is responsive and will adapt to different screen sizes.
             </Typography>
           </Modal>
        </>
      )}
    </ModalDemo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {(['small', 'medium', 'large', 'x-large'] as const).map((size) => (
        <ModalDemo key={size}>
          {({ isOpen, onOpen, onClose }) => (
            <>
              <Button onClick={onOpen} variant="tertiary">
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={size}
                title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                subtitle={`This is a ${size} sized modal`}
                             >
                 <Typography variant="body1" margin="0 0 16px 0">
                   Modal content scales with the size prop.
                 </Typography>
                 <Typography variant="body1" margin="0">
                   Available sizes: small, medium, large, x-large, full
                 </Typography>
               </Modal>
            </>
          )}
        </ModalDemo>
      ))}
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      {(['center', 'top', 'bottom'] as const).map((position) => (
        <ModalDemo key={position}>
          {({ isOpen, onOpen, onClose }) => (
            <>
              <Button onClick={onOpen} variant="tertiary">
                {position.charAt(0).toUpperCase() + position.slice(1)}
              </Button>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                position={position}
                title={`${position.charAt(0).toUpperCase() + position.slice(1)} Position`}
                subtitle={`Modal positioned at ${position}`}
                             >
                 <Typography variant="body1" margin="0">
                   This modal is positioned at the {position} of the viewport.
                 </Typography>
               </Modal>
            </>
          )}
        </ModalDemo>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {(['default', 'compact', 'sidebar', 'fullscreen'] as const).map((variant) => (
        <ModalDemo key={variant}>
          {({ isOpen, onOpen, onClose }) => (
            <>
              <Button onClick={onOpen} variant="tertiary">
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                variant={variant}
                title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
                subtitle={`This is a ${variant} variant`}
                             >
                 <Typography variant="body1" margin="0 0 16px 0">
                   Different variants provide different visual styles and behaviors.
                 </Typography>
                 <Typography variant="body1" margin="0">
                   The {variant} variant has its own styling and positioning.
                 </Typography>
               </Modal>
            </>
          )}
        </ModalDemo>
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <Button onClick={onOpen}>Modal with Footer</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modal with Footer"
            subtitle="This modal includes action buttons in the footer"
                     >
             <Typography variant="body1" margin="0 0 16px 0">
               Main content goes here...
             </Typography>
             <Typography variant="body1" margin="0">
               You can include forms, data, or any other content.
             </Typography>
             
             <div slot="footer">
              <Button variant="tertiary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onClose}>
                Save Changes
              </Button>
            </div>
          </Modal>
        </>
      )}
    </ModalDemo>
  ),
};

export const SelectInsightsExample: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => {
        const [selectedInsights, setSelectedInsights] = useState<string[]>([
          'totalRevenue',
          'paymentsCount',
          'expiredPaymentsCount',
          'refundCount',
          'chargebackAmount',
          'fraudTransactions'
        ]);

        const insights = [
          { id: 'totalRevenue', label: 'Total revenue' },
          { id: 'paymentsCount', label: 'Payments count' },
          { id: 'expiredPaymentsCount', label: 'Expired payments count' },
          { id: 'refundCount', label: 'Refund count' },
          { id: 'chargebackAmount', label: 'Chargeback amount' },
          { id: 'fraudTransactions', label: 'Fraud transactions' },
          { id: 'averageTransactionValue', label: 'Average transaction value' },
          { id: 'conversionRate', label: 'Conversion rate' },
          { id: 'customerLifetimeValue', label: 'Customer lifetime value' },
        ];

        const toggleInsight = (id: string) => {
          setSelectedInsights(prev => 
            prev.includes(id) 
              ? prev.filter(item => item !== id)
              : [...prev, id]
          );
        };

        return (
          <>
            <Button onClick={onOpen}>Select top insights</Button>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              title="Select top insights"
              subtitle="6/9 insights selected"
              size="medium"
              customWidth="600px"
            >
                             <div style={{ 
                 display: 'flex', 
                 flexDirection: 'column', 
                 gap: '12px',
                 maxHeight: '400px',
                 overflow: 'auto'
               }}>
                 {insights.map((insight) => (
                   <label
                     key={insight.id}
                     style={{
                       display: 'flex',
                       alignItems: 'center',
                       gap: '12px',
                       padding: '12px',
                       border: '1px solid #e5e7eb',
                       borderRadius: '8px',
                       cursor: 'pointer',
                       backgroundColor: selectedInsights.includes(insight.id) ? '#f0f9ff' : '#ffffff',
                       borderColor: selectedInsights.includes(insight.id) ? '#3b82f6' : '#e5e7eb',
                     }}
                   >
                     <input
                       type="checkbox"
                       checked={selectedInsights.includes(insight.id)}
                       onChange={() => toggleInsight(insight.id)}
                       style={{
                         width: '16px',
                         height: '16px',
                         accentColor: '#3b82f6'
                       }}
                     />
                     <Typography variant="body2" margin="0">
                       {insight.label}
                     </Typography>
                   </label>
                 ))}
               </div>
              
              <div slot="footer">
                <Button variant="tertiary" onClick={onClose}>
                  Discard
                </Button>
                <Button variant="primary" onClick={onClose}>
                  Save
                </Button>
              </div>
            </Modal>
          </>
        );
      }}
    </ModalDemo>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <Button onClick={onOpen}>Custom Styled Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Custom Styled Modal"
            customBackground="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            customBorderRadius="20px"
            customWidth="500px"
                     >
             <div style={{ color: 'white', textAlign: 'center' }}>
               <Typography variant="h5" weight="semibold" margin="0 0 16px 0" style={{ color: 'white' }}>
                 Beautiful Gradient
               </Typography>
               <Typography variant="body1" margin="0" style={{ color: 'white', opacity: 0.9 }}>
                 This modal demonstrates custom styling capabilities with gradient backgrounds
                 and custom dimensions.
               </Typography>
             </div>
           </Modal>
        </>
      )}
    </ModalDemo>
  ),
};

export const NonClosable: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <Button onClick={onOpen}>Non-Closable Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Important Action Required"
            subtitle="This modal cannot be dismissed by clicking outside"
            closable={false}
            preventBackdropClose={true}
            showCloseButton={false}
                     >
             <Typography variant="body1" margin="0 0 16px 0">
               This modal requires explicit user action and cannot be dismissed accidentally.
             </Typography>
             <Typography variant="body1" margin="0">
               Use this pattern for critical confirmations or required actions.
             </Typography>
             
             <div slot="footer">
              <Button variant="primary" onClick={onClose}>
                Complete Action
              </Button>
            </div>
          </Modal>
        </>
      )}
    </ModalDemo>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalDemo>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <Button onClick={onOpen}>Long Content Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Terms and Conditions"
            subtitle="Please read through all terms carefully"
                     >
             <div>
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 1. Introduction
               </Typography>
               <Typography variant="body1" margin="0 0 24px 0">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </Typography>
               
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 2. User Agreement
               </Typography>
               <Typography variant="body1" margin="0 0 24px 0">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </Typography>
               
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 3. Privacy Policy
               </Typography>
               <Typography variant="body1" margin="0 0 24px 0">
                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
               </Typography>
               
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 4. Data Usage
               </Typography>
               <Typography variant="body1" margin="0 0 24px 0">
                 Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
               </Typography>
               
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 5. Termination
               </Typography>
               <Typography variant="body1" margin="0 0 24px 0">
                 Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
               </Typography>
               
               <Typography variant="h6" weight="semibold" margin="0 0 12px 0">
                 6. Contact Information
               </Typography>
               <Typography variant="body1" margin="0">
                 Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
               </Typography>
             </div>
            
            <div slot="footer">
              <Button variant="tertiary" onClick={onClose}>
                Decline
              </Button>
              <Button variant="primary" onClick={onClose}>
                Accept Terms
              </Button>
            </div>
          </Modal>
        </>
      )}
    </ModalDemo>
  ),
}; 