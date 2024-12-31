import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'],
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'src/pages/productDetail/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        popup: resolve(__dirname, 'src/components/PopupAd/index.html'),
        productList: resolve(__dirname, 'src/pages/productList/index.html'),
        cart: resolve(__dirname, 'src/pages/cart/index.html'),
      },
    },
  },
});
