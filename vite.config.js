import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'],
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // productDetail: resolve(__dirname, 'src/pages/productDetail/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
      },
    },
  },
});
