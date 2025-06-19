import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import { ButtonProps, ButtonTokens } from './Button.types';
import { StyledButton } from '../../styles/Button.styles';
import { buttonTokens } from './Button.tokens';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth, children, ...props }, ref) => {
    const tokens = useTokens<ButtonTokens>('button', buttonTokens);

    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        tokens={tokens}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
); 