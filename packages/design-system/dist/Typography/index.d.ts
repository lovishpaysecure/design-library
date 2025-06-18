import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: TypographyVariant;
    weight?: TypographyWeight;
    align?: TypographyAlign;
    component?: keyof JSX.IntrinsicElements;
}

declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLDivElement>>;

export { Typography };
