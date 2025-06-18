export { Button } from './Button/index.js';
export { Typography } from './Typography/index.js';
import React, { ReactNode } from 'react';

interface TokenValue {
    [key: string]: string | TokenValue;
}
interface TokenConfig {
    [section: string]: TokenValue;
}
declare function useTokens<T extends {
    [key: string]: any;
}>(componentType: string, defaultTokens: T): T;

interface ThemeProviderProps {
    tokenUrl: string;
    children: ReactNode;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;

export { ThemeProvider, TokenConfig, TokenValue, useTokens };
