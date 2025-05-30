import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});