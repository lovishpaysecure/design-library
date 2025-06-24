import React, { useEffect, useRef } from 'react';
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
    checked = false,
    indeterminate = false,
    isDisabled = false,
    onChange,
    id,
    className,
    ...props
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref || inputRef) as React.RefObject<HTMLInputElement>;

    // Handle indeterminate state on the native input element
    useEffect(() => {
      if (finalRef.current) {
        finalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, finalRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      
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
          checked={checked}
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
              userSelect: 'none',
              lineHeight: '1.2',
              display: 'flex',
              alignItems: 'center'
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