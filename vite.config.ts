import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, 'src', 'contentScript.tsx')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});
