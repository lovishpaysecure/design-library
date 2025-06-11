export interface TokenState {
  components: {
    [key: string]: {
      value: any;
    };
  };
}

export class TokenManager {
  private static instance: TokenManager;
  private subscribers: Map<string, ((state: TokenState) => void)[]>;
  private state: TokenState;

  private constructor() {
    this.subscribers = new Map();
    this.state = {
      components: {},
    };
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  subscribe(componentType: string, callback: (state: TokenState) => void): () => void {
    if (!this.subscribers.has(componentType)) {
      this.subscribers.set(componentType, []);
    }
    this.subscribers.get(componentType)?.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(componentType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  preloadTokens(componentTypes: string[]): void {
    // Mock implementation - does nothing
  }
} 