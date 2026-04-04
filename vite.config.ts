import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TataComp/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      cache: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
