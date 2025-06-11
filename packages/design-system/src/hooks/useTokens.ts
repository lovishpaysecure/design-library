import { useEffect, useState } from 'react';
import { TokenManager, TokenState } from '../utils/mockTokenManager';

export interface TokenValue {
  [key: string]: string | TokenValue;
}

export interface TokenConfig {
  [section: string]: TokenValue;
}

export function useTokens<T extends { [key: string]: any }>(componentType: string, defaultTokens: T): T {
  const [tokens, setTokens] = useState<T>(defaultTokens);

  useEffect(() => {
    const manager = TokenManager.getInstance();
    const unsubscribe = manager.subscribe(componentType, (state: TokenState) => {
      // Update tokens if they exist in the state
      if (state.components[componentType]) {
        setTokens(state.components[componentType].value as T);
      }
    });

    // Preload tokens for this component
    manager.preloadTokens([componentType]);

    return unsubscribe;
  }, [componentType]);

  return tokens;
} 