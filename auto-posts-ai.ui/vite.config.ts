import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const resolvedPath = (p: string) => path.resolve(__dirname, p);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolvedPath('./src'),
      '@assets': resolvedPath('./src/assets'),
      '@components': resolvedPath('./src/components'),
      '@api': resolvedPath('./src/api'),
      '@pages': resolvedPath('./src/pages'),
      '@base': resolvedPath('./src/base'),
    },
  },
});
