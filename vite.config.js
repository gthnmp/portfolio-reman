import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  server: {
    // Configure the Vite development server entry points
    hmr: {
      overlay: true, // Show error overlay
      port: 5000,    // Set the development server port
    },
    proxy: {
      // Add any proxy configurations if needed
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about', 'index.html'),
        selected: resolve(root, 'selected', 'index.html'),
      },
    },
  },
});
