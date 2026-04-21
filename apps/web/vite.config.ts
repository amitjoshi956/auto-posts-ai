import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const resolvedPath = (p: string) => path.resolve(__dirname, p);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Shared monorepo package
      '@autoposts/shared': resolvedPath('../../packages/shared/src'),
      // App-local aliases (preserved)
      '@assets': resolvedPath('./src/assets'),
      '@components': resolvedPath('./src/components'),
      '@api': resolvedPath('./src/api'),
      '@pages': resolvedPath('./src/pages'),
      '@base': resolvedPath('./src/base'),
      '@common': resolvedPath('./src/common'),
    },
  },

  server: {
    port: 1728,
    proxy: {
      '/api': {
        // We look at the local environment variable if available, otherwise default to remote
        target: 'https://auto-posts-ai-core.onrender.com',
        changeOrigin: true,
        secure: false,
        // This regex mimics exactly what Render does (strips the /api prefix)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
