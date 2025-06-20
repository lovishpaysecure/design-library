import { useEffect, useState } from 'react';
import { TokenManager, TokenState } from '../utils/mockTokenManager';

export interface TokenValue {
  [key: string]: string | TokenValue;
}

export interface TokenConfig {
  [section: string]: TokenValue;
}

export function useTokens<T extends { [key: string]: any }>(componentType: string, defaultTokens: T, customTokens?: Partial<T>): T {
  const [tokens, setTokens] = useState<T>(() => {
    // Deep merge defaultTokens with customTokens
    if (customTokens) {
      return deepMerge(defaultTokens, customTokens);
    }
    return defaultTokens;
  });

  useEffect(() => {
    const manager = TokenManager.getInstance();
    const unsubscribe = manager.subscribe(componentType, (state: TokenState) => {
      // Update tokens if they exist in the state
      if (state.components[componentType]) {
        let mergedTokens = state.components[componentType].value as T;
        if (customTokens) {
          mergedTokens = deepMerge(mergedTokens, customTokens);
        }
        setTokens(mergedTokens);
      }
    });

    // Preload tokens for this component
    manager.preloadTokens([componentType]);

    return unsubscribe;
  }, [componentType, customTokens]);

  return tokens;
}

// Helper function for deep merging objects
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key], source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }
  
  return result;
} 