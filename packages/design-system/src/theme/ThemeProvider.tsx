import React, { useEffect, useState, ReactNode } from 'react';
import { TokenManager } from '@paysecure-design/tokens';

interface ThemeProviderProps {
  tokenUrl: string;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ tokenUrl, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await fetch(tokenUrl);
        if (!response.ok) throw new Error('Failed to fetch tokens');
        const tokens = await response.json();
        await TokenManager.getInstance().processTokens(tokens);
      } catch (e) {
        // If fetch fails, do nothing: components will use their default tokens
        console.warn('Token fetch failed, using defaults.', e);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, [tokenUrl]);

  if (loading) return null;

  return <>{children}</>;
}; 