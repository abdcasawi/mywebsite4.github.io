import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/ajd-hls': {
        target: 'https://live-hls-apps-ajd-fa.getaj.net/AJD',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ajd-hls/, ''),
        secure: true
      }
    }
  }
});