import { defineConfig } from 'vite';

export default defineConfig({
  base: '/aihaber/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        article: './pages/article.html'
      }
    }
  }
});
