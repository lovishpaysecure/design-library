# Design Token System

A modern, performant design token system with real-time updates, background processing, and caching.

## Features

- 🚀 Real-time token updates with WebWorker processing
- 💾 Persistent caching with IndexedDB
- 🔄 Automatic stale cache invalidation
- 🎨 Component-specific token management
- ⚡ Optimized React components with direct DOM updates
- 🎯 Type-safe token definitions
- 📦 Modular monorepo structure

## Project Structure

```
.
├── packages/
│   ├── tokens/           # Core token management system
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   ├── TokenManager.ts
│   │   │   ├── worker/
│   │   │   └── storage/
│   │   └── package.json
│   └── design-system/    # React component library
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── index.ts
│       └── package.json
└── apps/
    └── web/             # Example web application
        ├── src/
        │   └── App.tsx
        └── package.json
```

## Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Usage

### Initialize Token System

```typescript
import { initializeTokenSystem } from '@design-system/tokens';

// Initialize with default tokens
await initializeTokenSystem();
```

### Use Tokens in Components

```typescript
import { Button } from '@design-system/react';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click Me
      </Button>
    </div>
  );
}
```

### Custom Token Hook

```typescript
import { useTokens } from '@design-system/react';

function CustomComponent() {
  const { values: tokens, status } = useTokens('custom');
  
  return (
    <div style={{ backgroundColor: tokens['custom-bg'] }}>
      {status === 'loading' ? 'Loading...' : 'Ready'}
    </div>
  );
}
```

## Token Types

The system supports various token types:

- `color`: Color values (hex, rgb, etc.)
- `spacing`: Layout spacing values
- `typography`: Font-related values
- `shadow`: Box shadow values
- `border`: Border styles
- `opacity`: Opacity values
- `size`: Dimension values
- `other`: Custom token types

## Performance Optimizations

1. **Background Processing**: Token calculations are performed in a WebWorker
2. **Smart Caching**: Tokens are cached in IndexedDB with automatic invalidation
3. **Direct DOM Updates**: Style updates bypass React's reconciliation when possible
4. **Batched Updates**: Style changes are batched using requestAnimationFrame
5. **Minimal Re-renders**: Components only update when their specific tokens change

## Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build packages
pnpm build

# Lint code
pnpm lint
```


## License

MIT