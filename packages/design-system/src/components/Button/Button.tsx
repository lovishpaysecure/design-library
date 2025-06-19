import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from '../../styles/Button.styles';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth, children, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
); 