import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/',
  server: { 
    proxy: {
      '/login': {
        target: 'http://localhost:5173',
        rewrite: () => '/src/pages/login/index.html'
      },
      '/register': {
        target: 'http://localhost:5173',
        rewrite: () => '/src/pages/register/index.html'
      },
      '/productDetail': {
        target: 'http://localhost:5173',
        rewrite: () => '/src/pages/productDetail/index.html'
      },
      '/popup': {
        target: 'http://localhost:5173',
        rewrite: () => '/src/components/PopupAd/index.html'
      }
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'],
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'product': resolve(__dirname, 'src/pages/productDetail/index.html'),
        'login': resolve(__dirname, 'src/pages/login/index.html'),
        'register': resolve(__dirname, 'src/pages/register/index.html'),
        'popup': resolve(__dirname, 'src/components/PopupAd/index.html'),
      },
    },
  },
  preview: {
    proxy: {
      '/login': {
        target: 'http://localhost:4173',
        rewrite: () => '/src/pages/login/index.html'
      },
      '/register': {
        target: 'http://localhost:4173',
        rewrite: () => '/src/pages/register/index.html'
      },
      '/productDetail': {
        target: 'http://localhost:4173',
        rewrite: () => '/src/pages/productDetail/index.html'
      },
      '/popup': {
        target: 'http://localhost:4173',
        rewrite: () => '/src/components/PopupAd/index.html'
      }
    }
  }
});