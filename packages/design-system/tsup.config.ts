import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'Button/index': 'src/components/Button/index.ts',
    'Typography/index': 'src/components/Typography/index.ts',
    'Card/index': 'src/components/Card/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'styled-components'],
  treeshake: true,
  splitting: true,
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? `.js` : `.cjs`
    };
  }
}); 