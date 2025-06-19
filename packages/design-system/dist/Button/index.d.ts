import React from 'react';

type ButtonVariant = 'primary' | 'tertiary' | 'warning' | 'danger' | 'success' | 'link';
type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}
interface ButtonTokens {
    variants: {
        [key in ButtonVariant]: {
            background: string;
            color: string;
            hover?: {
                background?: string;
                color?: string;
            };
            active?: {
                background?: string;
                color?: string;
            };
            focus?: {
                outline?: string;
                ring?: string;
            };
            border?: string;
            borderColor?: string;
        };
    };
    sizes: {
        [key in ButtonSize]: {
            padding: string;
            fontSize: string;
        };
    };
}

declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button, ButtonProps, ButtonTokens };
