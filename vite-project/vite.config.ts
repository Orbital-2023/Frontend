import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://blueberry-production.up.railway.app'
    },
  },
  plugins: [react()],
  resolve:{
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
  },
})
