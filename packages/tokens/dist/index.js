"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  IndexedDBStorage: () => IndexedDBStorage,
  TokenChunkSchema: () => TokenChunkSchema,
  TokenManager: () => TokenManager,
  TokenValueSchema: () => TokenValueSchema,
  getTokens: () => getTokens,
  initializeTokenSystem: () => initializeTokenSystem,
  preloadTokens: () => preloadTokens,
  processTokens: () => processTokens
});
module.exports = __toCommonJS(src_exports);

// src/TokenManager.ts
var import_comlink = require("comlink");

// src/storage/indexeddb.ts
var import_idb = require("idb");
var DB_NAME = "design-tokens";
var STORE_NAME = "tokens";
var DB_VERSION = 1;
var IndexedDBStorage = class {
  constructor() {
    this.dbPromise = (0, import_idb.openDB)(DB_NAME, DB_VERSION, {
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
var import_meta = {};
var CHUNK_SIZE = 1e3;
var SHARED_BUFFER_SIZE = 16384;
var TokenManager = class {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
    this.virtualState = { pending: /* @__PURE__ */ new Set(), processed: /* @__PURE__ */ new Map() };
    this.updateScheduled = false;
    this.loadPromises = /* @__PURE__ */ new Map();
    this.storage = new IndexedDBStorage();
    this.worker = (0, import_comlink.wrap)(new Worker(new URL("./worker/token.worker.ts", import_meta.url).href));
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
    const entries = Object.entries(tokens);
    const chunks = [];
    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      chunks.push(Object.fromEntries(entries.slice(i, i + CHUNK_SIZE)));
    }
    const promises = chunks.map((chunk) => this.worker.processTokens(chunk));
    const results = await Promise.all(promises);
    const mergedState = {
      components: {},
      timestamp: Date.now()
    };
    results.forEach((result) => {
      Object.assign(mergedState.components, result.components);
    });
    return mergedState;
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
var import_zod = require("zod");
var TokenValueSchema = import_zod.z.object({
  value: import_zod.z.string(),
  type: import_zod.z.enum(["color", "spacing", "typography", "shadow", "border", "opacity", "size", "other"]),
  description: import_zod.z.string().optional(),
  category: import_zod.z.string()
});
var TokenChunkSchema = import_zod.z.object({
  id: import_zod.z.string(),
  tokens: import_zod.z.record(TokenValueSchema),
  dependencies: import_zod.z.array(import_zod.z.string()).optional(),
  version: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IndexedDBStorage,
  TokenChunkSchema,
  TokenManager,
  TokenValueSchema,
  getTokens,
  initializeTokenSystem,
  preloadTokens,
  processTokens
});
