import React from 'react';

export type CheckboxVariant = 'checkbox' | 'checkbox-label';
export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxColor = 'primary' | 'disabled' | 'error';
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

export interface StyledCheckboxProps {
  $variant?: CheckboxVariant;
  $size?: CheckboxSize;
  $color?: CheckboxColor;
  $state?: CheckboxState;
  $disabled?: boolean;
  $hasLabel?: boolean;
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color' | 'onChange' | 'checked'> {
  /**
   * The variant of the checkbox
   * @default 'checkbox'
   */
  variant?: CheckboxVariant;
  /**
   * The size of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize;
  /**
   * The color variant of the checkbox
   * @default 'primary'
   */
  color?: CheckboxColor;
  /**
   * The label of the checkbox
   */
  label?: string;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is required
   */
  isRequired?: boolean;
  /**
   * The id of the checkbox
   */
  id?: string;
  /**
   * The name of the checkbox
   */
  name?: string;
  /**
   * The value of the checkbox
   */
  value?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS class for the container
   */
  className?: string;
}

export interface CheckboxTokens {
  sizes: {
    small: SizeTokens;
    medium: SizeTokens;
    large: SizeTokens;
  };
  colors: {
    primary: ColorTokens;
    disabled: ColorTokens;
    error: ColorTokens;
  };
  labelColor: string;
  labelDisabledColor: string;
}

interface SizeTokens {
  checkboxSize: string;
  iconSize: string;
  fontSize: string;
  gap: string;
  borderWidth: string;
}

interface ColorTokens {
  unchecked: {
    background: string;
    border: string;
    color: string;
  };
  checked: {
    background: string;
    border: string;
    color: string;
  };
  indeterminate: {
    background: string;
    border: string;
    color: string;
  };
  hover: {
    unchecked: {
      background: string;
      border: string;
    };
    checked: {
      background: string;
      border: string;
    };
  };
  focus: {
    ring: string;
  };
} 