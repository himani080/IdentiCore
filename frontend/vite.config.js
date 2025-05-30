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
        '/api': isProduction
          ? 'http://backend:3000'   // Inside Docker network (EC2)
          : 'http://localhost:3000' // Local development
      }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});