import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
interface TypographyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    variant?: TypographyVariant;
    weight?: TypographyWeight;
    align?: TypographyAlign;
    component?: keyof JSX.IntrinsicElements;
    margin?: string;
    children: React.ReactNode;
}
interface TypographyTokens {
    variants: {
        [key in TypographyVariant]: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            textTransform?: string;
        };
    };
    weights: {
        [key in TypographyWeight]: string;
    };
    fontFamily: string;
}

declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLDivElement>>;

export { Typography, TypographyProps, TypographyTokens };
