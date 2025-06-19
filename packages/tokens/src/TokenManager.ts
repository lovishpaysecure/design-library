import { TokenComponent, TokenState, TokenSubscriber, TokenUpdateMessage, VirtualTokenState } from './types';
import { IndexedDBStorage } from './storage/indexeddb';

const CHUNK_SIZE = 1000; // Process tokens in chunks of 1000
const SHARED_BUFFER_SIZE = 16384; // 16KB buffer for cross-thread communication

export class TokenManager {
  private static instance: TokenManager;
  private storage: IndexedDBStorage;
  private subscribers = new Map<string, Set<TokenSubscriber>>();
  private updateChannel: MessageChannel;
  private sharedBuffer?: SharedArrayBuffer;
  private virtualState: VirtualTokenState = { pending: new Set(), processed: new Map() };
  private updateScheduled = false;
  private loadPromises = new Map<string, Promise<void>>();

  private constructor() {
    this.storage = new IndexedDBStorage();
    this.updateChannel = new MessageChannel();
    
    // Try to create SharedArrayBuffer if available
    try {
      if (typeof SharedArrayBuffer !== 'undefined') {
        this.sharedBuffer = new SharedArrayBuffer(SHARED_BUFFER_SIZE);
      }
    } catch (error) {
      console.warn('SharedArrayBuffer is not available. Falling back to regular messaging.');
    }
    
    this.setupUpdateChannel();
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private setupUpdateChannel() {
    this.updateChannel.port1.onmessage = (event: MessageEvent<TokenUpdateMessage>) => {
      if (event.data.type === 'update') {
        this.handleTokenUpdate(event.data.state);
      }
    };
  }

  private async handleTokenUpdate(state: TokenState) {
    // Update virtual state
    Object.entries(state.components).forEach(([id, component]) => {
      this.virtualState.processed.set(id, component);
      this.virtualState.pending.delete(id);
    });

    // Schedule DOM update
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      requestAnimationFrame(() => this.flushUpdates());
    }

    // Cache the processed tokens
    await this.storage.setTokens(state.components);
  }

  private flushUpdates() {
    const updates = Array.from(this.virtualState.processed.entries());
    this.subscribers.forEach((subscribers, componentType) => {
      const relevantUpdates = updates.filter(([_, token]) => token.type === componentType);
      if (relevantUpdates.length > 0) {
        const state: TokenState = {
          components: Object.fromEntries(relevantUpdates),
          timestamp: Date.now()
        };
        subscribers.forEach(subscriber => subscriber(state));
      }
    });
    this.updateScheduled = false;
  }

  async processTokens(tokens: Record<string, TokenComponent>) {
    // Process tokens synchronously without worker
    const processedTokens: Record<string, TokenComponent> = {};
    for (const [key, value] of Object.entries(tokens)) {
      processedTokens[key] = {
        ...value,
        processed: true,
        timestamp: Date.now()
      };
    }

    const state: TokenState = {
      components: processedTokens,
      timestamp: Date.now()
    };

    // Handle the update
    await this.handleTokenUpdate(state);
    return state;
  }

  async getTokens(componentTypes: string[]): Promise<TokenState> {
    const cached = await this.storage.getTokens(componentTypes);
    if (cached) {
      return {
        components: cached,
        timestamp: Date.now()
      };
    }
    return {
      components: {},
      timestamp: Date.now()
    };
  }

  subscribe(componentType: string, callback: TokenSubscriber) {
    if (!this.subscribers.has(componentType)) {
      this.subscribers.set(componentType, new Set());
    }
    this.subscribers.get(componentType)!.add(callback);

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(componentType);
      if (subscribers) {
        subscribers.delete(callback);
      }
    };
  }

  async preloadTokens(componentTypes: string[]) {
    const cached = await this.storage.getTokens(componentTypes);
    if (cached) {
      this.handleTokenUpdate({ components: cached, timestamp: Date.now() });
    }
  }
} 