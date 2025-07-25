import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'Button/index': 'src/components/Button/index.ts',
    'Typography/index': 'src/components/Typography/index.ts',
    'Card/index': 'src/components/Card/index.ts',
    'Chart/index': 'src/components/Chart/index.ts',
    'Header/index': 'src/components/Header/index.ts',
    'Modal/index': 'src/components/Modal/index.ts',
    'Sidebar/index': 'src/components/Sidebar/index.ts',
    'Tooltip/index': 'src/components/Tooltip/index.ts',
    'DatePicker/index': 'src/components/DatePicker/index.ts',
    'Dropdown/index': 'src/components/Dropdown/index.ts',
    'CheckBox/index': 'src/components/CheckBox/index.ts',
    'Table/index': 'src/components/Table/index.ts',
    'Skeleton/index': 'src/components/Skeleton/index.ts',
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