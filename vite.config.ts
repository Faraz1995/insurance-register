import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stage.api.sanaap.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false // if the server uses self-signed SSL
      }
    }
  }
})
