import { wrap, Remote } from 'comlink';
import { TokenComponent, TokenState, TokenSubscriber, TokenUpdateMessage, VirtualTokenState } from './types';
import { IndexedDBStorage } from './storage/indexeddb';
import { TokenWorkerAPI } from './worker/token.worker';

const CHUNK_SIZE = 1000; // Process tokens in chunks of 1000
const SHARED_BUFFER_SIZE = 16384; // 16KB buffer for cross-thread communication

export class TokenManager {
  private static instance: TokenManager;
  private storage: IndexedDBStorage;
  private subscribers = new Map<string, Set<TokenSubscriber>>();
  private worker: Remote<TokenWorkerAPI>;
  private updateChannel: MessageChannel;
  private sharedBuffer?: SharedArrayBuffer;
  private virtualState: VirtualTokenState = { pending: new Set(), processed: new Map() };
  private updateScheduled = false;
  private loadPromises = new Map<string, Promise<void>>();

  private constructor() {
    this.storage = new IndexedDBStorage();
    this.worker = wrap<TokenWorkerAPI>(new Worker(new URL('./worker/token.worker.ts', import.meta.url).href));
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
    const entries = Object.entries(tokens);
    const chunks = [];
    
    // Split tokens into chunks
    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      chunks.push(Object.fromEntries(entries.slice(i, i + CHUNK_SIZE)));
    }

    // Process chunks in parallel
    const promises = chunks.map(chunk => this.worker.processTokens(chunk));
    const results = await Promise.all(promises);

    // Merge results
    const mergedState: TokenState = {
      components: {},
      timestamp: Date.now()
    };

    results.forEach(result => {
      Object.assign(mergedState.components, result.components);
    });

    return mergedState;
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