import { TokenManager } from './TokenManager';
export * from './types';
export { TokenManager };

// Re-export storage implementations
export { IndexedDBStorage } from './storage/indexeddb';

// Initialize token system
export async function initializeTokenSystem() {
  const manager = TokenManager.getInstance();
  return manager;
}

// Preload tokens for critical components
export async function preloadTokens(componentTypes: string[]) {
  const manager = TokenManager.getInstance();
  await manager.preloadTokens(componentTypes);
}

// Get tokens for a component
export async function getTokens(componentType: string) {
  const manager = TokenManager.getInstance();
  return manager.getTokens([componentType]);
}

// Process tokens
export async function processTokens(tokens: Record<string, any>) {
  const manager = TokenManager.getInstance();
  return manager.processTokens(tokens);
} 