import React from 'react';

type ButtonVariant = 'primary' | 'tertiary' | 'warning' | 'danger' | 'success' | 'link';
type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}

declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button };
