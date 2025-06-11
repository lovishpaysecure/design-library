import { z } from 'zod';

export const TokenValueSchema = z.object({
  value: z.string(),
  type: z.enum(['color', 'spacing', 'typography', 'shadow', 'border', 'opacity', 'size', 'other']),
  description: z.string().optional(),
  category: z.string(),
});

export const TokenChunkSchema = z.object({
  id: z.string(),
  tokens: z.record(TokenValueSchema),
  dependencies: z.array(z.string()).optional(),
  version: z.string(),
});

export type TokenValue = z.infer<typeof TokenValueSchema>;
export type TokenChunk = z.infer<typeof TokenChunkSchema>;

export interface TokenComponent {
  id: string;
  type: string;
  value: any;
  processed?: boolean;
  timestamp?: number;
}

export interface TokenState {
  components: Record<string, TokenComponent>;
  timestamp: number;
}

export interface VirtualTokenState {
  pending: Set<string>;
  processed: Map<string, TokenComponent>;
}

export type TokenSubscriber = (state: TokenState) => void;

export interface TokenUpdateMessage {
  type: 'update';
  state: TokenState;
}

export type ChunkMetadata = {
  lastUpdated: number;
  version: string;
  hash: string;
};

export interface TokenStorage {
  getTokens(componentTypes: string[]): Promise<Record<string, TokenComponent> | null>;
  setTokens(tokens: Record<string, TokenComponent>): Promise<void>;
  clear(): Promise<void>;
} 