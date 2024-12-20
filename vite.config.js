import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://7th-market-carly.vercel.app';
  }
  return 'http://localhost:5173';
};
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './',
  server: {
    proxy: {
      '/login': {
        target: getBaseUrl(),
        rewrite: () => '/src/pages/login/index.html'
      },
      '/register': {
        target: getBaseUrl(),
        rewrite: () => '/src/pages/register/index.html'
      },
      '/productDetail': {
        target: getBaseUrl(),
        rewrite: () => '/src/pages/productDetail/index.html'
      },
      '/popup': {
        target: getBaseUrl(),
        rewrite: () => '/src/components/PopupAd/index.html'
      }
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'],
    // rollupOptions 삭제 가능 (위의 proxy가 라우팅을 해줌)
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
});