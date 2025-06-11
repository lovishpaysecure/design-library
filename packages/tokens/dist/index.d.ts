import { z } from 'zod';

declare const TokenValueSchema: z.ZodObject<{
    value: z.ZodString;
    type: z.ZodEnum<["color", "spacing", "typography", "shadow", "border", "opacity", "size", "other"]>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
    category: string;
    description?: string | undefined;
}, {
    value: string;
    type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
    category: string;
    description?: string | undefined;
}>;
declare const TokenChunkSchema: z.ZodObject<{
    id: z.ZodString;
    tokens: z.ZodRecord<z.ZodString, z.ZodObject<{
        value: z.ZodString;
        type: z.ZodEnum<["color", "spacing", "typography", "shadow", "border", "opacity", "size", "other"]>;
        description: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
        category: string;
        description?: string | undefined;
    }, {
        value: string;
        type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
        category: string;
        description?: string | undefined;
    }>>;
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tokens: Record<string, {
        value: string;
        type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
        category: string;
        description?: string | undefined;
    }>;
    version: string;
    dependencies?: string[] | undefined;
}, {
    id: string;
    tokens: Record<string, {
        value: string;
        type: "color" | "spacing" | "typography" | "shadow" | "border" | "opacity" | "size" | "other";
        category: string;
        description?: string | undefined;
    }>;
    version: string;
    dependencies?: string[] | undefined;
}>;
type TokenValue = z.infer<typeof TokenValueSchema>;
type TokenChunk = z.infer<typeof TokenChunkSchema>;
interface TokenComponent {
    id: string;
    type: string;
    value: any;
    processed?: boolean;
    timestamp?: number;
}
interface TokenState {
    components: Record<string, TokenComponent>;
    timestamp: number;
}
interface VirtualTokenState {
    pending: Set<string>;
    processed: Map<string, TokenComponent>;
}
type TokenSubscriber = (state: TokenState) => void;
interface TokenUpdateMessage {
    type: 'update';
    state: TokenState;
}
type ChunkMetadata = {
    lastUpdated: number;
    version: string;
    hash: string;
};
interface TokenStorage {
    getTokens(componentTypes: string[]): Promise<Record<string, TokenComponent> | null>;
    setTokens(tokens: Record<string, TokenComponent>): Promise<void>;
    clear(): Promise<void>;
}

declare class TokenManager {
    private static instance;
    private storage;
    private subscribers;
    private worker;
    private updateChannel;
    private sharedBuffer?;
    private virtualState;
    private updateScheduled;
    private loadPromises;
    private constructor();
    static getInstance(): TokenManager;
    private setupUpdateChannel;
    private handleTokenUpdate;
    private flushUpdates;
    processTokens(tokens: Record<string, TokenComponent>): Promise<TokenState>;
    getTokens(componentTypes: string[]): Promise<TokenState>;
    subscribe(componentType: string, callback: TokenSubscriber): () => void;
    preloadTokens(componentTypes: string[]): Promise<void>;
}

declare class IndexedDBStorage implements TokenStorage {
    private dbPromise;
    getTokens(componentTypes: string[]): Promise<Record<string, TokenComponent> | null>;
    setTokens(tokens: Record<string, TokenComponent>): Promise<void>;
    clear(): Promise<void>;
}

declare function initializeTokenSystem(): Promise<TokenManager>;
declare function preloadTokens(componentTypes: string[]): Promise<void>;
declare function getTokens(componentType: string): Promise<TokenState>;
declare function processTokens(tokens: Record<string, any>): Promise<TokenState>;

export { ChunkMetadata, IndexedDBStorage, TokenChunk, TokenChunkSchema, TokenComponent, TokenManager, TokenState, TokenStorage, TokenSubscriber, TokenUpdateMessage, TokenValue, TokenValueSchema, VirtualTokenState, getTokens, initializeTokenSystem, preloadTokens, processTokens };
