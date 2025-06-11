export { Button, ButtonProps, ButtonSize, ButtonVariant } from './Button/index.js';
export { Typography, TypographyAlign, TypographyProps, TypographyVariant, TypographyWeight } from './Typography/index.js';
import 'react';

interface TokenValue {
    [key: string]: string | TokenValue;
}
interface TokenConfig {
    [section: string]: TokenValue;
}
declare function useTokens<T extends {
    [key: string]: any;
}>(componentType: string, defaultTokens: T): T;

export { TokenConfig, TokenValue, useTokens };
