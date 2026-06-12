import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('mapbox-gl') || id.includes('leaflet') || id.includes('react-map-gl')) {
              return 'maps';
            }
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('@sentry')) {
              return 'sentry';
            }
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
