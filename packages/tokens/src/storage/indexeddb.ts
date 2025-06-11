import { openDB } from 'idb';
import { TokenComponent, TokenStorage } from '../types';

const DB_NAME = 'design-tokens';
const STORE_NAME = 'tokens';
const DB_VERSION = 1;

export class IndexedDBStorage implements TokenStorage {
  private dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });

  async getTokens(componentTypes: string[]): Promise<Record<string, TokenComponent> | null> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const tokens: Record<string, TokenComponent> = {};
    for (const type of componentTypes) {
      const value = await store.get(type);
      if (value) {
        Object.assign(tokens, value);
      }
    }

    return Object.keys(tokens).length > 0 ? tokens : null;
  }

  async setTokens(tokens: Record<string, TokenComponent>): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Group tokens by component type
    const tokensByType = Object.entries(tokens).reduce((acc, [id, token]) => {
      if (!acc[token.type]) {
        acc[token.type] = {};
      }
      acc[token.type][id] = token;
      return acc;
    }, {} as Record<string, Record<string, TokenComponent>>);

    // Store tokens by type
    await Promise.all(
      Object.entries(tokensByType).map(([type, tokens]) =>
        store.put(tokens, type)
      )
    );
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).clear();
  }
} 