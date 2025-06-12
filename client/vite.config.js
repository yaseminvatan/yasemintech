import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '../public/*', // relative to client/
          dest: ''            // copies to dist root
        },
        {
          src: '../public/models/*',
          dest: 'models'
        },
        {
          src: '../public/textures/*',
          dest: 'textures'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
