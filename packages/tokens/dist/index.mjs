// src/storage/indexeddb.ts
import { openDB } from "idb";
var DB_NAME = "design-tokens";
var STORE_NAME = "tokens";
var DB_VERSION = 1;
var IndexedDBStorage = class {
  constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      }
    });
  }
  async getTokens(componentTypes) {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const tokens = {};
    for (const type of componentTypes) {
      const value = await store.get(type);
      if (value) {
        Object.assign(tokens, value);
      }
    }
    return Object.keys(tokens).length > 0 ? tokens : null;
  }
  async setTokens(tokens) {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const tokensByType = Object.entries(tokens).reduce((acc, [id, token]) => {
      if (!acc[token.type]) {
        acc[token.type] = {};
      }
      acc[token.type][id] = token;
      return acc;
    }, {});
    await Promise.all(
      Object.entries(tokensByType).map(
        ([type, tokens2]) => store.put(tokens2, type)
      )
    );
  }
  async clear() {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.objectStore(STORE_NAME).clear();
  }
};

// src/TokenManager.ts
var SHARED_BUFFER_SIZE = 16384;
var TokenManager = class {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
    this.virtualState = { pending: /* @__PURE__ */ new Set(), processed: /* @__PURE__ */ new Map() };
    this.updateScheduled = false;
    this.loadPromises = /* @__PURE__ */ new Map();
    this.storage = new IndexedDBStorage();
    this.updateChannel = new MessageChannel();
    try {
      if (typeof SharedArrayBuffer !== "undefined") {
        this.sharedBuffer = new SharedArrayBuffer(SHARED_BUFFER_SIZE);
      }
    } catch (error) {
      console.warn("SharedArrayBuffer is not available. Falling back to regular messaging.");
    }
    this.setupUpdateChannel();
  }
  static getInstance() {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }
  setupUpdateChannel() {
    this.updateChannel.port1.onmessage = (event) => {
      if (event.data.type === "update") {
        this.handleTokenUpdate(event.data.state);
      }
    };
  }
  async handleTokenUpdate(state) {
    Object.entries(state.components).forEach(([id, component]) => {
      this.virtualState.processed.set(id, component);
      this.virtualState.pending.delete(id);
    });
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      requestAnimationFrame(() => this.flushUpdates());
    }
    await this.storage.setTokens(state.components);
  }
  flushUpdates() {
    const updates = Array.from(this.virtualState.processed.entries());
    this.subscribers.forEach((subscribers, componentType) => {
      const relevantUpdates = updates.filter(([_, token]) => token.type === componentType);
      if (relevantUpdates.length > 0) {
        const state = {
          components: Object.fromEntries(relevantUpdates),
          timestamp: Date.now()
        };
        subscribers.forEach((subscriber) => subscriber(state));
      }
    });
    this.updateScheduled = false;
  }
  async processTokens(tokens) {
    const processedTokens = {};
    for (const [key, value] of Object.entries(tokens)) {
      processedTokens[key] = {
        ...value,
        processed: true,
        timestamp: Date.now()
      };
    }
    const state = {
      components: processedTokens,
      timestamp: Date.now()
    };
    await this.handleTokenUpdate(state);
    return state;
  }
  async getTokens(componentTypes) {
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
  subscribe(componentType, callback) {
    if (!this.subscribers.has(componentType)) {
      this.subscribers.set(componentType, /* @__PURE__ */ new Set());
    }
    this.subscribers.get(componentType).add(callback);
    return () => {
      const subscribers = this.subscribers.get(componentType);
      if (subscribers) {
        subscribers.delete(callback);
      }
    };
  }
  async preloadTokens(componentTypes) {
    const cached = await this.storage.getTokens(componentTypes);
    if (cached) {
      this.handleTokenUpdate({ components: cached, timestamp: Date.now() });
    }
  }
};

// src/types.ts
import { z } from "zod";
var TokenValueSchema = z.object({
  value: z.string(),
  type: z.enum(["color", "spacing", "typography", "shadow", "border", "opacity", "size", "other"]),
  description: z.string().optional(),
  category: z.string()
});
var TokenChunkSchema = z.object({
  id: z.string(),
  tokens: z.record(TokenValueSchema),
  dependencies: z.array(z.string()).optional(),
  version: z.string()
});

// src/index.ts
async function initializeTokenSystem() {
  const manager = TokenManager.getInstance();
  return manager;
}
async function preloadTokens(componentTypes) {
  const manager = TokenManager.getInstance();
  await manager.preloadTokens(componentTypes);
}
async function getTokens(componentType) {
  const manager = TokenManager.getInstance();
  return manager.getTokens([componentType]);
}
async function processTokens(tokens) {
  const manager = TokenManager.getInstance();
  return manager.processTokens(tokens);
}
export {
  IndexedDBStorage,
  TokenChunkSchema,
  TokenManager,
  TokenValueSchema,
  getTokens,
  initializeTokenSystem,
  preloadTokens,
  processTokens
};
