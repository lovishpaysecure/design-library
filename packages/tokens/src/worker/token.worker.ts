import { expose } from 'comlink';
import { TokenComponent, TokenState } from '../types';

export interface TokenWorkerAPI {
  processTokens(tokens: Record<string, TokenComponent>): Promise<TokenState>;
}

const worker: TokenWorkerAPI = {
  async processTokens(tokens: Record<string, TokenComponent>): Promise<TokenState> {
    // Process tokens in the worker thread
    const processedTokens = Object.entries(tokens).reduce((acc, [id, token]) => {
      acc[id] = {
        ...token,
        processed: true,
        timestamp: Date.now()
      };
      return acc;
    }, {} as Record<string, TokenComponent>);

    return {
      components: processedTokens,
      timestamp: Date.now()
    };
  }
};

expose(worker); 