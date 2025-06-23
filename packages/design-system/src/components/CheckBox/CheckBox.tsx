import React, { useEffect, useRef, useState } from 'react';
import { CheckboxProps, CheckboxState } from './CheckBox.types';
import { Typography } from '../Typography/Typography';
import { StyledCheckboxContainer, StyledCheckbox } from '../../styles/CheckBox.styles';

// Map checkbox sizes to typography variants
const getTypographyVariant = (size: CheckboxProps['size']) => {
  switch (size) {
    case 'small':
      return 'caption'; // 12px
    case 'medium':
      return 'body2'; // 14px
    case 'large':
      return 'body1'; // 16px
    default:
      return 'body2';
  }
};

export const CheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    size = 'medium',
    color = 'primary',
    label,
    checked,
    indeterminate = false,
    isDisabled = false,
    onChange,
    id,
    className,
    ...props
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref || inputRef) as React.RefObject<HTMLInputElement>;

    // Determine if controlled (has checked prop AND onChange) or uncontrolled
    const isControlled = checked !== undefined && onChange !== undefined;
    const [internalChecked, setInternalChecked] = useState(checked ?? false);
    
    // Update internal state when checked prop changes (for controlled mode)
    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    // Use controlled value if available, otherwise use internal state
    const actualChecked = isControlled ? checked : internalChecked;

    // Handle indeterminate state
    useEffect(() => {
      if (finalRef.current) {
        finalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, finalRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      
      // Always update internal state for immediate UI feedback
      setInternalChecked(newChecked);
      
      // Call onChange callback if provided
      if (onChange) {
        onChange(newChecked, event);
      }
    };

    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <StyledCheckboxContainer
        className={className}
        size={size}
        color={color}
        isDisabled={isDisabled}
      >
        <StyledCheckbox
          ref={finalRef}
          id={checkboxId}
          checked={actualChecked}
          disabled={isDisabled}
          onChange={handleInputChange}
          size={size}
          color={color}
          indeterminate={indeterminate}
          isDisabled={isDisabled}
          data-indeterminate={indeterminate}
          {...props}
        />
        {label && (
          <Typography
            variant={getTypographyVariant(size)}
            component="label"
            style={{
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              userSelect: 'none'
            }}
            onClick={() => {
              if (!isDisabled && finalRef.current) {
                finalRef.current.click();
              }
            }}
          >
            {label}
          </Typography>
        )}
      </StyledCheckboxContainer>
    );
  }
);

CheckBox.displayName = 'CheckBox'; 