import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin'
    }
  },
  build: {
    rollupOptions: {
      // Remove the external configuration that was causing issues
    },
  },
  optimizeDeps: {
    exclude: ['@paysecure-design/tokens']
  }
}); 